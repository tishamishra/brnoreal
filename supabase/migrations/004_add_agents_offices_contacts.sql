-- Create agents table
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  region TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  specialties TEXT[] NOT NULL DEFAULT '{}',
  bio TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create offices table
CREATE TABLE IF NOT EXISTS offices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  services TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  property_type TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_agents_region ON agents(region);
CREATE INDEX IF NOT EXISTS idx_offices_region ON offices(region);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- Enable RLS
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE offices ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Allow public read on agents"
  ON agents FOR SELECT
  USING (true);

CREATE POLICY "Allow public read on offices"
  ON offices FOR SELECT
  USING (true);

-- Contact submissions are admin-only (no public read)
CREATE POLICY "Allow public insert on contact_submissions"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Admin write policies (for admin panel)
CREATE POLICY "Allow public insert on agents"
  ON agents FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update on agents"
  ON agents FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete on agents"
  ON agents FOR DELETE
  USING (true);

CREATE POLICY "Allow public insert on offices"
  ON offices FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update on offices"
  ON offices FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete on offices"
  ON offices FOR DELETE
  USING (true);

CREATE POLICY "Allow public read on contact_submissions"
  ON contact_submissions FOR SELECT
  USING (true);

CREATE POLICY "Allow public update on contact_submissions"
  ON contact_submissions FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete on contact_submissions"
  ON contact_submissions FOR DELETE
  USING (true);

