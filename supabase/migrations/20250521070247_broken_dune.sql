/*
  # Create analytics_events table

  1. New Tables
    - `analytics_events`
      - `id` (uuid, primary key)
      - `user_id` (uuid, nullable)
      - `path` (text)
      - `event_type` (text)
      - `referrer` (text, nullable)
      - `user_agent` (text)
      - `screen_width` (integer)
      - `screen_height` (integer)
      - `created_at` (timestamp with time zone)
  2. Security
    - Enable RLS on `analytics_events` table
    - Add policy for authenticated users to insert their own analytics data
    - Add policy for service_role to read all analytics data
*/

CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  path text NOT NULL,
  event_type text NOT NULL,
  referrer text,
  user_agent text NOT NULL,
  screen_width integer NOT NULL,
  screen_height integer NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert their own analytics data
CREATE POLICY "Users can insert their own analytics"
  ON analytics_events
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Allow anonymous users to insert analytics data (but only with null user_id)
CREATE POLICY "Anon users can insert analytics without user_id"
  ON analytics_events
  FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

-- Allow service role to manage all analytics data
CREATE POLICY "Service role can manage all analytics"
  ON analytics_events
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create index on frequently queried columns
CREATE INDEX IF NOT EXISTS idx_analytics_events_path ON analytics_events(path);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);