/*
  # Create newsletter settings table

  1. New Tables
    - `newsletter_settings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `header_color` (text)
      - `body_color` (text)
      - `text_color` (text)
      - `accent_color` (text)
      - `font_family` (text)
      - `width` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `newsletter_settings` table
    - Add policy for users to manage their own settings
*/

CREATE TABLE IF NOT EXISTS newsletter_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL DEFAULT 'Monthly Newsletter',
  header_color text NOT NULL DEFAULT '#6366f1',
  body_color text NOT NULL DEFAULT '#ffffff',
  text_color text NOT NULL DEFAULT '#1f2937',
  accent_color text NOT NULL DEFAULT '#8b5cf6',
  font_family text NOT NULL DEFAULT 'Arial, sans-serif',
  width integer NOT NULL DEFAULT 600,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE newsletter_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own newsletter settings"
  ON newsletter_settings
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamp on settings change
CREATE OR REPLACE FUNCTION update_newsletter_settings_timestamp()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for timestamp updates
CREATE TRIGGER update_newsletter_settings_timestamp
  BEFORE UPDATE ON newsletter_settings
  FOR EACH ROW EXECUTE FUNCTION update_newsletter_settings_timestamp();