"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/admin-layout";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { ArrowLeft, Save } from "react-feather";
import { getSupabaseClient } from "@/lib/supabase/client";

export default function EditAgentPage() {
  const router = useRouter();
  const params = useParams();
  const agentId = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    region: "",
    email: "",
    phone: "",
    specialties: "",
    bio: "",
    image: "",
  });

  useEffect(() => {
    const authenticated = isAdminAuthenticated();
    setIsAuthenticated(authenticated);

    if (!authenticated) {
      router.push("/admin/login");
      return;
    }

    if (agentId) {
      loadAgent();
    }
  }, [agentId, router]);

  async function loadAgent() {
    setLoading(true);
    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        setError("Supabase not configured");
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("agents")
        .select("*")
        .eq("id", agentId)
        .single();

      if (fetchError) {
        setError(`Failed to load agent: ${fetchError.message}`);
        setLoading(false);
        return;
      }

      if (data) {
        const agentData = data as {
          name?: string;
          title?: string;
          region?: string;
          email?: string;
          phone?: string;
          specialties?: string[];
          bio?: string;
          image?: string | null;
        };
        setFormData({
          name: agentData.name || "",
          title: agentData.title || "",
          region: agentData.region || "",
          email: agentData.email || "",
          phone: agentData.phone || "",
          specialties: agentData.specialties?.join(", ") || "",
          bio: agentData.bio || "",
          image: agentData.image || "",
        });
      }
    } catch (err: any) {
      setError(`Error loading agent: ${err.message}`);
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
      if (!formData.name || !formData.email || !formData.title) {
        throw new Error("Please fill in all required fields");
      }

      const supabase = getSupabaseClient();
      if (!supabase) {
        throw new Error("Supabase not configured");
      }

      // Parse specialties (comma-separated)
      const specialties = formData.specialties
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const updateData = {
        name: formData.name,
        title: formData.title,
        region: formData.region,
        email: formData.email,
        phone: formData.phone,
        specialties: specialties.length > 0 ? specialties : [],
        bio: formData.bio,
        image: formData.image || null,
      };

      const { error: updateError } = await (supabase
        .from("agents") as any)
        .update(updateData)
        .eq("id", agentId);

      if (updateError) {
        throw updateError;
      }

      router.push("/admin/agents");
    } catch (err: any) {
      setError(err.message || "Failed to update agent");
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
          <p className="text-neutral-600">Loading agent...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/agents"
            className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-heading text-3xl font-semibold text-neutral-900">
              Edit Agent
            </h1>
            <p className="mt-1 text-sm text-neutral-600">
              Update agent information
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
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Senior Partner & Founder"
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
                placeholder="e.g., Brno & South Moravia"
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
                placeholder="+420 539 012 345"
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://..."
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Specialties (comma-separated)
              </label>
              <input
                type="text"
                name="specialties"
                value={formData.specialties}
                onChange={handleChange}
                placeholder="e.g., Luxury Residences, Heritage Properties, Investment Advisory"
                className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
              />
              <p className="mt-1 text-xs text-neutral-500">
                Separate multiple specialties with commas
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Bio <span className="text-red-500">*</span>
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={5}
                className="w-full rounded-lg border border-soft bg-white px-4 py-3 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <Link href="/admin/agents" className="btn-secondary">
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


