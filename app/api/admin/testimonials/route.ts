import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-session";
import { readData, writeData } from "@/lib/admin-data";
import type { Testimonial } from "@/lib/admin-data";

export async function GET() {
  return NextResponse.json(readData<Testimonial[]>("testimonials", []));
}

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const b = await req.json().catch(() => ({}));
  const arr = readData<Testimonial[]>("testimonials", []);
  const t: Testimonial = {
    id: Date.now().toString(),
    name: b.name || "",
    district: b.district || "",
    text: b.text || "",
    rating: Number(b.rating) || 5,
    active: true,
    createdAt: new Date().toISOString(),
  };
  arr.push(t);
  writeData("testimonials", arr);
  revalidatePath("/");
  return NextResponse.json({ ok: true, testimonial: t });
}

export async function PATCH(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const b = await req.json().catch(() => ({}));
  if (!b.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const arr = readData<Testimonial[]>("testimonials", []);
  const idx = arr.findIndex((t) => t.id === b.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { id, ...patch } = b;
  void id;
  arr[idx] = { ...arr[idx], ...patch, rating: Number(patch.rating ?? arr[idx].rating) };
  writeData("testimonials", arr);
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const b = await req.json().catch(() => ({}));
  if (!b.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const arr = readData<Testimonial[]>("testimonials", []);
  writeData("testimonials", arr.filter((t) => t.id !== b.id));
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
