/*
  # Create Form Submission Tables

  1. New Tables
    - `schedule_call_submissions` - Stores all "schedule a call" form submissions
    - `contact_form_submissions` - Stores all contact form submissions
    - `custom_automation_requests` - Stores custom automation configuration requests
    - `website_design_requests` - Stores website design requests
    - `website_offer_claims` - Stores claims for the special website offer
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated and anonymous users
    - Add foreign key constraints to user_id
  
  3. Triggers
    - Add update timestamp triggers for all tables
*/

-- Create trigger functions for updating timestamps
CREATE OR REPLACE FUNCTION update_schedule_call_submissions_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_contact_form_submissions_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_custom_automation_requests_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_website_design_requests_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_website_offer_claims_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create schedule_call_submissions table
CREATE TABLE IF NOT EXISTS schedule_call_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  solution_type text,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on schedule_call_submissions
ALTER TABLE schedule_call_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for schedule_call_submissions
CREATE POLICY "Anonymous users can submit schedule call requests" 
  ON schedule_call_submissions 
  FOR INSERT 
  TO anon 
  WITH CHECK (user_id IS NULL);

CREATE POLICY "Users can insert their own schedule call requests" 
  ON schedule_call_submissions 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (uid() = user_id);

CREATE POLICY "Users can view their own schedule call requests" 
  ON schedule_call_submissions 
  FOR SELECT 
  TO authenticated 
  USING (uid() = user_id);

CREATE POLICY "Service role can manage all schedule call requests" 
  ON schedule_call_submissions 
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

-- Create trigger for schedule_call_submissions
CREATE TRIGGER update_schedule_call_submissions_timestamp
  BEFORE UPDATE ON schedule_call_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_schedule_call_submissions_timestamp();

-- Create index for schedule_call_submissions
CREATE INDEX idx_schedule_call_submissions_user_id ON schedule_call_submissions(user_id);
CREATE INDEX idx_schedule_call_submissions_status ON schedule_call_submissions(status);

-- Create contact_form_submissions table
CREATE TABLE IF NOT EXISTS contact_form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  admin_notes text,
  admin_response text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on contact_form_submissions
ALTER TABLE contact_form_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for contact_form_submissions
CREATE POLICY "Anonymous users can submit contact forms" 
  ON contact_form_submissions 
  FOR INSERT 
  TO anon 
  WITH CHECK (user_id IS NULL);

CREATE POLICY "Users can insert their own contact forms" 
  ON contact_form_submissions 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (uid() = user_id);

CREATE POLICY "Users can view their own contact forms" 
  ON contact_form_submissions 
  FOR SELECT 
  TO authenticated 
  USING (uid() = user_id);

CREATE POLICY "Service role can manage all contact forms" 
  ON contact_form_submissions 
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

-- Create trigger for contact_form_submissions
CREATE TRIGGER update_contact_form_submissions_timestamp
  BEFORE UPDATE ON contact_form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_contact_form_submissions_timestamp();

-- Create index for contact_form_submissions
CREATE INDEX idx_contact_form_submissions_user_id ON contact_form_submissions(user_id);
CREATE INDEX idx_contact_form_submissions_status ON contact_form_submissions(status);

-- Create custom_automation_requests table
CREATE TABLE IF NOT EXISTS custom_automation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  system_description text NOT NULL,
  current_systems jsonb DEFAULT '[]'::jsonb NOT NULL,
  requirements jsonb DEFAULT '[]'::jsonb NOT NULL,
  industry text NOT NULL,
  timeline text NOT NULL,
  budget integer NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  status text NOT NULL DEFAULT 'pending',
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on custom_automation_requests
ALTER TABLE custom_automation_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for custom_automation_requests
CREATE POLICY "Anonymous users can submit automation requests" 
  ON custom_automation_requests 
  FOR INSERT 
  TO anon 
  WITH CHECK (user_id IS NULL);

CREATE POLICY "Users can insert their own automation requests" 
  ON custom_automation_requests 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (uid() = user_id);

CREATE POLICY "Users can view their own automation requests" 
  ON custom_automation_requests 
  FOR SELECT 
  TO authenticated 
  USING (uid() = user_id);

CREATE POLICY "Service role can manage all automation requests" 
  ON custom_automation_requests 
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

-- Create trigger for custom_automation_requests
CREATE TRIGGER update_custom_automation_requests_timestamp
  BEFORE UPDATE ON custom_automation_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_custom_automation_requests_timestamp();

-- Create index for custom_automation_requests
CREATE INDEX idx_custom_automation_requests_user_id ON custom_automation_requests(user_id);
CREATE INDEX idx_custom_automation_requests_status ON custom_automation_requests(status);

-- Create website_design_requests table
CREATE TABLE IF NOT EXISTS website_design_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  website_type text NOT NULL,
  features jsonb DEFAULT '[]'::jsonb NOT NULL,
  budget integer NOT NULL,
  timeline text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'pending',
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on website_design_requests
ALTER TABLE website_design_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for website_design_requests
CREATE POLICY "Anonymous users can submit website design requests" 
  ON website_design_requests 
  FOR INSERT 
  TO anon 
  WITH CHECK (user_id IS NULL);

CREATE POLICY "Users can insert their own website design requests" 
  ON website_design_requests 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (uid() = user_id);

CREATE POLICY "Users can view their own website design requests" 
  ON website_design_requests 
  FOR SELECT 
  TO authenticated 
  USING (uid() = user_id);

CREATE POLICY "Service role can manage all website design requests" 
  ON website_design_requests 
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

-- Create trigger for website_design_requests
CREATE TRIGGER update_website_design_requests_timestamp
  BEFORE UPDATE ON website_design_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_website_design_requests_timestamp();

-- Create index for website_design_requests
CREATE INDEX idx_website_design_requests_user_id ON website_design_requests(user_id);
CREATE INDEX idx_website_design_requests_status ON website_design_requests(status);

-- Create website_offer_claims table
CREATE TABLE IF NOT EXISTS website_offer_claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  message text,
  status text NOT NULL DEFAULT 'pending',
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on website_offer_claims
ALTER TABLE website_offer_claims ENABLE ROW LEVEL SECURITY;

-- Create policies for website_offer_claims
CREATE POLICY "Anonymous users can submit offer claims" 
  ON website_offer_claims 
  FOR INSERT 
  TO anon 
  WITH CHECK (user_id IS NULL);

CREATE POLICY "Users can insert their own offer claims" 
  ON website_offer_claims 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (uid() = user_id);

CREATE POLICY "Users can view their own offer claims" 
  ON website_offer_claims 
  FOR SELECT 
  TO authenticated 
  USING (uid() = user_id);

CREATE POLICY "Service role can manage all offer claims" 
  ON website_offer_claims 
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

-- Create trigger for website_offer_claims
CREATE TRIGGER update_website_offer_claims_timestamp
  BEFORE UPDATE ON website_offer_claims
  FOR EACH ROW
  EXECUTE FUNCTION update_website_offer_claims_timestamp();

-- Create index for website_offer_claims
CREATE INDEX idx_website_offer_claims_user_id ON website_offer_claims(user_id);
CREATE INDEX idx_website_offer_claims_status ON website_offer_claims(status);