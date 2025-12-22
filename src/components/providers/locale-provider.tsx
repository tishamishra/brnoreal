"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useEffect,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale, Translations } from "@/lib/i18n/translations";
import { translations } from "@/lib/i18n/translations";
import { getLocaleFromPath, addLocaleToPath } from "@/lib/i18n/routing";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ 
  children,
  initialLocale,
}: { 
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Get locale from URL pathname (this is the source of truth after initial load)
  const locale = useMemo(() => {
    return getLocaleFromPath(pathname);
  }, [pathname]);

  const setLocale = useCallback((newLocale: Locale) => {
    if (newLocale === locale) return;
    
    // Update URL to new locale
    const newPath = addLocaleToPath(pathname, newLocale);
    router.push(newPath);
    
    // Set cookie for future visits
    if (typeof document !== "undefined") {
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    }
  }, [locale, pathname, router]);

  // Use locale from pathname as source of truth (it updates when URL changes)
  // initialLocale is only used for SSR/hydration, but pathname takes precedence
  const currentLocale = locale || initialLocale;

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale: currentLocale,
      setLocale,
      t: translations[currentLocale],
    }),
    [currentLocale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}

export function useTranslations() {
  const { t } = useLocale();
  return t;
}

