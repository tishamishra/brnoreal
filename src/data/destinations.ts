export type Destination = {
  id: string;
  slug: string;
  name: string;
  locationValue: string;
  image: string;
  heroImage: string;
  description: string;
  whyInvest: string[];
  features: string[];
  highlights: string[];
  coordinates: [number, number];
};

export const destinations: Destination[] = [
  {
    id: "brno-stred",
    slug: "brno-stred",
    name: "Brno-střed",
    locationValue: "brno-stred",
    image:
      "https://ik.imagekit.io/affin/Brno-st%C5%99ed",
    heroImage:
      "https://ik.imagekit.io/affin/Brno-st%C5%99ed",
    description: "Historic core, Freedom Square, Špilberk Castle vistas.",
    whyInvest: [
      "Prime location in Brno's historic center with excellent connectivity",
      "High rental yields due to strong demand from students and professionals",
      "Cultural landmarks and vibrant nightlife increase property values",
      "Well-connected public transport and walkability to major attractions",
      "Limited new construction maintains property appreciation potential",
    ],
    features: [
      "Historic architecture",
      "Freedom Square proximity",
      "Špilberk Castle views",
      "Excellent public transport",
      "Vibrant cultural scene",
      "Top restaurants & cafes",
    ],
    highlights: [
      "5-minute walk to Freedom Square",
      "10-minute walk to Špilberk Castle",
      "Multiple tram and bus lines",
      "Pedestrian-friendly streets",
    ],
    coordinates: [49.195061, 16.606837],
  },
  {
    id: "masarykova-ctvrt",
    slug: "masarykova-ctvrt",
    name: "Masarykova čtvrť",
    locationValue: "masarykova-ctvrt",
    image:
      "https://ik.imagekit.io/affin/Masarykova-%C4%8Dtvr%C5%A5-brno-real-estate%20?updatedAt=1766414683420",
    heroImage:
      "https://ik.imagekit.io/affin/Masarykova-%C4%8Dtvr%C5%A5-brno-real-estate%20?updatedAt=1766414683420",
    description: "Garden villas and diplomatic residences in greenery.",
    whyInvest: [
      "Prestigious neighborhood with diplomatic residences and historic villas",
      "Large garden properties offer privacy and outdoor living space",
      "Strong appreciation potential due to limited inventory and high demand",
      "Excellent schools and family-friendly environment",
      "Proximity to city center while maintaining residential tranquility",
    ],
    features: [
      "Historic villas",
      "Large gardens",
      "Diplomatic residences",
      "Quiet residential streets",
      "Family-friendly",
      "Prestigious address",
    ],
    highlights: [
      "Heritage-protected architecture",
      "Generous plot sizes",
      "Mature tree-lined streets",
      "Close to city center",
    ],
    coordinates: [49.1909, 16.5898],
  },
  {
    id: "kralovo-pole",
    slug: "kralovo-pole",
    name: "Královo Pole",
    locationValue: "kralovo-pole",
    image:
      "https://images.unsplash.com/photo-1544989164-31dc3c645987?auto=format&fit=crop&w=960&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1544989164-31dc3c645987?auto=format&fit=crop&w=1920&q=80",
    description: "Innovation hub with hillside modern residences.",
    whyInvest: [
      "Growing tech hub with major employers like IBM, Red Hat, and Honeywell",
      "Modern residential developments with contemporary amenities",
      "Strong rental demand from tech professionals and expatriates",
      "Excellent infrastructure and connectivity to city center",
      "Hillside locations offer panoramic views and premium positioning",
    ],
    features: [
      "Tech company headquarters",
      "Modern architecture",
      "Hillside views",
      "Excellent infrastructure",
      "Growing expat community",
      "Innovation district",
    ],
    highlights: [
      "15-minute drive to city center",
      "Major tech employers nearby",
      "Modern residential complexes",
      "Panoramic city views",
    ],
    coordinates: [49.2262, 16.5911],
  },
  {
    id: "zabovresky",
    slug: "zabovresky",
    name: "Žabovřesky",
    locationValue: "zabovresky",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=960&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80",
    description: "Residential neighborhood with modern developments and green spaces.",
    whyInvest: [
      "Growing residential area with new developments and infrastructure",
      "Good connectivity to city center and major employment hubs",
      "Family-friendly environment with parks and recreational facilities",
      "Mix of traditional and modern housing options",
      "Strong potential for property value appreciation",
    ],
    features: [
      "Modern developments",
      "Green spaces",
      "Family-friendly",
      "Good connectivity",
      "Recreational facilities",
      "Mixed housing",
    ],
    highlights: [
      "Close to city center",
      "Parks and green areas",
      "Modern infrastructure",
      "Growing community",
    ],
    coordinates: [49.2169, 16.572],
  },
  {
    id: "prague-cz",
    slug: "prague-cz",
    name: "Prague, Czech Republic",
    locationValue: "prague-cz",
    image:
      "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=960&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1920&q=80",
    description: "Capital city with historic charm and modern luxury properties.",
    whyInvest: [
      "Capital city with strong property market and high demand",
      "Historic architecture combined with modern luxury developments",
      "Excellent rental yields from tourism and business travelers",
      "International appeal attracts global investors",
      "Stable property market with consistent appreciation",
    ],
    features: [
      "Historic architecture",
      "Modern luxury",
      "Tourism hub",
      "International appeal",
      "Strong rental market",
      "Capital city",
    ],
    highlights: [
      "Historic city center",
      "International airport access",
      "Cultural landmarks",
      "Business district",
    ],
    coordinates: [50.0755, 14.4378],
  },
  {
    id: "olomouc",
    slug: "olomouc",
    name: "Olomouc",
    locationValue: "olomouc",
    image:
      "https://ik.imagekit.io/affin/Olomouc",
    heroImage:
      "https://ik.imagekit.io/affin/Olomouc",
    description: "Historic university city with Baroque architecture and cultural heritage.",
    whyInvest: [
      "Historic university city with strong student rental market",
      "Baroque architecture and UNESCO heritage sites",
      "Affordable property prices compared to Prague and Brno",
      "Growing cultural scene and tourism potential",
      "Good investment opportunity for rental properties",
    ],
    features: [
      "Historic architecture",
      "University city",
      "Cultural heritage",
      "Affordable prices",
      "Student market",
      "Tourism potential",
    ],
    highlights: [
      "Historic city center",
      "University presence",
      "Baroque architecture",
      "Cultural events",
    ],
    coordinates: [49.5938, 17.2518],
  },
  {
    id: "brno-tech",
    slug: "brno-tech",
    name: "Brno Technology Park",
    locationValue: "brno-tech",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=960&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
    description: "Technology and innovation hub with modern office and residential spaces.",
    whyInvest: [
      "Major technology hub with leading international companies",
      "High demand for modern office and residential spaces",
      "Attracts tech professionals and expatriates",
      "Excellent infrastructure and connectivity",
      "Strong rental yields from corporate housing demand",
    ],
    features: [
      "Tech companies",
      "Modern offices",
      "Innovation hub",
      "Corporate housing",
      "Excellent infrastructure",
      "Expat community",
    ],
    highlights: [
      "Major tech employers",
      "Modern developments",
      "Corporate amenities",
      "International community",
    ],
    coordinates: [49.2289, 16.5712],
  },
  {
    id: "karlovy-vary",
    slug: "karlovy-vary",
    name: "Karlovy Vary",
    locationValue: "karlovy-vary",
    image:
      "https://ik.imagekit.io/affin/karlovyvary",
    heroImage:
      "https://ik.imagekit.io/affin/karlovyvary",
    description: "Historic spa town with elegant architecture and luxury properties.",
    whyInvest: [
      "World-renowned spa destination attracts international visitors year-round",
      "Historic architecture and elegant properties with high cultural value",
      "Strong tourism market creates excellent rental income potential",
      "Limited property availability in historic center increases value",
      "Prestigious location for luxury second homes and investment properties",
    ],
    features: [
      "Historic spa town",
      "Elegant architecture",
      "Luxury properties",
      "Tourism destination",
      "Cultural heritage",
      "International appeal",
    ],
    highlights: [
      "Historic spa colonnades",
      "International film festival",
      "Luxury hotels and resorts",
      "Scenic mountain views",
    ],
    coordinates: [50.2305, 12.8711],
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((dest) => dest.slug === slug);
}

export function getDestinationByLocationValue(
  locationValue: string,
): Destination | undefined {
  return destinations.find((dest) => dest.locationValue === locationValue);
}

