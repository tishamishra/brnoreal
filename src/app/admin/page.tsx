"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/admin-layout";
import { useIsAuthenticated } from "@/lib/auth/client";
import { getAllListings } from "@/lib/data/listings";
import type { Listing } from "@/data/sample-data";
import { formatCurrency } from "@/lib/format";
import { Edit, Trash2, Plus, TrendingUp, MapPin, Home, Eye, ExternalLink } from "react-feather";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, isLoading: authLoading } = useIsAuthenticated();
  const [stats, setStats] = useState({
    total: 0,
    featured: 0,
    averagePrice: 0,
  });

  useEffect(() => {
    // Wait for auth to load before checking
    if (authLoading) return;
    
    if (!isAuthenticated) {
      router.push("/admin/login");
      return;
    }

    async function loadData() {
      setLoading(true);
      const allListings = await getAllListings();
      setListings(allListings);

      const featured = allListings.filter((l) => l.status === "featured");
      const avgPrice =
        allListings.length > 0
          ? Math.round(
              allListings.reduce((sum, l) => sum + l.priceCZK, 0) /
                allListings.length
            )
          : 0;

      setStats({
        total: allListings.length,
        featured: featured.length,
        averagePrice: avgPrice,
      });
      setLoading(false);
    }

    loadData();
  }, [router, authLoading, isAuthenticated]);

  // Show loading while auth is being checked
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-semibold text-neutral-900">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-neutral-600">
              Manage your property listings
            </p>
          </div>
          <Link
            href="/admin/listings/new"
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={18} />
            Add New Listing
          </Link>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-soft bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-3">
                <Home size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-600">
                  Total Listings
                </p>
                <p className="text-2xl font-bold text-neutral-900">
                  {loading ? "..." : stats.total}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-soft bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-100 p-3">
                <TrendingUp size={20} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-600">
                  Featured
                </p>
                <p className="text-2xl font-bold text-neutral-900">
                  {loading ? "..." : stats.featured}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-soft bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-3">
                <MapPin size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-600">
                  Avg. Price
                </p>
                <p className="text-2xl font-bold text-neutral-900">
                  {loading ? "..." : formatCurrency(stats.averagePrice)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Listings */}
        <div className="rounded-2xl border border-soft bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-xl font-semibold text-neutral-900">
              Recent Listings
            </h2>
            <Link
              href="/admin/listings"
              className="text-sm font-semibold text-[color:var(--brand-500)] hover:underline"
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-neutral-600">
              Loading listings...
            </div>
          ) : listings.length === 0 ? (
            <div className="py-12 text-center text-neutral-600">
              <p className="mb-4">No listings found.</p>
              <Link href="/admin/listings/new" className="btn-primary inline-flex">
                <Plus size={18} className="mr-2" />
                Add Your First Listing
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-soft text-left">
                    <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-neutral-600">
                      Property
                    </th>
                    <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-neutral-600">
                      Location
                    </th>
                    <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-neutral-600">
                      Price
                    </th>
                    <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-neutral-600">
                      Status
                    </th>
                    <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-neutral-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listings.slice(0, 10).map((listing) => (
                    <tr
                      key={listing.id}
                      className="border-b border-soft transition hover:bg-neutral-50"
                    >
                      <td className="py-4">
                        <div>
                          <Link
                            href={`/listings/${listing.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-neutral-900 hover:text-[color:var(--brand-600)] transition-colors inline-flex items-center gap-1"
                          >
                            {listing.title}
                            <ExternalLink size={14} className="opacity-60" />
                          </Link>
                          <p className="text-sm text-neutral-600">
                            {listing.category} • {listing.propertyType}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-neutral-700">
                        {listing.location}
                      </td>
                      <td className="py-4 font-semibold text-neutral-900">
                        {formatCurrency(listing.priceCZK)}
                      </td>
                      <td className="py-4">
                        {listing.status ? (
                          <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                            {listing.status}
                          </span>
                        ) : (
                          <span className="text-sm text-neutral-500">—</span>
                        )}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/listings/${listing.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg p-2 text-neutral-600 hover:bg-blue-50 hover:text-blue-600"
                            title="Preview on website"
                          >
                            <Eye size={16} />
                          </Link>
                          <Link
                            href={`/admin/listings/${listing.slug}/edit`}
                            className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-[color:var(--brand-500)]"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={async () => {
                              if (
                                confirm(
                                  `Are you sure you want to delete "${listing.title}"?`
                                )
                              ) {
                                try {
                                  const { listingsService } = await import("@/lib/supabase/services");
                                  await listingsService.delete(listing.slug);
                                  // Reload listings
                                  const allListings = await getAllListings();
                                  setListings(allListings);
                                } catch (error: any) {
                                  alert(`Failed to delete: ${error.message}`);
                                }
                              }
                            }}
                            className="rounded-lg p-2 text-neutral-600 hover:bg-red-50 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

