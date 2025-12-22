"use client";

import { use } from "react";
import { ContactForm } from "@/components/contact/contact-form";
import { useTranslations } from "@/components/providers/locale-provider";

type ContactPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function ContactPage({ searchParams }: ContactPageProps) {
  const t = useTranslations();
  const params = use(searchParams);
  
  return (
    <div className="bg-site-canvas py-16">
      <div className="container space-y-12">
        <header className="space-y-4">
          <span className="inline-flex items-center rounded-full border border-soft bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-neutral-700">
            {t.contact.badge}
          </span>
          <div className="space-y-3">
            <h1 className="font-heading text-3xl font-semibold text-neutral-900">
              {t.contact.heading}
            </h1>
            <p className="max-w-2xl text-sm text-muted">
              {t.contact.subheading}
            </p>
            {params.listing && (
              <div className="mt-4 rounded-2xl border border-soft bg-[color:var(--brand-50)] p-4">
                <p className="text-sm font-semibold text-neutral-900">
                  Requesting concierge scheduling for: <span className="text-[color:var(--brand-600)]">{decodeURIComponent(String(params.listing))}</span>
                </p>
              </div>
            )}
          </div>
        </header>

        <ContactForm 
          listingTitle={params.listing ? decodeURIComponent(String(params.listing)) : undefined}
          listingId={params.listingId ? decodeURIComponent(String(params.listingId)) : undefined}
          location={params.location ? decodeURIComponent(String(params.location)) : undefined}
          propertyType={params.propertyType ? decodeURIComponent(String(params.propertyType)) : undefined}
        />

        <section className="grid gap-6 md:grid-cols-3">
          {t.contact.desks.map((desk) => (
            <div key={desk.title} className="rounded-3xl border border-soft bg-white p-6">
              <h3 className="font-heading text-lg font-semibold text-[#1d4ed8]">
                {desk.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-600">{desk.description}</p>
              <p className="mt-4 text-sm font-semibold text-neutral-800">{desk.contact}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

