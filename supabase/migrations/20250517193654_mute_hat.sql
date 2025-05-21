/*
  # Create website_configurations table

  1. New Tables
    - `website_configurations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `solutions` (jsonb)
      - `software` (jsonb)
      - `custom_software` (jsonb)
      - `project_details` (jsonb)
      - `contact_info` (jsonb)
      - `schedule_info` (jsonb)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `website_configurations` table
    - Add policies for users to manage their own configurations
    - Add policies for service role to manage all configurations
*/

CREATE TABLE IF NOT EXISTS website_configurations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  solutions jsonb NOT NULL DEFAULT '[]'::jsonb,
  software jsonb NOT NULL DEFAULT '[]'::jsonb,
  custom_software jsonb NOT NULL DEFAULT '[]'::jsonb,
  project_details jsonb NOT NULL DEFAULT '{}'::jsonb,
  contact_info jsonb NOT NULL DEFAULT '{}'::jsonb,
  schedule_info jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE website_configurations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own configurations"
  ON website_configurations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own configurations"
  ON website_configurations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anonymous users can submit configurations"
  ON website_configurations
  FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

-- Create a policy for service role to manage all configurations
CREATE POLICY "Service role can manage all configurations"
  ON website_configurations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create timestamp update function
CREATE OR REPLACE FUNCTION update_website_configurations_timestamp()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for timestamp updates
CREATE TRIGGER update_website_configurations_timestamp
  BEFORE UPDATE ON website_configurations
  FOR EACH ROW EXECUTE FUNCTION update_website_configurations_timestamp();

-- Create index for faster queries
CREATE INDEX idx_website_configurations_user_id ON website_configurations(user_id);
CREATE INDEX idx_website_configurations_status ON website_configurations(status);