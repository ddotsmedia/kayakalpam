import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-session";
import { readData, writeData } from "@/lib/admin-data";
import type { SeoMap, SeoEntry } from "@/lib/admin-data";

export async function GET() {
  return NextResponse.json(readData<SeoMap>("seo", {}));
}

export async function PATCH(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { page?: string; data?: SeoEntry };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { page, data } = body;
  if (!page) return NextResponse.json({ error: "Missing page" }, { status: 400 });

  const map = readData<SeoMap>("seo", {});
  map[page] = { title: data?.title ?? "", description: data?.description ?? "" };
  writeData("seo", map);

  revalidatePath(page);
  return NextResponse.json({ ok: true });
}
