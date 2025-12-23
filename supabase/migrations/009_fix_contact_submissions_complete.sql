-- Complete fix for contact_submissions table
-- This ensures the table has all required columns and policies

-- Step 1: Add listing_id column if it doesn't exist
ALTER TABLE contact_submissions
ADD COLUMN IF NOT EXISTS listing_id UUID REFERENCES listings(id) ON DELETE SET NULL;

-- Step 2: Create index for listing_id if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_contact_submissions_listing_id 
ON contact_submissions(listing_id);

-- Step 3: Drop existing policies to avoid conflicts, then recreate them
DROP POLICY IF EXISTS "Allow public insert on contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow public read on contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow public update on contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow public delete on contact_submissions" ON contact_submissions;

-- Step 4: Recreate all policies
CREATE POLICY "Allow public insert on contact_submissions"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

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

-- Step 5: Verify RLS is enabled
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

