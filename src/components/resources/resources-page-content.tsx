"use client";

import { ResourceCard } from "@/components/resources/resource-card";
import { resources } from "@/data/sample-data";
import { useTranslations } from "@/components/providers/locale-provider";

type ResourcesPageContentProps = {
  locale: string;
};

export function ResourcesPageContent({ locale }: ResourcesPageContentProps) {
  const t = useTranslations();
  
  return (
    <div className="bg-site-canvas py-16">
      <div className="container space-y-12">
        <header className="space-y-4">
          <span className="inline-flex items-center rounded-full border border-soft bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-neutral-700">
            {t.resources.badge}
          </span>
          <div className="space-y-3">
            <h1 className="font-heading text-3xl font-semibold text-neutral-900">
              {t.resources.heading}
            </h1>
            <p className="max-w-2xl text-sm text-muted">
              {t.resources.subheading}
            </p>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((article) => (
            <ResourceCard key={article.id} article={article} />
          ))}
        </section>
      </div>
    </div>
  );
}


