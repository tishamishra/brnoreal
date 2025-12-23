# Quick Check: Why Image Not Displaying

## Most Common Issues

### 1. Domain Not Allowed
If you used an image from a new domain (not Unsplash), add it to `next.config.ts`:

**Current allowed domains:**
- ✅ `images.unsplash.com`
- ✅ `plus.unsplash.com`
- ✅ `unsplash.com`

**To add a new domain:**
1. Open `next.config.ts`
2. Add the domain:
```typescript
{
  protocol: "https",
  hostname: "your-domain.com",
}
```
3. **Restart dev server** (important!)

### 2. Browser Cache
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Or clear browser cache

### 3. Next.js Cache
```bash
# Stop server
# Delete .next folder
rm -rf .next
# Restart
npm run dev
```

### 4. Check the URL
1. Go to Supabase → Table Editor → listings
2. Find "Svratka Riverside Loft"
3. Check the `image` field:
   - Must start with `https://`
   - No spaces before/after
   - URL should work when opened in browser

### 5. Test the URL
Copy the image URL from Supabase and paste it in a new browser tab. If it doesn't load, the URL is broken.

## Quick Fix

**If you updated via admin panel:**
1. Check browser console (F12) for errors
2. Verify URL in Supabase dashboard
3. Clear browser cache (hard refresh)
4. Restart dev server

**If still not working:**
Share the image URL you're trying to use, and I can help add the domain to the config!


