export type Locale = "en" | "cs";

type Destination = {
  name: string;
  image: string;
  description: string;
};

type TranslationShape = {
  language: {
    label: string;
    english: string;
    czech: string;
  };
  navigation: {
    listings: string;
    agents: string;
    offices: string;
    resources: string;
    contact: string;
    listProperty: string;
  };
  header: {
    badge: string;
    brand: string;
    tagline: string;
    phone: string;
    advisorCall: string;
  };
  hero: {
    badge: string;
    heading: string;
    subheading: string;
    investors: string;
    investorLocations: string[];
    advisorLabel: string;
    viewDetails: string;
  };
  heroSearch: {
    location: string;
    propertyType: string;
    startSearch: string;
      summary: string;
      summaryDefault: string;
      moreFilters: string;
  };
  destinations: {
    heading: string;
    viewAll: string;
    cards: Destination[];
    badge: string;
    whyInvest: {
      badge: string;
      heading: string;
      copy: string;
    };
    features: {
      heading: string;
      copy: string;
    };
    highlights: {
      heading: string;
    };
  };
  homeFeatured: {
    heading: string;
    viewAll: string;
    bedsLabel: string;
    bathsLabel: string;
    areaLabel: string;
  };
  homeAbout: {
    badge: string;
    heading: string;
    copy: string[];
    ctaPrimary: string;
    ctaSecondary: string;
  };
  listings: {
    badge: string;
    heading: string;
    subheading: string;
    empty: string;
    cardButton: string;
    highlightsLabel: string;
    featuredLabel: string;
    featuredToggle: string;
    featuredSummary: string;
  };
  listingDetail: {
    backToListings: string;
    price: string;
    scheduleTour: string;
    primaryContact: string;
    updated: string;
    overview: string;
    highlights: string;
    details: string;
    category: string;
    propertyType: string;
    area: string;
    bedsBaths: string;
    features: string;
    address: string;
    reference: string;
    referenceCopy: string;
    mortgage: {
      badge: string;
      heading: string;
      copy: string;
      monthly: string;
      loanAmount: string;
      downPayment: string;
      downPercent: string;
      interestRate: string;
      termYears: string;
      totalPaid: string;
      totalInterest: string;
    };
    privateViewing: {
      heading: string;
      copy: string;
      phoneLabel: string;
      emailLabel: string;
      cta: string;
    };
    similar: {
      heading: string;
      copy: string;
    };
  };
  agents: {
    badge: string;
    heading: string;
    subheading: string;
  };
  offices: {
    badge: string;
    heading: string;
    subheading: string;
  };
  resources: {
    badge: string;
    heading: string;
    subheading: string;
  };
  contact: {
    badge: string;
    heading: string;
    subheading: string;
    desks: Array<{
      title: string;
      description: string;
      contact: string;
    }>;
  };
  listProperty: {
    badge: string;
    heading: string;
    subheading: string;
    highlights: Array<{
      title: string;
      description: string;
      metric: string;
    }>;
    nextSteps: {
      heading: string;
      description: string;
      bullets: string[];
    };
  };
  forms: {
    contact: {
      fullName: string;
      email: string;
      phone: string;
      market: string;
      propertyInterest: string;
      message: string;
      submit: string;
      sending: string;
      success: string;
    };
    property: {
      owner: string;
      email: string;
      phone: string;
      market: string;
      category: string;
      priceRange: string;
      priceExpectation: string;
      bedrooms: string;
      bathrooms: string;
      interiorSize: string;
      narrative: string;
      highlights: string;
      submit: string;
      submitting: string;
      success: string;
      placeholders: {
        owner: string;
        email: string;
        phone: string;
        priceExpectation: string;
        bedrooms: string;
        bathrooms: string;
        interiorSize: string;
        narrative: string;
        highlights: string;
      };
    };
  };
  footer: {
    brandTagline: string;
    navGroups: Array<{
      title: string;
      items: Array<{ label: string; href: string }>;
    }>;
    legal: Array<{ label: string; href: string }>;
    poweredBy: { label: string; byline: string };
    copyright: string;
  };
};

