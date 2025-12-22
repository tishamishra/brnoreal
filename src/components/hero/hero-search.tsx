"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { categoryOptions, locationOptions } from "@/data/sample-data";
import { useTranslations, useLocale } from "@/components/providers/locale-provider";

const DEFAULT_LOCATION = "brno-stred";
const DEFAULT_CATEGORY = "homes-sale";

export function HeroSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();
  const { locale } = useLocale();

  const initialLocation = searchParams.get("location") ?? DEFAULT_LOCATION;
  const initialCategory =
    searchParams.get("category") ?? searchParams.get("propertyType") ?? DEFAULT_CATEGORY;
  const [location, setLocation] = useState(initialLocation);
  const [category, setCategory] = useState(initialCategory);

  const searchSummary = useMemo(() => {
    const locationLabel =
      locationOptions.find((option) => option.value === location)?.label ??
      t.heroSearch.summaryDefault;
    const propertyTypeLabel =
      categoryOptions.find((option) => option.value === category)?.label ??
      t.heroSearch.summaryDefault;
    return `${locationLabel} • ${propertyTypeLabel}`;
  }, [category, location, t.heroSearch.summaryDefault]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    const targetCategory = category || DEFAULT_CATEGORY;
    const query = params.toString();
    router.push(`/${locale}/listings/category/${targetCategory}${query ? `?${query}` : ""}`);
  }

  return (
    <div className="rounded-2xl border border-soft bg-white p-4 shadow-xl shadow-black/5 sm:rounded-3xl sm:p-6">
      <form className="grid gap-4 md:grid-cols-[1fr_1fr_auto]" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            htmlFor="location"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500"
          >
            {t.heroSearch.location}
          </label>
          <div className="relative">
            <select
              id="location"
              name="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 transition-colors focus:border-neutral-400 focus:outline-none"
            >
              {locationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="propertyType"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500"
          >
            {t.heroSearch.propertyType}
          </label>
          <div className="relative">
            <select
              id="propertyType"
              name="propertyType"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 transition-colors focus:border-neutral-400 focus:outline-none"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <button type="submit" className="btn-primary h-12 w-full text-sm">
            {t.heroSearch.startSearch}
          </button>
          <button
            type="button"
            className="btn-secondary h-12 w-full whitespace-nowrap px-5 text-sm sm:w-auto"
            onClick={() => {
              const params = new URLSearchParams();
              if (location) params.set("location", location);
              const targetCategory = category || DEFAULT_CATEGORY;
              const query = params.toString();
              router.push(`/${locale}/listings/category/${targetCategory}${query ? `?${query}` : ""}`);
            }}
          >
            {t.heroSearch.moreFilters}
          </button>
        </div>
      </form>

      <p className="mt-4 text-xs uppercase tracking-[0.35em] text-neutral-500">
        {searchSummary}
      </p>
    </div>
  );
}

