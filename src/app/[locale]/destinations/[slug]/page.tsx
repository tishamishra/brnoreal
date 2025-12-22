"use client";

import { use, useMemo, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { LocaleLink } from "@/components/locale-link";
import { getDestinationBySlug } from "@/data/destinations";
import { getAllListings } from "@/lib/data/listings";
import { ListingCard } from "@/components/listings/listing-card";
import { useTranslations } from "@/components/providers/locale-provider";
import { formatCurrency } from "@/lib/format";
import { MapPin, CheckCircle, TrendingUp } from "react-feather";

type DestinationPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default function DestinationPage({ params }: DestinationPageProps) {
  const t = useTranslations();
  const { slug } = use(params);
  const [allListings, setAllListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const destination = getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  useEffect(() => {
    async function loadListings() {
      try {
        const listings = await getAllListings();
        setAllListings(listings);
      } catch (error) {
        console.error("Error loading listings:", error);
      } finally {
        setLoading(false);
      }
    }
    loadListings();
  }, []);

  const locationListings = useMemo(() => {
    return allListings.filter(
      (listing) => listing.locationValue === destination.locationValue,
    );
  }, [allListings, destination.locationValue]);

  const featuredListings = useMemo(() => {
    return locationListings.filter((listing) => listing.status === "featured");
  }, [locationListings]);

  const averagePrice = useMemo(() => {
    if (locationListings.length === 0) return 0;
    const sum = locationListings.reduce((acc, listing) => acc + listing.priceCZK, 0);
    return Math.round(sum / locationListings.length);
  }, [locationListings]);

  return (
    <div className="bg-site-canvas">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neutral-900">
        <div className="absolute inset-0">
          <Image
            src={destination.heroImage}
            alt={destination.name}
            fill
            sizes="100vw"
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/80 via-neutral-900/60 to-neutral-900/90" />
        </div>
        <div className="container relative py-24 md:py-32">
          <div className="max-w-3xl space-y-6 text-white">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] backdrop-blur">
              {t.destinations.badge || "Destination"}
            </span>
            <h1 className="font-heading text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              {destination.name}
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              {destination.description}
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <MapPin size={18} />
                <span>{locationListings.length} properties available</span>
              </div>
              {averagePrice > 0 && (
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <TrendingUp size={18} />
                  <span>Avg. price: {formatCurrency(averagePrice)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Invest Section */}
      <section className="border-b border-soft bg-white py-16 md:py-20">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full border border-soft bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-neutral-700">
                {t.destinations.whyInvest?.badge || "Investment Potential"}
              </span>
              <h2 className="font-heading text-3xl font-semibold text-neutral-900 md:text-4xl">
                {t.destinations.whyInvest?.heading ||
                  "Why invest in " + destination.name}
              </h2>
              <p className="text-sm text-neutral-600 md:text-base">
                {t.destinations.whyInvest?.copy ||
                  "Discover the unique advantages of owning property in this prestigious location."}
              </p>
              <ul className="space-y-4">
                {destination.whyInvest.map((reason, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#1d4ed8]"
                      size={20}
                    />
                    <span className="text-sm text-neutral-700">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-neutral-200 shadow-[0_35px_60px_-30px_rgba(0,0,0,0.35)]">
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Location Features & Highlights - Compact Combined Section */}
      <section className="border-b border-soft bg-site-canvas py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-semibold text-neutral-900">
                {t.destinations.features?.heading || "Location Features"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {destination.features.map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 rounded-full border border-soft bg-white px-4 py-2 text-xs font-semibold text-neutral-700"
                  >
                    <CheckCircle className="h-3.5 w-3.5 text-[#1d4ed8]" size={14} />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            {destination.highlights.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-heading text-lg font-semibold text-neutral-900">
                  {t.destinations.highlights?.heading || "Key Highlights"}
                </h3>
                <ul className="space-y-2">
                  {destination.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-neutral-700"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1d4ed8] text-xs font-semibold text-white">
                        {index + 1}
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      {featuredListings.length > 0 && (
        <section className="border-b border-soft bg-site-canvas py-16">
          <div className="container space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <span className="inline-flex items-center rounded-full border border-soft bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-neutral-700">
                  {t.listings.featuredLabel}
                </span>
                <h3 className="font-heading text-3xl font-semibold text-neutral-900">
                  Featured Properties in {destination.name}
                </h3>
              </div>
              <LocaleLink
                href={`/listings/category/homes-sale?location=${destination.locationValue}&featured=true`}
                className="btn-secondary text-sm"
              >
                View All Featured →
              </LocaleLink>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredListings.slice(0, 6).map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Properties */}
      <section className="bg-site-canvas py-16">
        <div className="container space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="font-heading text-3xl font-semibold text-neutral-900">
                All Properties in {destination.name}
              </h3>
              <p className="text-sm text-neutral-600">
                {locationListings.length} properties available
              </p>
            </div>
            <LocaleLink
              href={`/listings/category/homes-sale?location=${destination.locationValue}`}
              className="btn-secondary text-sm"
            >
              View All with Filters
            </LocaleLink>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {locationListings.length > 0 ? (
              locationListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))
            ) : (
              <div className="col-span-full rounded-3xl border border-dashed border-soft bg-white/80 p-12 text-center text-sm text-neutral-600">
                No properties currently available in this location.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

