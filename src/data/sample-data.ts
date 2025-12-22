export type Listing = {
  id: string;
  title: string;
  slug: string;
  location: string;
  locationValue: string;
  category: string;
  propertyType: string;
  priceCZK: number;
  beds: number;
  baths: number;
  areaSqm: number;
  description: string;
  highlights: string[];
  status?: "featured" | "new" | "sold";
  image: string;
  coordinates: [number, number];
  postalCode?: string;
  streetAddress?: string;
  features?: string[];
};

export type Agent = {
  id: string;
  name: string;
  title: string;
  region: string;
  email: string;
  phone: string;
  specialties: string[];
  bio: string;
};

export type Office = {
  id: string;
  name: string;
  region: string;
  address: string;
  phone: string;
  email: string;
  services: string[];
};

export type ResourceArticle = {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  published: string;
};

export type Option = {
  label: string;
  value: string;
};

export type PriceRangeOption = Option & {
  min: number;
  max: number;
};

export const locationOptions: Option[] = [
  { label: "Brno-střed", value: "brno-stred" },
  { label: "Masarykova čtvrť", value: "masarykova-ctvrt" },
  { label: "Královo Pole", value: "kralovo-pole" },
  { label: "Žabovřesky", value: "zabovresky" },
  { label: "Prague, Czech Republic", value: "prague-cz" },
  { label: "Olomouc", value: "olomouc" },
  { label: "Brno Technology Park", value: "brno-tech" },
  { label: "Karlovy Vary", value: "karlovy-vary" },
];

export const categoryOptions: Option[] = [
  { label: "Homes for Sale", value: "homes-sale" },
  { label: "Homes for Rent", value: "homes-rent" },
  { label: "Apartments for Sale", value: "apartments-sale" },
  { label: "Apartments for Rent", value: "apartments-rent" },
  { label: "Commercial for Sale", value: "commercial-sale" },
  { label: "Commercial for Rent", value: "commercial-rent" },
  { label: "Land for Sale", value: "land-sale" },
  { label: "Land for Rent", value: "land-rent" },
  { label: "Investment Buildings", value: "investment-building" },
];

export const propertyTypeOptions: Option[] = [
  { label: "Villa", value: "villa" },
  { label: "Townhouse", value: "townhouse" },
  { label: "Loft", value: "loft" },
  { label: "Penthouse", value: "penthouse" },
  { label: "Mixed-Use", value: "mixed-use" },
  { label: "Office", value: "office" },
  { label: "Development Plot", value: "development-plot" },
];

export const priceRangeOptions: PriceRangeOption[] = [
  { label: "0 - 5M CZK", value: "0-5", min: 0, max: 5_000_000 },
  { label: "0 - 10M CZK", value: "0-10", min: 0, max: 10_000_000 },
  { label: "0 - 20M CZK", value: "0-20", min: 0, max: 20_000_000 },
  { label: "0 - 50M CZK", value: "0-50", min: 0, max: 50_000_000 },
  { label: "0 - 100M CZK", value: "0-100", min: 0, max: 100_000_000 },
  { label: "0 - 250M CZK", value: "0-250", min: 0, max: 250_000_000 },
  {
    label: "0 - 500M CZK",
    value: "0-500",
    min: 0,
    max: 500_000_000,
  },
  {
    label: "500M+ CZK",
    value: "500+",
    min: 500_000_000,
    max: Number.POSITIVE_INFINITY,
  },
];

