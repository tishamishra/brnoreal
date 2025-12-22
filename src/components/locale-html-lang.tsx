"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPath } from "@/lib/i18n/routing";

export function LocaleHtmlLang() {
  const pathname = usePathname();
  
  useEffect(() => {
    const locale = getLocaleFromPath(pathname);
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [pathname]);

  return null;
}

