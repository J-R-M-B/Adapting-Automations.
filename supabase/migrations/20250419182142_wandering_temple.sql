/*
  # Create phone_call_records table

  1. New Tables
    - `phone_call_records`
      - `id` (uuid, primary key)
      - `caller_name` (text)
      - `caller_number` (text)
      - `call_duration` (text)
      - `transcript` (text)
      - `summary` (text)
      - `analyses_summary` (text)
      - `success_evaluation` (text)
      - `audio_url` (text)
      - `positivity` (integer)
      - `emotion` (text)
      - `clarity` (integer)
      - `relevance_responses` (integer)
      - `goal_achievement` (integer)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `phone_call_records` table
    - Add policy for authenticated users to read their own records
    - Add policy for service role to manage all records
*/

CREATE TABLE IF NOT EXISTS phone_call_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  caller_name text NOT NULL,
  caller_number text NOT NULL,
  call_duration text NOT NULL,
  transcript text NOT NULL,
  summary text,
  analyses_summary text,
  success_evaluation text,
  audio_url text,
  positivity integer,
  emotion text,
  clarity integer,
  relevance_responses integer,
  goal_achievement integer,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
);

-- Enable Row Level Security
ALTER TABLE phone_call_records ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own call records"
  ON phone_call_records
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all call records"
  ON phone_call_records
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Add some sample data
INSERT INTO phone_call_records (
  caller_name, 
  caller_number, 
  call_duration, 
  transcript, 
  summary, 
  analyses_summary, 
  success_evaluation, 
  audio_url, 
  positivity, 
  emotion, 
  clarity, 
  relevance_responses, 
  goal_achievement, 
  user_id
) VALUES 
(
  'John Smith',
  '+1 (555) 123-4567',
  '3m 45s',
  'Caller: Hi, I''m calling about my recent order #A12345.\nAgent: Hello John, I''d be happy to help you with your order. Let me check the status for you.\nCaller: Great, thank you.\nAgent: I can see that your order has been shipped and is expected to arrive tomorrow by 5 PM.\nCaller: That''s perfect, thank you for the information.\nAgent: Is there anything else I can help you with today?\nCaller: No, that''s all I needed. Thank you.\nAgent: You''re welcome. Have a great day!',
  'Customer called to inquire about order #A12345. Agent confirmed the order has been shipped and will arrive tomorrow by 5 PM. Customer was satisfied with the information.',
  'The call was handled efficiently with a positive outcome. The agent provided clear information and resolved the customer''s query promptly.',
  'Successful - Customer query was fully resolved',
  'https://example.com/audio/call-1.mp3',
  85,
  'Satisfied',
  90,
  95,
  100,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Sarah Johnson',
  '+1 (555) 987-6543',
  '5m 12s',
  'Caller: Hello, I have a question about your services.\nAgent: Hi Sarah, I''d be happy to answer any questions you have. What would you like to know?\nCaller: I''m interested in your premium package, but I''m not sure if it includes international support.\nAgent: Yes, our premium package does include 24/7 international support in over 20 languages.\nCaller: That''s good to know. And what about the pricing?\nAgent: The premium package is $99 per month with a 20% discount if you pay annually.\nCaller: I''ll think about it and get back to you.\nAgent: Sounds good. Feel free to call back anytime if you have more questions.',
  'Customer inquired about the premium package, specifically about international support and pricing. Agent provided the requested information. Customer will consider the offer and decide later.',
  'The call was informative and the agent provided all requested details. The customer seemed interested but not ready to commit immediately.',
  'Partially successful - Information provided but no immediate conversion',
  'https://example.com/audio/call-2.mp3',
  65,
  'Neutral',
  85,
  90,
  70,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Michael Brown',
  '+1 (555) 456-7890',
  '8m 37s',
  'Caller: I''ve been waiting for a response to my support ticket for three days now!\nAgent: I apologize for the delay, Mr. Brown. Let me look into this right away.\nCaller: This is unacceptable. I''m a premium customer.\nAgent: I understand your frustration. Your ticket has been escalated, and our technical team is working on it.\nCaller: When can I expect a resolution?\nAgent: We should have this resolved within the next 24 hours. I''ll personally follow up with you tomorrow.\nCaller: Fine, but I expect this to be fixed by then.\nAgent: I understand. We''ll do our best to resolve this as quickly as possible.',
  'Customer called expressing frustration about an unresolved support ticket. Agent apologized for the delay, escalated the issue, and promised resolution within 24 hours with a personal follow-up.',
  'The call started negatively due to customer frustration. The agent handled the situation professionally, acknowledged the customer''s concerns, and provided a clear timeline for resolution.',
  'Partially successful - Issue not resolved during call but escalation path established',
  'https://example.com/audio/call-3.mp3',
  30,
  'Frustrated',
  75,
  80,
  60,
  (SELECT id FROM auth.users LIMIT 1)
);