/*
  # Create website_feature_requests table

  1. New Tables
    - `website_feature_requests`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `email` (text)
      - `company` (text)
      - `request_type` (text)
      - `description` (text)
      - `status` (text)
      - `admin_notes` (text)
      - `admin_response` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `website_feature_requests` table
    - Add policies for users to view their own requests
    - Add policies for anonymous users to submit requests
    - Add policies for authenticated users with special access
*/

-- Create website_feature_requests table
CREATE TABLE IF NOT EXISTS website_feature_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  company text,
  request_type text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  admin_notes text,
  admin_response text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE website_feature_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own requests"
  ON website_feature_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own requests"
  ON website_feature_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anonymous users can submit requests"
  ON website_feature_requests
  FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

-- Create a policy for service role to manage all requests
CREATE POLICY "Service role can manage all requests"
  ON website_feature_requests
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create a policy for special users (like admins) based on email domain
-- This is a simplification - in production you would use a more robust method
CREATE POLICY "Special users can manage all requests"
  ON website_feature_requests
  FOR ALL
  TO authenticated
  USING (
    email = 'contact@adaptingautomations.com' OR
    email LIKE '%@adaptingautomations.com'
  )
  WITH CHECK (true);

-- Create timestamp update function
CREATE OR REPLACE FUNCTION update_website_feature_requests_timestamp()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for timestamp updates
CREATE TRIGGER update_website_feature_requests_timestamp
  BEFORE UPDATE ON website_feature_requests
  FOR EACH ROW EXECUTE FUNCTION update_website_feature_requests_timestamp();

-- Create index for faster queries
CREATE INDEX idx_website_feature_requests_status ON website_feature_requests(status);
CREATE INDEX idx_website_feature_requests_user_id ON website_feature_requests(user_id);