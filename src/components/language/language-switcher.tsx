"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/providers/locale-provider";
import { addLocaleToPath } from "@/lib/i18n/routing";

const languages = [
  { value: "en" as const, label: "EN" },
  { value: "cs" as const, label: "CS" },
];

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();
  const pathname = usePathname();

  const label = useMemo(() => {
    if (locale === "en") {
      return t.language.english;
    }
    return t.language.czech;
  }, [locale, t.language.czech, t.language.english]);

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-xs font-medium uppercase tracking-[0.3em] text-muted lg:inline">
        {t.language.label}
      </span>
      <div className="flex items-center gap-1 rounded-full border border-soft bg-white/80 p-1 shadow-sm shadow-black/5">
        {languages.map((lang) => {
          const isActive = lang.value === locale;
          return (
            <button
              key={lang.value}
              type="button"
              onClick={() => setLocale(lang.value)}
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] transition ${
                isActive
                  ? "bg-[color:var(--brand-500)] text-white shadow"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
              aria-pressed={isActive}
            >
              {lang.label}
            </button>
          );
        })}
      </div>
      <span className="text-xs font-medium text-muted lg:hidden">{label}</span>
    </div>
  );
}

