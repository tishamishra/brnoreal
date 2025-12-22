import Link from "next/link";
import { ResourceArticle } from "@/data/sample-data";

type ResourceCardProps = {
  article: ResourceArticle;
};

export function ResourceCard({ article }: ResourceCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-soft bg-white p-6 shadow-[0_25px_55px_-45px_rgba(0,0,0,0.55)] transition hover:-translate-y-1 hover:shadow-[0_30px_65px_-45px_rgba(0,0,0,0.6)]">
      <span className="inline-flex w-fit items-center rounded-full bg-[#1d4ed8]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#1d4ed8]">
        {article.category}
      </span>
      <h3 className="font-heading text-lg font-semibold text-[#1d4ed8]">
        {article.title}
      </h3>
      <p className="text-sm text-neutral-600">{article.excerpt}</p>
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-neutral-500">
        <span>{article.readTime}</span>
        <span>{article.published}</span>
      </div>
      <Link
        href={`/blog/${article.id}`}
        className="btn-secondary text-xs uppercase tracking-[0.3em]"
      >
        Read Insight
      </Link>
    </article>
  );
}

