"use client";

import {
  type ChangeEvent,
  type FormEvent,
  use,
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
import { useTranslations } from "@/components/providers/locale-provider";

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

type ListingsCategoryPageProps = {
  params: Promise<{ locale: string; category: string }>;
  searchParams: Promise<SearchParamsShape>;
};

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


function buildQueryString(
  base: SearchParamsShape | undefined,
  updates: Record<string, string | null | undefined>,
) {
  const query = new URLSearchParams();
  Object.entries(base ?? {}).forEach(([key, value]) => {
    if (value && key !== "category") {
      query.set(key, value);
    }
  });
  Object.entries(updates).forEach(([key, value]) => {
    if (value && value.length > 0) {
      query.set(key, value);
    } else {
      query.delete(key);
    }
  });
  return query.toString();
}

export default function ListingsCategoryPage({
  params,
  searchParams,
}: ListingsCategoryPageProps) {
  const t = useTranslations();
  const router = useRouter();
  const { category, locale } = use(params);
  const searchParamsValue = use(searchParams ?? Promise.resolve({}));
  const pathname = usePathname();

  const categoryFromPath =
    category && categoryOptions.some((opt) => opt.value === category)
      ? category
      : DEFAULT_CATEGORY;

  const rawSearch = searchParams ?? {};
  const currentParams =
    typeof rawSearch === "object" && rawSearch !== null && "then" in rawSearch
      ? use(rawSearch as Promise<SearchParamsShape>)
      : (rawSearch as SearchParamsShape);

  const locationParam = currentParams?.location ?? "";
  const propertyKindParam = currentParams?.type ?? "";
  const priceRangeParam = currentParams?.priceRange;
  const minPriceParam = currentParams?.minPrice
    ? Number(currentParams.minPrice)
    : undefined;
  const maxPriceParam = currentParams?.maxPrice
    ? Number(currentParams.maxPrice)
    : undefined;
  const featuredOnly = currentParams?.featured === "true";
  const bedsParam = currentParams?.beds ? Number(currentParams.beds) : undefined;
  const bathsParam = currentParams?.baths ? Number(currentParams.baths) : undefined;
  const postalParam = currentParams?.postal ?? "";
  const sortParam = currentParams?.sort ?? "price-desc";
  const viewParam = currentParams?.view ?? "grid";
  const featureParam = currentParams?.feature ?? "";

  const [postalInput, setPostalInput] = useState(postalParam);
  const [priceMenuOpen, setPriceMenuOpen] = useState(false);
  const priceMenuRef = useRef<HTMLDivElement | null>(null);
  const [customMin, setCustomMin] = useState<string>("");
  const [customMax, setCustomMax] = useState<string>("");
  const [minMenuOpen, setMinMenuOpen] = useState(false);
  const [maxMenuOpen, setMaxMenuOpen] = useState(false);

  useEffect(() => {
    setPostalInput(postalParam);
  }, [postalParam]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        priceMenuOpen &&
        priceMenuRef.current &&
        !priceMenuRef.current.contains(event.target as Node)
      ) {
        setPriceMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [priceMenuOpen]);

  useEffect(() => {
    if (priceMenuOpen) {
      setCustomMin(minPriceParam !== undefined ? String(minPriceParam) : "");
      setCustomMax(maxPriceParam !== undefined ? String(maxPriceParam) : "");
      setMinMenuOpen(false);
      setMaxMenuOpen(false);
    } else {
      setMinMenuOpen(false);
      setMaxMenuOpen(false);
    }
  }, [priceMenuOpen, minPriceParam, maxPriceParam]);

  const [availableListings, setAvailableListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchListings() {
      try {
        setLoading(true);
        setError(null);
        const fetched = await getAllListings({ category: categoryFromPath });
        setAvailableListings(fetched);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("Failed to load listings. Please try again.");
        setAvailableListings([]);
      } finally {
        setLoading(false);
      }
    }
    fetchListings();
  }, [categoryFromPath]);

  const uniqueFeatures = useMemo(() => {
    const features = new Set<string>();
    availableListings.forEach((listing) =>
      listing.features?.forEach((feature) => features.add(feature)),
    );
    return Array.from(features).sort();
  }, [availableListings]);

  const range = useMemo<PriceRangeOption | undefined>(() => {
    if (minPriceParam !== undefined || maxPriceParam !== undefined) {
      const minValue = minPriceParam ?? 0;
      const maxValue = maxPriceParam ?? Number.POSITIVE_INFINITY;
      const minLabel =
        minPriceParam !== undefined ? minValue.toLocaleString("cs-CZ") : "0";
      const maxLabel =
        maxPriceParam !== undefined ? maxValue.toLocaleString("cs-CZ") : "Any";
      return {
        value: "custom",
        label: `${minLabel} - ${maxLabel} CZK`,
        min: minValue,
        max: maxValue,
      };
    }
    if (priceRangeParam) {
      return getPriceRange(priceRangeParam);
    }
    return undefined;
  }, [maxPriceParam, minPriceParam, priceRangeParam]);

  const isRentCategory =
    categoryFromPath === "homes-rent" ||
    categoryFromPath === "commercial-rent" ||
    categoryFromPath === "land-rent";

  const priceLabel = useMemo(() => {
    if (minPriceParam !== undefined || maxPriceParam !== undefined) {
      const minText =
        minPriceParam !== undefined
          ? formatCompactValue(minPriceParam, isRentCategory)
          : isRentCategory
            ? "$0"
            : "0";
      const maxText =
        maxPriceParam !== undefined
          ? formatCompactValue(maxPriceParam, isRentCategory)
          : "Any";
      return `${minText} - ${maxText}${
        !isRentCategory && maxPriceParam !== undefined ? " CZK" : ""
      }`;
    }
    if (range) {
      return range.label;
    }
    return "0 - Any";
  }, [isRentCategory, maxPriceParam, minPriceParam, range]);

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
    return availableListings.filter((listing) => {
      if (locationParam && listing.locationValue !== locationParam) return false;
      if (propertyKindParam && listing.propertyType !== propertyKindParam) return false;
      if (range) {
        if (listing.priceCZK < range.min) return false;
        if (listing.priceCZK > range.max) return false;
      }
      if (featuredOnly && listing.status !== "featured") return false;
      if (bedsParam && listing.beds < bedsParam) return false;
      if (bathsParam && listing.baths < bathsParam) return false;
      if (postalParam && listing.postalCode && !listing.postalCode.startsWith(postalParam)) {
        return false;
      }
      if (featureParam && !listing.features?.includes(featureParam)) return false;
      return true;
    });
  }, [
    availableListings,
    bathsParam,
    bedsParam,
    featureParam,
    featuredOnly,
    locationParam,
    postalParam,
    propertyKindParam,
    range,
  ]);

  const sortedListings = useMemo(() => {
    const base = [...filteredListings];
    if (sortParam === "price-asc") {
      base.sort((a, b) => a.priceCZK - b.priceCZK);
    } else if (sortParam === "price-desc") {
      base.sort((a, b) => b.priceCZK - a.priceCZK);
    }
    return base;
  }, [filteredListings, sortParam]);

  const totalResults = sortedListings.length;
  const locationLabel = locationParam
    ? getLocationLabel(locationParam)
    : "Czech Republic";
  // Get translated category label from footer navigation
  const categoryLabel = useMemo(() => {
    const propertiesGroup = t.footer.navGroups.find((group) => group.title === "Properties" || group.title === "Nemovitosti");
    if (propertiesGroup) {
      const categoryItem = propertiesGroup.items.find((item) => 
        item.href.includes(`/category/${categoryFromPath}`)
      );
      if (categoryItem) {
        return categoryItem.label;
      }
    }
    // Fallback to English label if translation not found
    return getCategoryLabel(categoryFromPath);
  }, [categoryFromPath, t.footer.navGroups]);
  
  const showBedsBaths = categoryFromPath === "homes-sale" || categoryFromPath === "homes-rent";

  const filtersLabel = useMemo(() => {
    const parts = [
      locationLabel,
      categoryLabel,
      range ? range.label : t.heroSearch.summaryDefault,
    ];
    if (featuredOnly) parts.push(t.listings.featuredSummary);
    return parts.join(" · ");
  }, [categoryLabel, featuredOnly, locationLabel, range, t.heroSearch.summaryDefault, t.listings.featuredSummary]);

  const pushParams = (
    updates: Partial<Record<keyof SearchParamsShape, string | null>>,
  ) => {
    const query = buildQueryString(
      currentParams,
      updates as Record<string, string | null | undefined>,
    );
    router.push(`${pathname}${query ? `?${query}` : ""}`);
  };

  const updateParam = (key: keyof SearchParamsShape, value?: string | null) => {
    pushParams({ [key]: value ?? null });
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextCategory = event.target.value || DEFAULT_CATEGORY;
    const query = buildQueryString(currentParams, {
      category: null,
      type: null,
    });
    router.push(`/${locale}/listings/category/${nextCategory}${query ? `?${query}` : ""}`);
  };

  const handleLocationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    updateParam("location", event.target.value || null);
  };

  const applyCustomRange = () => {
    let minValue = customMin ? Number(customMin) : undefined;
    let maxValue = customMax ? Number(customMax) : undefined;

    if (minValue === undefined && maxValue === undefined) {
      handleClearPrice();
      return;
    }

    if (minValue !== undefined && maxValue !== undefined && maxValue < minValue) {
      const temp = minValue;
      minValue = maxValue;
      maxValue = temp;
    }

    pushParams({
      priceRange: null,
      minPrice: minValue !== undefined ? String(minValue) : null,
      maxPrice: maxValue !== undefined ? String(maxValue) : null,
    });
    setMinMenuOpen(false);
    setMaxMenuOpen(false);
    setPriceMenuOpen(false);
  };

  const handleClearPrice = () => {
    setCustomMin("");
    setCustomMax("");
    setMinMenuOpen(false);
    setMaxMenuOpen(false);
    pushParams({
      priceRange: null,
      minPrice: null,
      maxPrice: null,
    });
  };

  const handleBedsChange = (event: ChangeEvent<HTMLSelectElement>) => {
    updateParam("beds", event.target.value || null);
  };

  const handleBathsChange = (event: ChangeEvent<HTMLSelectElement>) => {
    updateParam("baths", event.target.value || null);
  };

  const handleFeatureChange = (event: ChangeEvent<HTMLSelectElement>) => {
    updateParam("feature", event.target.value || null);
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    updateParam("sort", event.target.value);
  };

  const handleViewChange = (value: string) => {
    updateParam("view", value);
  };

  const handleFilterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateParam("postal", postalInput.trim() || null);
  };

  return (
    <div className="bg-site-canvas py-16">
      <div className="container space-y-10">
        <header className="space-y-4">
          <span className="inline-flex items-center rounded-full border border-soft bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-neutral-700">
            {t.listings.badge}
          </span>
          <div className="space-y-3">
            <h1 className="font-heading text-2xl font-semibold text-neutral-900 sm:text-3xl">
              {`${categoryLabel} · ${totalResults} ${t.navigation.listings.toLowerCase()}`}
            </h1>
            <p className="max-w-2xl text-sm text-muted">
              {t.listings.subheading.replace("{filters}", filtersLabel)}
            </p>
          </div>
        </header>

        <form
          onSubmit={handleFilterSubmit}
          className="grid gap-4 rounded-2xl border border-soft bg-white px-4 py-6 shadow-[0_30px_60px_-45px_rgba(15,23,42,0.5)] sm:rounded-[32px] sm:px-6 sm:py-8 md:grid-cols-3 lg:grid-cols-4"
        >
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Category
            </label>
            <select
              className="h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 focus:border-neutral-400 focus:outline-none"
              value={categoryFromPath}
              onChange={handleCategoryChange}
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              City
            </label>
            <select
              className="h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 focus:border-neutral-400 focus:outline-none"
              value={locationParam}
              onChange={handleLocationChange}
            >
              <option value="">All</option>
              {locationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2" ref={priceMenuRef}>
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Price
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setPriceMenuOpen((prev) => !prev)}
                className="flex h-12 w-full items-center justify-between rounded-full border border-soft bg-white px-4 text-sm font-semibold text-neutral-800 transition focus:border-neutral-400 focus:outline-none"
              >
                {priceLabel}
                <span className="ml-3 text-neutral-500">▾</span>
              </button>

              {priceMenuOpen ? (
                <div className="absolute left-0 right-0 top-full z-20 mt-3 rounded-3xl border border-soft bg-white p-5 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.6)]">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setMinMenuOpen((prev) => !prev)}
                          className="flex w-full flex-col rounded-2xl border border-soft bg-white px-4 py-3 text-left text-sm font-semibold text-neutral-800 transition focus:border-neutral-400 focus:outline-none"
                        >
                          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
                            Min (CZK)
                          </span>
                          <span className="mt-1 text-base font-semibold text-neutral-900">
                            {customMin
                              ? formatCompactValue(Number(customMin), isRentCategory)
                              : "From"}
                          </span>
                        </button>
                        {minMenuOpen ? (
                          <div className="absolute left-0 right-0 top-full z-10 mt-2 max-h-60 overflow-y-auto rounded-2xl border border-soft bg-white py-2 shadow-[0_15px_35px_-25px_rgba(15,23,42,0.6)]">
                            <button
                              type="button"
                              onClick={() => {
                                setCustomMin("");
                                setMinMenuOpen(false);
                              }}
                              className="block w-full px-4 py-2 text-left text-sm text-neutral-600 hover:bg-neutral-100"
                            >
                              From
                            </button>
                            {minOptions.map((value) => (
                              <button
                                key={value}
                                type="button"
                                onClick={() => {
                                  setCustomMin(String(value));
                                  setMinMenuOpen(false);
                                }}
                                className="block w-full px-4 py-2 text-left text-sm text-neutral-800 hover:bg-neutral-100"
                              >
                                {formatCompactValue(value, isRentCategory)}
                              </button>
                            ))}
                          </div>
                        ) : null}
                      </div>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setMaxMenuOpen((prev) => !prev)}
                          className="flex w-full flex-col rounded-2xl border border-soft bg-white px-4 py-3 text-left text-sm font-semibold text-neutral-800 transition focus:border-neutral-400 focus:outline-none"
                        >
                          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
                            Max (CZK)
                          </span>
                          <span className="mt-1 text-base font-semibold text-neutral-900">
                            {customMax
                              ? formatCompactValue(Number(customMax), isRentCategory)
                              : "To"}
                          </span>
                        </button>
                        {maxMenuOpen ? (
                          <div className="absolute left-0 right-0 top-full z-10 mt-2 max-h-60 overflow-y-auto rounded-2xl border border-soft bg-white py-2 shadow-[0_15px_35px_-25px_rgba(15,23,42,0.6)]">
                            <button
                              type="button"
                              onClick={() => {
                                setCustomMax("");
                                setMaxMenuOpen(false);
                              }}
                              className="block w-full px-4 py-2 text-left text-sm text-neutral-600 hover:bg-neutral-100"
                            >
                              To
                            </button>
                            {maxOptions.map((value) => (
                              <button
                                key={value}
                                type="button"
                                onClick={() => {
                                  setCustomMax(String(value));
                                  setMaxMenuOpen(false);
                                }}
                                className="block w-full px-4 py-2 text-left text-sm text-neutral-800 hover:bg-neutral-100"
                              >
                                {formatCompactValue(value, isRentCategory)}
                              </button>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={handleClearPrice}
                        className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900"
                      >
                        Clear All
                      </button>
                      <button
                        type="button"
                        onClick={applyCustomRange}
                        className="rounded-full bg-neutral-900 px-5 py-2 text-xs font-semibold text-white hover:bg-neutral-700"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {showBedsBaths ? (
            <>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                  Bedrooms
                </label>
                <select
                  className="h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 focus:border-neutral-400 focus:outline-none"
                  value={bedsParam?.toString() ?? ""}
                  onChange={handleBedsChange}
                >
                  <option value="">All</option>
                  {[1, 2, 3, 4, 5].map((count) => (
                    <option key={count} value={count}>
                      {count}+
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                  Bathrooms
                </label>
                <select
                  className="h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 focus:border-neutral-400 focus:outline-none"
                  value={bathsParam?.toString() ?? ""}
                  onChange={handleBathsChange}
                >
                  <option value="">All</option>
                  {[1, 2, 3, 4].map((count) => (
                    <option key={count} value={count}>
                      {count}+
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : null}

          {uniqueFeatures.length > 0 ? (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                Key features
              </label>
              <select
                className="h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 focus:border-neutral-400 focus:outline-none"
                value={featureParam}
                onChange={handleFeatureChange}
              >
                <option value="">All</option>
                {uniqueFeatures.map((feature) => (
                  <option key={feature} value={feature}>
                    {feature}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Postal code
            </label>
            <input
              value={postalInput}
              onChange={(event) => setPostalInput(event.target.value)}
              placeholder="e.g. 602 00"
              className="h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 focus:border-neutral-400 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              &nbsp;
            </label>
            <button
              type="submit"
              className="btn-secondary h-12 w-full text-sm font-semibold"
            >
              Apply filters
            </button>
          </div>
        </form>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-sm text-neutral-600">
            <span>Sort by</span>
            <select
              className="h-10 rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 focus:border-neutral-400 focus:outline-none"
              value={sortParam}
              onChange={handleSortChange}
            >
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleViewChange("grid")}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                viewParam === "grid"
                  ? "bg-[color:var(--brand-500)] text-white"
                  : "border border-soft bg-white text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Grid view
            </button>
            <button
              type="button"
              onClick={() => handleViewChange("row")}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                viewParam === "row"
                  ? "bg-[color:var(--brand-500)] text-white"
                  : "border border-soft bg-white text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Row view
            </button>
          </div>
        </div>

        <section className="space-y-6">
          {loading ? (
            <div className="rounded-3xl border border-soft bg-white/80 p-12 text-center text-sm text-neutral-600">
              Loading listings...
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-soft bg-white/80 p-12 text-center text-sm text-red-600">
              {error}
            </div>
          ) : (
            <div
              className={`grid gap-4 ${
                viewParam === "row" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              } sm:gap-6`}
            >
              {sortedListings.length > 0 ? (
                sortedListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))
              ) : (
                <div className="col-span-full rounded-3xl border border-dashed border-soft bg-white/80 p-12 text-center text-sm text-neutral-600">
                  {t.listings.empty}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

