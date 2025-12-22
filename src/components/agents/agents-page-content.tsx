"use client";

import { AgentCard } from "@/components/agents/agent-card";
import { agents } from "@/data/sample-data";
import { useTranslations } from "@/components/providers/locale-provider";

type AgentsPageContentProps = {
  locale: string;
};

export function AgentsPageContent({ locale }: AgentsPageContentProps) {
  const t = useTranslations();
  
  return (
    <div className="bg-site-canvas py-16">
      <div className="container space-y-12">
        <header className="space-y-4">
          <span className="inline-flex items-center rounded-full border border-soft bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-neutral-700">
            {t.agents.badge}
          </span>
          <div className="space-y-3">
            <h1 className="font-heading text-3xl font-semibold text-neutral-900">
              {t.agents.heading}
            </h1>
            <p className="max-w-2xl text-sm text-muted">
              {t.agents.subheading}
            </p>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </section>
      </div>
    </div>
  );
}

