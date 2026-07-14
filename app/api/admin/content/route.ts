import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-session";
import { readData, writeData, defaultContent } from "@/lib/admin-data";
import type { SiteContent } from "@/lib/admin-data";
import { sanitise } from "@/lib/sanitise";

export async function GET() {
  return NextResponse.json(readData<SiteContent>("content", defaultContent));
}

export async function PATCH(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { section?: keyof SiteContent; data?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { section, data } = body;
  if (!section) return NextResponse.json({ error: "Missing section" }, { status: 400 });

  const content = readData<SiteContent>("content", defaultContent);
  // Sanitise every string in the submitted section, then replace it.
  (content as Record<string, unknown>)[section] = sanitise.deep(data, 5000);
  writeData("content", content);

  revalidatePath("/");
  revalidatePath("/" + section);
  return NextResponse.json({ ok: true });
}
