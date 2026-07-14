import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-session";
import { readData, writeData } from "@/lib/admin-data";
import { slugify, readTime } from "@/lib/slugify";
import { sanitise } from "@/lib/sanitise";
import seed from "@/data/articles.json";
import type { Article } from "@/lib/articles";

function all(): Article[] {
  return readData<Article[]>("articles", seed as Article[]);
}

function toTags(raw: unknown): string[] {
  const arr = Array.isArray(raw)
    ? raw
    : String(raw ?? "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
  return arr.map((t) => sanitise.text(t, 40)).filter(Boolean);
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
  const titleEn: string = sanitise.text(b.titleEn, 200) || "Untitled";

  let slug = sanitise.slug(slugify(titleEn)) || Date.now().toString();
  while (arr.some((a) => a.slug === slug)) slug = `${slug}-${Math.floor(Math.random() * 1000)}`;

  const contentEn = sanitise.html(b.contentEn);
  const article: Article = {
    id: Date.now().toString(),
    slug,
    titleEn,
    titleMl: sanitise.text(b.titleMl, 200),
    excerpt: sanitise.text(b.excerpt, 300),
    contentEn,
    contentMl: sanitise.html(b.contentMl),
    category: sanitise.text(b.category, 60) || "Health Tips",
    tags: toTags(b.tags),
    author: sanitise.text(b.author, 80) || "Vaidyar Shine Bhaskar",
    publishedAt: now,
    updatedAt: now,
    featured: Boolean(b.featured),
    coverImage: sanitise.text(b.coverImage, 200) || "/images/hero.jpg",
    readTimeMinutes: readTime(contentEn),
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
  const contentEn = b.contentEn !== undefined ? sanitise.html(b.contentEn) : prev.contentEn;

  const updated: Article = {
    ...prev,
    titleEn: b.titleEn !== undefined ? sanitise.text(b.titleEn, 200) : prev.titleEn,
    titleMl: b.titleMl !== undefined ? sanitise.text(b.titleMl, 200) : prev.titleMl,
    excerpt: b.excerpt !== undefined ? sanitise.text(b.excerpt, 300) : prev.excerpt,
    contentEn,
    contentMl: b.contentMl !== undefined ? sanitise.html(b.contentMl) : prev.contentMl,
    category: b.category !== undefined ? sanitise.text(b.category, 60) : prev.category,
    tags: b.tags !== undefined ? toTags(b.tags) : prev.tags,
    coverImage: b.coverImage !== undefined ? sanitise.text(b.coverImage, 200) : prev.coverImage,
    featured: b.featured !== undefined ? Boolean(b.featured) : prev.featured,
    updatedAt: new Date().toISOString(),
    readTimeMinutes: readTime(contentEn),
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
  writeData(
    "articles",
    arr.filter((a) => a.id !== b.id),
  );
  revalidatePath("/blog");
  if (removed) revalidatePath(`/blog/${removed.slug}`);
  return NextResponse.json({ ok: true });
}
