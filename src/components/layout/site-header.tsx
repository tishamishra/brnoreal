"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "react-feather";
import { LanguageSwitcher } from "@/components/language/language-switcher";
import { useTranslations } from "@/components/providers/locale-provider";
import { LocaleLink } from "@/components/locale-link";

export function SiteHeader() {
  const t = useTranslations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigation = [
    { href: "/listings", label: t.navigation.listings },
    { href: "/agents", label: t.navigation.agents },
    { href: "/offices", label: t.navigation.offices },
    { href: "/resources", label: t.navigation.resources },
    { href: "/contact", label: t.navigation.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-white/90 shadow-sm shadow-black/5 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4 sm:h-20 sm:gap-6">
        <LocaleLink href="/" className="flex items-center gap-1.5 sm:gap-2">
          <div className="relative h-24 w-24 sm:h-28 sm:w-28">
            <Image
              src="https://ik.imagekit.io/affin/brno%20real%20estate%20logo"
              alt={t.header.brand}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 96px, 112px"
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-heading text-base font-semibold uppercase tracking-widest text-neutral-950 sm:text-lg">
              {t.header.brand}
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted sm:text-xs">
              {t.header.tagline}
            </span>
          </div>
        </LocaleLink>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-neutral-700 lg:flex">
          {navigation.map((item) => (
            <LocaleLink
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-neutral-950"
            >
              {item.label}
            </LocaleLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <LocaleLink href="/list-your-property" className="btn-primary text-sm">
            {t.navigation.listProperty}
          </LocaleLink>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-soft bg-white text-neutral-800 transition hover:border-neutral-300 hover:text-neutral-950 sm:h-11 sm:w-11"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-soft bg-white lg:hidden">
          <nav className="container flex flex-col gap-0 py-4">
            {navigation.map((item) => (
              <LocaleLink
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-950"
              >
                {item.label}
              </LocaleLink>
            ))}
            <div className="mt-2 border-t border-soft pt-2">
              <LocaleLink
                href="/list-your-property"
                onClick={() => setMobileMenuOpen(false)}
                className="mx-4 block rounded-full bg-[color:var(--brand-500)] px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[color:var(--brand-600)]"
              >
                {t.navigation.listProperty}
              </LocaleLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

