"use client";

import { useState } from "react";
import ArticleCard from "@/components/ui/ArticleCard";
import { articleCategories, type Article } from "@/lib/articles";

const PER_PAGE = 6;

export default function BlogClient({ articles }: { articles: Article[] }) {
  const [cat, setCat] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = cat === "All" ? articles : articles.filter((a) => a.category === cat);
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const slice = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {articleCategories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => { setCat(c); setPage(1); }}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              cat === c ? "bg-primary text-white" : "border border-primary/20 bg-white text-primary hover:bg-primary/5"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {slice.length === 0 ? (
        <p className="text-center text-muted">No articles in this category yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {slice.map((a) => (
            <ArticleCard key={a.id} a={a} />
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
