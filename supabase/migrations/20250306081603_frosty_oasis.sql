/*
  # Create News Articles Table

  1. New Tables
    - `news_articles` - Stores news articles with headline, text, and timestamp
      - `id` (uuid, primary key)
      - `position` (text)
      - `headline` (text)
      - `text` (text)
      - `timestamp` (text)

  2. Security
    - Enable RLS
    - Add policies for public read access
    - Add policies for service role access
*/

-- Create news articles table if it doesn't exist
CREATE TABLE IF NOT EXISTS news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  position text NOT NULL,
  headline text NOT NULL,
  text text NOT NULL,
  timestamp text NOT NULL
);

-- Enable Row Level Security
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Allow public read access" ON news_articles;
    DROP POLICY IF EXISTS "Allow service role full access" ON news_articles;
END $$;

-- Create policies
CREATE POLICY "Allow public read access"
  ON news_articles
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow service role full access"
  ON news_articles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);