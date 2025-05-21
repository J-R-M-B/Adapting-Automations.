/*
  # Create news articles table with position enum

  1. New Types
    - `article_position`: Enum type for article positions
      - Values: 'topRight', 'bottomRight', 'topLeft', 'bottomLeft'

  2. New Tables
    - `news_articles`
      - `id` (uuid, primary key)
      - `position` (article_position, not null)
      - `headline` (text, not null)
      - `text` (text, not null)
      - `timestamp` (text, not null)

  3. Security
    - Enable RLS on `news_articles` table
    - Add policies for public read access
    - Add policies for service role full access
*/

-- Create enum for article positions if it doesn't exist
DO $$ BEGIN
  CREATE TYPE article_position AS ENUM ('topRight', 'bottomRight', 'topLeft', 'bottomLeft');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Drop existing table if it exists
DROP TABLE IF EXISTS news_articles;

-- Create news articles table
CREATE TABLE news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  position article_position NOT NULL,
  headline text NOT NULL,
  text text NOT NULL,
  timestamp text NOT NULL
);

-- Enable RLS
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

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