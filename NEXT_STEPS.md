# 🎉 Your Supabase Backend is Live!

## ✅ What's Been Completed

1. **Supabase Backend Setup**
   - ✅ Database schema created (listings table)
   - ✅ Row Level Security (RLS) policies configured
   - ✅ 8 sample property listings inserted
   - ✅ Next.js app connected to Supabase
   - ✅ Automatic fallback to static data if Supabase is unavailable

2. **Backend URLs**
   - **Dashboard**: https://app.supabase.com/project/lanktmrtqaisnbbdiaet
   - **REST API**: https://lanktmrtqaisnbbdiaet.supabase.co/rest/v1/
   - **Test Page**: http://localhost:3000/api-test

## 🚀 Next Steps

### 1. Verify Everything Works

Visit your website and check:
- **Homepage**: http://localhost:3000
  - Featured properties should load from Supabase
  - All listings should display correctly

- **Listings Page**: http://localhost:3000/listings/category/homes-sale
  - Filters should work
  - Properties should load from database

- **API Test Page**: http://localhost:3000/api-test
  - Should show "8 total listings"

### 2. Manage Your Listings

#### Option A: Via Supabase Dashboard (Easiest)
1. Go to: https://app.supabase.com/project/lanktmrtqaisnbbdiaet
2. Click **"Table Editor"** → **"listings"**
3. You can:
   - **Add new listings**: Click "Insert row"
   - **Edit listings**: Click on any row
   - **Delete listings**: Click the trash icon
   - **Filter/Search**: Use the search bar

#### Option B: Via SQL Editor
1. Go to **"SQL Editor"** in Supabase
2. Write queries like:
   ```sql
   -- Get all listings
   SELECT * FROM listings;
   
   -- Add a new listing
   INSERT INTO listings (title, slug, location, ...) VALUES (...);
   
   -- Update a listing
   UPDATE listings SET price_czk = 30000000 WHERE slug = 'masarykova-garden-villa';
   
   -- Delete a listing
   DELETE FROM listings WHERE slug = 'some-slug';
   ```

### 3. Add More Listings

You can add listings in two ways:

**Via Supabase Dashboard:**
1. Table Editor → listings → "Insert row"
2. Fill in all required fields
3. Click "Save"

**Via SQL:**
```sql
INSERT INTO listings (
  title, slug, location, location_value, category, property_type,
  price_czk, beds, baths, area_sqm, description, highlights, status,
  image, coordinates, postal_code, street_address, features
) VALUES (
  'Your Property Title',
  'your-property-slug',
  'Location Name',
  'location-value',
  'homes-sale',  -- or homes-rent, commercial-sale, etc.
  'villa',       -- or townhouse, loft, penthouse, etc.
  25000000,     -- price in CZK
  4,            -- bedrooms
  3.5,          -- bathrooms
  350,          -- area in sqm
  'Property description here...',
  ARRAY['Feature 1', 'Feature 2', 'Feature 3'],
  'featured',   -- or 'new', 'sold', or NULL
  'https://your-image-url.com/image.jpg',
  ARRAY[49.195, 16.607],  -- [latitude, longitude]
  '602 00',     -- postal code
  'Street Address',
  ARRAY['Terrace', 'Garden', 'Parking']
);
```

### 4. Upload Property Images

Currently, listings use external URLs (Unsplash). To use your own images:

1. **Option A: Use Supabase Storage** (Recommended)
   - Go to Supabase → **Storage**
   - Create a bucket called `property-images`
   - Upload images
   - Get the public URL
   - Update the `image` field in listings

2. **Option B: Use External Hosting**
   - Upload to Cloudinary, AWS S3, or any image hosting
   - Use the URL in the `image` field

### 5. Build an Admin Panel (Future)

You can create a custom admin interface for managing listings:
- Add/edit/delete listings
- Upload images
- Manage categories
- View analytics

This would be a separate admin route in your Next.js app.

## 📊 Current Database Structure

### Listings Table
- `id` (UUID) - Auto-generated
- `title` (Text) - Property title
- `slug` (Text) - URL-friendly identifier (unique)
- `location` (Text) - Display location name
- `location_value` (Text) - Filter value
- `category` (Text) - homes-sale, homes-rent, commercial-sale, etc.
- `property_type` (Text) - villa, townhouse, loft, etc.
- `price_czk` (BigInt) - Price in Czech Koruna
- `beds` (Integer) - Number of bedrooms
- `baths` (Numeric) - Number of bathrooms
- `area_sqm` (Integer) - Area in square meters
- `description` (Text) - Full description
- `highlights` (Text[]) - Array of highlight features
- `status` (Text) - featured, new, sold, or NULL
- `image` (Text) - Image URL
- `coordinates` (Numeric[]) - [latitude, longitude]
- `postal_code` (Text) - Postal code
- `street_address` (Text) - Street address
- `features` (Text[]) - Array of property features
- `created_at` (Timestamp) - Auto-generated
- `updated_at` (Timestamp) - Auto-updated

## 🔒 Security Notes

- ✅ Row Level Security (RLS) is enabled
- ✅ Public read access is allowed (anyone can view listings)
- ✅ Write access should be restricted (only admins should add/edit)
- ⚠️ Currently, anyone with your API key can write - consider adding authentication for admin operations

## 🎯 Quick Commands

```bash
# Start dev server
npm run dev

# View your app
open http://localhost:3000

# Test API connection
open http://localhost:3000/api-test

# Access Supabase dashboard
open https://app.supabase.com/project/lanktmrtqaisnbbdiaet
```

## 📝 Tips

1. **Always use unique slugs** - They're used in URLs
2. **Keep coordinates accurate** - Used for maps/location features
3. **Use featured status wisely** - Only mark your best properties
4. **Regular backups** - Supabase has automatic backups, but you can export data via SQL Editor
5. **Monitor usage** - Check Supabase dashboard for API usage and database size

## 🆘 Troubleshooting

- **Listings not showing?** Check RLS policies in Supabase
- **Connection errors?** Verify `.env.local` has correct keys
- **Images not loading?** Check image URLs are accessible
- **Need help?** Check Supabase logs in dashboard → Logs

---

**Your backend is ready! 🚀 Start adding your real property listings now!**

