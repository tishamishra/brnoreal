"use client";

import { PropertyIntakeForm } from "@/components/forms/property-intake-form";
import { useTranslations } from "@/components/providers/locale-provider";

export default function ListYourPropertyPage() {
  const t = useTranslations();
  return (
    <div className="bg-site-canvas py-12 sm:py-16">
      <div className="container space-y-10 sm:space-y-14">
        <header className="space-y-4">
          <span className="inline-flex items-center rounded-full border border-soft bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-neutral-700">
            {t.listProperty.badge}
          </span>
          <div className="space-y-3">
            <h1 className="font-heading text-2xl font-semibold text-neutral-900 sm:text-3xl md:text-4xl">
              {t.listProperty.heading}
            </h1>
            <p className="max-w-3xl text-sm text-muted">
              {t.listProperty.subheading}
            </p>
          </div>
        </header>

        <section className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {t.listProperty.highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-soft bg-white p-5 shadow-[0_25px_55px_-45px_rgba(0,0,0,0.55)] sm:rounded-3xl sm:p-6"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                {item.metric}
              </p>
              <h3 className="mt-2 font-heading text-base font-semibold text-[#1d4ed8] sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-neutral-600">{item.description}</p>
            </div>
          ))}
        </section>

        <PropertyIntakeForm />

        <section className="space-y-6 rounded-3xl border border-soft bg-white/90 p-6 sm:p-8">
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-semibold text-neutral-900 sm:text-2xl">
              {t.listProperty.nextSteps.heading}
            </h2>
            <p className="text-sm text-neutral-600">
              {t.listProperty.nextSteps.description}
            </p>
          </div>
          <ul className="space-y-3 text-sm text-neutral-700">
            {t.listProperty.nextSteps.bullets.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 block h-2 w-2 rounded-full bg-[#1d4ed8]" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