export const listings: Listing[] = [
  {
    id: "masarykova-garden-villa",
    title: "Masarykova Garden Villa",
    slug: "masarykova-garden-villa",
    location: "Masarykova čtvrť, Brno",
    locationValue: "masarykova-ctvrt",
    category: "homes-sale",
    propertyType: "villa",
    priceCZK: 28_500_000,
    beds: 5,
    baths: 4.5,
    areaSqm: 448,
    description:
      "Elegant 1920s villa with restored Art Deco detailing, terraced gardens, and sweeping views over Špilberk Castle.",
    highlights: [
      "Panoramic terrace",
      "Restored winter garden",
      "Wine cellar & tasting room",
    ],
    status: "featured",
    image:
      "https://images.unsplash.com/photo-1590490360182-663063ad3b66?auto=format&fit=crop&w=1200&q=80",
    coordinates: [49.1909, 16.5898],
    postalCode: "602 00",
    streetAddress: "Hlinky 45",
    features: ["Terrace", "Wine Cellar", "Garden"],
  },
  {
    id: "petrzalka-riverside-loft",
    title: "Svratka Riverside Loft",
    slug: "svratka-riverside-loft",
    location: "Brno-střed, Brno",
    locationValue: "brno-stred",
    category: "homes-sale",
    propertyType: "loft",
    priceCZK: 16_900_000,
    beds: 3,
    baths: 2.5,
    areaSqm: 238,
    description:
      "Minimalist loft with double-height living, bespoke millwork, and floor-to-ceiling glazing onto the river promenade.",
    highlights: [
      "12-metre glass facade",
      "Integrated smart home",
      "Private parking in courtyard",
    ],
    status: "featured",
    image:
      "https://images.unsplash.com/photo-1529429617124-aee0014819be?auto=format&fit=crop&w=1200&q=80",
    coordinates: [49.1916, 16.613],
    postalCode: "602 00",
    streetAddress: "Poštovská 12",
    features: ["River View", "Smart Home"],
  },
  {
    id: "kralovo-pole-residence",
    title: "Královo Pole Skyline Residence",
    slug: "kralovo-pole-skyline-residence",
    location: "Královo Pole, Brno",
    locationValue: "kralovo-pole",
    category: "homes-sale",
    propertyType: "villa",
    priceCZK: 22_400_000,
    beds: 4,
    baths: 3.5,
    areaSqm: 332,
    description:
      "Contemporary hillside home oriented to south-west sunsets, featuring a wellness suite and eco-efficient technologies.",
    highlights: [
      "Wellness spa & sauna",
      "Photovoltaic array",
      "Landscaped roof garden",
    ],
    status: "featured",
    image:
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80",
    coordinates: [49.2262, 16.5911],
    postalCode: "612 00",
    streetAddress: "Chaloupkova 5",
    features: ["Rooftop Garden", "Wellness"],
  },
  {
    id: "zabovresky-townhouse",
    title: "Žabovřesky Townhouse",
    slug: "zabovresky-townhouse",
    location: "Žabovřesky, Brno",
    locationValue: "zabovresky",
    category: "homes-sale",
    propertyType: "townhouse",
    priceCZK: 13_800_000,
    beds: 3,
    baths: 2.5,
    areaSqm: 199,
    description:
      "Bright townhouse in a quiet residential enclave with a landscaped courtyard, flexible studio, and secure parking.",
    highlights: [
      "Inner courtyard garden",
      "Flexible studio level",
      "Secure underground parking",
    ],
    image:
      "https://images.unsplash.com/photo-1616594039964-6789ad4c5206?auto=format&fit=crop&w=1200&q=80",
    coordinates: [49.2169, 16.572],
    postalCode: "616 00",
    streetAddress: "Sochorova 28",
    features: ["Courtyard", "Studio Space"],
  },
  {
    id: "prague-vinohrady-penthouse",
    title: "Vinohrady Design Penthouse",
    slug: "vinohrady-design-penthouse",
    location: "Vinohrady, Prague",
    locationValue: "prague-cz",
    category: "homes-sale",
    propertyType: "penthouse",
    priceCZK: 34_900_000,
    beds: 4,
    baths: 3.5,
    areaSqm: 374,
    description:
      "Expansive Prague penthouse with skyline terraces, bespoke Czech design finishes, and direct lift access.",
    highlights: [
      "Wraparound terrace",
      "Private lift lobby",
      "Custom Czech design studio",
    ],
    status: "featured",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    coordinates: [50.0766, 14.4413],
    postalCode: "120 00",
    streetAddress: "Vinohradská 32",
    features: ["Private Terrace", "Lift Lobby"],
  },
  {
    id: "spilberk-investment-palace",
    title: "Špilberk Investment Palace",
    slug: "spilberk-investment-palace",
    location: "Brno-střed, Brno",
    locationValue: "brno-stred",
    category: "investment-building",
    propertyType: "mixed-use",
    priceCZK: 49_500_000,
    beds: 0,
    baths: 0,
    areaSqm: 833,
    description:
      "Mixed-use historic building steps from Freedom Square, featuring retail arcades, boutique offices, and furnished residences.",
    highlights: [
      "Retail frontage on Česká",
      "Boutique serviced apartments",
      "Heritage restoration plan",
    ],
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    coordinates: [49.1947, 16.6035],
    postalCode: "602 00",
    streetAddress: "Česká 18",
    features: ["Retail Frontage", "Serviced Apartments"],
  },
  {
    id: "olomouc-heritage-residence",
    title: "Olomouc Heritage Residence",
    slug: "olomouc-heritage-residence",
    location: "Historic Centre, Olomouc",
    locationValue: "olomouc",
    category: "homes-sale",
    propertyType: "townhouse",
    priceCZK: 18_600_000,
    beds: 4,
    baths: 3,
    areaSqm: 280,
    description:
      "Revitalised townhouse overlooking Upper Square with vaulted interiors, private courtyard, and preserved fresco ceilings.",
    highlights: [
      "Sunny internal courtyard",
      "Restored ceiling frescoes",
      "Dual residential entrances",
    ],
    image:
      "https://images.unsplash.com/photo-1590073242678-70f12c6a8991?auto=format&fit=crop&w=1200&q=80",
    coordinates: [49.5938, 17.2518],
    postalCode: "779 00",
    streetAddress: "Horní náměstí 7",
    features: ["Courtyard", "Historic Interior"],
  },
  {
    id: "brno-tech-campus-lofts",
    title: "Technology Park Executive Lofts",
    slug: "brno-tech-campus-lofts",
    location: "Technology Park, Brno",
    locationValue: "brno-tech",
    category: "homes-rent",
    propertyType: "loft",
    priceCZK: 11_900_000,
    beds: 2,
    baths: 2,
    areaSqm: 156,
    description:
      "Smart-enabled lofts adjacent to the Brno Technology Park with private terraces and premium cowork amenities.",
    highlights: [
      "Smart home automation",
      "Private terrace lounge",
      "Resident cowork studio",
    ],
    image:
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1200&q=80",
    coordinates: [49.2289, 16.5712],
    postalCode: "612 00",
    streetAddress: "Technická 10",
    features: ["Smart Home", "Cowork Access"],
  },
];

