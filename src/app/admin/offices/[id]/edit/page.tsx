"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/admin-layout";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { ArrowLeft, Save } from "react-feather";
import { getSupabaseClient } from "@/lib/supabase/client";

export default function EditOfficePage() {
  const router = useRouter();
  const params = useParams();
  const officeId = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    address: "",
    phone: "",
    email: "",
    services: "",
  });

  useEffect(() => {
    const authenticated = isAdminAuthenticated();
    setIsAuthenticated(authenticated);

    if (!authenticated) {
      router.push("/admin/login");
      return;
    }

    if (officeId) {
      loadOffice();
    }
  }, [officeId, router]);

  async function loadOffice() {
    setLoading(true);
    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        setError("Supabase not configured");
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("offices")
        .select("*")
        .eq("id", officeId)
        .single();

      if (fetchError) {
        setError(`Failed to load office: ${fetchError.message}`);
        setLoading(false);
        return;
      }

      if (data) {
        setFormData({
          name: data.name || "",
          region: data.region || "",
          address: data.address || "",
          phone: data.phone || "",
          email: data.email || "",
          services: data.services?.join(", ") || "",
        });
      }
    } catch (err: any) {
      setError(`Error loading office: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      if (!formData.name || !formData.email || !formData.address) {
        throw new Error("Please fill in all required fields");
      }

      const supabase = getSupabaseClient();
      if (!supabase) {
        throw new Error("Supabase not configured");
      }

      // Parse services (comma-separated)
      const services = formData.services
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const { error: updateError } = await supabase
        .from("offices")
        .update({
          name: formData.name,
          region: formData.region,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          services: services.length > 0 ? services : [],
        })
        .eq("id", officeId);

      if (updateError) {
        throw updateError;
      }

      router.push("/admin/offices");
    } catch (err: any) {
      setError(err.message || "Failed to update office");
      setSaving(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center p-12">
          <p className="text-neutral-600">Loading office...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/offices"
            className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-heading text-3xl font-semibold text-neutral-900">
              Edit Office
            </h1>
            <p className="mt-1 text-sm text-neutral-600">
              Update office information
            </p>
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 rounded-2xl border border-soft bg-white p-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Office Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Brno-střed Flagship Gallery"
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Region <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleChange}
                placeholder="e.g., Brno"
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g., Dominikánské náměstí 5, 602 00 Brno"
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+420 539 012 310"
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="brno@brnore.cz"
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Services (comma-separated)
              </label>
              <input
                type="text"
                name="services"
                value={formData.services}
                onChange={handleChange}
                placeholder="e.g., Prime sales brokerage, Marketing studio, Client concierge"
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
              />
              <p className="mt-1 text-xs text-neutral-500">
                Separate multiple services with commas
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <Link href="/admin/offices" className="btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn-primary flex items-center gap-2" disabled={saving}>
              <Save size={18} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}


