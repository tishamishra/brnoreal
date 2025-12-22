# Internationalization (i18n) & SEO Guide

## Current Setup
Your website currently uses **client-side language switching** with localStorage. This works for users but is **not SEO-friendly** because:
- Search engines see only one language version
- No separate URLs for each language
- No hreflang tags for language alternatives
- No location-based detection

## Recommended Approach: URL-Based Routing

### Option 1: Subdirectory Routing (Recommended)
- English: `https://brnorealestate.com/en/` (or `/` as default)
- Czech: `https://brnorealestate.com/cs/`

**Benefits:**
- ✅ SEO-friendly (separate URLs for each language)
- ✅ Easy to implement
- ✅ Clear language indication in URL
- ✅ Works with Next.js App Router

### Option 2: Subdomain Routing
- English: `https://en.brnorealestate.com/`
- Czech: `https://cs.brnorealestate.com/` or `https://brnorealestate.com/`

**Benefits:**
- ✅ Very SEO-friendly
- ❌ Requires DNS configuration
- ❌ More complex setup

## Implementation Plan

### Step 1: Restructure App Directory
```
src/app/
  [locale]/          # Dynamic locale segment
    page.tsx         # Homepage
    listings/
    contact/
    ...
```

### Step 2: Create Middleware for:
1. **Location Detection** - Detect user's country from IP/headers
2. **Language Redirect** - Redirect Czech users to `/cs/`, others to `/en/`
3. **Locale Parsing** - Extract locale from URL

### Step 3: Add SEO Elements:
1. **Hreflang Tags** - Tell search engines about language alternatives
2. **Metadata per Language** - Different titles/descriptions per language
3. **Canonical URLs** - Prevent duplicate content issues

### Step 4: Update Sitemap
- Generate separate sitemap entries for each language
- Include hreflang information
- Current sitemap uses: `https://brnorealestate.com`

## Location-Based Detection Strategy

### Method 1: Browser Language (Client-Side)
- Detect `navigator.language`
- Redirect on first visit
- Store preference in cookie/localStorage

### Method 2: IP Geolocation (Server-Side)
- Use services like Cloudflare, Vercel Edge, or MaxMind
- Detect country from request headers
- Redirect Czech Republic users to `/cs/`

### Method 3: Hybrid Approach (Recommended)
1. **First Visit:**
   - Check browser language
   - Check IP geolocation (if available)
   - Default to English if uncertain
   - Store preference in cookie

2. **Subsequent Visits:**
   - Use stored preference
   - Allow manual override via language switcher

## SEO Requirements

### 1. Hreflang Tags
```html
<link rel="alternate" hreflang="en" href="https://brnorealestate.com/en/" />
<link rel="alternate" hreflang="cs" href="https://brnorealestate.com/cs/" />
<link rel="alternate" hreflang="x-default" href="https://brnorealestate.com/en/" />
```

### 2. Language-Specific Metadata
- Different titles and descriptions per language
- Proper `lang` attribute on `<html>` tag
- Language-specific Open Graph tags

### 3. Sitemap Updates
- Include all language versions
- Add hreflang information

## Implementation Complexity

**Current Setup:** Client-side only (localStorage)
**Recommended:** URL-based routing with middleware

**Estimated Changes:**
- Restructure app directory (medium effort)
- Create middleware (medium effort)
- Update all links/navigation (high effort)
- Add SEO metadata (low effort)

## Quick Start Option

If you want a **quick solution** without major restructuring:

1. Keep current client-side switching
2. Add hreflang tags (but they won't be fully effective without separate URLs)
3. Add location detection on homepage
4. Use query parameter: `?lang=cs` or `?lang=en`

**Note:** This is less SEO-optimal but easier to implement.

## Recommendation

For **best SEO results**, implement **Option 1 (Subdirectory Routing)** with:
- `/en/` for English (or `/` as default)
- `/cs/` for Czech
- Middleware for location detection
- Full hreflang implementation

Would you like me to implement the full URL-based routing solution, or start with a simpler approach?

