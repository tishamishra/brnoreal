"use client";

import { LocaleLink } from "@/components/locale-link";
import { useTranslations } from "@/components/providers/locale-provider";
import { destinations } from "@/data/destinations";

export default function SitemapPage() {
  const t = useTranslations();

  const mainPages = [
    { label: "Home", href: "/" },
    { label: "Search Listings", href: "/listings" },
    { label: "Featured Properties", href: "/featured" },
    { label: "All Properties", href: "/all-properties" },
    { label: "Meet the Team", href: "/about/team" },
    { label: "Discover Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  const propertyCategories = [
    { label: "Homes for Sale", href: "/listings/category/homes-sale" },
    { label: "Homes for Rent", href: "/listings/category/homes-rent" },
    { label: "Commercial for Sale", href: "/listings/category/commercial-sale" },
    { label: "Commercial for Rent", href: "/listings/category/commercial-rent" },
    { label: "Land for Sale", href: "/listings/category/land-sale" },
    { label: "Land for Rent", href: "/listings/category/land-rent" },
    { label: "Investment Buildings", href: "/listings/category/investment-building" },
  ];

  const destinationPages = destinations.map((dest) => ({
    label: dest.name,
    href: `/destinations/${dest.slug}`,
  }));

  const legalPages = [
    { label: "Privacy Notice", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Do Not Sell My Info", href: "/privacy/do-not-sell" },
    { label: "DMCA Notice", href: "/dmca" },
    { label: "Site Map", href: "/site-map" },
  ];

  return (
    <div className="bg-site-canvas">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1d4ed8]/20 via-neutral-900/80 to-neutral-900/90" />
        <div className="container relative py-24 md:py-32">
          <div className="max-w-3xl space-y-6 text-white">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] backdrop-blur">
              Navigation
            </span>
            <h1 className="font-heading text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Site Map
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              Find all pages and sections of our website organized for easy navigation.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-site-canvas py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-6xl space-y-12">
            {/* Main Pages */}
            <div className="rounded-3xl border border-soft bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                Main Pages
              </h2>
              <ul className="mt-6 grid gap-3 md:grid-cols-2">
                {mainPages.map((page) => (
                  <li key={page.href}>
                    <LocaleLink
                      href={page.href}
                      className="flex items-center gap-2 text-neutral-600 transition hover:text-[color:var(--brand-600)]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                      <span>{page.label}</span>
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Property Categories */}
            <div className="rounded-3xl border border-soft bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                Property Categories
              </h2>
              <ul className="mt-6 grid gap-3 md:grid-cols-2">
                {propertyCategories.map((category) => (
                  <li key={category.href}>
                    <LocaleLink
                      href={category.href}
                      className="flex items-center gap-2 text-neutral-600 transition hover:text-[color:var(--brand-600)]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                      <span>{category.label}</span>
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Destinations */}
            <div className="rounded-3xl border border-soft bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                Top Destinations
              </h2>
              <ul className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {destinationPages.map((destination) => (
                  <li key={destination.href}>
                    <LocaleLink
                      href={destination.href}
                      className="flex items-center gap-2 text-neutral-600 transition hover:text-[color:var(--brand-600)]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                      <span>{destination.label}</span>
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Pages */}
            <div className="rounded-3xl border border-soft bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                Legal & Policies
              </h2>
              <ul className="mt-6 grid gap-3 md:grid-cols-2">
                {legalPages.map((page) => (
                  <li key={page.href}>
                    <LocaleLink
                      href={page.href}
                      className="flex items-center gap-2 text-neutral-600 transition hover:text-[color:var(--brand-600)]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                      <span>{page.label}</span>
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="rounded-3xl border border-soft bg-[color:var(--brand-50)] p-8">
              <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                Quick Links
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 font-semibold text-neutral-900">Get Started</h3>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    <li>
                      <LocaleLink href="/listings" className="hover:text-[color:var(--brand-600)]">
                        Search Properties
                      </LocaleLink>
                    </li>
                    <li>
                      <LocaleLink href="/contact" className="hover:text-[color:var(--brand-600)]">
                        Contact Us
                      </LocaleLink>
                    </li>
                    <li>
                      <LocaleLink href="/services" className="hover:text-[color:var(--brand-600)]">
                        Our Services
                      </LocaleLink>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 font-semibold text-neutral-900">Learn More</h3>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    <li>
                      <LocaleLink href="/about/team" className="hover:text-[color:var(--brand-600)]">
                        Meet the Team
                      </LocaleLink>
                    </li>
                    <li>
                      <LocaleLink href="/featured" className="hover:text-[color:var(--brand-600)]">
                        Featured Properties
                      </LocaleLink>
                    </li>
                    <li>
                      <LocaleLink href="/all-properties" className="hover:text-[color:var(--brand-600)]">
                        Browse All Properties
                      </LocaleLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

