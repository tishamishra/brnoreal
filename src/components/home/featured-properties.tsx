"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiDroplet } from "react-icons/fi";
import { LuBedDouble } from "react-icons/lu";
import { TbRulerMeasure } from "react-icons/tb";
import { getPropertyTypeLabel } from "@/data/sample-data";
import { useLocale, useTranslations } from "@/components/providers/locale-provider";
import { formatCurrency } from "@/lib/format";
import { getFeaturedListings, type Listing } from "@/lib/data/listings";

// Fallback placeholder image
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

export function FeaturedPropertiesSection() {
  const t = useTranslations();
  const { locale } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(locale === "cs" ? "cs-CZ" : "en-US"),
    [locale],
  );

  useEffect(() => {
    async function fetchFeatured() {
      setLoading(true);
      const listings = await getFeaturedListings(4);
      // If we have less than 4 featured, pad with regular listings
      if (listings.length < 4) {
        const { getAllListings } = await import("@/lib/data/listings");
        const allListings = await getAllListings();
        const additional = allListings
          .filter((l) => l.slug !== listings[0]?.slug)
          .slice(0, 4 - listings.length);
        setFeaturedListings([...listings, ...additional].slice(0, 4));
      } else {
        setFeaturedListings(listings);
      }
      setLoading(false);
    }
    fetchFeatured();
  }, []);

  const scrollBy = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    containerRef.current.scrollBy({
      left: direction === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-site-canvas">
      <div className="container space-y-8 py-16 md:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="font-heading text-3xl font-semibold text-neutral-900 md:text-4xl">
            {t.homeFeatured.heading}
          </h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollBy("left")}
              aria-label="Scroll left"
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-soft bg-white text-neutral-700 transition hover:border-neutral-300 hover:text-neutral-950 md:flex"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollBy("right")}
              aria-label="Scroll right"
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-soft bg-white text-neutral-700 transition hover:border-neutral-300 hover:text-neutral-950 md:flex"
            >
              →
            </button>
            <Link href="/featured" className="btn-secondary text-sm">
              {t.homeFeatured.viewAll}
            </Link>
          </div>
        </div>

        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto pb-2 pr-4 md:grid md:grid-cols-4 md:overflow-visible md:pb-0 md:pr-0"
        >
          {loading ? (
            <div className="col-span-4 py-12 text-center text-neutral-600">
              Loading featured properties...
            </div>
          ) : (
            featuredListings.map((listing) => (
            <Link
              key={listing.id}
              href={`/listings/${listing.slug}`}
              className="group block min-w-[280px] flex-1 overflow-hidden rounded-[28px] border border-soft bg-white shadow-[0_32px_60px_-40px_rgba(15,23,42,0.55)] transition hover:-translate-y-1 hover:shadow-[0_40px_70px_-45px_rgba(15,23,42,0.6)] md:min-w-0"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9]">
                <Image
                  src={imageErrors[listing.id] ? FALLBACK_IMAGE : (listing.image || FALLBACK_IMAGE)}
                  alt={listing.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 80vw, (max-width: 768px) 80vw, (max-width: 1024px) 25vw, (max-width: 1280px) 25vw, 300px"
                  onError={() => {
                    if (!imageErrors[listing.id]) {
                      console.warn("Image failed to load, using fallback:", listing.image);
                      setImageErrors((prev) => ({ ...prev, [listing.id]: true }));
                    }
                  }}
                />
              </div>
              <div className="flex flex-col gap-4 p-6">
                <div className="space-y-1">
                  <h3 className="font-heading text-lg font-semibold text-neutral-900 group-hover:text-[#1d4ed8] transition-colors">
                    {listing.title}
                  </h3>
                  <div className="flex items-baseline gap-2 text-neutral-900">
                    <span className="text-2xl font-semibold">
                      {formatCurrency(listing.priceCZK)}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-neutral-700">
                    {getPropertyTypeLabel(listing.propertyType)}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-neutral-700">
                  <span className="flex items-center gap-2">
                    <LuBedDouble size={16} />
                    {listing.beds} {t.homeFeatured.bedsLabel}
                  </span>
                  <span className="flex items-center gap-2">
                    <FiDroplet size={16} />
                    {listing.baths} {t.homeFeatured.bathsLabel}
                  </span>
                  <span className="flex items-center gap-2">
                    <TbRulerMeasure size={16} />
                    {numberFormatter.format(listing.areaSqm)} {t.homeFeatured.areaLabel}
                  </span>
                </div>

                <p className="text-sm text-neutral-600">{listing.location}</p>
              </div>
            </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

