"use client";

import Image from "next/image";
import { LocaleLink } from "@/components/locale-link";
import { useTranslations } from "@/components/providers/locale-provider";

export function AboutSection() {
  const t = useTranslations();
  return (
    <section className="bg-white">
      <div className="container grid gap-10 py-20 md:grid-cols-[minmax(0,1fr)_minmax(0,460px)] md:items-center lg:py-24">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full border border-soft bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-neutral-700">
            {t.homeAbout.badge}
          </span>
          <h2 className="font-heading text-3xl font-semibold text-neutral-900 md:text-4xl">
            {t.homeAbout.heading}
          </h2>
          <div className="space-y-4 text-sm leading-7 text-neutral-600 md:text-base">
            {t.homeAbout.copy.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <LocaleLink href="/about/team" className="btn-primary text-sm">
              {t.homeAbout.ctaPrimary}
            </LocaleLink>
            <LocaleLink href="/services" className="btn-secondary text-sm">
              {t.homeAbout.ctaSecondary}
            </LocaleLink>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[36px] border border-soft bg-neutral-200 shadow-[0_40px_80px_-50px_rgba(15,23,42,0.4)]">
          <Image
            src="https://ik.imagekit.io/affin/brnoreality.jpeg?updatedAt=1766421021959"
            alt="Brno Real Estate - Our Story"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 460px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}

