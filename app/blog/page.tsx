import type { Metadata } from "next";
import { buildMetadata, breadcrumbLd } from "@/lib/seo-meta";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import Image from "next/image";
import BlogClient from "@/components/sections/BlogClient";
import CtaBanner from "@/components/sections/CtaBanner";
import { getArticles } from "@/lib/articlesData";
import { formatDate } from "@/lib/articles";

export function generateMetadata(): Metadata {
  return buildMetadata("/blog");
}

export default function BlogPage() {
  const articles = [...getArticles()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const rest = articles.filter((a) => a.id !== featured?.id);

  return (
    <>
      <JsonLd data={breadcrumbLd([["Home", "/"], ["Articles", "/blog"]])} />
      <section className="bg-[#1a3a2a] py-14 text-center text-white">
        <p className="font-ml text-lg text-secondary">ലേഖനങ്ങൾ</p>
        <h1 className="mt-1 font-heading text-4xl font-bold sm:text-5xl">Articles & Health Tips</h1>
      </section>

      <section className="bg-bg py-12">
        <div className="mx-auto max-w-6xl px-4">
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="mb-10 grid overflow-hidden rounded-2xl border border-secondary/40 bg-white shadow-sm md:grid-cols-2"
            >
              <div className="relative aspect-[16/10] md:aspect-auto">
                <Image src={featured.coverImage} alt={featured.titleEn} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-0.5 text-xs font-semibold text-white">
                  Featured · {featured.category}
                </span>
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <h2 className="font-heading text-2xl font-bold text-accent">{featured.titleEn}</h2>
                <p className="font-ml text-primary">{featured.titleMl}</p>
                <p className="mt-3 text-muted leading-relaxed">{featured.excerpt}</p>
                <div className="mt-3 text-xs text-muted">
                  {featured.author} · {formatDate(featured.publishedAt)} · {featured.readTimeMinutes} min read
                </div>
                <span className="mt-4 text-sm font-semibold text-secondary">Read More →</span>
              </div>
            </Link>
          )}

          <BlogClient articles={rest} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
