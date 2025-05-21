/*
  # New Account System

  1. New Tables
    - user_details: Stores additional user information
    - Simplified role system that only controls page/tool access

  2. Security
    - Enable RLS on all tables
    - Add policies for proper data access
    - Ensure admin access is preserved
*/

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
ALTER TABLE user_details ENABLE ROW LEVEL SECURITY;

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
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can update all user details"
  ON user_details
  FOR UPDATE
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Update handle_new_user function to create user details
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

-- Create function to update user details
CREATE OR REPLACE FUNCTION public.update_user_details(
  p_user_id uuid,
  p_first_name text,
  p_last_name text,
  p_country text,
  p_phone text DEFAULT null
)
RETURNS void AS $$
BEGIN
  UPDATE user_details
  SET
    first_name = p_first_name,
    last_name = p_last_name,
    country = p_country,
    phone = p_phone,
    updated_at = now()
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;