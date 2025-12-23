-- Fix RLS Policies for All Tables
-- This ensures all tables have proper read/write policies

-- ============================================
-- LISTINGS TABLE
-- ============================================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access on listings" ON listings;
DROP POLICY IF EXISTS "Allow public insert on listings" ON listings;
DROP POLICY IF EXISTS "Allow public update on listings" ON listings;
DROP POLICY IF EXISTS "Allow public delete on listings" ON listings;

-- Create SELECT policy (public read)
CREATE POLICY "Allow public read access on listings"
  ON listings FOR SELECT
  USING (true);

-- Create INSERT policy (for admin panel)
CREATE POLICY "Allow public insert on listings"
  ON listings FOR INSERT
  WITH CHECK (true);

-- Create UPDATE policy (for admin panel)
CREATE POLICY "Allow public update on listings"
  ON listings FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create DELETE policy (for admin panel)
CREATE POLICY "Allow public delete on listings"
  ON listings FOR DELETE
  USING (true);

-- ============================================
-- AGENTS TABLE
-- ============================================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read on agents" ON agents;
DROP POLICY IF EXISTS "Allow public read access on agents" ON agents;
DROP POLICY IF EXISTS "Allow public insert on agents" ON agents;
DROP POLICY IF EXISTS "Allow public update on agents" ON agents;
DROP POLICY IF EXISTS "Allow public delete on agents" ON agents;

-- Create SELECT policy (public read)
CREATE POLICY "Allow public read on agents"
  ON agents FOR SELECT
  USING (true);

-- Create INSERT policy (for admin panel)
CREATE POLICY "Allow public insert on agents"
  ON agents FOR INSERT
  WITH CHECK (true);

-- Create UPDATE policy (for admin panel)
CREATE POLICY "Allow public update on agents"
  ON agents FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create DELETE policy (for admin panel)
CREATE POLICY "Allow public delete on agents"
  ON agents FOR DELETE
  USING (true);

-- ============================================
-- OFFICES TABLE
-- ============================================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read on offices" ON offices;
DROP POLICY IF EXISTS "Allow public read access on offices" ON offices;
DROP POLICY IF EXISTS "Allow public insert on offices" ON offices;
DROP POLICY IF EXISTS "Allow public update on offices" ON offices;
DROP POLICY IF EXISTS "Allow public delete on offices" ON offices;

-- Create SELECT policy (public read)
CREATE POLICY "Allow public read on offices"
  ON offices FOR SELECT
  USING (true);

-- Create INSERT policy (for admin panel)
CREATE POLICY "Allow public insert on offices"
  ON offices FOR INSERT
  WITH CHECK (true);

-- Create UPDATE policy (for admin panel)
CREATE POLICY "Allow public update on offices"
  ON offices FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create DELETE policy (for admin panel)
CREATE POLICY "Allow public delete on offices"
  ON offices FOR DELETE
  USING (true);

-- ============================================
-- CONTACT_SUBMISSIONS TABLE
-- ============================================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public insert on contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow public read on contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow public update on contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow public delete on contact_submissions" ON contact_submissions;

-- Create INSERT policy (for contact forms - public can submit)
CREATE POLICY "Allow public insert on contact_submissions"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Create SELECT policy (for admin panel - read only)
CREATE POLICY "Allow public read on contact_submissions"
  ON contact_submissions FOR SELECT
  USING (true);

-- Create UPDATE policy (for admin panel - mark as read/replied)
CREATE POLICY "Allow public update on contact_submissions"
  ON contact_submissions FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create DELETE policy (for admin panel)
CREATE POLICY "Allow public delete on contact_submissions"
  ON contact_submissions FOR DELETE
  USING (true);

-- ============================================
-- DESTINATIONS TABLE
-- ============================================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access on destinations" ON destinations;
DROP POLICY IF EXISTS "Allow public insert on destinations" ON destinations;
DROP POLICY IF EXISTS "Allow public update on destinations" ON destinations;
DROP POLICY IF EXISTS "Allow public delete on destinations" ON destinations;

-- Create SELECT policy (public read)
CREATE POLICY "Allow public read access on destinations"
  ON destinations FOR SELECT
  USING (true);

-- Create INSERT policy (for admin panel)
CREATE POLICY "Allow public insert on destinations"
  ON destinations FOR INSERT
  WITH CHECK (true);

-- Create UPDATE policy (for admin panel)
CREATE POLICY "Allow public update on destinations"
  ON destinations FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create DELETE policy (for admin panel)
CREATE POLICY "Allow public delete on destinations"
  ON destinations FOR DELETE
  USING (true);

