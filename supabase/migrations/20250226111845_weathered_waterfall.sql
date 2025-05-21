/*
  # Grant Admin Access to Adapting Automations

  1. Changes
    - Update user role to admin for Adapting Automations account
    - Use proper variable references to avoid ambiguity
*/

DO $$
DECLARE
  target_user_id uuid;
BEGIN
  -- Get user ID for the email
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = 'contact@adaptingautomations.com';

  -- Update role to admin
  IF target_user_id IS NOT NULL THEN
    UPDATE user_roles
    SET role = 'admin'
    WHERE user_id = target_user_id;
  END IF;
END $$;