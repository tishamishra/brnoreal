-- Add agent_id column to listings table
ALTER TABLE listings 
ADD COLUMN IF NOT EXISTS agent_id UUID REFERENCES agents(id) ON DELETE SET NULL;

-- Create index for agent_id
CREATE INDEX IF NOT EXISTS idx_listings_agent_id ON listings(agent_id);

-- Add comment
COMMENT ON COLUMN listings.agent_id IS 'Foreign key reference to the agent assigned to this listing';

-- Add listing_id column to contact_submissions table
ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS listing_id TEXT;

-- Create index for listing_id
CREATE INDEX IF NOT EXISTS idx_contact_submissions_listing_id ON contact_submissions(listing_id);

-- Add comment
COMMENT ON COLUMN contact_submissions.listing_id IS 'Reference to the listing ID if this submission is related to a specific property';

