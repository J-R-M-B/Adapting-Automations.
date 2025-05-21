/*
  # Create news articles table

  1. New Tables
    - `news_articles`
      - `id` (uuid, primary key)
      - `position` (text, enum of positions)
      - `headline` (text)
      - `text` (text)
      - `timestamp` (text)

  2. Security
    - Enable RLS on `news_articles` table
    - Add policies for:
      - Authenticated users to read articles
      - Service role to manage articles
*/

-- Create enum for article positions
CREATE TYPE article_position AS ENUM ('topRight', 'bottomRight', 'topLeft', 'bottomLeft');

-- Create news articles table
CREATE TABLE IF NOT EXISTS news_articles (
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