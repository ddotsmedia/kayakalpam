import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-session";
import { readData, writeData } from "@/lib/admin-data";
import { sanitise } from "@/lib/sanitise";
import { defaultCategories, type Category } from "@/lib/categories";
import type { Article } from "@/lib/articles";

function all(): Category[] {
  return readData<Category[]>("categories", defaultCategories);
}

export async function GET() {
  return NextResponse.json(all());
}

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const b = await req.json().catch(() => ({}));
  const label = sanitise.text(b.label, 40);
  if (!label || label.length < 2) {
    return NextResponse.json({ error: "Label is required (min 2 chars)" }, { status: 400 });
  }

  const id = sanitise.slug(label);
  if (!id) return NextResponse.json({ error: "Invalid label" }, { status: 400 });

  const cats = all();
  if (cats.some((c) => c.id === id)) {
    return NextResponse.json({ error: "Category already exists" }, { status: 400 });
  }

  const category: Category = {
    id,
    label,
    labelMl: sanitise.text(b.labelMl, 60),
    description: b.description ? sanitise.text(b.description, 200) : undefined,
    createdAt: new Date().toISOString(),
  };
  cats.push(category);
  writeData("categories", cats);
  revalidatePath("/blog");
  revalidatePath("/admin/articles");
  return NextResponse.json({ ok: true, category });
}

export async function PATCH(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const b = await req.json().catch(() => ({}));
  if (!b.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const cats = all();
  const idx = cats.findIndex((c) => c.id === b.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // id is never changed — articles reference it.
  cats[idx] = {
    ...cats[idx],
    label: b.label !== undefined ? sanitise.text(b.label, 40) : cats[idx].label,
    labelMl: b.labelMl !== undefined ? sanitise.text(b.labelMl, 60) : cats[idx].labelMl,
    description:
      b.description !== undefined ? sanitise.text(b.description, 200) : cats[idx].description,
  };
  writeData("categories", cats);
  revalidatePath("/blog");
  revalidatePath("/admin/articles");
  return NextResponse.json({ ok: true, category: cats[idx] });
}

export async function DELETE(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const b = await req.json().catch(() => ({}));
  if (!b.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const cats = all();
  const cat = cats.find((c) => c.id === b.id);
  if (!cat) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const articles = readData<Article[]>("articles", []);
  const inUse = articles.filter((a) => a.category === b.id || a.category === cat.label).length;
  if (inUse > 0) {
    return NextResponse.json(
      { error: `Category in use by ${inUse} article${inUse === 1 ? "" : "s"}` },
      { status: 400 },
    );
  }

  writeData(
    "categories",
    cats.filter((c) => c.id !== b.id),
  );
  revalidatePath("/blog");
  revalidatePath("/admin/articles");
  return NextResponse.json({ ok: true });
}
