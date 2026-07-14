import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-session";
import { readData, writeData } from "@/lib/admin-data";
import type { Submission } from "@/lib/admin-data";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const arr = readData<Submission[]>("submissions", []);
  const sorted = [...arr].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return NextResponse.json(sorted);
}

export async function PATCH(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json().catch(() => ({}));
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const arr = readData<Submission[]>("submissions", []);
  const idx = arr.findIndex((s) => s.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  arr[idx].read = true;
  writeData("submissions", arr);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json().catch(() => ({}));
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const arr = readData<Submission[]>("submissions", []);
  writeData(
    "submissions",
    arr.filter((s) => s.id !== id),
  );
  return NextResponse.json({ ok: true });
}
