"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/admin-layout";
import { useIsAuthenticated } from "@/lib/auth/client";
import { Plus, Edit, Trash2, Search, Mail, Phone, MapPin } from "react-feather";
import { getSupabaseClient } from "@/lib/supabase/client";

type Office = {
  id: string;
  name: string;
  region: string;
  address: string;
  phone: string;
  email: string;
  services: string[];
};

export default function OfficesPage() {
  const router = useRouter();
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
      return;
    }

    loadOffices();
  }, [router]);

  async function loadOffices() {
    setLoading(true);
    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        console.error("Supabase not configured");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("offices")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching offices:", error);
        // If table doesn't exist, show helpful message
        if (error.code === "42P01" || error.message?.includes("does not exist")) {
          console.warn("Offices table does not exist. Please run the SQL migration first.");
        }
        setOffices([]);
      } else {
        setOffices(data || []);
      }
    } catch (error: any) {
      console.error("Error loading offices:", error);
      setOffices([]);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        alert("Supabase not configured");
        return;
      }

      const { error } = await (supabase.from("offices") as any).delete().eq("id", id);

      if (error) {
        alert(`Failed to delete office: ${error.message}`);
      } else {
        loadOffices();
      }
    } catch (error: any) {
      alert(`Failed to delete office: ${error.message}`);
    }
  };

  const filteredOffices = offices.filter(
    (office) =>
      office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.address.toLowerCase().includes(searchTerm.toLowerCase())
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
              Offices
            </h1>
            <p className="mt-1 text-sm text-neutral-600">
              Manage office locations ({offices.length} total)
            </p>
          </div>
          <Link href="/admin/offices/new" className="btn-primary flex items-center gap-2">
            <Plus size={18} />
            Add New Office
          </Link>
        </div>

        <div className="rounded-2xl border border-soft bg-white p-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search offices by name, region, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 w-full rounded-lg border border-soft bg-white pl-10 pr-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-soft bg-white p-12 text-center text-neutral-600">
            Loading offices...
          </div>
        ) : filteredOffices.length === 0 ? (
          <div className="rounded-2xl border border-soft bg-white p-12 text-center">
            <p className="mb-4 text-neutral-600">
              {searchTerm ? "No offices match your search." : "No offices found."}
            </p>
            {!searchTerm && (
              <Link href="/admin/offices/new" className="btn-primary inline-flex">
                <Plus size={18} className="mr-2" />
                Add Your First Office
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredOffices.map((office) => (
              <div
                key={office.id}
                className="overflow-hidden rounded-2xl border border-soft bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="space-y-4 p-6">
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-neutral-900">
                      {office.name}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-600">{office.region}</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2 text-neutral-600">
                      <MapPin size={16} className="mt-0.5" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-600">
                      <Mail size={16} />
                      <span className="truncate">{office.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-600">
                      <Phone size={16} />
                      <span>{office.phone}</span>
                    </div>
                  </div>

                  {office.services.length > 0 && (
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-neutral-500">
                        Services
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {office.services.map((service) => (
                          <span
                            key={service}
                            className="rounded-full border border-soft bg-white px-3 py-1 text-xs text-neutral-700"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-2 border-t border-soft pt-4">
                    <Link
                      href={`/admin/offices/${office.id}/edit`}
                      className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-[color:var(--brand-500)]"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(office.id, office.name)}
                      className="rounded-lg p-2 text-neutral-600 hover:bg-red-50 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

