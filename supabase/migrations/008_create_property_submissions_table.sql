-- Create property_submissions table for "List Your Property" form
-- This stores property listing requests from property owners

CREATE TABLE IF NOT EXISTS property_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT NOT NULL,
  property_type TEXT NOT NULL,
  price_expectation TEXT NOT NULL,
  price_bracket TEXT,
  bedrooms TEXT,
  bathrooms TEXT,
  interior_size TEXT,
  description TEXT NOT NULL,
  highlights TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'contacted', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_property_submissions_status ON property_submissions(status);
CREATE INDEX IF NOT EXISTS idx_property_submissions_created_at ON property_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_property_submissions_email ON property_submissions(email);

-- Enable RLS
ALTER TABLE property_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public INSERT (for form submissions)
CREATE POLICY "Allow public insert on property_submissions"
  ON property_submissions FOR INSERT
  WITH CHECK (true);

-- Allow public SELECT (for admin panel)
CREATE POLICY "Allow public read on property_submissions"
  ON property_submissions FOR SELECT
  USING (true);

-- Allow public UPDATE (for admin panel - status updates)
CREATE POLICY "Allow public update on property_submissions"
  ON property_submissions FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow public DELETE (for admin panel)
CREATE POLICY "Allow public delete on property_submissions"
  ON property_submissions FOR DELETE
  USING (true);

-- Add comment
COMMENT ON TABLE property_submissions IS 'Property listing requests submitted through the "List Your Property" form';

