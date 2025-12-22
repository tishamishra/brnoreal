"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";

export default function APITestPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        const supabase = getSupabaseClient();
        if (!supabase) {
          setError("Supabase is not configured");
          setStatus("error");
          return;
        }

        // First, check if table exists and count rows
        const { count, error: countError } = await supabase
          .from("listings")
          .select("*", { count: "exact", head: true });

        const { data: listings, error: fetchError } = await supabase
          .from("listings")
          .select("*")
          .limit(5);

        if (fetchError) {
          setError(`Fetch Error: ${fetchError.message}. Count: ${count || 0}`);
          setStatus("error");
          return;
        }

        if (countError) {
          setError(`Count Error: ${countError.message}`);
          setStatus("error");
          return;
        }

        setData({ listings, count });
        setStatus("success");
      } catch (err: any) {
        setError(err.message || "Unknown error");
        setStatus("error");
      }
    }

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-site-canvas py-16">
      <div className="container max-w-4xl">
        <div className="rounded-3xl border border-soft bg-white p-8 shadow-lg">
          <h1 className="mb-6 font-heading text-3xl font-semibold text-neutral-900">
            Backend API Test
          </h1>

          <div className="mb-6 space-y-4 rounded-2xl border border-soft bg-neutral-50 p-6">
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                Backend Base URL
              </h2>
              <code className="block rounded-lg bg-white p-3 text-sm text-neutral-800">
                https://lanktmrtqaisnbbdiaet.supabase.co/rest/v1/
              </code>
            </div>

            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                Listings API Endpoint
              </h2>
              <code className="block rounded-lg bg-white p-3 text-sm text-neutral-800">
                https://lanktmrtqaisnbbdiaet.supabase.co/rest/v1/listings
              </code>
            </div>

            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                Supabase Dashboard
              </h2>
              <a
                href="https://app.supabase.com/project/lanktmrtqaisnbbdiaet"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg bg-white p-3 text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                https://app.supabase.com/project/lanktmrtqaisnbbdiaet
              </a>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="mb-4 font-heading text-xl font-semibold text-neutral-900">
              Connection Status
            </h2>
            {status === "loading" && (
              <div className="rounded-lg bg-blue-50 p-4 text-blue-800">
                Testing connection...
              </div>
            )}
            {status === "error" && (
              <div className="rounded-lg bg-red-50 p-4 text-red-800">
                <strong>Error:</strong> {error}
              </div>
            )}
            {status === "success" && (
              <div className="rounded-lg bg-green-50 p-4 text-green-800">
                <strong>✅ Success!</strong> Connected to Supabase backend. Found {data?.count || 0}{" "}
                total listings in database. Showing {data?.listings?.length || 0} below.
              </div>
            )}
          </div>

          {status === "success" && data && (
            <div>
              <h2 className="mb-4 font-heading text-xl font-semibold text-neutral-900">
                Sample Data (First 5 Listings)
              </h2>
              {data.count === 0 ? (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-amber-800">
                  <p className="mb-2 font-semibold">⚠️ No listings found in database!</p>
                  <p className="mb-4 text-sm">
                    This means the seed data hasn't been inserted yet. Please:
                  </p>
                  <ol className="ml-6 list-decimal space-y-2 text-sm">
                    <li>
                      Go to{" "}
                      <a
                        href="https://app.supabase.com/project/lanktmrtqaisnbbdiaet/editor"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold underline"
                      >
                        Supabase Table Editor
                      </a>{" "}
                      and check if the "listings" table exists
                    </li>
                    <li>
                      If the table is empty, run the seed SQL script from{" "}
                      <code className="rounded bg-amber-100 px-1">supabase/seed.sql</code> in the
                      Supabase SQL Editor
                    </li>
                    <li>
                      Verify Row Level Security (RLS) policies are enabled (they should allow public
                      read access)
                    </li>
                  </ol>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.listings?.map((listing: any) => (
                  <div
                    key={listing.id}
                    className="rounded-lg border border-soft bg-white p-4"
                  >
                    <h3 className="font-semibold text-neutral-900">{listing.title}</h3>
                    <p className="text-sm text-neutral-600">{listing.location}</p>
                    <p className="text-sm font-semibold text-neutral-800">
                      {listing.price_czk.toLocaleString()} CZK
                    </p>
                  </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

