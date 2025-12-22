# Supabase Backend API Information

## Your Backend Base URL

Your Supabase project automatically provides a REST API at:

```
https://lanktmrtqaisnbbdiaet.supabase.co/rest/v1/
```

## API Endpoints

### 1. Listings API

**Get all listings:**
```
GET https://lanktmrtqaisnbbdiaet.supabase.co/rest/v1/listings
```

**Get a specific listing by slug:**
```
GET https://lanktmrtqaisnbbdiaet.supabase.co/rest/v1/listings?slug=eq.masarykova-garden-villa
```

**Filter listings:**
```
GET https://lanktmrtqaisnbbdiaet.supabase.co/rest/v1/listings?category=eq.homes-sale
GET https://lanktmrtqaisnbbdiaet.supabase.co/rest/v1/listings?price_czk=gte.20000000
GET https://lanktmrtqaisnbbdiaet.supabase.co/rest/v1/listings?status=eq.featured
```

### 2. Destinations API (when you add destinations)

```
GET https://lanktmrtqaisnbbdiaet.supabase.co/rest/v1/destinations
```

## Authentication

All API requests require the `apikey` header:

```bash
curl -X GET \
  'https://lanktmrtqaisnbbdiaet.supabase.co/rest/v1/listings' \
  -H 'apikey: sb_publishable_lUUkt1qOrcBdyqFmxkVBsQ_4QfYfBv6' \
  -H 'Authorization: Bearer sb_publishable_lUUkt1qOrcBdyqFmxkVBsQ_4QfYfBv6'
```

## Access Your Backend

### Option 1: Supabase Dashboard (Recommended for Management)
- **URL**: https://app.supabase.com/project/lanktmrtqaisnbbdiaet
- **Features**:
  - Table Editor (view/edit data)
  - SQL Editor (run queries)
  - API Documentation
  - Authentication settings
  - Storage management

### Option 2: REST API (For Programmatic Access)
- **Base URL**: `https://lanktmrtqaisnbbdiaet.supabase.co/rest/v1/`
- **Documentation**: https://supabase.com/docs/reference/javascript/introduction

### Option 3: Test API in Browser
You can test the API directly in your browser or using tools like:
- Postman
- Insomnia
- curl
- Browser DevTools

## Example: Test API in Browser Console

Open your browser console and run:

```javascript
fetch('https://lanktmrtqaisnbbdiaet.supabase.co/rest/v1/listings', {
  headers: {
    'apikey': 'sb_publishable_lUUkt1qOrcBdyqFmxkVBsQ_4QfYfBv6',
    'Authorization': 'Bearer sb_publishable_lUUkt1qOrcBdyqFmxkVBsQ_4QfYfBv6'
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

## Your Next.js App Already Uses This

Your app is already configured to use this backend! The Supabase client library (`@supabase/supabase-js`) automatically handles all API calls using:
- **URL**: `https://lanktmrtqaisnbbdiaet.supabase.co`
- **Key**: `sb_publishable_lUUkt1qOrcBdyqFmxkVBsQ_4QfYfBv6`

No additional backend setup needed! 🎉

