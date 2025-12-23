-- Add listing_id column to contact_submissions table
-- This allows contact forms on property pages to reference the listing

-- Add the column if it doesn't exist
ALTER TABLE contact_submissions
ADD COLUMN IF NOT EXISTS listing_id UUID REFERENCES listings(id) ON DELETE SET NULL;

-- Create an index for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_listing_id 
ON contact_submissions(listing_id);

-- Add a comment to document the column
COMMENT ON COLUMN contact_submissions.listing_id IS 'Optional reference to the listing this contact submission is about';

