"use client";

import Link from "next/link";
import { useTranslations } from "@/components/providers/locale-provider";

export function SiteFooter() {
  const t = useTranslations();
  return (
    <footer className="border-t border-[color:var(--footer-border)] bg-[color:var(--footer-bg)] text-[color:var(--footer-text)]">
      <div className="container grid gap-8 py-14 md:grid-cols-[minmax(0,1.3fr)_repeat(2,minmax(0,1fr))] md:items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:rgba(255,255,255,0.18)] bg-white/10 backdrop-blur">
              <span className="font-heading text-lg font-semibold uppercase tracking-[0.3em] text-[color:var(--footer-text)]">
                BR
              </span>
            </span>
            <div className="leading-tight">
              <p className="font-heading text-lg font-semibold uppercase tracking-[0.25em]">
                Brno Real Estate
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-[rgba(255,255,255,0.55)]">
                South Moravia
              </p>
            </div>
          </div>
          <p className="max-w-sm text-sm text-[rgba(255,255,255,0.65)]">
            {t.footer.brandTagline}
          </p>
        </div>

        {t.footer.navGroups.map((group) => (
          <div key={group.title} className="space-y-4">
            <h3 className="font-heading text-base font-semibold text-[rgba(255,255,255,0.85)]">
              {group.title}
            </h3>
            <ul className="space-y-2 text-sm text-[rgba(255,255,255,0.6)]">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-[color:var(--footer-text)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[color:var(--footer-border)] py-6">
        <div className="container flex flex-col gap-4 text-xs text-[rgba(255,255,255,0.55)] md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-[rgba(255,255,255,0.7)]">
            <span className="font-semibold">{t.footer.poweredBy.label}</span>
            <span aria-hidden="true">•</span>
            <span>{t.footer.poweredBy.byline}</span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs">
            {t.footer.legal.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-[color:var(--footer-text)]">
                {item.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-[rgba(255,255,255,0.55)]">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

