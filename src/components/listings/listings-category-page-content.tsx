"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  categoryOptions,
  getCategoryLabel,
  getLocationLabel,
  getPriceRange,
  locationOptions,
  type PriceRangeOption,
  type Listing,
} from "@/data/sample-data";
import { getAllListings } from "@/lib/data/listings";
import { ListingCard } from "@/components/listings/listing-card";
import { useTranslations, useLocale } from "@/components/providers/locale-provider";

const DEFAULT_CATEGORY = "homes-sale";
const compactFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 0,
});

function formatCompactValue(value: number, useDollar: boolean) {
  if (value >= 1_000_000) {
    const scaled = value / 1_000_000;
    return `${useDollar ? "$" : ""}${compactFormatter.format(scaled)}M`;
  }
  if (value >= 1_000) {
    const scaled = value / 1_000;
    return `${useDollar ? "$" : ""}${compactFormatter.format(scaled)}K`;
  }
  return `${useDollar ? "$" : ""}${compactFormatter.format(value)}`;
}

type SearchParamsShape = {
  location?: string;
  type?: string;
  priceRange?: string;
  minPrice?: string;
  maxPrice?: string;
  featured?: string;
  beds?: string;
  baths?: string;
  postal?: string;
  sort?: string;
  view?: string;
  feature?: string;
};

type ListingsCategoryPageContentProps = {
  category: string;
  locale: string;
  searchParams: { [key: string]: string | string[] | undefined };
  initialLocation?: string;
};

function buildQueryString(
  base: SearchParamsShape | undefined,
  updates: Record<string, string | null | undefined>,
) {
  const query = new URLSearchParams();
  Object.entries(base ?? {}).forEach(([key, value]) => {
    if (value && key !== "category") {
      query.set(key, String(value));
    }
  });
  Object.entries(updates).forEach(([key, value]) => {
    if (value && value.length > 0) {
      query.set(key, String(value));
    } else {
      query.delete(key);
    }
  });
  return query.toString();
}

