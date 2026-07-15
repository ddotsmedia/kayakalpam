"use client";

import { useState } from "react";
import ArticleCard from "@/components/ui/ArticleCard";
import type { Article } from "@/lib/articles";

const PER_PAGE = 6;

type Cat = { id: string; label: string };

export default function BlogClient({
  articles,
  categories = [],
}: {
  articles: Article[];
  categories?: Cat[];
}) {
  const [cat, setCat] = useState("All");
  const [page, setPage] = useState(1);

  const tabs: Cat[] = [{ id: "All", label: "All" }, ...categories];
  const filtered =
    cat === "All"
      ? articles
      : articles.filter((a) => {
          const c = categories.find((x) => x.id === cat);
          return a.category === cat || (c ? a.category === c.label : false);
        });
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const slice = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const labelFor = (v: string) =>
    categories.find((c) => c.id === v || c.label === v)?.label ?? v;

  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {tabs.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => { setCat(c.id); setPage(1); }}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              cat === c.id ? "bg-primary text-white" : "border border-primary/20 bg-white text-primary hover:bg-primary/5"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {slice.length === 0 ? (
        <p className="text-center text-muted">No articles in this category yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {slice.map((a) => (
            <ArticleCard key={a.id} a={a} categoryLabel={labelFor(a.category)} />
          ))}
        </div>
      )}

      {pages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              className={`h-9 w-9 rounded-full text-sm font-semibold ${
                p === current ? "bg-secondary text-white" : "border border-primary/20 bg-white text-primary"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
