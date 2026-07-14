import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-session";
import { readData, defaultAnalytics } from "@/lib/admin-data";
import type { Analytics } from "@/lib/admin-data";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(readData<Analytics>("analytics", defaultAnalytics));
}
