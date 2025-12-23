"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock } from "react-feather";
import { resources } from "@/data/sample-data";
import { useTranslations } from "@/components/providers/locale-provider";

type BlogPostPageProps = {
  params: Promise<{ id: string }>;
};

// Extended content for each blog post
const blogContent: Record<string, {
  content: string[];
  image?: string;
  author?: string;
  authorRole?: string;
}> = {
  "2025-brno-outlook": {
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    author: "Tereza Králová",
    authorRole: "Senior Partner & Market Analyst",
    content: [
      "As we enter 2025, Brno's prime residential market continues to demonstrate remarkable resilience and growth. This comprehensive outlook examines the key trends shaping property values, buyer behavior, and development activity across Brno's most sought-after neighborhoods.",
      "Market pricing has shown consistent upward momentum, with prime locations like Masarykova čtvrť and Brno-střed experiencing 8-12% year-over-year appreciation. This growth is driven by limited inventory, strong demand from both local and international buyers, and the city's expanding tech sector.",
      "Buyer sentiment remains positive, with particular interest in architecturally significant properties and heritage villas. International buyers, particularly from Western Europe and North America, are increasingly drawn to Brno's combination of historic charm, modern amenities, and relative affordability compared to Prague.",
      "The development pipeline shows strategic focus on mixed-use projects that integrate residential, commercial, and cultural spaces. New construction in Královo Pole and the Technology Park area is meeting demand from tech professionals and expatriates seeking modern, well-connected living spaces.",
      "Looking ahead, we anticipate continued strong performance in the luxury segment, with particular strength in properties offering unique architectural features, generous outdoor spaces, and proximity to cultural landmarks. Investment properties in prime locations remain attractive for both rental yield and capital appreciation.",
      "For buyers, the current market offers opportunities in well-maintained historic properties and new developments with modern amenities. For sellers, the strong demand and limited inventory create favorable conditions for achieving premium pricing, particularly for properties with unique features or prime locations.",
    ],
  },
  "relocating-to-brno": {
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",
    author: "Martina Svobodová",
    authorRole: "Senior Advisor, Relocation & Concierge",
    content: [
      "Relocating to Brno offers an exceptional opportunity to experience Czech culture, excellent quality of life, and a thriving business environment. This executive playbook provides practical guidance for professionals and families making the move to South Moravia's capital.",
      "Visa and residency requirements vary depending on your nationality and purpose of stay. EU citizens enjoy freedom of movement, while non-EU citizens typically need a long-term residence permit. The process generally requires proof of employment, accommodation, health insurance, and sufficient financial means. We recommend starting the application process 3-4 months before your planned arrival.",
      "International schooling options in Brno include the International School of Brno, which offers English-language education following international curricula. Several bilingual schools provide Czech-English programs, and private Czech schools often welcome international students. Early enrollment is essential, particularly for popular schools with limited capacity.",
      "Neighborhood selection is crucial for a successful relocation. Brno-střed offers historic charm and excellent connectivity, ideal for professionals working in the city center. Masarykova čtvrť provides family-friendly environments with larger properties and gardens. Královo Pole appeals to tech professionals with modern developments and proximity to major employers.",
      "Healthcare in the Czech Republic is of high quality, with both public and private options available. EU citizens can access public healthcare with a European Health Insurance Card, while others typically need private health insurance. Brno has several excellent hospitals and clinics, with many doctors speaking English.",
      "Cultural integration is facilitated by Brno's international community and numerous expat groups. The city hosts regular cultural events, from classical music concerts to contemporary art exhibitions. Learning basic Czech phrases will enhance daily interactions, though English is widely spoken in business and professional circles.",
      "Practical considerations include opening a bank account (typically requires proof of address and residency), obtaining a Czech tax number, and understanding local tax obligations. Public transportation is excellent, with trams and buses providing comprehensive coverage. Many expatriates also find cycling to be an efficient and enjoyable way to navigate the city.",
    ],
  },
  "investing-moravia": {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    author: "Jan Novák",
    authorRole: "Partner, Valuation & Market Intelligence",
    content: [
      "South Moravia presents compelling investment opportunities for both individual and institutional investors. This analysis explores yield dynamics, emerging hotspots, and strategic considerations for building a successful property portfolio in the region.",
      "Yield dynamics vary significantly across neighborhoods and property types. Prime residential properties in Brno-střed and Masarykova čtvrť typically offer 3-5% gross rental yields, with strong capital appreciation potential. Commercial properties in central locations can achieve 5-7% yields, while well-located investment buildings offer 6-8% returns.",
      "Urban regeneration is transforming several key areas. The Technology Park district is experiencing rapid development, with new residential and commercial projects creating value appreciation opportunities. Královo Pole's hillside locations are attracting premium developments, while Žabovřesky offers growth potential with new infrastructure investments.",
      "Investment strategy should consider both rental income and capital appreciation. Properties in established prime locations offer stability and steady appreciation, while emerging areas provide higher growth potential but with increased risk. Diversification across property types and locations can balance risk and return.",
      "Key factors driving investment returns include proximity to employment centers, public transportation access, property condition and features, and neighborhood development plans. Properties near major tech employers, universities, and cultural attractions tend to perform particularly well.",
      "Due diligence is essential for any investment. This includes property condition assessments, legal verification, market analysis, and financial projections. Working with experienced local advisors who understand both the market dynamics and regulatory environment can significantly improve investment outcomes.",
      "Looking forward, we see continued strong fundamentals supporting property investment in South Moravia. The region's growing economy, expanding tech sector, and improving infrastructure create a positive environment for both rental yields and capital appreciation. Strategic investors who understand local market dynamics and work with experienced advisors are well-positioned to achieve strong returns.",
    ],
  },
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const t = useTranslations();
  const { id } = use(params);
  const article = resources.find((r) => r.id === id);
  const content = blogContent[id];

  if (!article) {
    return (
      <div className="bg-site-canvas py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-heading text-3xl font-semibold text-neutral-900">
              Article Not Found
            </h1>
            <p className="mt-4 text-neutral-600">
              The article you're looking for doesn't exist.
            </p>
            <Link href="/resources" className="btn-primary mt-8 inline-block">
              Back to Resources
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-site-canvas">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neutral-900">
        {content?.image && (
          <div className="absolute inset-0">
            <Image
              src={content.image}
              alt={article.title}
              fill
              className="object-cover opacity-30"
              sizes="100vw"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1d4ed8]/20 via-neutral-900/80 to-neutral-900/90" />
        <div className="container relative py-24 md:py-32">
          <div className="max-w-3xl space-y-6 text-white">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-sm text-white/80 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Resources</span>
            </Link>
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] backdrop-blur">
              {article.category}
            </span>
            <h1 className="font-heading text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{article.published}</span>
              </div>
              {content?.author && (
                <div>
                  <span className="text-white/60">By </span>
                  <span className="font-semibold">{content.author}</span>
                  {content.authorRole && (
                    <span className="text-white/60">, {content.authorRole}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-site-canvas py-16 md:py-20">
        <div className="container">
          <article className="mx-auto max-w-4xl space-y-8">
            <div className="prose prose-neutral max-w-none space-y-6">
              {content?.content ? (
                content.content.map((paragraph, index) => (
                  <p key={index} className="leading-7 text-neutral-600">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="leading-7 text-neutral-600">{article.excerpt}</p>
              )}
            </div>

            {/* CTA Section */}
            <div className="mt-12 rounded-3xl border border-soft bg-gradient-to-br from-white to-neutral-50 p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-semibold text-neutral-900">
                Interested in Learning More?
              </h2>
              <p className="mt-2 text-neutral-600">
                Our team of experts is here to help you navigate the Brno real estate market.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary">
                  Contact Us
                </Link>
                <Link href="/services" className="btn-secondary">
                  Our Services
                </Link>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-12 border-t border-soft pt-12">
              <h2 className="font-heading text-2xl font-semibold text-neutral-900">
                Related Articles
              </h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {resources
                  .filter((r) => r.id !== id)
                  .slice(0, 2)
                  .map((related) => (
                    <Link
                      key={related.id}
                      href={`/blog/${related.id}`}
                      className="group rounded-2xl border border-soft bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <span className="inline-flex items-center rounded-full bg-[#1d4ed8]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#1d4ed8]">
                        {related.category}
                      </span>
                      <h3 className="mt-3 font-heading text-lg font-semibold text-neutral-900 group-hover:text-[#1d4ed8]">
                        {related.title}
                      </h3>
                      <p className="mt-2 text-sm text-neutral-600">{related.excerpt}</p>
                      <div className="mt-4 flex items-center gap-4 text-xs text-neutral-500">
                        <span>{related.readTime}</span>
                        <span>•</span>
                        <span>{related.published}</span>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}


