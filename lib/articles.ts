export type Article = {
  id: string;
  slug: string;
  titleEn: string;
  titleMl: string;
  excerpt: string;
  contentEn: string;
  contentMl: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  coverImage: string;
  readTimeMinutes: number;
};

export const articleCategories = [
  "All",
  "Health Tips",
  "Treatments",
  "Seasonal",
  "Visha Chikitsa",
  "Classical Medicines",
];

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
