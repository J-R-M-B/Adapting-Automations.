/*
  # Create news_articles table for Library Storage

  1. New Tables
    - `news_articles` - Full-featured news article storage
      - `id` (uuid, primary key)
      - `subject` (text) - The main subject/topic of the article
      - `mood` (text) - The overall sentiment (positive, neutral, negative)
      - `introduction` (text) - Brief introduction/summary of the article
      - `developments` (text) - Main content describing key developments
      - `implications` (text) - Analysis of implications and impact
      - `timestamp` (timestamptz) - When the article was created/published

  2. Security
    - Enable RLS
    - Add policies for authenticated users to read articles
    - Add policies for service role to manage articles
*/

-- Create news_articles table if it doesn't exist
CREATE TABLE IF NOT EXISTS news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  mood text NOT NULL,
  introduction text NOT NULL,
  developments text NOT NULL,
  implications text NOT NULL,
  timestamp timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid duplicates
DROP POLICY IF EXISTS "Users can read all news articles" ON news_articles;
DROP POLICY IF EXISTS "Service role can manage news articles" ON news_articles;
DROP POLICY IF EXISTS "Authenticated users can read all news articles" ON news_articles;

-- Create policies
CREATE POLICY "Authenticated users can read all news articles"
  ON news_articles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Service role can manage news articles"
  ON news_articles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_news_articles_subject ON news_articles(subject);
CREATE INDEX IF NOT EXISTS idx_news_articles_mood ON news_articles(mood);
CREATE INDEX IF NOT EXISTS idx_news_articles_timestamp ON news_articles(timestamp);