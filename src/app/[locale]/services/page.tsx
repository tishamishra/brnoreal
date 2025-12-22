import type { Metadata } from "next";
import { getServicesMetadata } from "@/lib/seo/metadata";
import { ServicesPageContent } from "@/components/services/services-page-content";

type ServicesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  return getServicesMetadata(locale);
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  return <ServicesPageContent locale={locale} />;
}
