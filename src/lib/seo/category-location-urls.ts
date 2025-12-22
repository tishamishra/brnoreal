import { getSlugFromCategory } from "./category-slugs";
import { getLocationSlug, getLocationFromSlug } from "./location-slugs";
import { getCategoryFromSlug } from "./category-slugs";
import { locationSlugMap } from "./location-slugs";

/**
 * Get the SEO-friendly URL for a category + location combination
 * @param category - Internal category value (e.g., "homes-sale")
 * @param location - Internal location value (e.g., "brno-stred")
 * @param locale - Locale ("en" or "cs")
 * @returns SEO-friendly URL path (e.g., "/en/homes-for-sale-brno-stred")
 */
export function getCategoryLocationUrl(
  category: string,
  location: string,
  locale: string,
): string {
  const categorySlug = getSlugFromCategory(category, locale);
  const locationSlug = getLocationSlug(location, locale);
  
  if (categorySlug && locationSlug) {
    // Remove "-brno" from category slug if location is specific
    const baseCategorySlug = categorySlug.replace(/-brno$/, "");
    return `/${locale}/${baseCategorySlug}-${locationSlug}`;
  }
  
  // Fallback to category-only URL
  if (categorySlug) {
    return `/${locale}/${categorySlug}`;
  }
  
  // Final fallback
  return `/${locale}/listings/category/${category}`;
}

/**
 * Parse category and location from a combined slug
 * @param slug - Combined slug like "homes-for-sale-brno-stred"
 * @returns Object with category and location, or null if not found
 */
export function parseCategoryLocationSlug(slug: string): {
  category: string;
  location: string;
} | null {
  try {
    // Try to match location slugs first (longer matches first)
    const locationSlugs = Object.values(locationSlugMap)
      .flatMap((slugs) => [slugs.en, slugs.cs])
      .filter((s) => s && s.length > 0) // Remove empty strings
      .sort((a, b) => b.length - a.length);
    
    for (const locationSlug of locationSlugs) {
      if (slug.endsWith(`-${locationSlug}`)) {
        const categoryPart = slug.slice(0, -(locationSlug.length + 1));
        
        // Try with -brno suffix first
        let category = getCategoryFromSlug(categoryPart + "-brno");
        
        // If not found, try without -brno
        if (!category) {
          category = getCategoryFromSlug(categoryPart);
        }
        
        if (category) {
          const location = getLocationFromSlug(locationSlug);
          if (location) {
            return { category, location };
          }
        }
      }
    }
    
    // Try category-only (with -brno suffix)
    const category = getCategoryFromSlug(slug);
    if (category) {
      return { category, location: "" };
    }
  } catch (error) {
    console.error("Error parsing category location slug:", error);
    return null;
  }
  
  return null;
}
