# i18n URL-Based Routing Migration Guide

## ✅ Completed Steps

1. ✅ Created middleware for locale detection and routing
2. ✅ Created `[locale]` folder structure
3. ✅ Created locale-aware Link component (`LocaleLink`)
4. ✅ Updated LocaleProvider to use URL-based locale
5. ✅ Created `[locale]/layout.tsx` with SEO metadata and hreflang tags
6. ✅ Moved homepage to `[locale]/page.tsx`
7. ✅ Updated language switcher

## 📋 Remaining Steps

### Step 1: Move All Pages to `[locale]` Folder

You need to move all public pages from `src/app/` to `src/app/[locale]/`:

**Pages to move:**
- `listings/` → `[locale]/listings/`
- `contact/` → `[locale]/contact/`
- `services/` → `[locale]/services/`
- `about/team/` → `[locale]/about/team/`
- `featured/` → `[locale]/featured/`
- `all-properties/` → `[locale]/all-properties/`
- `destinations/` → `[locale]/destinations/`
- `blog/` → `[locale]/blog/`
- `resources/` → `[locale]/resources/`
- `privacy/` → `[locale]/privacy/`
- `terms/` → `[locale]/terms/`
- `dmca/` → `[locale]/dmca/`
- `sitemap/` → `[locale]/sitemap/`
- `list-your-property/` → `[locale]/list-your-property/`
- `agents/` → `[locale]/agents/`
- `offices/` → `[locale]/offices/`

**Keep in root (no locale):**
- `admin/` - Admin panel (no i18n needed)
- `api/` - API routes (if any)

### Step 2: Update All Links

Replace all `Link` imports and usage with `LocaleLink`:

**Before:**
```tsx
import Link from "next/link";
<Link href="/listings">Listings</Link>
```

**After:**
```tsx
import { LocaleLink } from "@/components/locale-link";
<LocaleLink href="/listings">Listings</LocaleLink>
```

**Files that need updating:**
- All page components
- `SiteHeader`
- `SiteFooter`
- `ListingCard`
- `ResourceCard`
- All navigation components

### Step 3: Update Dynamic Routes

For dynamic routes like `[slug]`, update the page to accept locale:

```tsx
type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;
  // ... rest of component
}
```

### Step 4: Update Sitemap

The sitemap needs to include both language versions. Update `src/app/sitemap.ts` to generate entries for both `/en/` and `/cs/` paths.

### Step 5: Test

1. Visit `http://localhost:3000` - should redirect to `/en` or `/cs` based on location
2. Test language switcher - should change URL
3. Test all links - should maintain locale in URL
4. Check hreflang tags in page source
5. Test Czech users - should auto-redirect to `/cs`

## 🔧 Quick Migration Script

You can use this bash script to move files (run from project root):

```bash
#!/bin/bash
# Move pages to [locale] folder

cd src/app

# Create directories
mkdir -p "[locale]/listings"
mkdir -p "[locale]/contact"
mkdir -p "[locale]/services"
mkdir -p "[locale]/about/team"
mkdir -p "[locale]/featured"
mkdir -p "[locale]/all-properties"
mkdir -p "[locale]/destinations"
mkdir -p "[locale]/blog"
mkdir -p "[locale]/resources"
mkdir -p "[locale]/privacy/do-not-sell"
mkdir -p "[locale]/terms"
mkdir -p "[locale]/dmca"
mkdir -p "[locale]/sitemap"
mkdir -p "[locale]/list-your-property"
mkdir -p "[locale]/agents"
mkdir -p "[locale]/offices"

# Move files (example - adjust paths as needed)
# mv listings/* "[locale]/listings/"
# mv contact/* "[locale]/contact/"
# ... etc
```

## 📝 Important Notes

1. **Admin routes** (`/admin/*`) should NOT be moved - they stay in root
2. **API routes** (`/api/*`) should NOT be moved
3. **Static files** (images, etc.) stay in `public/`
4. All internal links must use `LocaleLink` to maintain locale
5. External links can use regular `Link` or `<a>` tags

## 🚀 How It Works

1. **User visits** `brnorealestate.com`
2. **Middleware detects:**
   - Cookie preference (if exists)
   - Country from headers (Czech Republic → `/cs/`)
   - Browser language
   - Defaults to `/en/`
3. **Redirects to** `/en/` or `/cs/`
4. **All links** maintain locale in URL
5. **Language switcher** changes URL to other locale

## 🔍 SEO Benefits

- ✅ Separate URLs for each language (`/en/` and `/cs/`)
- ✅ Hreflang tags tell search engines about alternatives
- ✅ Language-specific metadata
- ✅ Proper `lang` attribute on HTML
- ✅ Location-based automatic redirects

## ⚠️ Breaking Changes

- Old URLs without locale will redirect (handled by middleware)
- All internal links need to be updated to use `LocaleLink`
- Components that use `useRouter()` may need updates

## 🆘 Need Help?

If you encounter issues:
1. Check middleware is working (should redirect root to `/en/` or `/cs/`)
2. Verify `LocaleLink` is used for all internal links
3. Check browser console for errors
4. Verify locale is in URL path

