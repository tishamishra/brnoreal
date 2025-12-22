# Admin Panel Guide

## 🎉 Your Admin Panel is Ready!

You now have a fully functional admin panel to manage your property listings.

## 🔐 Accessing the Admin Panel

### Login
1. Go to: **http://localhost:3000/admin/login**
2. Enter password: `admin123` (default)
3. You'll be redirected to the admin dashboard

### Change Admin Password
Add to your `.env.local` file:
```env
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password-here
```

## 📋 Admin Panel Features

### 1. Dashboard (`/admin`)
- **Overview Stats**: Total listings, featured count, average price
- **Recent Listings**: Quick view of your latest properties
- **Quick Actions**: Add new listing, view all listings

### 2. All Listings (`/admin/listings`)
- **Full Listings Table**: View all properties in one place
- **Search Functionality**: Search by title or location
- **Quick Actions**: Edit or delete any listing
- **Add New**: Button to create new listings

### 3. Add New Listing (`/admin/listings/new`)
- **Complete Form**: All property fields
- **Auto-slug Generation**: Slug auto-generates from title
- **Image URL**: Paste image URLs (or use Supabase Storage later)
- **Coordinates**: Add latitude/longitude for maps
- **Features & Highlights**: Easy comma/line-separated input

### 4. Edit Listing (`/admin/listings/[slug]/edit`)
- **Pre-filled Form**: All existing data loaded
- **Update Any Field**: Modify any property detail
- **Save Changes**: Updates immediately in database

### 5. Delete Listing
- **Confirmation Required**: Prevents accidental deletion
- **Immediate Removal**: Deletes from Supabase database
- **List Refresh**: Table updates automatically

## 🛠️ How to Use

### Adding a New Listing

1. Go to **Dashboard** → Click **"Add New Listing"**
2. Fill in the form:
   - **Title**: Property name (slug auto-generates)
   - **Category**: homes-sale, homes-rent, commercial-sale, etc.
   - **Property Type**: villa, townhouse, loft, etc.
   - **Location**: Display name (e.g., "Brno-střed, Brno")
   - **Location Value**: Filter value (select from dropdown)
   - **Price**: In CZK
   - **Beds/Baths**: Number of bedrooms and bathrooms
   - **Area**: Square meters
   - **Image URL**: Full URL to property image
   - **Description**: Full property description
   - **Highlights**: One per line (e.g., "Panoramic terrace")
   - **Features**: Comma-separated (e.g., "Terrace, Garden, Parking")
3. Click **"Create Listing"**
4. Listing appears immediately on your website!

### Editing a Listing

1. Go to **All Listings** or **Dashboard**
2. Click the **Edit icon** (pencil) next to any listing
3. Modify any fields you want to change
4. Click **"Save Changes"**
5. Changes appear immediately on your website!

### Deleting a Listing

1. Go to **All Listings** or **Dashboard**
2. Click the **Delete icon** (trash) next to any listing
3. Confirm deletion in the popup
4. Listing is removed from database and website

## 🔒 Security Notes

### Current Setup
- **Simple Password Protection**: Session-based authentication
- **No User Management**: Single admin access
- **Session Storage**: Login persists until browser closes

### For Production
Consider upgrading to:
- **Supabase Auth**: Full user authentication system
- **Role-Based Access**: Multiple admin users with different permissions
- **JWT Tokens**: More secure token-based authentication
- **API Rate Limiting**: Prevent abuse

## 📝 Form Fields Guide

### Required Fields (*)
- **Title**: Property name
- **Slug**: URL-friendly identifier (auto-generated)
- **Category**: Property category
- **Property Type**: Type of property
- **Location**: Display location
- **Location Value**: Filter location
- **Price (CZK)**: Property price
- **Area (sqm)**: Property size
- **Image URL**: Property image
- **Description**: Full description

### Optional Fields
- **Bedrooms**: Number of beds
- **Bathrooms**: Number of baths
- **Status**: featured, new, sold, or none
- **Postal Code**: Property postal code
- **Street Address**: Full street address
- **Latitude/Longitude**: For maps
- **Highlights**: Array of key features
- **Features**: Array of property features

## 🎨 Tips

1. **Use Good Images**: High-quality images make listings more attractive
2. **Write Compelling Descriptions**: Detailed descriptions help sell properties
3. **Add All Features**: More features = better search results
4. **Set Featured Status**: Mark your best properties as "featured"
5. **Keep Slugs Unique**: Slugs must be unique (auto-generated helps)

## 🚀 Quick Access

- **Admin Login**: http://localhost:3000/admin/login
- **Dashboard**: http://localhost:3000/admin
- **All Listings**: http://localhost:3000/admin/listings
- **Add New**: http://localhost:3000/admin/listings/new

## 🐛 Troubleshooting

### Can't Login
- Check password is correct (default: `admin123`)
- Clear browser cache and try again
- Check `.env.local` for custom password

### Changes Not Saving
- Check browser console for errors
- Verify Supabase connection
- Check RLS policies allow updates

### Images Not Showing
- Verify image URLs are accessible
- Check URLs are full (https://...)
- Try different image hosting

### Delete Not Working
- Check browser console for errors
- Verify you have delete permissions
- Check Supabase RLS policies

---

**Your admin panel is fully functional! Start managing your listings now! 🎉**

