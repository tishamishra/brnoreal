"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/admin-layout";
import { useIsAuthenticated } from "@/lib/auth/client";
import { getAllListings } from "@/lib/data/listings";
import { listingsService } from "@/lib/supabase/services";
import type { Listing } from "@/data/sample-data";
import { formatCurrency } from "@/lib/format";
import { Edit, Trash2, Plus, Search, Eye, ExternalLink } from "react-feather";

export default function AllListingsPage() {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
      return;
    }

    async function loadData() {
      setLoading(true);
      const allListings = await getAllListings();
      setListings(allListings);
      setLoading(false);
    }

    loadData();
  }, [router]);

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await listingsService.delete(slug);
      // Reload listings
      const allListings = await getAllListings();
      setListings(allListings);
    } catch (error: any) {
      alert(`Failed to delete listing: ${error.message}`);
    }
  };

  const filteredListings = listings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-semibold text-neutral-900">
              All Listings
            </h1>
            <p className="mt-1 text-sm text-neutral-600">
              Manage all property listings ({listings.length} total)
            </p>
          </div>
          <Link href="/admin/listings/new" className="btn-primary flex items-center gap-2">
            <Plus size={18} />
            Add New Listing
          </Link>
        </div>

        <div className="rounded-2xl border border-soft bg-white p-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search listings by title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 w-full rounded-lg border border-soft bg-white pl-10 pr-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-soft bg-white p-12 text-center text-neutral-600">
            Loading listings...
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="rounded-2xl border border-soft bg-white p-12 text-center">
            <p className="mb-4 text-neutral-600">
              {searchTerm ? "No listings match your search." : "No listings found."}
            </p>
            {!searchTerm && (
              <Link href="/admin/listings/new" className="btn-primary inline-flex">
                <Plus size={18} className="mr-2" />
                Add Your First Listing
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-soft bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b border-soft bg-neutral-50">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-neutral-600">
                    Property
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-neutral-600">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-neutral-600">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-neutral-600">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-neutral-600">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-neutral-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredListings.map((listing) => (
                  <tr
                    key={listing.id}
                    className="border-b border-soft transition hover:bg-neutral-50"
                  >
                    <td className="px-6 py-4">
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
                          {listing.beds} bd · {listing.baths} ba · {listing.areaSqm} m²
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700">{listing.location}</td>
                    <td className="px-6 py-4 font-semibold text-neutral-900">
                      {formatCurrency(listing.priceCZK)}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700">
                      {listing.category}
                    </td>
                    <td className="px-6 py-4">
                      {listing.status ? (
                        <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                          {listing.status}
                        </span>
                      ) : (
                        <span className="text-sm text-neutral-500">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
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
                          onClick={() => handleDelete(listing.slug, listing.title)}
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
    </AdminLayout>
  );
}