export function ListingsCategoryPageContent({
  category,
  locale,
  searchParams: searchParamsValue,
  initialLocation,
}: ListingsCategoryPageContentProps) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const categoryFromPath = category && categoryOptions.some((opt) => opt.value === category)
    ? category
    : DEFAULT_CATEGORY;

  const currentParams: SearchParamsShape = {};
  Object.entries(searchParamsValue).forEach(([key, value]) => {
    if (value && typeof value === "string") {
      currentParams[key as keyof SearchParamsShape] = value;
    }
  });
  
  // Set initial location if provided
  if (initialLocation && !currentParams.location) {
    currentParams.location = initialLocation;
  }

  const isRentCategory = categoryFromPath === "homes-rent" || categoryFromPath === "apartments-rent" || categoryFromPath === "commercial-rent" || categoryFromPath === "land-rent";

  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "row">(
    (currentParams.view as "grid" | "row") || "grid",
  );

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      const listings = await getAllListings();
      setAllListings(listings);
      setLoading(false);
    }
    fetchListings();
  }, []);

  const saleMinOptions = [
    100_000,
    200_000,
    300_000,
    400_000,
    500_000,
    600_000,
    700_000,
    800_000,
    900_000,
    1_000_000,
    1_500_000,
    2_000_000,
    2_500_000,
    3_000_000,
    3_500_000,
    4_000_000,
    4_500_000,
    5_000_000,
    6_000_000,
    7_000_000,
    8_000_000,
    9_000_000,
    10_000_000,
  ];

  const saleMaxOptions = [
    1_000_000,
    2_000_000,
    3_000_000,
    4_000_000,
    5_000_000,
    6_000_000,
    7_000_000,
    8_000_000,
    9_000_000,
    10_000_000,
    15_000_000,
    20_000_000,
    25_000_000,
    30_000_000,
    40_000_000,
    50_000_000,
    60_000_000,
    70_000_000,
    80_000_000,
    90_000_000,
    100_000_000,
    125_000_000,
    150_000_000,
    175_000_000,
    200_000_000,
    250_000_000,
    300_000_000,
    350_000_000,
    400_000_000,
  ];

  const rentMinOptions = [
    500,
    750,
    1_000,
    1_250,
    1_500,
    1_750,
    2_000,
    2_500,
    3_000,
    3_500,
    4_000,
    5_000,
    7_500,
    10_000,
    12_500,
    15_000,
    20_000,
    25_000,
    30_000,
  ];

  const rentMaxOptions = [
    2_000,
    3_000,
    4_000,
    5_000,
    7_500,
    10_000,
    12_500,
    15_000,
    20_000,
    30_000,
    50_000,
    75_000,
    100_000,
    250_000,
    500_000,
    1_000_000,
    2_000_000,
    3_000_000,
    5_000_000,
  ];

  const minOptions = isRentCategory ? rentMinOptions : saleMinOptions;
  const maxOptions = isRentCategory ? rentMaxOptions : saleMaxOptions;

  const filteredListings = useMemo(() => {
    return allListings.filter((listing) => {
      if (listing.category !== categoryFromPath) return false;

      if (currentParams.location && listing.locationValue !== currentParams.location) {
        return false;
      }

      if (currentParams.featured === "true" && listing.status !== "featured") {
        return false;
      }

      if (currentParams.beds) {
        const bedsNum = parseInt(currentParams.beds, 10);
        if (listing.beds < bedsNum) return false;
      }

      if (currentParams.baths) {
        const bathsNum = parseFloat(currentParams.baths);
        if (listing.baths < bathsNum) return false;
      }

      if (currentParams.minPrice) {
        const minPriceNum = parseInt(currentParams.minPrice, 10);
        if (listing.priceCZK < minPriceNum) return false;
      }

      if (currentParams.maxPrice) {
        const maxPriceNum = parseInt(currentParams.maxPrice, 10);
        if (listing.priceCZK > maxPriceNum) return false;
      }

      if (currentParams.postal && listing.postalCode) {
        if (!listing.postalCode.includes(currentParams.postal)) return false;
      }

      if (currentParams.feature && listing.features) {
        if (!listing.features.some((f) => f.toLowerCase().includes(currentParams.feature!.toLowerCase()))) {
          return false;
        }
      }

      return true;
    });
  }, [allListings, categoryFromPath, currentParams]);

  const sortedListings = useMemo(() => {
    const base = [...filteredListings];
    const sortBy = currentParams.sort || "price-desc";

    if (sortBy === "price-asc") {
      base.sort((a, b) => a.priceCZK - b.priceCZK);
    } else if (sortBy === "price-desc") {
      base.sort((a, b) => b.priceCZK - a.priceCZK);
    } else if (sortBy === "newest") {
      base.sort((a, b) => {
        const aDate = a.status === "new" ? 1 : 0;
        const bDate = b.status === "new" ? 1 : 0;
        return bDate - aDate;
      });
    }

    return base;
  }, [filteredListings, currentParams.sort]);

  const updateUrl = (updates: Record<string, string | null | undefined>) => {
    const newParams = buildQueryString(currentParams, updates);
    const categoryUrl = `/${locale}/listings/category/${categoryFromPath}`;
    const newUrl = newParams ? `${categoryUrl}?${newParams}` : categoryUrl;
    router.push(newUrl);
  };

  const handleFilterChange = (key: string, value: string | null) => {
    updateUrl({ [key]: value });
  };

  const handleSortChange = (sort: string) => {
    updateUrl({ sort });
  };

  const handleViewChange = (view: "grid" | "row") => {
    setViewMode(view);
    updateUrl({ view });
  };

  const categoryLabel = getCategoryLabel(categoryFromPath);

  return (
    <div className="bg-site-canvas">
      {/* Hero Section */}
      <section className="border-b border-soft bg-white py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center rounded-full border border-soft bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-neutral-700">
              {categoryLabel}
            </span>
            <h1 className="font-heading text-4xl font-semibold text-neutral-900 md:text-5xl">
              {categoryLabel} in Brno
            </h1>
            <p className="text-lg text-neutral-600">
              {sortedListings.length} {sortedListings.length === 1 ? "property" : "properties"} available
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Sort Section */}
      <section className="border-b border-soft bg-white py-8">
        <div className="container">
          <div className="flex flex-wrap items-center gap-4">
            {/* Location Filter */}
            <select
              value={currentParams.location || ""}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleFilterChange("location", e.target.value || null)
              }
              className="rounded-lg border border-soft bg-white px-4 py-2 text-sm text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
            >
              <option value="">All Locations</option>
              {locationOptions.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>

            {/* Price Filter - Min */}
            {!isRentCategory && (
              <select
                value={currentParams.minPrice || ""}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  handleFilterChange("minPrice", e.target.value || null)
                }
                className="rounded-lg border border-soft bg-white px-4 py-2 text-sm text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
              >
                <option value="">Min Price</option>
                {minOptions.map((price) => (
                  <option key={price} value={price}>
                    {formatCompactValue(price, false)} CZK
                  </option>
                ))}
              </select>
            )}

            {/* Price Filter - Max */}
            {!isRentCategory && (
              <select
                value={currentParams.maxPrice || ""}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  handleFilterChange("maxPrice", e.target.value || null)
                }
                className="rounded-lg border border-soft bg-white px-4 py-2 text-sm text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
              >
                <option value="">Max Price</option>
                {maxOptions.map((price) => (
                  <option key={price} value={price}>
                    {formatCompactValue(price, false)} CZK
                  </option>
                ))}
              </select>
            )}

            {/* Beds Filter */}
            {(categoryFromPath === "homes-sale" || categoryFromPath === "homes-rent" || categoryFromPath === "apartments-sale" || categoryFromPath === "apartments-rent") && (
              <select
                value={currentParams.beds || ""}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  handleFilterChange("beds", e.target.value || null)
                }
                className="rounded-lg border border-soft bg-white px-4 py-2 text-sm text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
              >
                <option value="">Beds</option>
                {[1, 2, 3, 4, 5, 6].map((beds) => (
                  <option key={beds} value={beds}>
                    {beds}+
                  </option>
                ))}
              </select>
            )}

            {/* Baths Filter */}
            {(categoryFromPath === "homes-sale" || categoryFromPath === "homes-rent" || categoryFromPath === "apartments-sale" || categoryFromPath === "apartments-rent") && (
              <select
                value={currentParams.baths || ""}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  handleFilterChange("baths", e.target.value || null)
                }
                className="rounded-lg border border-soft bg-white px-4 py-2 text-sm text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
              >
                <option value="">Baths</option>
                {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((baths) => (
                  <option key={baths} value={baths}>
                    {baths}+
                  </option>
                ))}
              </select>
            )}

            {/* Sort */}
            <select
              value={currentParams.sort || "price-desc"}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSortChange(e.target.value)}
              className="ml-auto rounded-lg border border-soft bg-white px-4 py-2 text-sm text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
            >
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="newest">Newest First</option>
            </select>

            {/* View Toggle */}
            <div className="flex rounded-lg border border-soft bg-white p-1">
              <button
                onClick={() => handleViewChange("grid")}
                className={`rounded px-3 py-1 text-sm transition ${
                  viewMode === "grid"
                    ? "bg-[color:var(--brand-500)] text-white"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => handleViewChange("row")}
                className={`rounded px-3 py-1 text-sm transition ${
                  viewMode === "row"
                    ? "bg-[color:var(--brand-500)] text-white"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Listings Grid/Row */}
      <section className="bg-site-canvas py-16">
        <div className="container">
          {loading ? (
            <div className={viewMode === "grid" ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "space-y-6"}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 animate-pulse rounded-3xl bg-neutral-200" />
              ))}
            </div>
          ) : sortedListings.length > 0 ? (
            <div className={viewMode === "grid" ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "space-y-6"}>
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

