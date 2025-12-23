import { listingsService } from '@/lib/supabase/services';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { listings as staticListings, type Listing } from '@/data/sample-data';

// Re-export Listing type for convenience
export type { Listing };

// Get all listings with optional filters
export async function getAllListings(filters?: {
  category?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  features?: string[];
  postalCode?: string;
  featured?: boolean;
}): Promise<Listing[]> {
  if (isSupabaseConfigured()) {
    try {
      return await listingsService.getAll(filters);
    } catch (error) {
      console.error('Error fetching from Supabase, falling back to static data:', error);
      return getStaticListings(filters);
    }
  }
  return getStaticListings(filters);
}

// Get listing by slug
export async function getListingBySlug(slug: string): Promise<Listing | null> {
  if (isSupabaseConfigured()) {
    try {
      return await listingsService.getBySlug(slug);
    } catch (error) {
      console.error('Error fetching from Supabase, falling back to static data:', error);
      return getStaticListingBySlug(slug);
    }
  }
  return getStaticListingBySlug(slug);
}

// Get featured listings
export async function getFeaturedListings(limit?: number): Promise<Listing[]> {
  if (isSupabaseConfigured()) {
    try {
      return await listingsService.getFeatured(limit);
    } catch (error) {
      console.error('Error fetching from Supabase, falling back to static data:', error);
      return getStaticFeaturedListings(limit);
    }
  }
  return getStaticFeaturedListings(limit);
}

// Static data fallback functions
function getStaticListings(filters?: {
  category?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  features?: string[];
  postalCode?: string;
  featured?: boolean;
}): Listing[] {
  let result = [...staticListings];

  if (filters?.category) {
    result = result.filter((l) => l.category === filters.category);
  }

  if (filters?.location) {
    result = result.filter((l) => l.locationValue === filters.location);
  }

  if (filters?.minPrice !== undefined) {
    result = result.filter((l) => l.priceCZK >= filters.minPrice!);
  }

  if (filters?.maxPrice !== undefined) {
    result = result.filter((l) => l.priceCZK <= filters.maxPrice!);
  }

  if (filters?.beds !== undefined) {
    result = result.filter((l) => l.beds >= filters.beds!);
  }

  if (filters?.baths !== undefined) {
    result = result.filter((l) => l.baths >= filters.baths!);
  }

  if (filters?.postalCode) {
    result = result.filter((l) => l.postalCode === filters.postalCode);
  }

  if (filters?.featured) {
    result = result.filter((l) => l.status === 'featured');
  }

  if (filters?.features && filters.features.length > 0) {
    result = result.filter((l) => {
      if (!l.features) return false;
      return filters.features!.some((f) => l.features!.includes(f));
    });
  }

  return result;
}

function getStaticListingBySlug(slug: string): Listing | null {
  return staticListings.find((l) => l.slug === slug) || null;
}

function getStaticFeaturedListings(limit?: number): Listing[] {
  const featured = staticListings.filter((l) => l.status === 'featured');
  return limit ? featured.slice(0, limit) : featured;
}

