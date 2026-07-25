export type Article = {
  id: string;
  slug: string;
  titleEn: string;
  titleMl: string;
  excerpt: string;
  /** Legacy English body — no longer editable; kept so existing articles still render. */
  contentEn?: string;
  contentMl: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  coverImage: string;
  readTimeMinutes: number;
  /** Missing/undefined is treated as "published" (legacy articles). */
  status?: "published" | "draft";
};

export const articleCategories = [
  "All",
  "Health Tips",
  "Treatments",
  "Seasonal",
  "Visha Chikitsa",
  "Classical Medicines",
];

/** True when an article should be visible on the public site. */
export function isPublished(a: { status?: string }): boolean {
  return a.status !== "draft";
}

/** Public display title — Malayalam-first, falls back to English. */
export function displayTitle(a: { titleMl?: string; titleEn?: string }): string {
  return a.titleMl || a.titleEn || "";
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
