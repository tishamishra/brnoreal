"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/admin-layout";
import { useIsAuthenticated } from "@/lib/auth/client";
import { Plus, Edit, Trash2, Search, Mail, Phone, MapPin } from "react-feather";
import { getSupabaseClient } from "@/lib/supabase/client";

type Agent = {
  id: string;
  name: string;
  title: string;
  region: string;
  email: string;
  phone: string;
  specialties: string[];
  bio: string;
  image?: string;
};

export default function AgentsPage() {
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
      return;
    }

    loadAgents();
  }, [router]);

  async function loadAgents() {
    setLoading(true);
    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        console.error("Supabase not configured");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching agents:", error);
        // If table doesn't exist, show helpful message
        if (error.code === "42P01" || error.message?.includes("does not exist")) {
          console.warn("Agents table does not exist. Please run the SQL migration first.");
        }
        setAgents([]);
      } else {
        setAgents(data || []);
      }
    } catch (error: any) {
      console.error("Error loading agents:", error);
      setAgents([]);
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

      const { error } = await (supabase.from("agents") as any).delete().eq("id", id);

      if (error) {
        alert(`Failed to delete agent: ${error.message}`);
      } else {
        loadAgents();
      }
    } catch (error: any) {
      alert(`Failed to delete agent: ${error.message}`);
    }
  };

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.title.toLowerCase().includes(searchTerm.toLowerCase())
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
              Agents
            </h1>
            <p className="mt-1 text-sm text-neutral-600">
              Manage team members ({agents.length} total)
            </p>
          </div>
          <Link href="/admin/agents/new" className="btn-primary flex items-center gap-2">
            <Plus size={18} />
            Add New Agent
          </Link>
        </div>

        <div className="rounded-2xl border border-soft bg-white p-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search agents by name, title, or region..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 w-full rounded-lg border border-soft bg-white pl-10 pr-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-soft bg-white p-12 text-center text-neutral-600">
            Loading agents...
          </div>
        ) : filteredAgents.length === 0 ? (
          <div className="rounded-2xl border border-soft bg-white p-12 text-center">
            <p className="mb-4 text-neutral-600">
              {searchTerm ? "No agents match your search." : "No agents found."}
            </p>
            {!searchTerm && (
              <>
                <p className="mb-4 text-xs text-neutral-500">
                  If you haven't run the database migration yet, please check ADMIN_SETUP_GUIDE.md
                </p>
                <Link href="/admin/agents/new" className="btn-primary inline-flex">
                  <Plus size={18} className="mr-2" />
                  Add Your First Agent
                </Link>
              </>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAgents.map((agent) => (
              <div
                key={agent.id}
                className="overflow-hidden rounded-2xl border border-soft bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="space-y-4 p-6">
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-neutral-900">
                      {agent.name}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-600">{agent.title}</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-neutral-600">
                      <MapPin size={16} />
                      <span>{agent.region}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-600">
                      <Mail size={16} />
                      <span className="truncate">{agent.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-600">
                      <Phone size={16} />
                      <span>{agent.phone}</span>
                    </div>
                  </div>

                  {agent.specialties.length > 0 && (
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-neutral-500">
                        Specialties
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {agent.specialties.slice(0, 3).map((specialty) => (
                          <span
                            key={specialty}
                            className="rounded-full border border-soft bg-white px-3 py-1 text-xs text-neutral-700"
                          >
                            {specialty}
                          </span>
                        ))}
                        {agent.specialties.length > 3 && (
                          <span className="text-xs text-neutral-500">
                            +{agent.specialties.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-2 border-t border-soft pt-4">
                    <Link
                      href={`/admin/agents/${agent.id}/edit`}
                      className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-[color:var(--brand-500)]"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(agent.id, agent.name)}
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

