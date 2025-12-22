"use client";

import { useEffect, useMemo, useState } from "react";
import { locationOptions, categoryOptions } from "@/data/sample-data";
import type { Listing } from "@/data/sample-data";
import { ListingCard } from "@/components/listings/listing-card";
import { formatCurrency } from "@/lib/format";
import { TrendingUp, MapPin, Filter } from "react-feather";
import type { ChangeEvent } from "react";
import { getAllListings } from "@/lib/data/listings";

type AllPropertiesPageContentProps = {
  locale: string;
};

export function AllPropertiesPageContent({ locale }: AllPropertiesPageContentProps) {
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<"price-desc" | "price-asc">("price-desc");
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      const listings = await getAllListings();
      setAllListings(listings);
      setLoading(false);
    }
    fetchListings();
  }, []);

  const filteredListings = useMemo(() => {
    let filtered = [...allListings];

    if (locationFilter) {
      filtered = filtered.filter(
        (listing) => listing.locationValue === locationFilter,
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((listing) => listing.category === categoryFilter);
    }

    return filtered;
  }, [allListings, locationFilter, categoryFilter]);

  const sortedListings = useMemo(() => {
    const base = [...filteredListings];
    if (sortBy === "price-asc") {
      base.sort((a, b) => a.priceCZK - b.priceCZK);
    } else {
      base.sort((a, b) => b.priceCZK - a.priceCZK);
    }
    return base;
  }, [filteredListings, sortBy]);

  const averagePrice = useMemo(() => {
    if (sortedListings.length === 0) return 0;
    const sum = sortedListings.reduce((acc, listing) => acc + listing.priceCZK, 0);
    return Math.round(sum / sortedListings.length);
  }, [sortedListings]);

  return (
    <div className="bg-site-canvas">
      {/* Hero Section */}
      <section className="border-b border-soft bg-white py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center rounded-full border border-soft bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-neutral-700">
              All Properties
            </span>
            <h1 className="font-heading text-4xl font-semibold text-neutral-900 md:text-5xl">
              Browse All Properties
            </h1>
            <p className="text-lg text-neutral-600">
              Explore our complete collection of properties in Brno and South Moravia. Use filters to find your perfect match.
            </p>
            {sortedListings.length > 0 && (
              <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>{sortedListings.length} properties available</span>
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

      {/* Filters Section */}
      <section className="border-b border-soft bg-white py-8">
        <div className="container">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-neutral-500" />
              <span className="text-sm font-semibold text-neutral-700">Filters:</span>
            </div>
            <select
              value={locationFilter}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setLocationFilter(e.target.value)}
              className="rounded-lg border border-soft bg-white px-4 py-2 text-sm text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
            >
              <option value="">All Locations</option>
              {locationOptions.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
            <select
              value={categoryFilter}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategoryFilter(e.target.value)}
              className="rounded-lg border border-soft bg-white px-4 py-2 text-sm text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
            >
              <option value="">All Categories</option>
              {categoryOptions.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value as "price-desc" | "price-asc")}
              className="rounded-lg border border-soft bg-white px-4 py-2 text-sm text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
            >
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
            </select>
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
          ) : sortedListings.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} accent="home" />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-soft bg-white/80 p-12 text-center text-sm text-neutral-600">
              No properties found matching your filters.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

