/*
  # Fix User Role System

  1. Changes
    - Drop existing objects in correct order
    - Recreate user role types and tables
    - Add proper policies without conflicts
    - Set up triggers and functions

  2. Security
    - Enable RLS
    - Add proper policies
    - Ensure secure defaults
*/

-- Drop objects in correct order with CASCADE
DO $$ BEGIN
    -- First drop triggers that depend on the function
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    DROP TRIGGER IF EXISTS update_users_timestamp ON users;
    DROP TRIGGER IF EXISTS update_user_roles_timestamp ON user_roles;
    DROP TRIGGER IF EXISTS update_user_details_timestamp ON user_details;
    DROP TRIGGER IF EXISTS update_user_settings_timestamp ON user_settings;
    
    -- Then drop functions
    DROP FUNCTION IF EXISTS handle_new_user() CASCADE;
    DROP FUNCTION IF EXISTS update_timestamp() CASCADE;
    
    -- Finally drop tables and types
    DROP TABLE IF EXISTS user_roles CASCADE;
    DROP TABLE IF EXISTS user_settings CASCADE;
    DROP TABLE IF EXISTS user_details CASCADE;
    DROP TYPE IF EXISTS user_role CASCADE;
    DROP TYPE IF EXISTS role_type CASCADE;
EXCEPTION
    WHEN undefined_object THEN null;
END $$;

-- Create enums
CREATE TYPE user_role AS ENUM (
  'admin',
  'moderator',
  'premium_user',
  'standard_user'
);

CREATE TYPE role_type AS ENUM ('admin', 'editor', 'viewer');

-- Create tables
CREATE TABLE user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL DEFAULT 'standard_user',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

CREATE TABLE user_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  language_preference text DEFAULT 'en',
  theme text DEFAULT 'dark',
  notifications jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

CREATE TABLE user_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  first_name text,
  last_name text,
  country text,
  phone text,
  account_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_details ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DO $$ BEGIN
    DROP POLICY IF EXISTS "view_own_role" ON user_roles;
    DROP POLICY IF EXISTS "admin_manage_roles" ON user_roles;
    DROP POLICY IF EXISTS "manage_own_settings" ON user_settings;
    DROP POLICY IF EXISTS "manage_own_details" ON user_details;
    DROP POLICY IF EXISTS "admin_manage_details" ON user_details;
    DROP POLICY IF EXISTS "Users can view their own role" ON user_roles;
    DROP POLICY IF EXISTS "Admins can manage all roles" ON user_roles;
    DROP POLICY IF EXISTS "Users can manage their own settings" ON user_settings;
    DROP POLICY IF EXISTS "Users can view and update their own details" ON user_details;
    DROP POLICY IF EXISTS "Admins can manage all details" ON user_details;
EXCEPTION
    WHEN undefined_object THEN null;
END $$;

-- Create new policies
CREATE POLICY "view_own_role"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "admin_manage_roles"
  ON user_roles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

CREATE POLICY "manage_own_settings"
  ON user_settings
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "manage_own_details"
  ON user_details
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "admin_manage_details"
  ON user_details
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Create helper functions
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Insert default role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'standard_user');
  
  -- Insert default settings
  INSERT INTO public.user_settings (user_id)
  VALUES (new.id);
  
  -- Create user details record
  INSERT INTO public.user_details (
    user_id,
    first_name,
    last_name,
    country,
    phone
  ) VALUES (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'country',
    new.raw_user_meta_data->>'phone'
  );
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

CREATE TRIGGER update_user_roles_timestamp
  BEFORE UPDATE ON user_roles
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_user_details_timestamp
  BEFORE UPDATE ON user_details
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_user_settings_timestamp
  BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();