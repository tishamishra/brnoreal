"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "react-feather";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Simple password protection - in production, use proper authentication
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simple password check
    if (password === ADMIN_PASSWORD) {
      // Store session in localStorage
      sessionStorage.setItem("admin_authenticated", "true");
      router.push("/admin");
    } else {
      setError("Incorrect password");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50">
      <div className="w-full max-w-md rounded-3xl border border-soft bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--brand-500)] text-white">
            <Lock size={24} />
          </div>
          <h1 className="font-heading text-2xl font-semibold text-neutral-900">
            Admin Login
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Enter your password to access the admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-neutral-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 w-full rounded-lg border border-soft bg-white px-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
              placeholder="Enter admin password"
              required
              autoFocus
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary h-12 w-full font-semibold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-neutral-500">
          Default password: admin123 (change in .env.local)
        </p>
      </div>
    </div>
  );
}

