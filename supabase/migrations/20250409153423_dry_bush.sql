/*
  # Create news articles table with type column

  1. New Tables
    - Add type column to news_articles
    - Fix comment syntax for PostgreSQL
  
  2. Security
    - Maintain existing security policies
*/

-- Create news_sets table if it doesn't exist
CREATE TABLE IF NOT EXISTS news_sets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  subject text NOT NULL,
  num_articles integer NOT NULL DEFAULT 5,
  news_type text NOT NULL,
  mood text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create news_articles table if it doesn't exist
CREATE TABLE IF NOT EXISTS news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  mood text NOT NULL,
  introduction text NOT NULL,
  developments text NOT NULL,
  implications text NOT NULL,
  timestamp timestamptz DEFAULT now(),
  type text
);

-- Add comment to the type column using proper PostgreSQL syntax
COMMENT ON COLUMN news_articles.type IS 'type of news';

-- Enable RLS on tables
ALTER TABLE news_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can manage their own news sets" ON news_sets;
  DROP POLICY IF EXISTS "Authenticated users can read all news articles" ON news_articles;
  DROP POLICY IF EXISTS "Service role can manage news articles" ON news_articles;
  DROP POLICY IF EXISTS "Users can read all news articles" ON news_articles;
EXCEPTION
  WHEN undefined_object THEN
    NULL; -- Policy doesn't exist, so just continue
END $$;

-- Create policies for news_sets (using the IF NOT EXISTS pattern)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'news_sets' 
    AND policyname = 'Users can manage their own news sets'
  ) THEN
    CREATE POLICY "Users can manage their own news sets"
      ON news_sets
      FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Create policies for news_articles (using the IF NOT EXISTS pattern)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'news_articles' 
    AND policyname = 'Authenticated users can read all news articles'
  ) THEN
    CREATE POLICY "Authenticated users can read all news articles"
      ON news_articles
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'news_articles' 
    AND policyname = 'Service role can manage news articles'
  ) THEN
    CREATE POLICY "Service role can manage news articles"
      ON news_articles
      FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_news_articles_subject ON news_articles(subject);
CREATE INDEX IF NOT EXISTS idx_news_articles_mood ON news_articles(mood);
CREATE INDEX IF NOT EXISTS idx_news_articles_timestamp ON news_articles(timestamp);