export const translations: Record<Locale, TranslationShape> = {
  en: {
    language: {
      label: "Language",
      english: "English",
      czech: "Čeština",
    },
    navigation: {
      listings: "Listings",
      agents: "Agents",
      offices: "Offices",
      resources: "Resources",
      contact: "Contact",
      listProperty: "List in Brno",
    },
    header: {
      badge: "Brno Real Estate",
      brand: "Brno Real Estate",
      tagline: "Brno • Czech Republic",
      phone: "+420 539 012 345",
      advisorCall: "Call us",
    },
    hero: {
      badge: "Brno Real Estate",
      heading: "Live exceptionally in Brno's most coveted neighbourhoods.",
      subheading:
        "Explore curated residences, heritage villas, and investment opportunities guided by advisors who know Brno and South Moravia street by street.",
      investors: "Preferred by South Moravian investors",
      investorLocations: ["Brno-střed", "Masarykova čtvrť", "Královo Pole"],
      advisorLabel: "Lead Advisor",
      viewDetails: "View Details",
    },
    heroSearch: {
      location: "Location",
      propertyType: "Category",
      startSearch: "Start Search",
      summary: "Tailored experiences across South Moravia",
      summaryDefault: "All of South Moravia",
      moreFilters: "More filters",
    },
    destinations: {
      heading: "Top destinations around the Czech Republic",
      viewAll: "View All",
      badge: "Destination",
      whyInvest: {
        badge: "Investment Potential",
        heading: "Why invest in this location",
        copy: "Discover the unique advantages of owning property in this prestigious location.",
      },
      features: {
        heading: "Location Features",
        copy: "What makes this destination special",
      },
      highlights: {
        heading: "Key Highlights",
      },
      cards: [
        {
          name: "Brno-střed",
          image:
            "https://images.unsplash.com/photo-1543791550-843a8ba7c418?auto=format&fit=crop&w=960&q=80",
          description: "Historic core, Freedom Square, Špilberk Castle vistas.",
        },
        {
          name: "Masarykova čtvrť",
          image:
            "https://images.unsplash.com/photo-1590490360182-663063ad3b66?auto=format&fit=crop&w=960&q=80",
          description: "Garden villas and diplomatic residences in greenery.",
        },
        {
          name: "Královo Pole",
          image:
            "https://images.unsplash.com/photo-1544989164-31dc3c645987?auto=format&fit=crop&w=960&q=80",
          description: "Innovation hub with hillside modern residences.",
        },
        {
          name: "Lednice–Valtice",
          image:
            "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=960&q=80",
          description: "Chateaux estates amidst UNESCO-listed landscapes.",
        },
      ],
    },
    homeFeatured: {
      heading: "Featured Properties",
      viewAll: "View All",
      bedsLabel: "Beds",
      bathsLabel: "Baths",
      areaLabel: "m²",
    },
    homeAbout: {
      badge: "Our Story",
      heading: "Local mastery, international standards.",
      copy: [
        "Brno Real Estate is an independent advisory collective built in the city we call home. We curate architecturally significant residences, heritage villas, and investment assets for discerning clients across South Moravia and beyond.",
        "With 20+ specialists covering valuation, marketing, relocation, and capital advisory, every engagement is tailored, discreet, and anchored in neighbourhood-level intelligence.",
      ],
      ctaPrimary: "Meet the Team",
      ctaSecondary: "Discover Services",
    },
    listings: {
      badge: "Listings",
      heading: "Curated residences and investments across Brno and South Moravia.",
      subheading:
        "Currently showing opportunities in {filters}. Refine by neighbourhood, property type, or investment profile.",
      empty:
        "No listings match your filters. Adjust your search to explore more opportunities within the Brno Real Estate collection.",
      cardButton: "View Details",
      highlightsLabel: "Highlights",
      featuredLabel: "Featured",
      featuredToggle: "Featured only",
      featuredSummary: "Featured",
    },
    listingDetail: {
      backToListings: "Return to listings",
      price: "Offered at",
      scheduleTour: "Arrange a private viewing",
      primaryContact: "Concierge desk",
      updated: "Updated this week",
      overview: "Property overview",
      highlights: "Signature highlights",
      details: "At a glance",
      category: "Category",
      propertyType: "Property type",
      area: "Interior area",
      bedsBaths: "Beds · baths",
      features: "Included features",
      address: "Address",
      reference: "Reference ID",
      referenceCopy: "Quote this reference when speaking with our advisory team.",
      mortgage: {
        badge: "Financial planning",
        heading: "Calculate your mortgage payment",
        copy: "Model repayment scenarios by adjusting interest rate, term, and down payment.",
        monthly: "Estimated monthly payment",
        loanAmount: "Loan amount",
        downPayment: "Down payment",
        downPercent: "Down payment %",
        interestRate: "Interest rate (%)",
        termYears: "Term (years)",
        totalPaid: "Total paid over term",
        totalInterest: "Total interest over term",
      },
      privateViewing: {
        heading: "Arrange a private tour",
        copy: "Coordinate an in-person or virtual viewing with our concierge team. We tailor each tour to your schedule and priorities.",
        phoneLabel: "Direct",
        emailLabel: "Email",
        cta: "Request concierge scheduling",
      },
      similar: {
        heading: "Explore similar residences",
        copy: "Discover additional properties that match this profile across the Brno Real Estate portfolio.",
      },
    },
    agents: {
      badge: "Agents",
      heading: "Meet the specialists guiding Brno's prime property market.",
      subheading:
        "Our locally rooted advisors offer discreet service, neighbourhood intelligence, and tailored strategies for every acquisition, sale, or relocation across Brno and South Moravia.",
    },
    offices: {
      badge: "Offices",
      heading: "Experience our Brno galleries and advisory lounges.",
      subheading:
        "Visit our flagship spaces across Brno and Prague for tailored market intelligence, project marketing, and private client concierge.",
    },
    resources: {
      badge: "Resources",
      heading: "Insights and guidance for Brno and South Moravia real estate.",
      subheading:
        "Stay informed with our regional market reports, relocation playbooks, and investment strategies curated by senior advisors.",
    },
    contact: {
      badge: "Contact",
      heading: "Connect with a Brno specialist for tailored guidance.",
      subheading:
        "Share your plans and timelines—our team will coordinate a bespoke consultation, whether you're acquiring, divesting, or relocating within Brno and South Moravia.",
      desks: [
        {
          title: "Brno Client Desk",
          description:
            "Priority assistance for time-sensitive negotiations and private viewings across the Brno market.",
          contact: "+420 539 012 300",
        },
        {
          title: "Private Client Services",
          description:
            "Portfolio strategies, valuation, and access to exclusive off-market opportunities across South Moravia.",
          contact: "private@brnore.cz",
        },
        {
          title: "Relocation Concierge",
          description:
            "Dedicated specialists orchestrating visas, education placement, and lifestyle onboarding.",
          contact: "relocation@brnore.cz",
        },
      ],
    },
    listProperty: {
      badge: "List in Brno",
      heading: "Present your Brno property to the region’s most qualified buyers.",
      subheading:
        "Submit your residence to Brno Real Estate and collaborate with a locally rooted team specialising in discreet placements, bespoke marketing, and refined buyer matchmaking.",
      highlights: [
        {
          title: "Regional Exposure",
          description:
            "Targeted placement across South Moravian premium channels and curated investor networks.",
          metric: "Top 1% listings",
        },
        {
          title: "Story-driven Marketing",
          description:
            "Art-direct photography, Czech-English campaign assets, and data-led buyer targeting.",
          metric: "10-day launch",
        },
        {
          title: "Private Buyer Access",
          description:
            "Direct introductions to vetted executives, technology founders, and returning expatriates.",
          metric: "350+ clients",
        },
      ],
      nextSteps: {
        heading: "What happens next?",
        description:
          "Within one business day a senior advisor will coordinate a private consultation, review marketing strategies, and align timelines for due diligence and launch.",
        bullets: [
          "• Property valuation with comparative market intelligence",
          "• Concierge coordination for staging, media production, and legal",
          "• Exclusive preview to qualified buyers before public release",
        ],
      },
    },
    forms: {
      contact: {
        fullName: "Full Name",
        email: "Email",
        phone: "Phone",
        market: "Preferred Market",
        propertyInterest: "Property Interest",
        message: "How can we help?",
        submit: "Connect with an Advisor",
        sending: "Sending...",
        success: "Thank you — an advisor will be in touch shortly.",
      },
      property: {
        owner: "Property Owner",
        email: "Email",
        phone: "Phone",
        market: "Preferred Market",
        category: "Property Category",
        priceRange: "Desired Price Range",
        priceExpectation: "Price Expectation",
        bedrooms: "Bedrooms",
        bathrooms: "Bathrooms",
        interiorSize: "Interior Size (m²)",
        narrative: "Property Narrative",
        highlights: "Additional Highlights (optional)",
        submit: "Submit Property",
        submitting: "Submitting...",
        success: "Thank you — our team will reach out within 24 hours.",
        placeholders: {
          owner: "Alex Bennett",
          email: "owner@brnore.cz",
          phone: "+420 603 455 218",
          priceExpectation: "26 500 000 Kč",
          bedrooms: "5",
          bathrooms: "4",
          interiorSize: "450",
          narrative:
            "Describe architectural details, views, amenities, recent upgrades, and ideal buyer positioning.",
          highlights:
            "Include notable amenities, certifications, concierge services, or partnerships.",
        },
      },
    },
    footer: {
      brandTagline:
        "Boutique advisory rooted in Brno, delivering global-standard marketing and service.",
      navGroups: [
        {
          title: "Home",
          items: [
            { label: "Search", href: "/listings" },
            { label: "Featured properties", href: "/featured" },
            { label: "All properties", href: "/all-properties" },
          ],
        },
        {
          title: "Properties",
          items: [
            { label: "Homes for Sale", href: "/listings/category/homes-sale" },
            { label: "Homes for Rent", href: "/listings/category/homes-rent" },
            { label: "Commercial for Sale", href: "/listings/category/commercial-sale" },
            { label: "Commercial for Rent", href: "/listings/category/commercial-rent" },
            { label: "Land for Sale", href: "/listings/category/land-sale" },
            { label: "Land for Rent", href: "/listings/category/land-rent" },
            { label: "Investment Buildings", href: "/listings/category/investment-building" },
          ],
        },
      ],
      legal: [
        { label: "Privacy Notice", href: "/privacy" },
        { label: "Terms of Use", href: "/terms" },
        { label: "Do Not Sell My Info", href: "/privacy/do-not-sell" },
        { label: "DMCA Notice", href: "/dmca" },
        { label: "Site Map", href: "/site-map" },
      ],
      poweredBy: {
        label: "Brno Real Estate",
        byline: "Powered by local intelligence",
      },
      copyright: `© ${new Date().getFullYear()} Brno Real Estate. All rights reserved.`,
    },
  },
  cs: {
    language: {
      label: "Jazyk",
      english: "English",
      czech: "Čeština",
    },
    navigation: {
      listings: "Nemovitosti",
      agents: "Makléři",
      offices: "Kanceláře",
      resources: "Zdroje",
      contact: "Kontakt",
      listProperty: "Nabídnout v Brně",
    },
    header: {
      badge: "Brno Real Estate",
      brand: "Brno Real Estate",
      tagline: "Brno • Česká republika",
      phone: "+420 539 012 345",
      advisorCall: "Zavolejte nám",
    },
    hero: {
      badge: "Brno Real Estate",
      heading: "Žijte výjimečně v nejžádanějších částech Brna.",
      subheading:
        "Objevujte kurátorované rezidence, historické vily a investiční příležitosti s poradci, kteří znají Brno a jižní Moravu ulice po ulici.",
      investors: "Preferovaná volba jihomoravských investorů",
      investorLocations: ["Brno-střed", "Masarykova čtvrť", "Královo Pole"],
      advisorLabel: "Vedoucí makléřka",
      viewDetails: "Zobrazit detail",
    },
    heroSearch: {
      location: "Lokalita",
      propertyType: "Kategorie",
      startSearch: "Zahájit hledání",
      summary: "Zážitek na míru napříč jižní Moravou",
      summaryDefault: "Celá jižní Morava",
      moreFilters: "Další filtry",
    },
    destinations: {
      heading: "Nejvyhledávanější lokality po celé České republice",
      viewAll: "Zobrazit vše",
      badge: "Lokalita",
      whyInvest: {
        badge: "Investiční potenciál",
        heading: "Proč investovat do této lokality",
        copy: "Objevte jedinečné výhody vlastnictví nemovitosti v této prestižní lokalitě.",
      },
      features: {
        heading: "Vlastnosti lokality",
        copy: "Co dělá tuto lokalitu výjimečnou",
      },
      highlights: {
        heading: "Klíčové výhody",
      },
      cards: [
        {
          name: "Brno-střed",
          image:
            "https://images.unsplash.com/photo-1543791550-843a8ba7c418?auto=format&fit=crop&w=960&q=80",
          description: "Historické centrum, Náměstí Svobody a výhledy na Špilberk.",
        },
        {
          name: "Masarykova čtvrť",
          image:
            "https://images.unsplash.com/photo-1590490360182-663063ad3b66?auto=format&fit=crop&w=960&q=80",
          description: "Zahradní vily a rezidence diplomatů v zeleni.",
        },
        {
          name: "Královo Pole",
          image:
            "https://images.unsplash.com/photo-1544989164-31dc3c645987?auto=format&fit=crop&w=960&q=80",
          description: "Inovační čtvrť s moderním bydlením na svazích.",
        },
        {
          name: "Lednice–Valtice",
          image:
            "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=960&q=80",
          description: "Zámecké areály uprostřed krajin UNESCO.",
        },
      ],
    },
    homeFeatured: {
      heading: "Vybrané nemovitosti",
      viewAll: "Zobrazit vše",
      bedsLabel: "Ložnice",
      bathsLabel: "Koupelny",
      areaLabel: "m²",
    },
    homeAbout: {
      badge: "O nás",
      heading: "Lokální mistrovství, mezinárodní standard.",
      copy: [
        "Brno Real Estate je nezávislý poradenský tým zakořeněný v městě, které nazýváme domovem. Kurátorujeme architektonicky výjimečné rezidence, historické vily i investiční aktiva pro náročné klienty po celé jižní Moravě a dál.",
        "Více než 20 specialistů pokrývá oceňování, marketing, relokace i kapitálové poradenství. Každá spolupráce je diskrétní, na míru a postavená na detailní znalosti čtvrtí.",
      ],
      ctaPrimary: "Poznejte tým",
      ctaSecondary: "Naše služby",
    },
    listings: {
      badge: "Nemovitosti",
      heading: "Kurátorované rezidence a investice v Brně a na jižní Moravě.",
      subheading:
        "Aktuálně zobrazujeme nabídky v {filters}. Upřesněte dle čtvrti, typu nemovitosti nebo investičního profilu.",
      empty:
        "Žádná nabídka neodpovídá zadaným filtrům. Upravte vyhledávání a prozkoumejte další příležitosti v portfoliu Brno Real Estate.",
      cardButton: "Zobrazit detail",
      highlightsLabel: "Přednosti",
      featuredLabel: "Doporučujeme",
      featuredToggle: "Jen doporučené",
      featuredSummary: "Doporučené",
    },
    listingDetail: {
      backToListings: "Zpět na nabídky",
      price: "Nabídková cena",
      scheduleTour: "Domluvit soukromou prohlídku",
      primaryContact: "Concierge tým",
      updated: "Aktualizováno tento týden",
      overview: "Přehled nemovitosti",
      highlights: "Klíčové přednosti",
      details: "Základní informace",
      category: "Kategorie",
      propertyType: "Typ nemovitosti",
      area: "Podlahová plocha",
      bedsBaths: "Ložnice · koupelny",
      features: "Výbava",
      address: "Adresa",
      reference: "Referenční ID",
      referenceCopy:
        "Při komunikaci s naším týmem uveďte toto referenční číslo.",
      mortgage: {
        badge: "Finanční plánování",
        heading: "Spočítejte si splátku hypotéky",
        copy: "Upravte úrokovou sazbu, dobu splácení a výši akontace a získejte orientační splátkový kalendář.",
        monthly: "Odhad měsíční splátky",
        loanAmount: "Výše úvěru",
        downPayment: "Akontace",
        downPercent: "Akontace %",
        interestRate: "Úroková sazba (%)",
        termYears: "Doba splácení (roky)",
        totalPaid: "Celkem zaplaceno",
        totalInterest: "Celkové úroky",
      },
      privateViewing: {
        heading: "Zařiďte si soukromou prohlídku",
        copy: "Concierge tým připraví osobní nebo virtuální prohlídku podle vašich časových možností.",
        phoneLabel: "Telefon",
        emailLabel: "E-mail",
        cta: "Kontaktovat concierge",
      },
      similar: {
        heading: "Podobné nemovitosti",
        copy: "Objevte další nabídky s podobným profilem v portfoliu Brno Real Estate.",
      },
    },
    agents: {
      badge: "Makléři",
      heading: "Poznejte specialisty, kteří formují prémiový trh v Brně.",
      subheading:
        "Naši lokální poradci poskytují diskrétní servis, detailní znalost čtvrtí a strategie na míru pro nákupy, prodeje i relokace v Brně a na jižní Moravě.",
    },
    offices: {
      badge: "Kanceláře",
      heading: "Navštivte naše brněnské galerie a poradenské lounge.",
      subheading:
        "Zastavte se v našich vlajkových prostorách v Brně a Praze pro individuální tržní analýzu, projektový marketing a concierge pro privátní klientelu.",
    },
    resources: {
      badge: "Zdroje",
      heading: "Analýzy a doporučení pro realitní trh Brna a jižní Moravy.",
      subheading:
        "Zůstaňte v obraze díky regionálním tržním reportům, relokačním manuálům a investičním strategiím od našich seniorních poradců.",
    },
    contact: {
      badge: "Kontakt",
      heading: "Spojte se s brněnským specialistou pro řešení na míru.",
      subheading:
        "Sdělte své plány a časový rámec — tým zajistí individuální konzultaci, ať už kupujete, prodáváte nebo se stěhujete v rámci Brna a jižní Moravy.",
      desks: [
        {
          title: "Klientské centrum Brno",
          description:
            "Prioritní asistence pro časově citlivá jednání a soukromé prohlídky napříč brněnským trhem.",
          contact: "+420 539 012 300",
        },
        {
          title: "Privátní klientský servis",
          description:
            "Strategie portfolia, oceňování a přístup k exkluzivním neveřejným nabídkám po celé jižní Moravě.",
          contact: "private@brnore.cz",
        },
        {
          title: "Relokační concierge",
          description:
            "Specialisté na víza, školství a lifestyle onboarding pro nové obyvatele regionu.",
          contact: "relocation@brnore.cz",
        },
      ],
    },
    listProperty: {
      badge: "Nabídnout v Brně",
      heading: "Oslovte nejkvalifikovanější kupce v Brně a na jižní Moravě.",
      subheading:
        "Představte svou nemovitost prostřednictvím Brno Real Estate a spolupracujte s týmem, který se specializuje na diskrétní prodej, marketing na míru a přesné párování kupců.",
      highlights: [
        {
          title: "Regionální dosah",
          description:
            "Cílená prezentace v prémiových jihomoravských kanálech a v kurátorské investor databázi.",
          metric: "Top 1% nabídek",
        },
        {
          title: "Příběhový marketing",
          description:
            "Art-direkt fotografie, kampaně v češtině i angličtině a datově řízené zacílení.",
          metric: "Launch do 10 dnů",
        },
        {
          title: "Privátní kupci",
          description:
            "Přímé propojení s prověřenými manažery, technologickými lídry a navrátilci ze zahraničí.",
          metric: "350+ klientů",
        },
      ],
      nextSteps: {
        heading: "Co následuje?",
        description:
          "Do jednoho pracovního dne vás kontaktuje seniorní poradce, probere marketingovou strategii a sladí harmonogram due diligence a uvedení na trh.",
        bullets: [
          "• Ocenění nemovitosti s tržní analýzou",
          "• Concierge pro homestaging, média a právní servis",
          "• Exkluzivní představení prověřeným kupcům před oficiálním uvedením",
        ],
      },
    },
    forms: {
      contact: {
        fullName: "Celé jméno",
        email: "E-mail",
        phone: "Telefon",
        market: "Preferovaná lokalita",
        propertyInterest: "Typ zájmu",
        message: "Jak vám můžeme pomoci?",
        submit: "Spojit s poradcem",
        sending: "Odesíláme…",
        success: "Děkujeme — brzy se vám ozve náš poradce.",
      },
      property: {
        owner: "Vlastník nemovitosti",
        email: "E-mail",
        phone: "Telefon",
        market: "Preferovaná lokalita",
        category: "Typ nemovitosti",
        priceRange: "Očekávané cenové rozpětí",
        priceExpectation: "Odhadovaná cena",
        bedrooms: "Počet ložnic",
        bathrooms: "Počet koupelen",
        interiorSize: "Podlahová plocha (m²)",
        narrative: "Popis nemovitosti",
        highlights: "Doplňující přednosti (volitelné)",
        submit: "Odeslat nabídku",
        submitting: "Odesíláme…",
        success: "Děkujeme — náš tým se vám do 24 hodin ozve.",
        placeholders: {
          owner: "Alex Bennett",
          email: "vlastnik@brnore.cz",
          phone: "+420 603 455 218",
          priceExpectation: "26 500 000 Kč",
          bedrooms: "5",
          bathrooms: "4",
          interiorSize: "450",
          narrative:
            "Popište architekturu, výhledy, vybavení, rekonstrukce a ideálního kupce.",
          highlights:
            "Uveďte výjimečné přednosti, certifikace, concierge služby či partnerství.",
        },
      },
    },
    footer: {
      brandTagline:
        "Boutique poradenská kancelář z Brna s globálním standardem servisu a marketingu.",
      navGroups: [
        {
          title: "Domů",
          items: [
            { label: "Vyhledávání", href: "/listings" },
            { label: "Doporučené nemovitosti", href: "/featured" },
            { label: "Všechny nemovitosti", href: "/all-properties" },
          ],
        },
        {
          title: "Nemovitosti",
          items: [
            { label: "Domy na prodej", href: "/listings/category/homes-sale" },
            { label: "Domy k pronájmu", href: "/listings/category/homes-rent" },
            { label: "Komerční objekty", href: "/listings/category/commercial-sale" },
            { label: "Komerční nájmy", href: "/listings/category/commercial-rent" },
            { label: "Pozemky na prodej", href: "/listings/category/land-sale" },
            { label: "Pozemky k pronájmu", href: "/listings/category/land-rent" },
            { label: "Investiční budovy", href: "/listings/category/investment-building" },
          ],
        },
      ],
      legal: [
        { label: "Ochrana soukromí", href: "/privacy" },
        { label: "Podmínky užití", href: "/terms" },
        { label: "Neprodávat údaje", href: "/privacy/do-not-sell" },
        { label: "DMCA oznámení", href: "/dmca" },
        { label: "Mapa stránek", href: "/site-map" },
      ],
      poweredBy: {
        label: "Brno Real Estate",
        byline: "Postaveno na lokální expertíze",
      },
      copyright: `© ${new Date().getFullYear()} Brno Real Estate. Všechna práva vyhrazena.`,
    },
  },
};

export type Translations = typeof translations["en"];

