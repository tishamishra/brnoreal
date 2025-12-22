import type { Metadata } from "next";
import { ResourceCard } from "@/components/resources/resource-card";
import { resources } from "@/data/sample-data";
import { ResourcesPageContent } from "@/components/resources/resources-page-content";

type ResourcesPageProps = {
  params: Promise<{ locale: string }>;
};

// SEO metadata with strict limits
function generateResourcesMetadata(locale: string): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://brnorealestate.com";
  
  const enMetadata = {
    title: "Brno Real Estate Resources & Guides",
    description: "Expert guides, market insights, and relocation resources for Brno and South Moravia real estate. Essential reading for buyers, sellers, and investors.",
  };

  const csMetadata = {
    title: "Zdroje a průvodci nemovitostmi v Brně",
    description: "Odborné průvodce, tržní analýzy a zdroje pro stěhování pro nemovitosti v Brně a na jižní Moravě. Nezbytné čtení pro kupující, prodávající a investory.",
  };

  const metadata = locale === "cs" ? csMetadata : enMetadata;

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/resources`,
      languages: {
        "en": `${baseUrl}/en/resources`,
        "cs": `${baseUrl}/cs/resources`,
      },
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: "website",
      locale: locale === "cs" ? "cs_CZ" : "en_US",
      alternateLocale: locale === "cs" ? "en_US" : "cs_CZ",
      url: `${baseUrl}/${locale}/resources`,
    },
  };
}

export async function generateMetadata({ params }: ResourcesPageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateResourcesMetadata(locale);
}

export default async function ResourcesPage({ params }: ResourcesPageProps) {
  const { locale } = await params;
  return <ResourcesPageContent locale={locale} />;
}
