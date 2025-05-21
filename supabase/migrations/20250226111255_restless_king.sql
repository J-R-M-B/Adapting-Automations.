/*
  # Implement Role System with Permissions

  1. Changes
    - Create role_permission enum type
    - Create permissions table
    - Create role_permissions junction table
    - Update user_roles table
    - Add policies for permission management
    - Add helper functions for permission checks

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table
    - Ensure proper permission checks
*/

-- Create permission type enum
CREATE TYPE permission_type AS ENUM (
  -- System-wide permissions
  'manage_users',
  'manage_roles',
  'view_system_settings',
  'modify_system_settings',
  'view_reports',
  'manage_billing',
  'view_logs',
  'manage_api',
  
  -- Solution-specific permissions
  'access_chatbot',
  'manage_chatbot',
  'view_chatbot_analytics',
  'train_chatbot',
  
  'access_phone_agent',
  'manage_phone_agent',
  'view_call_analytics',
  'manage_call_scripts',
  
  'access_website',
  'manage_website',
  'view_website_analytics',
  'manage_seo',
  
  'access_crm',
  'manage_crm',
  'view_crm_analytics',
  'manage_customer_data',
  
  'access_social_media',
  'manage_social_media',
  'view_social_analytics',
  'manage_social_accounts',
  
  'access_outreach',
  'manage_outreach',
  'view_outreach_analytics',
  'manage_email_templates'
);

-- Create permissions table
CREATE TABLE IF NOT EXISTS permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type permission_type NOT NULL UNIQUE,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create role_permissions junction table
CREATE TABLE IF NOT EXISTS role_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role role_type NOT NULL,
  permission_type permission_type NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(role, permission_type)
);

-- Enable RLS
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;

-- Policies for permissions table
CREATE POLICY "Public can view permissions"
  ON permissions
  FOR SELECT
  TO public
  USING (true);

-- Policies for role_permissions table
CREATE POLICY "Admins can manage role permissions"
  ON role_permissions
  FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Authenticated users can view role permissions"
  ON role_permissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Helper function to check if user has permission
CREATE OR REPLACE FUNCTION public.has_permission(user_id uuid, required_permission permission_type)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM user_roles ur
    JOIN role_permissions rp ON ur.role = rp.role
    WHERE ur.user_id = $1 
    AND rp.permission_type = $2
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert default permissions
INSERT INTO permissions (type, description) VALUES
  -- System permissions
  ('manage_users', 'Manage all users and their access'),
  ('manage_roles', 'Manage roles and permissions'),
  ('view_system_settings', 'View system configuration'),
  ('modify_system_settings', 'Modify system configuration'),
  ('view_reports', 'View system-wide reports'),
  ('manage_billing', 'Manage billing and subscriptions'),
  ('view_logs', 'View system logs'),
  ('manage_api', 'Manage API integrations'),
  
  -- Chatbot permissions
  ('access_chatbot', 'Access chatbot features'),
  ('manage_chatbot', 'Configure chatbot settings'),
  ('view_chatbot_analytics', 'View chatbot analytics'),
  ('train_chatbot', 'Train chatbot models'),
  
  -- Phone agent permissions
  ('access_phone_agent', 'Access phone agent features'),
  ('manage_phone_agent', 'Configure phone agent settings'),
  ('view_call_analytics', 'View call analytics'),
  ('manage_call_scripts', 'Manage call scripts'),
  
  -- Website permissions
  ('access_website', 'Access website management'),
  ('manage_website', 'Modify website content'),
  ('view_website_analytics', 'View website analytics'),
  ('manage_seo', 'Manage SEO tools'),
  
  -- CRM permissions
  ('access_crm', 'Access CRM features'),
  ('manage_crm', 'Configure CRM settings'),
  ('view_crm_analytics', 'View CRM analytics'),
  ('manage_customer_data', 'Manage customer information'),
  
  -- Social media permissions
  ('access_social_media', 'Access social media tools'),
  ('manage_social_media', 'Configure social media settings'),
  ('view_social_analytics', 'View social media analytics'),
  ('manage_social_accounts', 'Manage social media accounts'),
  
  -- Outreach permissions
  ('access_outreach', 'Access outreach tools'),
  ('manage_outreach', 'Configure outreach settings'),
  ('view_outreach_analytics', 'View outreach analytics'),
  ('manage_email_templates', 'Manage email templates');

-- Set up admin role permissions
INSERT INTO role_permissions (role, permission_type)
SELECT 'admin', type FROM permissions;

-- Set up standard user permissions
INSERT INTO role_permissions (role, permission_type)
VALUES
  ('viewer', 'view_system_settings'),
  ('viewer', 'view_reports'),
  ('viewer', 'access_chatbot'),
  ('viewer', 'access_phone_agent'),
  ('viewer', 'access_website'),
  ('viewer', 'access_crm'),
  ('viewer', 'access_social_media'),
  ('viewer', 'access_outreach');

-- Create function to get user permissions
CREATE OR REPLACE FUNCTION public.get_user_permissions(user_id uuid)
RETURNS TABLE (permission permission_type) AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT rp.permission_type
  FROM user_roles ur
  JOIN role_permissions rp ON ur.role = rp.role
  WHERE ur.user_id = $1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;