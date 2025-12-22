import { getSlugFromCategory } from "./category-slugs";

/**
 * Get the SEO-friendly URL for a category
 * @param category - Internal category value (e.g., "homes-sale")
 * @param locale - Locale ("en" or "cs")
 * @returns SEO-friendly URL path (e.g., "/en/homes-for-sale-brno")
 */
export function getCategoryUrl(category: string, locale: string): string {
  const slug = getSlugFromCategory(category, locale);
  if (slug) {
    return `/${locale}/${slug}`;
  }
  // Fallback to old structure if slug not found
  return `/${locale}/listings/category/${category}`;
}

