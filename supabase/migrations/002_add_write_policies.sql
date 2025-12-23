-- Add write policies for listings table
-- This allows INSERT, UPDATE, and DELETE operations
-- Note: In production, you should restrict these to authenticated users only

-- Allow public INSERT (for admin panel)
CREATE POLICY "Allow public insert on listings"
  ON listings FOR INSERT
  WITH CHECK (true);

-- Allow public UPDATE (for admin panel)
CREATE POLICY "Allow public update on listings"
  ON listings FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow public DELETE (for admin panel)
CREATE POLICY "Allow public delete on listings"
  ON listings FOR DELETE
  USING (true);


