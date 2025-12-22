import type { Metadata } from "next";
import { getCategoryMetadata } from "@/lib/seo/metadata";

type CategoryLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string; category: string }>;
};

export async function generateMetadata({ params }: CategoryLayoutProps): Promise<Metadata> {
  const { category, locale } = await params;
  return getCategoryMetadata(category, locale);
}

export default async function CategoryLayout({ children }: CategoryLayoutProps) {
  return <>{children}</>;
}

