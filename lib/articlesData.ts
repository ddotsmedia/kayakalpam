import "server-only";
import seed from "@/data/articles.json";
import { readData } from "@/lib/data";
import type { Article } from "@/lib/articles";

export function getArticles(): Article[] {
  return readData<Article[]>("articles", seed as Article[]);
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug);
}
