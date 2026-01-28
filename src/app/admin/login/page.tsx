"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Lock, Mail } from "react-feather";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const normalizedPassword = password.trim();

      const result = await signIn("credentials", {
        email: normalizedEmail || undefined, // Send email only if provided
        password: normalizedPassword,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error === "CredentialsSignin" ? "Incorrect email or password" : "Login failed. Try again.");
        setLoading(false);
      } else if (result?.ok) {
        // Successful login - redirect to admin dashboard
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
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
            Enter your email and password to access the admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-neutral-700"
            >
              Email
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />
            <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full rounded-lg border border-soft bg-white pl-12 pr-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
                placeholder="Enter admin email"
              autoFocus
              required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-neutral-700"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-lg border border-soft bg-white pl-12 pr-4 text-neutral-800 focus:border-[color:var(--brand-500)] focus:outline-none"
                placeholder="Enter admin password"
                required
              />
            </div>
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

        <div className="mt-6 text-center text-xs text-neutral-500"></div>
      </div>
    </div>
  );
}

