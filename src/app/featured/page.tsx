"use client";

import { useEffect, useMemo, useState } from "react";
import type { Listing } from "@/data/sample-data";
import { ListingCard } from "@/components/listings/listing-card";
import { useTranslations } from "@/components/providers/locale-provider";
import { formatCurrency } from "@/lib/format";
import { TrendingUp, MapPin } from "react-feather";
import { getFeaturedListings } from "@/lib/data/listings";

export default function FeaturedPropertiesPage() {
  const t = useTranslations();
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      setLoading(true);
      const listings = await getFeaturedListings();
      setFeaturedListings(listings);
      setLoading(false);
    }
    fetchFeatured();
  }, []);

  const averagePrice = useMemo(() => {
    if (featuredListings.length === 0) return 0;
    const sum = featuredListings.reduce((acc, listing) => acc + listing.priceCZK, 0);
    return Math.round(sum / featuredListings.length);
  }, [featuredListings]);

  const sortedListings = useMemo(() => {
    return [...featuredListings].sort((a, b) => b.priceCZK - a.priceCZK);
  }, [featuredListings]);

  return (
    <div className="bg-site-canvas">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1d4ed8]/20 via-neutral-900/80 to-neutral-900/90" />
        <div className="container relative py-24 md:py-32">
          <div className="max-w-3xl space-y-6 text-white">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] backdrop-blur">
              {t.listings.featuredLabel}
            </span>
            <h1 className="font-heading text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Featured Properties
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              Discover our curated selection of exceptional properties across Brno and South Moravia.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <MapPin size={18} />
                <span>{featuredListings.length} featured properties</span>
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

      {/* Properties Grid */}
      <section className="bg-site-canvas py-16">
        <div className="container space-y-8">
          {loading ? (
            <div className="rounded-3xl border border-soft bg-white/80 p-12 text-center text-sm text-neutral-600">
              Loading featured properties...
            </div>
          ) : sortedListings.length > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-600">
                  Showing <strong className="text-[#1d4ed8]">{sortedListings.length}</strong>{" "}
                  featured properties
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-3xl border border-dashed border-soft bg-white/80 p-12 text-center text-sm text-neutral-600">
              No featured properties available at this time.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

