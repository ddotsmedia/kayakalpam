import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-session";
import { readData, writeData } from "@/lib/admin-data";
import { slugify, readTime } from "@/lib/slugify";
import seed from "@/data/articles.json";
import type { Article } from "@/lib/articles";

function all(): Article[] {
  return readData<Article[]>("articles", seed as Article[]);
}

export async function GET() {
  return NextResponse.json(all());
}

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const b = await req.json().catch(() => ({}));
  const arr = all();
  const now = new Date().toISOString();
  const titleEn: string = b.titleEn || "Untitled";

  let slug = slugify(titleEn) || Date.now().toString();
  while (arr.some((a) => a.slug === slug)) slug = `${slug}-${Math.floor(Math.random() * 1000)}`;

  const article: Article = {
    id: Date.now().toString(),
    slug,
    titleEn,
    titleMl: b.titleMl || "",
    excerpt: b.excerpt || "",
    contentEn: b.contentEn || "",
    contentMl: b.contentMl || "",
    category: b.category || "Health Tips",
    tags: Array.isArray(b.tags)
      ? b.tags
      : String(b.tags || "")
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean),
    author: b.author || "Vaidyar Shine Bhaskar",
    publishedAt: now,
    updatedAt: now,
    featured: Boolean(b.featured),
    coverImage: b.coverImage || "/images/hero.jpg",
    readTimeMinutes: readTime(b.contentEn || ""),
  };

  arr.push(article);
  writeData("articles", arr);
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  return NextResponse.json({ ok: true, article });
}

export async function PATCH(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const b = await req.json().catch(() => ({}));
  if (!b.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const arr = all();
  const idx = arr.findIndex((a) => a.id === b.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const prev = arr[idx];
  const tags = b.tags
    ? Array.isArray(b.tags)
      ? b.tags
      : String(b.tags)
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean)
    : prev.tags;

  const updated: Article = {
    ...prev,
    titleEn: b.titleEn ?? prev.titleEn,
    titleMl: b.titleMl ?? prev.titleMl,
    excerpt: b.excerpt ?? prev.excerpt,
    contentEn: b.contentEn ?? prev.contentEn,
    contentMl: b.contentMl ?? prev.contentMl,
    category: b.category ?? prev.category,
    tags,
    coverImage: b.coverImage ?? prev.coverImage,
    featured: b.featured ?? prev.featured,
    updatedAt: new Date().toISOString(),
    readTimeMinutes: readTime(b.contentEn ?? prev.contentEn),
  };
  arr[idx] = updated;
  writeData("articles", arr);
  revalidatePath("/blog");
  revalidatePath(`/blog/${updated.slug}`);
  return NextResponse.json({ ok: true, article: updated });
}

export async function DELETE(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const b = await req.json().catch(() => ({}));
  if (!b.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const arr = all();
  const removed = arr.find((a) => a.id === b.id);
  writeData("articles", arr.filter((a) => a.id !== b.id));
  revalidatePath("/blog");
  if (removed) revalidatePath(`/blog/${removed.slug}`);
  return NextResponse.json({ ok: true });
}
