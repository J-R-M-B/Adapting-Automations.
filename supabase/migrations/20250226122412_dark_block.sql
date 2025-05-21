/*
  # Database Cleanup and Reset

  1. Changes
    - Drop unused tables
    - Keep only essential tables
    - Reset all data
    - Create admin account

  2. Security
    - Maintain RLS policies
    - Set up admin role
*/

-- Drop unused tables
DROP TABLE IF EXISTS user_analytics CASCADE;
DROP TABLE IF EXISTS user_details CASCADE;
DROP TABLE IF EXISTS permissions CASCADE;
DROP TABLE IF EXISTS role_permissions CASCADE;

-- Clean up enums
DROP TYPE IF EXISTS permission_type CASCADE;

-- Delete all existing data
TRUNCATE TABLE user_roles CASCADE;
TRUNCATE TABLE user_settings CASCADE;
TRUNCATE TABLE contact_messages CASCADE;
TRUNCATE TABLE news_articles CASCADE;
TRUNCATE TABLE newsletter_subscriptions CASCADE;

-- Delete all existing users (this will cascade to related tables)
DELETE FROM auth.users;

-- Simplify user_roles table structure
ALTER TABLE user_roles DROP CONSTRAINT IF EXISTS user_roles_user_id_fkey;
ALTER TABLE user_roles ADD CONSTRAINT user_roles_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Simplify user_settings table structure
ALTER TABLE user_settings DROP CONSTRAINT IF EXISTS user_settings_user_id_fkey;
ALTER TABLE user_settings ADD CONSTRAINT user_settings_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update handle_new_user function to only handle essential tables
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Insert default role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'viewer');
  
  -- Insert default settings
  INSERT INTO public.user_settings (user_id)
  VALUES (new.id);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create admin user safely
DO $$
DECLARE
  new_user_id uuid := gen_random_uuid();
BEGIN
  -- Create the user with explicit ID
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    role,
    confirmation_token,
    recovery_token,
    aud,
    last_sign_in_at
  ) VALUES (
    new_user_id,                                    -- id
    '00000000-0000-0000-0000-000000000000',        -- instance_id
    'contact@adaptingautomations.com',             -- email
    crypt('2LPlpH&$?di2U51++IC7', gen_salt('bf')), -- encrypted_password
    now(),                                         -- email_confirmed_at
    now(),                                         -- created_at
    now(),                                         -- updated_at
    '{"provider":"email","providers":["email"]}'::jsonb,  -- raw_app_meta_data
    '{"name":"Adapting Automations"}'::jsonb,      -- raw_user_meta_data
    false,                                         -- is_super_admin
    'authenticated',                               -- role
    '',                                           -- confirmation_token
    '',                                           -- recovery_token
    'authenticated',                               -- aud
    now()                                         -- last_sign_in_at
  );

  -- Set admin role for the new user
  INSERT INTO user_roles (user_id, role)
  VALUES (new_user_id, 'admin')
  ON CONFLICT (user_id) DO UPDATE
  SET role = 'admin';

  -- Set default settings for admin
  INSERT INTO user_settings (user_id)
  VALUES (new_user_id)
  ON CONFLICT (user_id) DO NOTHING;
END;
$$;