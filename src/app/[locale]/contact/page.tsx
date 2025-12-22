import type { Metadata } from "next";
import { use } from "react";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactPageContent } from "@/components/contact/contact-page-content";
import { getContactMetadata } from "@/lib/seo/metadata";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  return getContactMetadata(locale);
}

export default async function ContactPage({ params, searchParams }: ContactPageProps) {
  const { locale } = await params;
  const searchParamsValue = await searchParams;
  return <ContactPageContent locale={locale} searchParams={searchParamsValue} />;
}