export const agents: Agent[] = [
  {
    id: "tereza-kralova",
    name: "Tereza Králová",
    title: "Director of Prime Sales",
    region: "Brno & South Moravia",
    email: "tereza.kralova@brnore.cz",
    phone: "+420 603 455 218",
    specialties: [
      "Historic villas",
      "Luxury new builds",
      "International buyers",
    ],
    bio: "A Brno native with architectural training, Tereza leads complex transactions across Masarykova čtvrť and Královo Pole for Czech and international clientele.",
  },
  {
    id: "jakub-holmes",
    name: "Jakub Holomčík",
    title: "Investment Advisory Lead",
    region: "Brno-střed & Prague",
    email: "jakub.holomcik@brnore.cz",
    phone: "+420 775 214 980",
    specialties: [
      "Mixed-use assets",
      "City-centre portfolios",
      "Yield optimisation",
    ],
    bio: "Jakub partners with private investors and family offices on income-generating assets surrounding Freedom Square and Prague&apos;s Vinohrady.",
  },
  {
    id: "ema-sedlackova",
    name: "Ema Sedláčková",
    title: "Relocation & Lifestyle Specialist",
    region: "South Moravia & Vysočina",
    email: "ema.sedlackova@brnore.cz",
    phone: "+420 602 714 563",
    specialties: [
      "Executive relocation",
      "Schooling advisory",
      "Rental-to-acquisition",
    ],
    bio: "Ema curates end-to-end relocation journeys for technology leaders and researchers moving to the Brno region, aligning lifestyle, education, and investment goals.",
  },
];

export const offices: Office[] = [
  {
    id: "brno-stred-gallery",
    name: "Brno-střed Flagship Gallery",
    region: "Brno",
    address: "Dominikánské náměstí 5, 602 00 Brno",
    phone: "+420 539 012 310",
    email: "brno@brnore.cz",
    services: [
      "Prime sales brokerage",
      "Marketing studio",
      "Client concierge",
    ],
  },
  {
    id: "kralovo-pole-lounge",
    name: "Královo Pole Advisory Lounge",
    region: "South Moravia",
    address: "Purkyňova 97a, 612 00 Brno",
    phone: "+420 539 012 340",
    email: "kralovopole@brnore.cz",
    services: [
      "Investment advisory",
      "Project marketing",
      "Portfolio management",
    ],
  },
  {
    id: "prague-consultancy",
    name: "Prague Consultancy Suite",
    region: "Prague",
    address: "Italská 32, 120 00 Praha 2",
    phone: "+420 257 888 410",
    email: "prague@brnore.cz",
    services: [
      "Capital markets",
      "Cross-border referrals",
      "Legal & tax coordination",
    ],
  },
];

export const resources: ResourceArticle[] = [
  {
    id: "2025-brno-outlook",
    title: "2025 Market Outlook: Brno Prime Residential",
    category: "Market Insights",
    excerpt:
      "An in-depth review of pricing velocity, buyer sentiment, and development pipeline across Brno&apos;s premier neighbourhoods.",
    readTime: "7 min read",
    published: "Jan 2025",
  },
  {
    id: "relocating-to-brno",
    title: "Relocating to Brno: Executive Playbook",
    category: "Guides & Advice",
    excerpt:
      "Practical guidance covering visas, international schooling, and neighbourhood orientation for incoming talent.",
    readTime: "9 min read",
    published: "Dec 2024",
  },
  {
    id: "investing-moravia",
    title: "Investing in South Moravian Assets",
    category: "Investment Strategy",
    excerpt:
      "Explore yield dynamics and urban regeneration hotspots shaping Brno-střed and Královo Pole investment portfolios.",
    readTime: "6 min read",
    published: "Nov 2024",
  },
];

export function getLocationLabel(value: string) {
  return (
    locationOptions.find((option) => option.value === value)?.label ?? "All Locations"
  );
}

export function getPropertyTypeLabel(value: string) {
  return (
    propertyTypeOptions.find((option) => option.value === value)?.label ??
    "All Property Types"
  );
}

export function getPriceRange(value: string) {
  return priceRangeOptions.find((option) => option.value === value);
}

export function getCategoryLabel(value: string) {
  return (
    categoryOptions.find((option) => option.value === value)?.label ?? "All Categories"
  );
}

