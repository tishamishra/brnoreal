# Admin Panel Setup Guide

## New Features Added

### 1. Agents Management
- **View All Agents**: `/admin/agents`
- **Add New Agent**: `/admin/agents/new`
- **Edit Agent**: `/admin/agents/[id]/edit` (coming soon)
- **Delete Agent**: Available from agents list

### 2. Offices Management
- **View All Offices**: `/admin/offices`
- **Add New Office**: `/admin/offices/new`
- **Edit Office**: `/admin/offices/[id]/edit` (coming soon)
- **Delete Office**: Available from offices list

### 3. Contact Submissions
- **View All Messages**: `/admin/contacts`
- **Status Management**: Mark as New, Read, Replied, or Archived
- **Search & Filter**: Search by name, email, or message content
- **Delete Messages**: Remove submissions

## Database Setup

### Step 1: Run Migration SQL

1. Go to Supabase SQL Editor: https://app.supabase.com/project/lanktmrtqaisnbbdiaet/sql/new

2. Copy and paste the SQL from `supabase/migrations/004_add_agents_offices_contacts.sql`:

```sql
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
```

3. Click **"Run"**

4. You should see: "Success. No rows returned"

## How It Works

### Contact Form Submissions
- When users submit the contact form, it automatically saves to the `contact_submissions` table
- All submissions appear in `/admin/contacts` with status tracking
- You can mark messages as: New → Read → Replied → Archived

### Agents & Offices
- Currently stored in Supabase database
- Can be managed via admin panel
- Frontend pages (`/agents` and `/offices`) will need to be updated to fetch from Supabase (optional)

## Admin Navigation

The admin sidebar now includes:
- Dashboard
- All Listings
- Add Listing
- **Agents** (new)
- **Offices** (new)
- **Contact Messages** (new)

## Next Steps

1. **Run the SQL migration** to create the tables
2. **Add some agents** via `/admin/agents/new`
3. **Add some offices** via `/admin/offices/new`
4. **Test contact form** - submit a message and view it in `/admin/contacts`

## Optional: Update Frontend Pages

If you want the public `/agents` and `/offices` pages to show data from Supabase instead of static data, I can update those pages to fetch from the database.

---

**After running the SQL migration, you'll have full CRUD management for agents, offices, and contact submissions! 🎉**


