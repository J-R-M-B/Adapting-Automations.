/*
  # Clean up database schema
  
  1. Changes
    - Drop all role-related tables and types
    - Remove triggers and functions
    - Clean up any remaining objects
*/

-- Drop all existing objects
DO $$ BEGIN
    -- Drop triggers
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    DROP TRIGGER IF EXISTS update_users_timestamp ON users;
    DROP TRIGGER IF EXISTS update_user_roles_timestamp ON user_roles;
    DROP TRIGGER IF EXISTS update_user_details_timestamp ON user_details;
    DROP TRIGGER IF EXISTS update_user_settings_timestamp ON user_settings;
    
    -- Drop functions
    DROP FUNCTION IF EXISTS handle_new_user() CASCADE;
    DROP FUNCTION IF EXISTS update_timestamp() CASCADE;
    
    -- Drop tables
    DROP TABLE IF EXISTS user_roles CASCADE;
    DROP TABLE IF EXISTS user_settings CASCADE;
    DROP TABLE IF EXISTS user_details CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    
    -- Drop types
    DROP TYPE IF EXISTS user_role CASCADE;
    DROP TYPE IF EXISTS role_type CASCADE;
EXCEPTION
    WHEN undefined_object THEN null;
END $$;