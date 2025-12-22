import type { Metadata } from "next";
import { getAllPropertiesMetadata } from "@/lib/seo/metadata";
import { AllPropertiesPageContent } from "@/components/listings/all-properties-page-content";

type AllPropertiesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AllPropertiesPageProps): Promise<Metadata> {
  const { locale } = await params;
  return getAllPropertiesMetadata(locale);
}

export default async function AllPropertiesPage({ params }: AllPropertiesPageProps) {
  const { locale } = await params;
  return <AllPropertiesPageContent locale={locale} />;
}
