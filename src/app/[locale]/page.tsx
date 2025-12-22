"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LocaleLink } from "@/components/locale-link";
import { HeroSearch } from "@/components/hero/hero-search";
import { formatAreaSqm, formatBedsBaths, formatCurrency } from "@/lib/format";
import { useTranslations } from "@/components/providers/locale-provider";
import { TopDestinationsSection } from "@/components/home/top-destinations";
import { FeaturedPropertiesSection } from "@/components/home/featured-properties";
import { AboutSection } from "@/components/home/about-section";
import { getFeaturedListings } from "@/lib/data/listings";
import type { Listing } from "@/data/sample-data";

// Fallback placeholder image
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

export default function Home() {
  const t = useTranslations();
  const [featuredListing, setFeaturedListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        setLoading(true);
        const listings = await getFeaturedListings();
        if (listings.length > 0) {
          setFeaturedListing(listings[0]);
        }
      } catch (error) {
        console.error("Error fetching featured listing:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  return (
    <div className="bg-site-canvas">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-soft bg-white">
        <div className="container py-12 sm:py-16 md:py-20">
          <div className="grid gap-8 md:gap-12 md:grid-cols-2 md:items-start">
            {/* Text Content */}
            <div className="space-y-6 sm:space-y-8 sm:pt-8">
              <div className="space-y-4 sm:space-y-6">
                <h1 className="font-heading text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl lg:text-6xl">
                  {t.hero.heading}
                </h1>
                <p className="text-base leading-relaxed text-neutral-600 sm:text-lg md:text-xl">
                  {t.hero.subheading}
                </p>
              </div>

              <HeroSearch />
            </div>

            {/* Featured Property Card - Right Side */}
            {!loading && featuredListing && (
              <div className="group relative overflow-hidden rounded-3xl border border-soft bg-white shadow-lg transition hover:shadow-xl">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={featuredListing.image || FALLBACK_IMAGE}
                    alt={featuredListing.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = FALLBACK_IMAGE;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40" />
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                      {t.listings.featuredLabel}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <LocaleLink
                    href={`/listings/${featuredListing.slug}`}
                    className="block space-y-3"
                  >
                    <h3 className="font-heading text-xl font-semibold text-neutral-900 transition-colors hover:text-[color:var(--brand-600)]">
                      {featuredListing.title}
                    </h3>
                    <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                      {featuredListing.location}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
                      <span>{formatBedsBaths(featuredListing.beds, featuredListing.baths)}</span>
                      <span>•</span>
                      <span>{formatAreaSqm(featuredListing.areaSqm)}</span>
                    </div>
                    <div className="pt-2">
                      <span className="text-2xl font-semibold text-neutral-900">
                        {formatCurrency(featuredListing.priceCZK)}
                      </span>
                    </div>
                  </LocaleLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <TopDestinationsSection />

      {/* Featured Properties */}
      <FeaturedPropertiesSection />

      {/* About Section */}
      <AboutSection />
    </div>
  );
}
