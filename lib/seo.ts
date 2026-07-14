import type { Metadata } from "next";
import { readData } from "@/lib/data";
import type { SeoMap } from "@/lib/admin-data";

/**
 * Merge admin-managed SEO overrides (data/seo.json) on top of a page's
 * built-in default metadata. Overrides win only when non-empty.
 */
export function seoMeta(pagePath: string, base: Metadata): Metadata {
  const map = readData<SeoMap>("seo", {});
  const o = map[pagePath] ?? {};
  return {
    ...base,
    ...(o.title ? { title: o.title } : {}),
    ...(o.description ? { description: o.description } : {}),
  };
}
