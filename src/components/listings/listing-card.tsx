"use client";

import { useState } from "react";
import { LocaleLink } from "@/components/locale-link";
import Image from "next/image";
import { Listing, getPropertyTypeLabel } from "@/data/sample-data";
import { formatAreaSqm, formatBedsBaths, formatCurrency } from "@/lib/format";
import { useTranslations } from "@/components/providers/locale-provider";

type ListingCardProps = {
  listing: Listing;
  accent?: "home" | "internal";
};

// Fallback placeholder image
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

export function ListingCard({ listing, accent = "internal" }: ListingCardProps) {
  const t = useTranslations();
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(listing.image || FALLBACK_IMAGE);

  const handleImageError = () => {
    if (!imageError && imageSrc !== FALLBACK_IMAGE) {
      console.warn("Image failed to load, using fallback:", listing.image);
      setImageError(true);
      setImageSrc(FALLBACK_IMAGE);
    }
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-soft bg-white shadow-[0_30px_60px_-40px_rgba(0,0,0,0.45)] transition hover:-translate-y-1 hover:shadow-[0_30px_70px_-45px_rgba(0,0,0,0.55)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900 sm:aspect-[16/9]">
        <Image
          src={imageSrc}
          alt={listing.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 400px"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40" />
        <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-neutral-900 shadow sm:bottom-4 sm:left-4 sm:px-4 sm:py-2 sm:text-sm">
          {formatCurrency(listing.priceCZK)}
        </div>
        {listing.status === "featured" && (
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-black/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white sm:left-4 sm:top-4 sm:px-3 sm:text-xs sm:tracking-[0.3em]">
            {t.listings.featuredLabel}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6">
        <div className="space-y-1">
          <LocaleLink
            href={`/listings/${listing.slug}`}
            className={`font-heading text-xl font-semibold tracking-tight transition-colors ${accent === "home" ? "text-black hover:text-neutral-700" : "text-[#1d4ed8] hover:text-[#1e3a8a]"}`}
          >
            {listing.title}
          </LocaleLink>
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            {listing.location}
          </p>
        </div>

        <p className="text-sm text-neutral-600">{listing.description}</p>

        <ul className="grid grid-cols-3 gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-500 sm:gap-3 sm:text-xs sm:tracking-[0.25em]">
          <li className="rounded-2xl border border-soft bg-white px-3 py-2 text-neutral-800">
            {formatBedsBaths(listing.beds, listing.baths)}
          </li>
          <li className="rounded-2xl border border-soft bg-white px-3 py-2 text-neutral-800">
            {formatAreaSqm(listing.areaSqm)}
          </li>
          <li className="rounded-2xl border border-soft bg-white px-3 py-2 text-neutral-800">
            {getPropertyTypeLabel(listing.propertyType)}
          </li>
        </ul>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {t.listings.highlightsLabel}
          </p>
          <ul className="mt-2 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-700">
            {listing.highlights.map((item) => (
              <li
                key={item}
                className="rounded-full border border-soft bg-white px-3 py-1 text-neutral-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex items-center justify-between text-sm font-semibold text-neutral-800">
          <span>{formatCurrency(listing.priceCZK)}</span>
          <LocaleLink
            href={`/listings/${listing.slug}`}
            className="btn-secondary text-xs uppercase tracking-[0.3em]"
          >
            {t.listings.cardButton}
          </LocaleLink>
        </div>
      </div>
    </article>
  );
}

