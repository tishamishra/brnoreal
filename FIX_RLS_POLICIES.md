# Fix Row Level Security (RLS) Policies

## Problem
You're getting an error when trying to create/update/delete listings because RLS policies only allow SELECT (read) operations, not INSERT, UPDATE, or DELETE.

## Solution
Run this SQL in your Supabase SQL Editor to add write permissions.

## Steps

1. Go to your Supabase Dashboard: https://app.supabase.com/project/lanktmrtqaisnbbdiaet/sql/new

2. Copy and paste this SQL:

```sql
-- Add write policies for listings table
-- This allows INSERT, UPDATE, and DELETE operations

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
```

3. Click "Run"

4. You should see: "Success. No rows returned"

5. Try creating a listing again in your admin panel!

## Security Note

⚠️ **For Production**: These policies allow anyone with your API key to write to the database. For better security:

1. **Use Supabase Auth**: Set up proper user authentication
2. **Restrict Policies**: Only allow authenticated admin users to write
3. **Example Secure Policy**:
   ```sql
   CREATE POLICY "Allow authenticated admins to insert"
     ON listings FOR INSERT
     TO authenticated
     WITH CHECK (
       EXISTS (
         SELECT 1 FROM admin_users 
         WHERE admin_users.user_id = auth.uid()
       )
     );
   ```

For now, the public write access is fine for development/testing.

