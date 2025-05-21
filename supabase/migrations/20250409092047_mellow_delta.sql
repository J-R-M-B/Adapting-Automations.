/*
  # Create newsletter templates table

  1. New Tables
    - `newsletter_templates`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `settings` (jsonb)
      - `blocks` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `newsletter_templates` table
    - Add policy for users to manage their own templates
*/

-- Create newsletter_templates table
CREATE TABLE IF NOT EXISTS newsletter_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL DEFAULT 'My Newsletter Template',
  settings jsonb NOT NULL DEFAULT '{
    "spacing": "1rem",
    "maxWidth": "600px",
    "textColor": "#000000",
    "fontFamily": "Arial, sans-serif",
    "accentColor": "#6366f1",
    "borderRadius": "0.5rem",
    "backgroundColor": "#ffffff",
    "backgroundImage": "",
    "decorativeElements": {
      "shapes": true,
      "backgrounds": true
    }
  }'::jsonb,
  blocks jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own newsletter templates"
  ON newsletter_templates
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamp on template changes
CREATE OR REPLACE FUNCTION update_newsletter_templates_timestamp()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for timestamp updates
CREATE TRIGGER update_newsletter_templates_timestamp
  BEFORE UPDATE ON newsletter_templates
  FOR EACH ROW EXECUTE FUNCTION update_newsletter_templates_timestamp();