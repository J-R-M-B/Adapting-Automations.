/*
  # Fix user roles policy recursion

  1. Changes
    - Drop and recreate admin policy for user_roles table to avoid recursion
    - Add admin check function that doesn't use recursive queries
    - Update existing policies to use the new check

  2. Security
    - Maintains same security level but fixes infinite recursion
    - Ensures admins can still manage all roles
*/

-- Drop existing admin policy
DROP POLICY IF EXISTS "Admins can manage all roles" ON user_roles;

-- Create a more efficient admin check function
CREATE OR REPLACE FUNCTION public.is_admin_direct(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = $1 
    AND role = 'admin'::role_type
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate admin policy without recursion
CREATE POLICY "Admins can manage all roles"
  ON user_roles
  FOR ALL
  TO authenticated
  USING (
    is_admin_direct(auth.uid())
  )
  WITH CHECK (
    is_admin_direct(auth.uid())
  );

-- Update the is_admin function to use the direct check
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN is_admin_direct(user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;