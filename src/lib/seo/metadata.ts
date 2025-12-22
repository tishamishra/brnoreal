import type { Metadata } from "next";
import { categoryOptions, getCategoryLabel } from "@/data/sample-data";
import type { Listing } from "@/data/sample-data";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://brnorealestate.com";

// Homepage metadata
export function getHomepageMetadata(locale: string): Metadata {
  const enMetadata = {
    title: "Brno Real Estate | Premium Properties",
    description: "Discover luxury homes, villas, and investment properties in Brno and South Moravia. Expert real estate advisors with local market intelligence.",
  };

  const csMetadata = {
    title: "Brno Real Estate | Prémiové nemovitosti",
    description: "Objevte luxusní domy, vily a investiční nemovitosti v Brně a na jižní Moravě. Odborní realitní poradci s lokální tržní inteligencí.",
  };

  const metadata = locale === "cs" ? csMetadata : enMetadata;

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        "en": `${baseUrl}/en`,
        "cs": `${baseUrl}/cs`,
      },
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `${baseUrl}/${locale}`,
      siteName: "Brno Real Estate",
      locale: locale === "cs" ? "cs_CZ" : "en_US",
      alternateLocale: locale === "cs" ? "en_US" : "cs_CZ",
    },
  };
}

// Listing category pages metadata
export function getCategoryMetadata(category: string, locale: string, slug?: string): Metadata {
  const categoryLabel = getCategoryLabel(category);

  const enMetadata: Record<string, { title: string; description: string }> = {
    "homes-sale": {
      title: "Homes for Sale in Brno | Real Estate",
      description: "Browse luxury homes and villas for sale in Brno and South Moravia. Premium properties with expert guidance and local market insights.",
    },
    "homes-rent": {
      title: "Homes for Rent in Brno | Properties",
      description: "Find premium rental properties in Brno. Luxury homes, villas, and apartments available for rent with flexible terms and expert support.",
    },
    "apartments-sale": {
      title: "Apartments for Sale in Brno | Real Estate",
      description: "Browse apartments and flats for sale in Brno. Premium residential properties with modern amenities in prime locations.",
    },
    "apartments-rent": {
      title: "Apartments for Rent in Brno | Properties",
      description: "Find apartments and flats for rent in Brno. Quality rental properties with flexible terms and prime locations.",
    },
    "commercial-sale": {
      title: "Commercial Properties for Sale in Brno",
      description: "Explore commercial real estate opportunities in Brno. Office spaces, retail properties, and mixed-use developments for sale.",
    },
    "commercial-rent": {
      title: "Commercial Property for Rent in Brno",
      description: "Discover commercial spaces for rent in Brno. Prime office locations, retail spaces, and business properties available now.",
    },
    "land-sale": {
      title: "Land for Sale in Brno | Development Plots",
      description: "Browse development land and plots for sale in Brno and South Moravia. Prime locations for residential and commercial projects.",
    },
    "land-rent": {
      title: "Land for Rent in Brno | Lease Plots",
      description: "Find land available for rent in Brno. Development plots and commercial land leases with flexible terms and prime locations.",
    },
    "investment-building": {
      title: "Investment Properties in Brno | Real Estate",
      description: "Explore investment property opportunities in Brno. Multi-unit buildings, commercial investments, and portfolio properties for sale.",
    },
  };

  const csMetadata: Record<string, { title: string; description: string }> = {
    "homes-sale": {
      title: "Domy na prodej v Brně | Nemovitosti",
      description: "Prohlédněte si luxusní domy a vily na prodej v Brně a na jižní Moravě. Prémiové nemovitosti s odborným vedením a lokálními tržními poznatky.",
    },
    "homes-rent": {
      title: "Domy k pronájmu v Brně | Nemovitosti",
      description: "Najděte prémiové pronájmy v Brně. Luxusní domy, vily a byty k pronájmu s flexibilními podmínkami a odbornou podporou.",
    },
    "apartments-sale": {
      title: "Byty na prodej v Brně | Nemovitosti",
      description: "Prohlédněte si byty a apartmány na prodej v Brně. Prémiové rezidenční nemovitosti s moderním vybavením v prémiových lokalitách.",
    },
    "apartments-rent": {
      title: "Byty k pronájmu v Brně | Nemovitosti",
      description: "Najděte byty a apartmány k pronájmu v Brně. Kvalitní pronájmy s flexibilními podmínkami a prémiovými lokalitami.",
    },
    "commercial-sale": {
      title: "Komerční nemovitosti na prodej v Brně",
      description: "Prozkoumejte příležitosti v komerčních nemovitostech v Brně. Kancelářské prostory, maloobchodní nemovitosti a smíšené projekty na prodej.",
    },
    "commercial-rent": {
      title: "Komerční nemovitosti k pronájmu v Brně",
      description: "Objevte komerční prostory k pronájmu v Brně. Prémiové kancelářské lokality, maloobchodní prostory a obchodní nemovitosti k dispozici.",
    },
    "land-sale": {
      title: "Pozemky na prodej v Brně | Stavební parcely",
      description: "Prohlédněte si stavební pozemky a parcely na prodej v Brně a na jižní Moravě. Prémiové lokality pro rezidenční a komerční projekty.",
    },
    "land-rent": {
      title: "Pozemky k pronájmu v Brně | Pronájem parcel",
      description: "Najděte pozemky k pronájmu v Brně. Stavební parcely a komerční pozemky k pronájmu s flexibilními podmínkami a prémiovými lokalitami.",
    },
    "investment-building": {
      title: "Investiční nemovitosti v Brně | Nemovitosti",
      description: "Prozkoumejte investiční příležitosti v nemovitostech v Brně. Vícebytové budovy, komerční investice a portfoliové nemovitosti na prodej.",
    },
  };

  const metadata = locale === "cs" ? csMetadata[category] : enMetadata[category];
  const fallback = {
    title: `${categoryLabel} in Brno`,
    description: `Browse ${categoryLabel.toLowerCase()} in Brno and South Moravia. Premium properties with expert guidance.`,
  };

  return {
    title: metadata?.title || fallback.title,
    description: metadata?.description || fallback.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/listings/category/${category}`,
      languages: {
        "en": `${baseUrl}/en/listings/category/${category}`,
        "cs": `${baseUrl}/cs/listings/category/${category}`,
      },
    },
    openGraph: {
      title: metadata?.title || fallback.title,
      description: metadata?.description || fallback.description,
      type: "website",
      locale: locale === "cs" ? "cs_CZ" : "en_US",
      alternateLocale: locale === "cs" ? "en_US" : "cs_CZ",
      url: `${baseUrl}/${locale}/listings/category/${category}`,
    },
  };
}

// Individual listing page metadata
export function getListingMetadata(listing: Listing, locale: string): Metadata {
  const enTitle = `${listing.title} | Brno Real Estate`;
  const csTitle = `${listing.title} | Brno Real Estate`;

  // Ensure titles don't exceed 60 chars
  const enTitleFinal = enTitle.length > 60 ? listing.title : enTitle;
  const csTitleFinal = csTitle.length > 60 ? listing.title : csTitle;

  const enDescription = `${listing.description.substring(0, 120)}... Located in ${listing.location}. ${listing.beds} bed, ${listing.baths} bath. ${listing.areaSqm} m².`;
  const csDescription = `${listing.description.substring(0, 120)}... Nachází se v ${listing.location}. ${listing.beds} ložnic, ${listing.baths} koupelen. ${listing.areaSqm} m².`;

  // Ensure descriptions don't exceed 155 chars
  const enDescFinal = enDescription.length > 155 ? enDescription.substring(0, 152) + "..." : enDescription;
  const csDescFinal = csDescription.length > 155 ? csDescription.substring(0, 152) + "..." : csDescription;

  const metadata = locale === "cs" 
    ? { title: csTitleFinal, description: csDescFinal }
    : { title: enTitleFinal, description: enDescFinal };

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/listings/${listing.slug}`,
      languages: {
        "en": `${baseUrl}/en/listings/${listing.slug}`,
        "cs": `${baseUrl}/cs/listings/${listing.slug}`,
      },
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: "article",
      locale: locale === "cs" ? "cs_CZ" : "en_US",
      alternateLocale: locale === "cs" ? "en_US" : "cs_CZ",
      url: `${baseUrl}/${locale}/listings/${listing.slug}`,
      images: listing.image ? [{ url: listing.image, alt: listing.title }] : undefined,
    },
  };
}

