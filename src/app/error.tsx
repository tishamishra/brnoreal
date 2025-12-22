"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
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
                <Link href="/" className="btn-secondary">
                  Go home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

