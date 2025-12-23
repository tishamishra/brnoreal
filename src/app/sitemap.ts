import { MetadataRoute } from 'next';
import { getAllListings } from '@/lib/data/listings';
import { destinations } from '@/data/destinations';
import { categoryOptions } from '@/data/sample-data';
import { locales } from '@/lib/i18n/routing';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.brnorealestate.com';
  
  // Get all listings
  const listings = await getAllListings();
  
  // Generate sitemap entries for all locales
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const localePrefix = `/${locale}`;
    
    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}${localePrefix}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}${localePrefix}/listings`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}${localePrefix}/featured`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}${localePrefix}/all-properties`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}${localePrefix}/about/team`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}${localePrefix}/services`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}${localePrefix}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}${localePrefix}/list-your-property`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}${localePrefix}/resources`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}${localePrefix}/agents`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}${localePrefix}/offices`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}${localePrefix}/privacy`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: `${baseUrl}${localePrefix}/terms`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: `${baseUrl}${localePrefix}/privacy/do-not-sell`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: `${baseUrl}${localePrefix}/dmca`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: `${baseUrl}${localePrefix}/site-map`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      },
    ];

    // Category pages
    const categoryPages: MetadataRoute.Sitemap = categoryOptions.map((category) => ({
      url: `${baseUrl}${localePrefix}/listings/category/${category.value}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    }));

    // Destination pages
    const destinationPages: MetadataRoute.Sitemap = destinations.map((destination) => ({
      url: `${baseUrl}${localePrefix}/destinations/${destination.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    // Listing detail pages
    const listingPages: MetadataRoute.Sitemap = listings.map((listing) => ({
      url: `${baseUrl}${localePrefix}/listings/${listing.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    // Blog posts
    const blogPosts: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}${localePrefix}/blog/2025-brno-outlook`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}${localePrefix}/blog/relocating-to-brno`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}${localePrefix}/blog/investing-moravia`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      },
    ];

    // Add all pages for this locale
    sitemapEntries.push(
      ...staticPages,
      ...categoryPages,
      ...destinationPages,
      ...listingPages,
      ...blogPosts
    );
  }

  return sitemapEntries;
}

