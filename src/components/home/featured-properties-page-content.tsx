"use client";

import { useEffect, useMemo, useState } from "react";
import type { Listing } from "@/data/sample-data";
import { ListingCard } from "@/components/listings/listing-card";
import { useTranslations } from "@/components/providers/locale-provider";
import { formatCurrency } from "@/lib/format";
import { TrendingUp, MapPin } from "react-feather";
import { getFeaturedListings } from "@/lib/data/listings";

type FeaturedPropertiesPageContentProps = {
  locale: string;
};

export function FeaturedPropertiesPageContent({ locale }: FeaturedPropertiesPageContentProps) {
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

  return (
    <div className="bg-site-canvas">
      {/* Hero Section */}
      <section className="border-b border-soft bg-white py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center rounded-full border border-soft bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-neutral-700">
              {t.listings.featuredLabel}
            </span>
            <h1 className="font-heading text-4xl font-semibold text-neutral-900 md:text-5xl">
              {t.homeFeatured?.heading || "Featured Properties"}
            </h1>
            <p className="text-lg text-neutral-600">
              {"Discover our handpicked selection of premium properties in Brno and South Moravia."}
            </p>
            {featuredListings.length > 0 && (
              <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>{featuredListings.length} featured properties</span>
                </div>
                {averagePrice > 0 && (
                  <div className="flex items-center gap-2">
                    <TrendingUp size={18} />
                    <span>Avg. price: {formatCurrency(averagePrice)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="bg-site-canvas py-16">
        <div className="container">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 animate-pulse rounded-3xl bg-neutral-200" />
              ))}
            </div>
          ) : featuredListings.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} accent="home" />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-soft bg-white/80 p-12 text-center text-sm text-neutral-600">
              No featured properties currently available.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


