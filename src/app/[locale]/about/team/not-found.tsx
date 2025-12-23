import { LocaleLink } from "@/components/locale-link";

export default function NotFound() {
  return (
    <div className="bg-site-canvas flex min-h-screen items-center justify-center py-16">
      <div className="container text-center">
        <div className="mx-auto max-w-md space-y-6">
          <h1 className="font-heading text-4xl font-semibold text-neutral-900">
            Page Not Found
          </h1>
          <p className="text-neutral-600">
            The team page you're looking for doesn't exist.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <LocaleLink href="/" className="btn-primary">
              Go home
            </LocaleLink>
            <LocaleLink href="/about/team" className="btn-secondary">
              View Team
            </LocaleLink>
          </div>
        </div>
      </div>
    </div>
  );
}

