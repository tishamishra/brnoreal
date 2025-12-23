"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-site-canvas flex min-h-screen items-center justify-center py-16">
      <div className="container text-center">
        <div className="mx-auto max-w-md space-y-6">
          <h1 className="font-heading text-4xl font-semibold text-neutral-900">
            Something went wrong
          </h1>
          <p className="text-neutral-600">{error.message}</p>
          <button onClick={reset} className="btn-primary">
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}