// Agents page metadata
export function getAgentsMetadata(locale: string): Metadata {
  const enMetadata = {
    title: "Real Estate Agents in Brno | Expert Advisors",
    description: "Meet our team of expert real estate advisors in Brno. Local market specialists offering personalized service for buyers, sellers, and investors.",
  };

  const csMetadata = {
    title: "Realitní poradci v Brně | Odborní poradci",
    description: "Poznejte náš tým odborných realitních poradců v Brně. Specialisté na lokální trh nabízející personalizované služby pro kupující, prodávající a investory.",
  };

  const metadata = locale === "cs" ? csMetadata : enMetadata;

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/agents`,
      languages: {
        "en": `${baseUrl}/en/agents`,
        "cs": `${baseUrl}/cs/agents`,
      },
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: "website",
      locale: locale === "cs" ? "cs_CZ" : "en_US",
      alternateLocale: locale === "cs" ? "en_US" : "cs_CZ",
      url: `${baseUrl}/${locale}/agents`,
    },
  };
}

// Contact page metadata
export function getContactMetadata(locale: string): Metadata {
  const enMetadata = {
    title: "Contact Us | Brno Real Estate",
    description: "Get in touch with our real estate experts in Brno. Schedule a consultation, property viewing, or discuss your real estate needs today.",
  };

  const csMetadata = {
    title: "Kontaktujte nás | Brno Real Estate",
    description: "Spojte se s našimi realitními odborníky v Brně. Domluvte si konzultaci, prohlídku nemovitosti nebo prodiskutujte své potřeby ještě dnes.",
  };

  const metadata = locale === "cs" ? csMetadata : enMetadata;

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/contact`,
      languages: {
        "en": `${baseUrl}/en/contact`,
        "cs": `${baseUrl}/cs/contact`,
      },
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: "website",
      locale: locale === "cs" ? "cs_CZ" : "en_US",
      alternateLocale: locale === "cs" ? "en_US" : "cs_CZ",
      url: `${baseUrl}/${locale}/contact`,
    },
  };
}

