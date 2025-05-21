/*
  # Create written_articles table

  1. New Tables
    - `written_articles`
      - `id` (uuid, primary key)
      - `subject` (text)
      - `header` (text)
      - `article` (text)
      - `image` (text)
      - `video` (text)
      - `timestamp` (timestamptz)
      - `type` (text)
      - `mood` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `written_articles` table
    - Add policies for authenticated users to read all articles
    - Add policies for service role to manage articles
*/

-- Create written_articles table
CREATE TABLE IF NOT EXISTS written_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  header text NOT NULL,
  article text NOT NULL,
  image text,
  video text,
  timestamp timestamptz DEFAULT now(),
  type text,
  mood text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE written_articles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Authenticated users can read all written articles"
  ON written_articles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Service role can manage written articles"
  ON written_articles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Add indexes for better performance
CREATE INDEX idx_written_articles_subject ON written_articles(subject);
CREATE INDEX idx_written_articles_mood ON written_articles(mood);
CREATE INDEX idx_written_articles_timestamp ON written_articles(timestamp);
CREATE INDEX idx_written_articles_type ON written_articles(type);