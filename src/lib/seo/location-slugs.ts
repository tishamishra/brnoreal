// SEO-friendly location slugs mapping
// Maps internal location values to SEO-friendly URL slugs

export const locationSlugMap: Record<string, { en: string; cs: string }> = {
  "brno-stred": {
    en: "brno-stred",
    cs: "brno-stred",
  },
  "masarykova-ctvrt": {
    en: "masarykova-ctvrt",
    cs: "masarykova-ctvrt",
  },
  "kralovo-pole": {
    en: "kralovo-pole",
    cs: "kralovo-pole",
  },
  "zabovresky": {
    en: "zabovresky",
    cs: "zabovresky",
  },
  "prague-cz": {
    en: "prague",
    cs: "praha",
  },
  "olomouc": {
    en: "olomouc",
    cs: "olomouc",
  },
  "brno-tech": {
    en: "brno-technology-park",
    cs: "brno-technologicky-park",
  },
  "karlovy-vary": {
    en: "karlovy-vary",
    cs: "karlovy-vary",
  },
};

// Reverse mapping: slug to location
export const slugToLocationMap: Record<string, string> = {};

// Build reverse map
Object.entries(locationSlugMap).forEach(([location, slugs]) => {
  slugToLocationMap[slugs.en] = location;
  slugToLocationMap[slugs.cs] = location;
});

// Get location from slug
export function getLocationFromSlug(slug: string): string | undefined {
  return slugToLocationMap[slug];
}

// Get slug from location and locale
export function getLocationSlug(location: string, locale: string): string | undefined {
  return locationSlugMap[location]?.[locale === "cs" ? "cs" : "en"];
}

