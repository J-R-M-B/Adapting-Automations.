/*
  # Authentication System Setup

  1. Tables
    - user_settings: Stores user preferences and settings
    - user_roles: Stores user role assignments
    - user_details: Stores additional user information

  2. Security
    - Enable RLS on all tables
    - Add policies for proper data access
    - Set up role-based access control
*/

-- Create role type if it doesn't exist
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('user', 'chatbot', 'phone_agent', 'website', 'crm', 'social_media', 'outreach', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  role user_role NOT NULL DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create user_settings table
CREATE TABLE IF NOT EXISTS user_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  language_preference text DEFAULT 'en',
  theme text DEFAULT 'dark',
  notifications jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create user_details table
CREATE TABLE IF NOT EXISTS user_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  country text NOT NULL,
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

-- Drop existing policies to avoid conflicts
DO $$ 
BEGIN
  -- Drop policies for user_roles
  DROP POLICY IF EXISTS "Users can view their own role" ON user_roles;
  DROP POLICY IF EXISTS "Admins can manage all roles" ON user_roles;
  
  -- Drop policies for user_settings
  DROP POLICY IF EXISTS "Users can manage their own settings" ON user_settings;
  
  -- Drop policies for user_details
  DROP POLICY IF EXISTS "Users can view their own details" ON user_details;
  DROP POLICY IF EXISTS "Users can update their own details" ON user_details;
  DROP POLICY IF EXISTS "Admins can view all user details" ON user_details;
EXCEPTION
  WHEN undefined_object THEN null;
END $$;

-- Create policies for user_roles
CREATE POLICY "Users can view their own role"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
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

-- Create policies for user_settings
CREATE POLICY "Users can manage their own settings"
  ON user_settings
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policies for user_details
CREATE POLICY "Users can view their own details"
  ON user_details
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own details"
  ON user_details
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all user details"
  ON user_details
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Helper functions
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = $1 
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Insert default role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'user');
  
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
    '',
    '',
    '',
    null
  );
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();