"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/admin/admin-layout";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { Search, Mail, Phone, MapPin, FileText, Trash2, Check, Archive } from "react-feather";
import { getSupabaseClient } from "@/lib/supabase/client";

type ContactSubmission = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  location: string | null;
  property_type: string | null;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  created_at: string;
};

export default function ContactsPage() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticated = isAdminAuthenticated();
    setIsAuthenticated(authenticated);

    if (!authenticated) {
      router.push("/admin/login");
      return;
    }

    loadSubmissions();
  }, [router]);

  async function loadSubmissions() {
    setLoading(true);
    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        console.error("Supabase not configured");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching submissions:", error);
        // If table doesn't exist, show helpful message
        if (error.code === "42P01" || error.message?.includes("does not exist")) {
          console.warn("Contact submissions table does not exist. Please run the SQL migration first.");
        }
        setSubmissions([]);
      } else {
        setSubmissions(data || []);
      }
    } catch (error: any) {
      console.error("Error loading submissions:", error);
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  }

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        alert("Supabase not configured");
        return;
      }

      const { error } = await supabase
        .from("contact_submissions")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) {
        alert(`Failed to update status: ${error.message}`);
      } else {
        loadSubmissions();
      }
    } catch (error: any) {
      alert(`Failed to update status: ${error.message}`);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete submission from "${name}"?`)) {
      return;
    }

    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        alert("Supabase not configured");
        return;
      }

      const { error } = await supabase
        .from("contact_submissions")
        .delete()
        .eq("id", id);

      if (error) {
        alert(`Failed to delete submission: ${error.message}`);
      } else {
        loadSubmissions();
      }
    } catch (error: any) {
      alert(`Failed to delete submission: ${error.message}`);
    }
  };

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || submission.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const newCount = submissions.filter((s) => s.status === "new").length;
  const readCount = submissions.filter((s) => s.status === "read").length;
  const repliedCount = submissions.filter((s) => s.status === "replied").length;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-semibold text-neutral-900">
              Contact Submissions
            </h1>
            <p className="mt-1 text-sm text-neutral-600">
              View and manage contact form messages ({submissions.length} total)
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-soft bg-white p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Total</p>
            <p className="mt-1 font-heading text-2xl font-semibold text-neutral-900">
              {submissions.length}
            </p>
          </div>
          <div className="rounded-2xl border border-soft bg-white p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">New</p>
            <p className="mt-1 font-heading text-2xl font-semibold text-[#1d4ed8]">
              {newCount}
            </p>
          </div>
          <div className="rounded-2xl border border-soft bg-white p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Read</p>
            <p className="mt-1 font-heading text-2xl font-semibold text-neutral-900">
              {readCount}
            </p>
          </div>
          <div className="rounded-2xl border border-soft bg-white p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Replied</p>
            <p className="mt-1 font-heading text-2xl font-semibold text-neutral-900">
              {repliedCount}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-soft bg-white p-4">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by name, email, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 w-full rounded-lg border border-soft bg-white pl-10 pr-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
              />
            </div>
          </div>
          <div className="rounded-2xl border border-soft bg-white p-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Submissions List */}
        {loading ? (
          <div className="rounded-2xl border border-soft bg-white p-12 text-center text-neutral-600">
            Loading submissions...
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="rounded-2xl border border-soft bg-white p-12 text-center">
            <p className="text-neutral-600">
              {searchTerm || statusFilter !== "all"
                ? "No submissions match your filters."
                : "No contact submissions yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <div
                key={submission.id}
                className={`overflow-hidden rounded-2xl border border-soft bg-white shadow-sm ${
                  submission.status === "new" ? "border-[color:var(--brand-500)] bg-[color:var(--brand-50)]" : ""
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-heading text-xl font-semibold text-neutral-900">
                            {submission.full_name}
                          </h3>
                          {submission.status === "new" && (
                            <span className="rounded-full bg-[color:var(--brand-500)] px-3 py-1 text-xs font-semibold text-white">
                              New
                            </span>
                          )}
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              submission.status === "read"
                                ? "bg-blue-100 text-blue-800"
                                : submission.status === "replied"
                                  ? "bg-green-100 text-green-800"
                                  : submission.status === "archived"
                                    ? "bg-neutral-100 text-neutral-800"
                                    : ""
                            }`}
                          >
                            {submission.status}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-neutral-500">
                          {new Date(submission.created_at).toLocaleString()}
                        </p>
                      </div>

                      <div className="grid gap-3 text-sm md:grid-cols-2">
                        <div className="flex items-center gap-2 text-neutral-600">
                          <Mail size={16} />
                          <a
                            href={`mailto:${submission.email}`}
                            className="hover:text-[color:var(--brand-600)] hover:underline"
                          >
                            {submission.email}
                          </a>
                        </div>
                        {submission.phone && (
                          <div className="flex items-center gap-2 text-neutral-600">
                            <Phone size={16} />
                            <a
                              href={`tel:${submission.phone}`}
                              className="hover:text-[color:var(--brand-600)] hover:underline"
                            >
                              {submission.phone}
                            </a>
                          </div>
                        )}
                        {submission.location && (
                          <div className="flex items-center gap-2 text-neutral-600">
                            <MapPin size={16} />
                            <span>{submission.location}</span>
                          </div>
                        )}
                        {submission.property_type && (
                          <div className="flex items-center gap-2 text-neutral-600">
                            <FileText size={16} />
                            <span>{submission.property_type}</span>
                          </div>
                        )}
                      </div>

                      <div className="rounded-lg border border-soft bg-neutral-50 p-4">
                        <p className="text-sm leading-7 text-neutral-700">{submission.message}</p>
                      </div>
                    </div>

                    <div className="ml-6 flex flex-col gap-2">
                      {submission.status === "new" && (
                        <button
                          onClick={() => handleStatusUpdate(submission.id, "read")}
                          className="flex items-center gap-2 rounded-lg border border-soft bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                          title="Mark as Read"
                        >
                          <Check size={16} />
                          Read
                        </button>
                      )}
                      {submission.status !== "replied" && (
                        <button
                          onClick={() => handleStatusUpdate(submission.id, "replied")}
                          className="flex items-center gap-2 rounded-lg border border-soft bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                          title="Mark as Replied"
                        >
                          <Mail size={16} />
                          Replied
                        </button>
                      )}
                      {submission.status !== "archived" && (
                        <button
                          onClick={() => handleStatusUpdate(submission.id, "archived")}
                          className="flex items-center gap-2 rounded-lg border border-soft bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                          title="Archive"
                        >
                          <Archive size={16} />
                          Archive
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(submission.id, submission.full_name)}
                        className="flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
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

