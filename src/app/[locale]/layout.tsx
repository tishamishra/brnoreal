import type { Metadata } from "next";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { LocaleHtmlLang } from "@/components/locale-html-lang";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { locales } from "@/lib/i18n/routing";
import type { Locale } from "@/lib/i18n/translations";
import { notFound } from "next/navigation";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

import { getHomepageMetadata } from "@/lib/seo/metadata";

// Generate metadata for SEO (homepage default)
export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  return getHomepageMetadata(locale);
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <LocaleProvider initialLocale={locale as Locale}>
      <LocaleHtmlLang />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </LocaleProvider>
  );
}

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

