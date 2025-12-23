"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/admin-layout";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { listingsService } from "@/lib/supabase/services";
import { getSupabaseClient } from "@/lib/supabase/client";
import { getListingBySlug } from "@/lib/data/listings";
import { categoryOptions, locationOptions, propertyTypeOptions } from "@/data/sample-data";
import { ArrowLeft, Save } from "react-feather";
import type { Listing } from "@/data/sample-data";

export default function EditListingPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [listing, setListing] = useState<Listing | null>(null);
  const [agents, setAgents] = useState<Array<{ id: string; name: string; title: string }>>([]);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    location: "",
    locationValue: "",
    category: "homes-sale",
    propertyType: "villa",
    priceCZK: "",
    beds: "",
    baths: "",
    areaSqm: "",
    description: "",
    highlights: "",
    status: "",
    image: "",
    latitude: "",
    longitude: "",
    postalCode: "",
    streetAddress: "",
    features: "",
    agentId: "",
  });

  useEffect(() => {
    // Check authentication on client side only
    const authenticated = isAdminAuthenticated();
    setIsAuthenticated(authenticated);

    if (!authenticated) {
      router.push("/admin/login");
      return;
    }

    async function loadListing() {
      if (!slug) return;
      setLoading(true);
      try {
        // Load listing with agent_id from database
        const supabase = getSupabaseClient();
        if (supabase) {
          const { data: listingData } = await (supabase
            .from("listings") as any)
            .select("*")
            .eq("slug", slug)
            .single();

          if (listingData) {
            const data = await getListingBySlug(slug);
            if (data) {
              setListing(data);
              setFormData({
                title: data.title,
                slug: data.slug,
                location: data.location,
                locationValue: data.locationValue,
                category: data.category,
                propertyType: data.propertyType,
                priceCZK: String(data.priceCZK),
                beds: String(data.beds || ""),
                baths: String(data.baths || ""),
                areaSqm: String(data.areaSqm),
                description: data.description,
                highlights: data.highlights.join("\n"),
                status: data.status || "",
                image: data.image,
                latitude: String(data.coordinates[0] || ""),
                longitude: String(data.coordinates[1] || ""),
                postalCode: data.postalCode || "",
                streetAddress: data.streetAddress || "",
                features: data.features?.join(", ") || "",
                agentId: (listingData as any)?.agent_id || "",
              });
            }
          }
        } else {
          const data = await getListingBySlug(slug);
          if (!data) {
            setError("Listing not found");
            setLoading(false);
            return;
          }
          setListing(data);
          setFormData({
            title: data.title,
            slug: data.slug,
            location: data.location,
            locationValue: data.locationValue,
            category: data.category,
            propertyType: data.propertyType,
            priceCZK: String(data.priceCZK),
            beds: String(data.beds || ""),
            baths: String(data.baths || ""),
            areaSqm: String(data.areaSqm),
            description: data.description,
            highlights: data.highlights.join("\n"),
            status: data.status || "",
            image: data.image,
            latitude: String(data.coordinates[0] || ""),
            longitude: String(data.coordinates[1] || ""),
            postalCode: data.postalCode || "",
            streetAddress: data.streetAddress || "",
            features: data.features?.join(", ") || "",
            agentId: "",
          });
        }
      } catch (err: any) {
        setError(err.message || "Failed to load listing");
      } finally {
        setLoading(false);
      }
    }

    async function loadAgents() {
      const supabase = getSupabaseClient();
      if (!supabase) return;

      const { data } = await (supabase
        .from("agents") as any)
        .select("id, name, title")
        .order("name", { ascending: true });

      if (data) {
        setAgents(data);
      }
    }

    loadListing();
    loadAgents();
  }, [slug, router]);

  if (!isAuthenticated) {
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug) return;
    setError("");
    setSaving(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.slug || !formData.image) {
        throw new Error("Please fill in all required fields");
      }

      // Parse arrays
      const highlights = formData.highlights
        .split("\n")
        .map((h) => h.trim())
        .filter((h) => h.length > 0);
      const features = formData.features
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      // Parse coordinates
      const coordinates: [number, number] = [
        parseFloat(formData.latitude) || 0,
        parseFloat(formData.longitude) || 0,
      ];

      await listingsService.update(slug, {
        title: formData.title,
        location: formData.location,
        locationValue: formData.locationValue,
        category: formData.category,
        propertyType: formData.propertyType,
        priceCZK: parseInt(formData.priceCZK) || 0,
        beds: parseInt(formData.beds) || 0,
        baths: parseFloat(formData.baths) || 0,
        areaSqm: parseInt(formData.areaSqm) || 0,
        description: formData.description,
        highlights,
        status: (formData.status === "featured" || formData.status === "new" || formData.status === "sold") ? formData.status : undefined,
        image: formData.image,
        coordinates,
        postalCode: formData.postalCode || undefined,
        streetAddress: formData.streetAddress || undefined,
        features: features.length > 0 ? features : undefined,
        agentId: formData.agentId || undefined,
      } as any);

      router.push("/admin/listings");
    } catch (err: any) {
      setError(err.message || "Failed to update listing");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-center text-neutral-600">Loading listing...</div>
        </div>
      </AdminLayout>
    );
  }

  if (!listing) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-center text-red-600">Listing not found</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/listings"
            className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-heading text-3xl font-semibold text-neutral-900">
              Edit Listing
            </h1>
            <p className="mt-1 text-sm text-neutral-600">Update property listing details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-red-800">{error}</div>
          )}

          <div className="grid gap-6 rounded-2xl border border-soft bg-white p-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
                required
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Property Type <span className="text-red-500">*</span>
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
                required
              >
                {propertyTypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Location Value (for filtering) <span className="text-red-500">*</span>
              </label>
              <select
                name="locationValue"
                value={formData.locationValue}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
                required
              >
                <option value="">Select location</option>
                {locationOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-neutral-500">
                This is used for filtering and matching with destination pages. Select from the predefined locations.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Display Location (shown to users) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Masarykova čtvrť, Brno"
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
                required
              />
              <p className="mt-1 text-xs text-neutral-500">
                The full location name that appears on property cards and detail pages. Can include neighborhood, city, etc.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Price (CZK) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="priceCZK"
                value={formData.priceCZK}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Bedrooms
              </label>
              <input
                type="number"
                name="beds"
                value={formData.beds}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Bathrooms
              </label>
              <input
                type="number"
                step="0.5"
                name="baths"
                value={formData.baths}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Area (sqm) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="areaSqm"
                value={formData.areaSqm}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
              >
                <option value="">None</option>
                <option value="featured">Featured</option>
                <option value="new">New</option>
                <option value="sold">Sold</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
                placeholder="https://images.unsplash.com/..."
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
                placeholder="49.195"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
                placeholder="16.607"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Street Address
              </label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-lg border border-soft bg-white px-4 py-3 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Highlights (one per line)
              </label>
              <textarea
                name="highlights"
                value={formData.highlights}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-soft bg-white px-4 py-3 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
                placeholder="Panoramic terrace&#10;Restored winter garden&#10;Wine cellar"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Features (comma-separated)
              </label>
              <input
                type="text"
                name="features"
                value={formData.features}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
                placeholder="Terrace, Garden, Parking"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Assigned Agent
              </label>
              <select
                name="agentId"
                value={formData.agentId}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
              >
                <option value="">No agent assigned</option>
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name} - {agent.title}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-neutral-500">
                Select the agent responsible for this listing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={18} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <Link href="/admin/listings" className="btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

