"use client";

import { useState } from "react";

export default function ArticleBody({ en, ml }: { en?: string; ml?: string }) {
  const hasEn = Boolean(en && en.trim());
  const hasMl = Boolean(ml && ml.trim());
  // Malayalam-first: default to Malayalam when available, else the legacy English body.
  const [lang, setLang] = useState<"en" | "ml">(hasMl ? "ml" : "en");
  const both = hasEn && hasMl;
  const active = lang === "ml" && hasMl ? "ml" : lang === "en" && hasEn ? "en" : hasMl ? "ml" : "en";
  const html = active === "ml" ? ml : en;

  return (
    <div>
      {both && (
        <div className="mb-5 flex gap-2">
          <button
            type="button"
            onClick={() => setLang("ml")}
            className={`font-ml rounded-full px-4 py-1 text-sm font-semibold ${active === "ml" ? "bg-primary text-white" : "border border-primary/20 text-primary"}`}
          >
            മലയാളം
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`rounded-full px-4 py-1 text-sm font-semibold ${active === "en" ? "bg-primary text-white" : "border border-primary/20 text-primary"}`}
          >
            English
          </button>
        </div>
      )}
      {html ? (
        <div
          className={`prose prose-headings:font-heading prose-headings:text-accent prose-a:text-primary max-w-none ${active === "ml" ? "font-ml" : ""}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <p className="font-ml rounded-lg bg-primary/5 px-4 py-3 text-muted">
          Content coming soon · ഉള്ളടക്കം ഉടൻ വരുന്നു
        </p>
      )}
    </div>
  );
}
