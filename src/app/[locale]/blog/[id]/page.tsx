import type { Metadata } from "next";
import { resources } from "@/data/sample-data";
import { BlogPostContent } from "@/components/blog/blog-post-content";

type BlogPostPageProps = {
  params: Promise<{ locale: string; id: string }>;
};

// SEO-optimized metadata generator with strict limits (60 chars title, 155 chars description)
function generateBlogMetadata(id: string, locale: string): Metadata {
  const article = resources.find((r) => r.id === id);
  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  // EN metadata (strict limits enforced)
  const enMetadata: Record<string, { title: string; description: string }> = {
    "2025-brno-outlook": {
      title: "2025 Brno Real Estate Market Outlook",
      description: "Expert analysis of Brno property market trends, pricing, and investment opportunities in prime neighborhoods for 2025.",
    },
    "relocating-to-brno": {
      title: "Relocating to Brno: Complete Guide",
      description: "Essential guide for relocating to Brno: visas, schools, neighborhoods, healthcare, and cultural integration for expats.",
    },
    "investing-moravia": {
      title: "Investing in South Moravia Real Estate",
      description: "Comprehensive guide to property investment in South Moravia: yields, hotspots, and strategic portfolio building in Brno.",
    },
  };

  // CS metadata (Czech translations, strict limits)
  const csMetadata: Record<string, { title: string; description: string }> = {
    "2025-brno-outlook": {
      title: "Výhled trhu s nemovitostmi v Brně 2025",
      description: "Odborná analýza trendů trhu s nemovitostmi v Brně, cen a investičních příležitostí v prestižních čtvrtích pro rok 2025.",
    },
    "relocating-to-brno": {
      title: "Stěhování do Brna: Kompletní průvodce",
      description: "Nezbytný průvodce stěhováním do Brna: víza, školy, čtvrti, zdravotnictví a kulturní integrace pro expaty.",
    },
    "investing-moravia": {
      title: "Investování do nemovitostí na jižní Moravě",
      description: "Komplexní průvodce investováním do nemovitostí na jižní Moravě: výnosy, hotspoty a strategické budování portfolia v Brně.",
    },
  };

  const metadata = locale === "cs" ? csMetadata[id] : enMetadata[id];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.brnorealestate.com";

  return {
    title: metadata?.title || article.title,
    description: metadata?.description || article.excerpt,
    alternates: {
      canonical: `${baseUrl}/${locale}/blog/${id}`,
      languages: {
        "en": `${baseUrl}/en/blog/${id}`,
        "cs": `${baseUrl}/cs/blog/${id}`,
      },
    },
    openGraph: {
      title: metadata?.title || article.title,
      description: metadata?.description || article.excerpt,
      type: "article",
      locale: locale === "cs" ? "cs_CZ" : "en_US",
      alternateLocale: locale === "cs" ? "en_US" : "cs_CZ",
      url: `${baseUrl}/${locale}/blog/${id}`,
    },
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { id, locale } = await params;
  return generateBlogMetadata(id, locale);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  return <BlogPostContent id={id} />;
}
