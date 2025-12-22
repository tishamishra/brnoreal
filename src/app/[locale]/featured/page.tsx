import type { Metadata } from "next";
import { getFeaturedMetadata } from "@/lib/seo/metadata";
import { FeaturedPropertiesPageContent } from "@/components/home/featured-properties-page-content";

type FeaturedPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: FeaturedPageProps): Promise<Metadata> {
  const { locale } = await params;
  return getFeaturedMetadata(locale);
}

export default async function FeaturedPropertiesPage({ params }: FeaturedPageProps) {
  const { locale } = await params;
  return <FeaturedPropertiesPageContent locale={locale} />;
}
