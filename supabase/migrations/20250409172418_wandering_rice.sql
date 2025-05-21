/*
  # Create news sequences table

  1. New Tables
    - `news_sequences`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `frequency` (text, either 'weekly' or 'monthly')
      - `days` (jsonb, array of days or dates)
      - `sets` (jsonb, array of news_set IDs)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `news_sequences` table
    - Add policy for users to manage their own sequences
*/

-- Create news_sequences table
CREATE TABLE IF NOT EXISTS news_sequences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  frequency text NOT NULL CHECK (frequency IN ('weekly', 'monthly')),
  days jsonb NOT NULL DEFAULT '[]'::jsonb,
  sets jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_active boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE news_sequences ENABLE ROW LEVEL SECURITY;

-- Create policy for users to manage their own sequences
CREATE POLICY "Users can manage their own news sequences"
  ON news_sequences
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX idx_news_sequences_user_id ON news_sequences(user_id);
CREATE INDEX idx_news_sequences_is_active ON news_sequences(is_active);