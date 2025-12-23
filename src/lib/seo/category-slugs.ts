// SEO-friendly category slugs mapping
// Maps internal category values to SEO-friendly URL slugs

export const categorySlugMap: Record<string, { en: string; cs: string }> = {
  "homes-sale": {
    en: "homes-for-sale-brno",
    cs: "domy-na-prodej-brno",
  },
  "homes-rent": {
    en: "homes-for-rent-brno",
    cs: "domy-k-pronajmu-brno",
  },
  "apartments-sale": {
    en: "apartments-for-sale-brno",
    cs: "byty-na-prodej-brno",
  },
  "apartments-rent": {
    en: "apartments-for-rent-brno",
    cs: "byty-k-pronajmu-brno",
  },
  "commercial-sale": {
    en: "commercial-properties-for-sale-brno",
    cs: "komercni-nemovitosti-na-prodej-brno",
  },
  "commercial-rent": {
    en: "commercial-property-for-rent-brno",
    cs: "komercni-nemovitosti-k-pronajmu-brno",
  },
  "land-sale": {
    en: "land-for-sale-brno",
    cs: "pozemky-na-prodej-brno",
  },
  "land-rent": {
    en: "land-for-rent-brno",
    cs: "pozemky-k-pronajmu-brno",
  },
  "investment-building": {
    en: "investment-properties-brno",
    cs: "investicni-nemovitosti-brno",
  },
};

// Reverse mapping: slug to category
export const slugToCategoryMap: Record<string, string> = {};

// Build reverse map
Object.entries(categorySlugMap).forEach(([category, slugs]) => {
  slugToCategoryMap[slugs.en] = category;
  slugToCategoryMap[slugs.cs] = category;
});

// Get category from slug
export function getCategoryFromSlug(slug: string): string | undefined {
  return slugToCategoryMap[slug];
}

// Get slug from category and locale
export function getSlugFromCategory(category: string, locale: string): string | undefined {
  return categorySlugMap[category]?.[locale === "cs" ? "cs" : "en"];
}


