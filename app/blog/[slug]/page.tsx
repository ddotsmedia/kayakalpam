import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ArticleBody from "@/components/sections/ArticleBody";
import ShareRow from "@/components/sections/ShareRow";
import ArticleCard from "@/components/ui/ArticleCard";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/seo-meta";
import { getArticles, getArticle } from "@/lib/articlesData";
import { formatDate } from "@/lib/articles";
import { site, waLink } from "@/lib/site";

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: "Article Not Found" };
  const canonical = `${site.url}/blog/${a.slug}`;
  return {
    title: `${a.titleEn} | Articles`,
    description: a.excerpt,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.titleEn,
      description: a.excerpt,
      url: canonical,
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt,
      images: [{ url: a.coverImage }],
    },
    twitter: { card: "summary_large_image", title: a.titleEn, description: a.excerpt, images: [a.coverImage] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const related = getArticles()
    .filter((x) => x.category === a.category && x.id !== a.id)
    .slice(0, 2);
  const url = `${site.url}/blog/${a.slug}`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.titleEn,
    description: a.excerpt,
    image: `${site.url}${a.coverImage}`,
    author: { "@type": "Person", name: a.author },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: { "@type": "ImageObject", url: `${site.url}/images/hero.jpg` },
    },
    datePublished: a.publishedAt,
    dateModified: a.updatedAt,
    mainEntityOfPage: url,
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <JsonLd
        data={breadcrumbLd([
          ["Home", "/"],
          ["Articles", "/blog"],
          [a.titleEn, `/blog/${a.slug}`],
        ])}
      />

      <section className="relative isolate flex min-h-[40vh] items-end">
        <Image src={a.coverImage} alt={a.titleEn} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 to-primary-dark/40" />
        <div className="relative mx-auto w-full max-w-4xl px-4 py-10 text-white">
          <span className="rounded-full bg-secondary px-3 py-0.5 text-xs font-semibold">{a.category}</span>
          <h1 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">{a.titleEn}</h1>
          <p className="font-ml mt-1 text-secondary">{a.titleMl}</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <nav className="mb-6 text-sm text-muted">
          <Link href="/" className="hover:text-primary">Home</Link> →{" "}
          <Link href="/blog" className="hover:text-primary">Articles</Link> →{" "}
          <span className="text-accent">{a.titleEn}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <article>
            <div className="mb-6 text-sm text-muted">
              {a.author} · {formatDate(a.publishedAt)} · {a.readTimeMinutes} min read
            </div>
            <ArticleBody en={a.contentEn} ml={a.contentMl} />
            <div className="mt-8 border-t border-primary/10 pt-6">
              <ShareRow url={url} title={a.titleEn} />
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-primary/15 bg-white p-5 shadow-sm">
              <h3 className="font-heading font-bold text-accent">{a.author}</h3>
              <p className="mt-1 text-sm text-muted">
                Hereditary Ayurvedic physician, published author and Visha Chikitsa specialist.
              </p>
            </div>

            {related.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-accent">Related Articles</h3>
                {related.map((r) => (
                  <ArticleCard key={r.id} a={r} />
                ))}
              </div>
            )}

            <div className="rounded-2xl bg-primary-dark p-5 text-white">
              <h3 className="font-heading font-bold">Have a question?</h3>
              <p className="mt-1 text-sm text-white/80">Consult Vaidyar Shine Bhaskar directly.</p>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block rounded-full bg-[#25D366] px-5 py-2 text-sm font-semibold text-white"
              >
                WhatsApp Us
              </a>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
