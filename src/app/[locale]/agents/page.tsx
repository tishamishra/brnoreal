import type { Metadata } from "next";
import { getAgentsMetadata } from "@/lib/seo/metadata";
import { AgentsPageContent } from "@/components/agents/agents-page-content";

type AgentsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AgentsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return getAgentsMetadata(locale);
}

export default async function AgentsPage({ params }: AgentsPageProps) {
  const { locale } = await params;
  return <AgentsPageContent locale={locale} />;
}
