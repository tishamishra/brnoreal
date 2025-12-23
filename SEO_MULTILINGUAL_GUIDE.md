# Multilingual SEO Guide for Brno Real Estate

## Overview

Your website supports two languages:
- **English (EN)**: `/en/*`
- **Czech (CS)**: `/cs/*`

## Current SEO Implementation ✅

### 1. **Single Combined Sitemap** (Recommended Approach)

Your sitemap (`/sitemap.xml`) includes **both languages in one file**. This is the **recommended approach** by Google.

**Location**: `https://www.brnorealestate.com/sitemap.xml`

**What it includes**:
- All English pages (`/en/*`)
- All Czech pages (`/cs/*`)
- Listings, categories, destinations, blog posts for both languages
- Proper priorities and change frequencies

**Why one sitemap is better**:
- ✅ Easier to manage
- ✅ Google prefers consolidated sitemaps
- ✅ Single submission point
- ✅ Better crawl efficiency

### 2. **Hreflang Tags** (Language Alternates)

Your site uses hreflang tags to tell search engines about language versions:

**In `<head>` section**:
```html
<link rel="alternate" hreflang="en" href="https://www.brnorealestate.com/en" />
<link rel="alternate" hreflang="cs" href="https://www.brnorealestate.com/cs" />
<link rel="alternate" hreflang="x-default" href="https://www.brnorealestate.com/en" />
```

**What this does**:
- Tells Google: "This page has an English version and a Czech version"
- `x-default` = Default language (English) for users whose language isn't supported
- Helps Google show the right language version to users

### 3. **Canonical URLs**

Each page has a canonical URL pointing to itself:
- English page: `canonical: https://www.brnorealestate.com/en/...`
- Czech page: `canonical: https://www.brnorealestate.com/cs/...`

This prevents duplicate content issues.

## How to Submit Your Sitemap to Google

### Step 1: Access Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property:
   - **Primary domain**: `www.brnorealestate.com`
   - **Verify ownership** (via DNS, HTML file, or Google Analytics)

### Step 2: Submit Your Sitemap

1. In Google Search Console, go to **Sitemaps** (left sidebar)
2. Enter your sitemap URL:
   ```
   https://www.brnorealestate.com/sitemap.xml
   ```
3. Click **Submit**

**That's it!** You only need to submit **one sitemap** - it contains both languages.

### Step 3: Verify Submission

- Google will show "Success" status
- It may take a few days to process all URLs
- Check the "Coverage" report to see indexed pages

## Additional Search Engines

### Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site: `www.brnorealestate.com`
3. Submit sitemap: `https://www.brnorealestate.com/sitemap.xml`

### Yandex (for Eastern Europe)

1. Go to [Yandex Webmaster](https://webmaster.yandex.com)
2. Add your site
3. Submit sitemap: `https://www.brnorealestate.com/sitemap.xml`

## Best Practices for Multilingual SEO

### ✅ What You're Already Doing Right

1. **URL Structure**: Clean language prefixes (`/en/`, `/cs/`)
2. **Hreflang Tags**: Properly implemented in HTML
3. **Canonical URLs**: Each page has its own canonical
4. **Separate Content**: Different titles/descriptions per language
5. **Single Sitemap**: Combined sitemap with all languages

### 🔧 Additional Recommendations

#### 1. **robots.txt** (Optional Enhancement)

Create `/public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://www.brnorealestate.com/sitemap.xml
```

#### 2. **Verify Hreflang Tags**

Test your hreflang implementation:
- Use [Google's Rich Results Test](https://search.google.com/test/rich-results)
- Or [hreflang Tags Testing Tool](https://technicalseo.com/tools/hreflang/)

#### 3. **Monitor in Search Console**

- **Coverage Report**: Check if both language versions are indexed
- **International Targeting**: Verify language targeting is correct
- **Search Performance**: See which language gets more traffic

#### 4. **Content Quality**

- ✅ English content should be native English (not translated)
- ✅ Czech content should be native Czech (not translated)
- ✅ Both versions should have equal quality and depth

## Common Questions

### Q: Do I need separate sitemaps for each language?

**A: No.** One combined sitemap is better. Google can handle multiple languages in a single sitemap.

### Q: Should I submit the sitemap for both domains?

**A: No.** Only submit once for `www.brnorealestate.com`. The non-www version redirects to www.

### Q: How often should I update the sitemap?

**A:** Your sitemap is **dynamically generated** by Next.js, so it updates automatically when:
- New listings are added
- Pages are created/updated
- Content changes

You don't need to manually update it.

### Q: What if Google doesn't index both languages?

**A:** Check:
1. Hreflang tags are present (they are ✅)
2. Both language versions have unique, quality content
3. Internal links point to both language versions
4. Wait 1-2 weeks after submission (indexing takes time)

### Q: Should I use separate Google Search Console properties?

**A: No.** Use one property for `www.brnorealestate.com`. Google will automatically detect both languages from your sitemap and hreflang tags.

## Testing Your SEO Setup

### 1. Check Sitemap Accessibility

Visit: `https://www.brnorealestate.com/sitemap.xml`

You should see XML with URLs for both `/en/` and `/cs/` pages.

### 2. Check Hreflang Tags

1. Visit any page: `https://www.brnorealestate.com/en/listings`
2. View page source (Ctrl+U / Cmd+U)
3. Search for "hreflang" - you should see the tags

### 3. Check Canonical URLs

1. Visit any page
2. View page source
3. Search for "canonical" - should point to the current page

### 4. Test in Google Search Console

1. Use **URL Inspection Tool**
2. Enter a page URL
3. Check "Coverage" - should show if page is indexed
4. Check "Enhancements" - should show hreflang tags

## Summary

✅ **Submit ONE sitemap**: `https://www.brnorealestate.com/sitemap.xml`  
✅ **One Google Search Console property**: `www.brnorealestate.com`  
✅ **Hreflang tags**: Already implemented ✅  
✅ **Canonical URLs**: Already implemented ✅  

Your SEO setup is correct! Just submit the sitemap to Google Search Console and you're done.

