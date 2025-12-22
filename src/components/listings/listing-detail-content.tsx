"use client";

import Image from "next/image";
import { LocaleLink } from "@/components/locale-link";
import { Calendar, ChevronLeft, MapPin, Move, User } from "react-feather";
import { useMemo } from "react";
import { useTranslations } from "@/components/providers/locale-provider";
import {
  type Listing,
  getCategoryLabel,
  getLocationLabel,
  getPropertyTypeLabel,
} from "@/data/sample-data";
import {
  formatAreaSqm,
  formatBedsBaths,
  formatCurrency,
} from "@/lib/format";

type ListingDetailContentProps = {
  listing: Listing;
  similarListings: Listing[];
};

export function ListingDetailContent({
  listing,
  similarListings,
}: ListingDetailContentProps) {
  const t = useTranslations();

  const categoryLabel = useMemo(
    () => getCategoryLabel(listing.category),
    [listing.category],
  );
  const typeLabel = useMemo(
    () => getPropertyTypeLabel(listing.propertyType),
    [listing.propertyType],
  );
  const locationLabel = useMemo(
    () => getLocationLabel(listing.locationValue),
    [listing.locationValue],
  );

  return (
    <div className="bg-site-canvas pb-20">
      <div className="container space-y-10 py-10">
        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
          <LocaleLink
            href="/listings"
            className="inline-flex items-center gap-2 rounded-full border border-soft bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-600 transition hover:text-neutral-900"
          >
            <ChevronLeft size={16} />
            {t.listingDetail.backToListings}
          </LocaleLink>
          <span className="h-2 w-2 rounded-full bg-neutral-300" />
          <span>{categoryLabel}</span>
          <span className="h-2 w-2 rounded-full bg-neutral-300" />
          <span>{typeLabel}</span>
        </div>

        <header className="space-y-4">
          <span className="inline-flex items-center rounded-full border border-soft bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-600">
            {t.listings.featuredLabel}
          </span>
          <h1 className="font-heading text-3xl font-semibold text-neutral-950 sm:text-4xl md:text-5xl">
            {listing.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} />
              {listing.streetAddress}, {listing.postalCode} {locationLabel}
            </span>
            <span className="inline-flex items-center gap-2">
              <User size={16} />
              {t.listingDetail.primaryContact}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar size={16} />
              {t.listingDetail.updated}
            </span>
          </div>
        </header>

        <div className="relative aspect-[16/9] overflow-hidden rounded-[36px] border border-soft bg-neutral-950 shadow-[0_35px_60px_-45px_rgba(15,23,42,0.55)]">
          <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/35" />
          <Image
            src={listing.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"}
            alt={listing.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 90vw, (max-width: 1280px) 90vw, 1200px"
            priority
            onError={(e) => {
              console.warn("Image failed to load:", listing.image);
            }}
          />
          <div className="absolute bottom-6 right-6 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-900">
            {locationLabel}
          </div>
        </div>

        <section className="grid gap-6 md:gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <article className="space-y-8 rounded-[32px] border border-soft bg-white/90 p-8 shadow-[0_30px_60px_-45px_rgba(15,23,42,0.55)]">
            <div className="space-y-3">
              <h2 className="font-heading text-2xl font-semibold text-neutral-900">
                {t.listingDetail.overview}
              </h2>
              <p className="text-sm text-neutral-600">{listing.description}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3 rounded-3xl border border-soft bg-white/90 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  {t.listingDetail.highlights}
                </p>
                <ul className="space-y-2 text-sm text-neutral-700">
                  {listing.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="block h-2 w-2 rounded-full bg-[#1d4ed8]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3 rounded-3xl border border-soft bg-white/90 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  {t.listingDetail.details}
                </p>
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li className="flex items-center justify-between">
                    <span>{t.listingDetail.category}</span>
                    <span className="font-semibold text-neutral-900">
                      {categoryLabel}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>{t.listingDetail.propertyType}</span>
                    <span className="font-semibold text-neutral-900">
                      {typeLabel}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>{t.listingDetail.area}</span>
                    <span className="font-semibold text-neutral-900">
                      {formatAreaSqm(listing.areaSqm)}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>{t.listingDetail.bedsBaths}</span>
                    <span className="font-semibold text-neutral-900">
                      {formatBedsBaths(listing.beds, listing.baths)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {listing.features && listing.features.length > 0 ? (
              <div className="space-y-3">
                <h3 className="font-heading text-xl font-semibold text-neutral-900">
                  {t.listingDetail.features}
                </h3>
                <ul className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-600">
                  {listing.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-full border border-soft bg-white px-4 py-2 text-neutral-800"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="grid gap-6 rounded-3xl border border-dashed border-soft bg-white/70 p-6 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  {t.listingDetail.address}
                </p>
                <p className="mt-2 font-semibold text-neutral-900">
                  {listing.streetAddress}
                </p>
                <p className="text-sm text-neutral-600">
                  {listing.postalCode} {locationLabel}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  {t.listingDetail.reference}
                </p>
                <p className="mt-2 font-semibold text-neutral-900">
                  {listing.id.toUpperCase()}
                </p>
                <p className="text-sm text-neutral-600">
                  {t.listingDetail.referenceCopy}
                </p>
              </div>
            </div>
          </article>

          <aside className="space-y-8">
            <div className="space-y-2 rounded-3xl border border-soft bg-white/80 p-6 text-sm shadow-[0_25px_60px_-45px_rgba(15,23,42,0.4)]">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                {t.listingDetail.price}
              </p>
              <p className="font-heading text-3xl font-semibold text-[#1d4ed8]">
                {formatCurrency(listing.priceCZK)}
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2 text-xs uppercase tracking-[0.25em] text-neutral-500">
                <div className="rounded-2xl border border-soft bg-white px-3 py-2 text-neutral-800">
                  {formatBedsBaths(listing.beds, listing.baths)}
                </div>
                <div className="rounded-2xl border border-soft bg-white px-3 py-2 text-neutral-800">
                  {formatAreaSqm(listing.areaSqm)}
                </div>
                <div className="rounded-2xl border border-soft bg-white px-3 py-2 text-neutral-800">
                  {typeLabel}
                </div>
              </div>
              <LocaleLink 
                href={`/contact?listing=${encodeURIComponent(listing.title)}&listingId=${encodeURIComponent(listing.id)}&location=${encodeURIComponent(listing.locationValue)}&propertyType=${encodeURIComponent(listing.propertyType)}`}
                className="btn-primary mt-4 w-full text-sm"
              >
                {t.listingDetail.scheduleTour}
              </LocaleLink>
            </div>

            <div className="rounded-[32px] border border-soft bg-white/90 p-8 shadow-[0_25px_60px_-45px_rgba(15,23,42,0.55)]">
              <h3 className="font-heading text-xl font-semibold text-neutral-900">
                {t.listingDetail.privateViewing.heading}
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                {t.listingDetail.privateViewing.copy}
              </p>
              <div className="mt-5 space-y-3 text-sm text-neutral-700">
                <p>
                  <span className="font-semibold text-neutral-900">
                    {t.listingDetail.privateViewing.phoneLabel}
                  </span>{" "}
                  +420 539 012 345
                </p>
                <p>
                  <span className="font-semibold text-neutral-900">
                    {t.listingDetail.privateViewing.emailLabel}
                  </span>{" "}
                  concierge@brnorealestate.cz
                </p>
              </div>
              <LocaleLink 
                href={`/contact?listing=${encodeURIComponent(listing.title)}&listingId=${encodeURIComponent(listing.id)}&location=${encodeURIComponent(listing.locationValue)}&propertyType=${encodeURIComponent(listing.propertyType)}`}
                className="btn-secondary mt-6 w-full text-sm"
              >
                {t.listingDetail.privateViewing.cta}
              </LocaleLink>
            </div>

          <div className="rounded-[32px] border border-soft bg-white/90 p-8 shadow-[0_25px_60px_-45px_rgba(15,23,42,0.55)]">
              <h3 className="font-heading text-xl font-semibold text-neutral-900">
                {t.listingDetail.similar.heading}
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                {t.listingDetail.similar.copy}
              </p>
              <ul className="mt-5 space-y-3 text-sm font-semibold text-[#1d4ed8]">
                {similarListings.map((item) => (
                  <li key={item.id}>
                    <LocaleLink
                      href={`/listings/${item.slug}`}
                      className="inline-flex items-center gap-2 transition hover:text-[#1e3a8a]"
                    >
                      <Move size={14} /> {item.title}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}

