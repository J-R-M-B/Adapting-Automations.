/*
  # Add Social Media Settings Table

  1. New Tables
    - `social_settings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `platform` (text)
      - `day` (text)
      - `row` (integer)
      - `settings` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policies for user access
*/

CREATE TABLE social_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  platform text NOT NULL,
  day text NOT NULL,
  row integer NOT NULL DEFAULT 1,
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, platform, day, row)
);

ALTER TABLE social_settings ENABLE ROW LEVEL SECURITY;

-- Allow users to manage their own settings
CREATE POLICY "Users can manage their own settings"
  ON social_settings
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamp on settings change
CREATE OR REPLACE FUNCTION update_social_settings_timestamp()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for timestamp updates
CREATE TRIGGER update_social_settings_timestamp
  BEFORE UPDATE ON social_settings
  FOR EACH ROW EXECUTE FUNCTION update_social_settings_timestamp();