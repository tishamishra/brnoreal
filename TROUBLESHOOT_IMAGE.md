# Troubleshoot Image Not Displaying

## Issue: Image URL Updated But Not Showing

If you updated an image URL in the admin panel but it's not displaying, try these steps:

### Step 1: Check Browser Console

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Look for errors like:
   - "Failed to load image"
   - "Invalid src prop"
   - "hostname not configured"

### Step 2: Verify Image URL

1. **Check the URL format**:
   - Must start with `https://` (not `http://`)
   - Must be a full URL (not relative path)
   - Example: `https://images.unsplash.com/photo-1234567890`

2. **Test the URL directly**:
   - Copy the image URL from Supabase
   - Paste it in a new browser tab
   - If it doesn't load, the URL is broken

### Step 3: Check Domain is Allowed

If the image is from a new domain, add it to `next.config.ts`:

```typescript
{
  protocol: "https",
  hostname: "your-image-domain.com",
}
```

Then **restart the dev server**.

### Step 4: Clear Caches

1. **Browser Cache**:
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or clear browser cache completely

2. **Next.js Image Cache**:
   - Stop dev server
   - Delete `.next` folder: `rm -rf .next`
   - Restart: `npm run dev`

### Step 5: Verify Database Update

1. Go to Supabase Dashboard
2. Table Editor → listings
3. Find "Svratka Riverside Loft"
4. Check the `image` field has the correct URL
5. Make sure there are no extra spaces or characters

### Step 6: Check Image URL in Database

Run this SQL to see the current image URL:

```sql
SELECT slug, title, image 
FROM listings 
WHERE slug = 'svratka-riverside-loft';
```

### Common Issues

1. **URL has spaces**: Remove any spaces before/after URL
2. **Wrong protocol**: Must be `https://` not `http://`
3. **Domain not allowed**: Add to `next.config.ts`
4. **Broken URL**: Test URL directly in browser
5. **Cache**: Clear browser and Next.js cache

### Quick Fix: Update via SQL

If admin panel update didn't work, update directly via SQL:

```sql
UPDATE listings
SET image = 'YOUR_NEW_IMAGE_URL_HERE'
WHERE slug = 'svratka-riverside-loft';
```

Replace `YOUR_NEW_IMAGE_URL_HERE` with your actual image URL.

### Still Not Working?

1. Check browser console for specific error
2. Verify the image URL works when opened directly
3. Make sure the domain is in `next.config.ts`
4. Clear all caches and restart server

