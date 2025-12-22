"use client";

import { useEffect } from "react";
import { LocaleLink } from "@/components/locale-link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Locale layout error:", error);
  }, [error]);

  return (
    <div className="bg-site-canvas flex min-h-screen items-center justify-center py-16">
      <div className="container text-center">
        <div className="mx-auto max-w-md space-y-6">
          <h1 className="font-heading text-4xl font-semibold text-neutral-900">
            Something went wrong
          </h1>
          <p className="text-neutral-600">
            We encountered an error. Please try again.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={reset}
              className="btn-primary"
            >
              Try again
            </button>
            <LocaleLink href="/" className="btn-secondary">
              Go home
            </LocaleLink>
          </div>
        </div>
      </div>
    </div>
  );
}

