"use client";

import { useEffect, useMemo, useState } from "react";
import { locationOptions, categoryOptions } from "@/data/sample-data";
import type { Listing } from "@/data/sample-data";
import { ListingCard } from "@/components/listings/listing-card";
import { formatCurrency } from "@/lib/format";
import { TrendingUp, MapPin, Filter } from "react-feather";
import type { ChangeEvent } from "react";
import { getAllListings } from "@/lib/data/listings";

export default function AllPropertiesPage() {
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

  const handleLocationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLocationFilter(event.target.value);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(event.target.value);
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as "price-desc" | "price-asc");
  };

  const clearFilters = () => {
    setLocationFilter("");
    setCategoryFilter("");
  };

  return (
    <div className="bg-site-canvas">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1d4ed8]/20 via-neutral-900/80 to-neutral-900/90" />
        <div className="container relative py-24 md:py-32">
          <div className="max-w-3xl space-y-6 text-white">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] backdrop-blur">
              All Properties
            </span>
            <h1 className="font-heading text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Browse All Properties
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              Explore our complete collection of properties across Brno and South Moravia.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <MapPin size={18} />
                <span>{sortedListings.length} properties available</span>
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

      {/* Filters Section */}
      <section className="border-b border-soft bg-white py-8">
        <div className="container">
          <div className="grid gap-4 rounded-[32px] border border-soft bg-white px-6 py-6 shadow-sm md:grid-cols-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                <Filter size={14} />
                Location
              </label>
              <select
                value={locationFilter}
                onChange={handleLocationChange}
                className="h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 focus:border-neutral-400 focus:outline-none"
              >
                <option value="">All Locations</option>
                {locationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={handleCategoryChange}
                className="h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 focus:border-neutral-400 focus:outline-none"
              >
                <option value="">All Categories</option>
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 focus:border-neutral-400 focus:outline-none"
              >
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="btn-secondary h-12 w-full text-sm"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="bg-site-canvas py-16">
        <div className="container space-y-8">
          {loading ? (
            <div className="rounded-3xl border border-soft bg-white/80 p-12 text-center text-sm text-neutral-600">
              Loading properties...
            </div>
          ) : sortedListings.length > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-600">
                  Showing <strong className="text-[#1d4ed8]">{sortedListings.length}</strong>{" "}
                  properties
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
              No properties match your filters. Try adjusting your search criteria.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

