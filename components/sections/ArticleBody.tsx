"use client";

import { useState } from "react";

export default function ArticleBody({ en, ml }: { en: string; ml: string }) {
  const [lang, setLang] = useState<"en" | "ml">("en");
  return (
    <div>
      <div className="mb-5 flex gap-2">
        <button
          type="button"
          onClick={() => setLang("en")}
          className={`rounded-full px-4 py-1 text-sm font-semibold ${lang === "en" ? "bg-primary text-white" : "border border-primary/20 text-primary"}`}
        >
          English
        </button>
        <button
          type="button"
          onClick={() => setLang("ml")}
          className={`font-ml rounded-full px-4 py-1 text-sm font-semibold ${lang === "ml" ? "bg-primary text-white" : "border border-primary/20 text-primary"}`}
        >
          മലയാളം
        </button>
      </div>
      {lang === "ml" && !ml ? (
        <p className="font-ml rounded-lg bg-primary/5 px-4 py-3 text-muted">
          Malayalam version coming soon · മലയാളം ഉടൻ വരുന്നു
        </p>
      ) : (
        <div
          className={`prose prose-headings:font-heading prose-headings:text-accent prose-a:text-primary max-w-none ${lang === "ml" ? "font-ml" : ""}`}
          dangerouslySetInnerHTML={{ __html: lang === "ml" ? ml : en }}
        />
      )}
    </div>
  );
}
