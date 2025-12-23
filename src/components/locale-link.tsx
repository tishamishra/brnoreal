"use client";

import Link from "next/link";
import { useLocale } from "@/components/providers/locale-provider";
import { addLocaleToPath } from "@/lib/i18n/routing";
import type { ComponentProps } from "react";

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

export function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const { locale } = useLocale();
  
  // Don't add locale to external URLs or URLs that already have locale
  if (href.startsWith("http") || href.startsWith("/admin") || href.startsWith("/api")) {
    return <Link href={href} {...props} />;
  }

  // Check if href already has a locale
  const hasLocale = href.startsWith("/en/") || href.startsWith("/cs/");
  if (hasLocale) {
    return <Link href={href} {...props} />;
  }

  const localizedHref = addLocaleToPath(href, locale);
  return <Link href={localizedHref} {...props} />;
}


