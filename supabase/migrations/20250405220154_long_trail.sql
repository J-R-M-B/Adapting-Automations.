/*
  # Create newsletter articles table

  1. New Tables
    - `newsletter_articles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `newsletter_id` (uuid, optional reference to future newsletters table)
      - `blocks` (jsonb, stores article blocks)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `newsletter_articles` table
    - Add policy for users to manage their own articles
*/

CREATE TABLE IF NOT EXISTS newsletter_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  newsletter_id uuid,
  blocks jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own newsletter articles"
  ON newsletter_articles
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamp on articles change
CREATE OR REPLACE FUNCTION update_newsletter_articles_timestamp()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for timestamp updates
CREATE TRIGGER update_newsletter_articles_timestamp
  BEFORE UPDATE ON newsletter_articles
  FOR EACH ROW EXECUTE FUNCTION update_newsletter_articles_timestamp();