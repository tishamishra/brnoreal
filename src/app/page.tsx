"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeroSearch } from "@/components/hero/hero-search";
import { formatAreaSqm, formatBedsBaths, formatCurrency } from "@/lib/format";
import { useTranslations } from "@/components/providers/locale-provider";
import { TopDestinationsSection } from "@/components/home/top-destinations";
import { FeaturedPropertiesSection } from "@/components/home/featured-properties";
import { AboutSection } from "@/components/home/about-section";
import { getFeaturedListings, getAllListings, type Listing } from "@/lib/data/listings";

// Fallback placeholder image
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

export default function Home() {
  const t = useTranslations();
  const [featuredListing, setFeaturedListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    async function loadFeatured() {
      setLoading(true);
      // Get featured listings from Supabase
      const featured = await getFeaturedListings(1);
      if (featured.length > 0) {
        setFeaturedListing(featured[0]);
      } else {
        // Fallback: get first listing if no featured
        const allListings = await getAllListings();
        setFeaturedListing(allListings[0] || null);
      }
      setLoading(false);
    }
    loadFeatured();
  }, []);

  return (
    <div className="space-y-24 pb-16">
      <section className="relative overflow-hidden bg-white">
        <div className="container grid gap-16 py-20 md:grid-cols-[minmax(0,1fr)_420px] md:items-start lg:py-28">
          <div className="space-y-8 pt-8">
            <span className="inline-flex items-center rounded-full border border-soft bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-neutral-700">
              {t.hero.badge}
            </span>
            <div className="space-y-6">
              <h1 className="font-heading text-4xl font-semibold tracking-tight text-black sm:text-5xl">
                {t.hero.heading}
              </h1>
              <p className="max-w-xl text-lg text-muted">
                {t.hero.subheading}
              </p>
            </div>
            <HeroSearch />
            <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-neutral-700">
              <span className="text-xs uppercase tracking-[0.35em] text-neutral-500">
                {t.hero.investors}
              </span>
              <div className="flex items-center gap-4 text-neutral-700">
                {t.hero.investorLocations.map((location) => (
                  <span key={location}>• {location}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-12 -left-10 hidden h-40 w-40 rounded-full bg-[color:var(--brand-200)] blur-3xl md:block" />
            <article className="relative overflow-hidden rounded-[32px] border border-soft bg-white/80 p-8 text-sm shadow-[0_35px_60px_-30px_rgba(35,23,7,0.35)] backdrop-blur">
              <div className="space-y-3">
                <span className="inline-flex items-center rounded-full bg-black/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                  {t.listings.featuredLabel}
                </span>
                <h2 className="font-heading text-2xl font-semibold text-black">
                  {loading ? "Loading..." : featuredListing?.title || "No Featured Property"}
                </h2>
                <p className="text-muted">
                  {loading
                    ? "Loading property details..."
                    : featuredListing
                      ? `${featuredListing.location} • ${formatBedsBaths(featuredListing.beds, featuredListing.baths)} • ${formatAreaSqm(featuredListing.areaSqm)}`
                      : "No property available"}
                </p>
              </div>
              {loading ? (
                <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-200 animate-pulse" />
              ) : featuredListing ? (
                <>
                  <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-900">
                    <Image
                      src={imageError ? FALLBACK_IMAGE : (featuredListing.image || FALLBACK_IMAGE)}
                      alt={featuredListing.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 420px"
                      priority
                      onError={() => {
                        if (!imageError) {
                          console.warn("Image failed to load, using fallback:", featuredListing.image);
                          setImageError(true);
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/40" />
                    <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 font-semibold text-neutral-900 shadow">
                      {formatCurrency(featuredListing.priceCZK)}
                    </div>
                  </div>
                  <ul className="mt-6 grid grid-cols-2 gap-4 text-xs uppercase tracking-[0.28em] text-neutral-500">
                    {featuredListing.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="rounded-2xl border border-soft bg-white/70 p-4 text-neutral-800"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                        {t.hero.advisorLabel}
                      </p>
                      <p className="font-heading text-base font-semibold text-neutral-900">
                        Tereza Králová
                      </p>
                    </div>
                    <Link
                      href={`/listings/${featuredListing.slug}`}
                      className="btn-secondary text-xs uppercase tracking-[0.35em]"
                    >
                      {t.hero.viewDetails}
                    </Link>
                  </div>
                </>
              ) : (
                <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-200 flex items-center justify-center text-neutral-500">
                  No featured property available
                </div>
              )}
            </article>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[rgba(29,78,216,0.35)] to-transparent" />
      </section>

      <TopDestinationsSection />
      <FeaturedPropertiesSection />
      <AboutSection />
    </div>
  );
}
