/*
  # Create news management tables

  1. New Tables
    - `news_sets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `subject` (text)
      - `num_articles` (integer)
      - `news_type` (text)
      - `mood` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `news_articles`
      - `id` (uuid, primary key)
      - `subject` (text)
      - `mood` (text)
      - `introduction` (text)
      - `developments` (text)
      - `implications` (text)
      - `timestamp` (timestamp)

  2. Security
    - Enable RLS
    - Add appropriate policies
*/

-- Create news_sets table
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

-- Create news_articles table
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
ALTER TABLE news_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

-- Create policies for news_sets
CREATE POLICY "Users can manage their own news sets"
  ON news_sets
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policies for news_articles
CREATE POLICY "Users can read all news articles"
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