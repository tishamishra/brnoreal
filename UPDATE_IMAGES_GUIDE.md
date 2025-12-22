# Update Property Images Guide

## Problem Fixed
1. ✅ **Black Images**: Fixed missing Image component in listing cards
2. ✅ **Image URLs**: Created SQL script to update all property images

## Steps to Update Images

### Step 1: Run SQL Update Script

1. Go to Supabase SQL Editor: https://app.supabase.com/project/lanktmrtqaisnbbdiaet/sql/new

2. Copy and paste this SQL:

```sql
-- Update all property images with fresh, working Unsplash URLs
UPDATE listings
SET image = CASE slug
  WHEN 'masarykova-garden-villa' THEN 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
  WHEN 'svratka-riverside-loft' THEN 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
  WHEN 'kralovo-pole-skyline-residence' THEN 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80'
  WHEN 'zabovresky-townhouse' THEN 'https://images.unsplash.com/photo-1600566753190-17f0baa2a74c?auto=format&fit=crop&w=1200&q=80'
  WHEN 'vinohrady-design-penthouse' THEN 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
  WHEN 'spilberk-investment-palace' THEN 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  WHEN 'olomouc-heritage-residence' THEN 'https://images.unsplash.com/photo-1600607688969-a5fcd326165d?auto=format&fit=crop&w=1200&q=80'
  WHEN 'brno-tech-campus-lofts' THEN 'https://images.unsplash.com/photo-1600607688787-1c67f31ac874?auto=format&fit=crop&w=1200&q=80'
  ELSE 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
END
WHERE slug IN (
  'masarykova-garden-villa',
  'svratka-riverside-loft',
  'kralovo-pole-skyline-residence',
  'zabovresky-townhouse',
  'vinohrady-design-penthouse',
  'spilberk-investment-palace',
  'olomouc-heritage-residence',
  'brno-tech-campus-lofts'
);
```

3. Click **"Run"**

4. You should see: "Success. 8 rows updated"

### Step 2: Restart Dev Server

After updating images, restart your dev server to see changes:

```bash
# Stop server (Ctrl+C)
npm run dev
```

### Step 3: Verify Images

1. Visit homepage: http://localhost:3000
2. Check featured properties section - images should now display
3. Visit listings page: http://localhost:3000/listings/category/homes-sale
4. All property cards should show images instead of black boxes

## What Was Fixed

### 1. Black Image Issue
- **Problem**: `listing-card.tsx` was missing the `Image` component
- **Fix**: Added Next.js `Image` component to display property images
- **Result**: Images now display properly in all listing cards

### 2. Image URLs
- **Problem**: Some image URLs might be broken or outdated
- **Fix**: Created SQL script with fresh, working Unsplash URLs
- **Result**: All properties have high-quality, working images

## Image URLs Used

All images are from Unsplash and are optimized:
- High quality (q=80)
- Proper sizing (w=1200)
- Auto format
- Crop fit

## Adding Your Own Images

When adding new listings via admin panel:
1. Use full image URLs (https://...)
2. Recommended: Use Unsplash, Cloudinary, or your own hosting
3. Format: `https://images.unsplash.com/photo-XXXXX?auto=format&fit=crop&w=1200&q=80`

## Troubleshooting

### Images Still Black?
1. Check browser console for image errors
2. Verify image URLs are accessible
3. Clear browser cache
4. Restart dev server

### Images Not Loading?
1. Check `next.config.ts` has Unsplash in `remotePatterns`
2. Verify image URLs are full (https://...)
3. Check Supabase table has updated image URLs

### Need Different Images?
- Find property images on Unsplash: https://unsplash.com/s/photos/luxury-home
- Copy image URL
- Update in Supabase Table Editor or via SQL

---

**After running the SQL update, all property images should display correctly! 🎉**

