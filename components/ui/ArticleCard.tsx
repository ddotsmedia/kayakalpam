import Link from "next/link";
import Image from "next/image";
import { formatDate, type Article } from "@/lib/articles";

export default function ArticleCard({ a, categoryLabel }: { a: Article; categoryLabel?: string }) {
  const title = a.titleMl || a.titleEn || "";
  const sub = a.titleMl && a.titleEn ? a.titleEn : "";
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-primary/15 bg-white shadow-sm">
      <Link href={`/blog/${a.slug}`} className="relative block aspect-[16/9] overflow-hidden">
        {a.coverImage ? (
          <Image src={a.coverImage} alt={title} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary to-primary-dark" />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-0.5 text-xs font-semibold text-white">
          {categoryLabel ?? a.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-ml font-heading text-lg font-bold text-accent">
          <Link href={`/blog/${a.slug}`}>{title}</Link>
        </h3>
        {sub && <p className="text-sm text-primary">{sub}</p>}
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{a.excerpt}</p>
        <div className="mt-3 text-xs text-muted">
          {a.author} · {formatDate(a.publishedAt)} · {a.readTimeMinutes} min read
        </div>
        <Link href={`/blog/${a.slug}`} className="mt-3 text-sm font-semibold text-secondary hover:text-accent">
          Read More →
        </Link>
      </div>
    </article>
  );
}
