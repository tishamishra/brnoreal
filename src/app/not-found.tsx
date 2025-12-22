import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-site-canvas flex min-h-screen items-center justify-center py-16">
      <div className="container text-center">
        <div className="mx-auto max-w-md space-y-6">
          <h1 className="font-heading text-4xl font-semibold text-neutral-900">
            404 - Page Not Found
          </h1>
          <p className="text-neutral-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/en" className="btn-primary">
              Go home
            </Link>
            <Link href="/en/all-properties" className="btn-secondary">
              Browse properties
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

