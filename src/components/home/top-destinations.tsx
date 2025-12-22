"use client";

import Image from "next/image";
import { LocaleLink } from "@/components/locale-link";
import { useTranslations } from "@/components/providers/locale-provider";
import { destinations } from "@/data/destinations";

export function TopDestinationsSection() {
  const t = useTranslations();

  return (
    <section className="bg-site-canvas">
      <div className="container space-y-8 py-16 md:py-20">
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div className="space-y-2">
            <h2 className="font-heading text-3xl font-semibold text-neutral-900 md:text-4xl">
              {t.destinations.heading}
            </h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <LocaleLink
              key={destination.id}
              href={`/destinations/${destination.slug}`}
              className="group block overflow-hidden rounded-[28px] border border-soft bg-white shadow-[0_32px_60px_-40px_rgba(15,23,42,0.55)] transition hover:-translate-y-1 hover:shadow-[0_40px_70px_-45px_rgba(15,23,42,0.6)]"
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3 px-6 pb-6 pt-5">
                <h3 className="font-heading text-lg font-semibold text-neutral-900">
                  {destination.name}
                </h3>
                <p className="text-sm text-neutral-600">{destination.description}</p>
              </div>
            </LocaleLink>
          ))}
        </div>
      </div>
    </section>
  );
}