// Services page metadata
export function getServicesMetadata(locale: string): Metadata {
  const enMetadata = {
    title: "Real Estate Services in Brno | Our Services",
    description: "Comprehensive real estate services in Brno: property sales, rentals, investment consulting, valuation, and relocation assistance.",
  };

  const csMetadata = {
    title: "Realitní služby v Brně | Naše služby",
    description: "Komplexní realitní služby v Brně: prodej nemovitostí, pronájmy, investiční poradenství, ocenění a pomoc při stěhování.",
  };

  const metadata = locale === "cs" ? csMetadata : enMetadata;

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/services`,
      languages: {
        "en": `${baseUrl}/en/services`,
        "cs": `${baseUrl}/cs/services`,
      },
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: "website",
      locale: locale === "cs" ? "cs_CZ" : "en_US",
      alternateLocale: locale === "cs" ? "en_US" : "cs_CZ",
      url: `${baseUrl}/${locale}/services`,
    },
  };
}

// Featured properties page metadata
export function getFeaturedMetadata(locale: string): Metadata {
  const enMetadata = {
    title: "Featured Properties in Brno | Premium Listings",
    description: "Browse our featured luxury properties in Brno. Handpicked premium homes, villas, and investment opportunities with exceptional value.",
  };

  const csMetadata = {
    title: "Doporučené nemovitosti v Brně | Prémiové nabídky",
    description: "Prohlédněte si naše doporučené luxusní nemovitosti v Brně. Ručně vybrané prémiové domy, vily a investiční příležitosti s výjimečnou hodnotou.",
  };

  const metadata = locale === "cs" ? csMetadata : enMetadata;

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/featured`,
      languages: {
        "en": `${baseUrl}/en/featured`,
        "cs": `${baseUrl}/cs/featured`,
      },
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: "website",
      locale: locale === "cs" ? "cs_CZ" : "en_US",
      alternateLocale: locale === "cs" ? "en_US" : "cs_CZ",
      url: `${baseUrl}/${locale}/featured`,
    },
  };
}

// All properties page metadata
export function getAllPropertiesMetadata(locale: string): Metadata {
  const enMetadata = {
    title: "All Properties in Brno | Complete Listings",
    description: "Browse all available properties in Brno and South Moravia. Search homes, commercial spaces, land, and investment opportunities.",
  };

  const csMetadata = {
    title: "Všechny nemovitosti v Brně | Kompletní nabídky",
    description: "Prohlédněte si všechny dostupné nemovitosti v Brně a na jižní Moravě. Vyhledávejte domy, komerční prostory, pozemky a investiční příležitosti.",
  };

  const metadata = locale === "cs" ? csMetadata : enMetadata;

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/all-properties`,
      languages: {
        "en": `${baseUrl}/en/all-properties`,
        "cs": `${baseUrl}/cs/all-properties`,
      },
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: "website",
      locale: locale === "cs" ? "cs_CZ" : "en_US",
      alternateLocale: locale === "cs" ? "en_US" : "cs_CZ",
      url: `${baseUrl}/${locale}/all-properties`,
    },
  };
}

