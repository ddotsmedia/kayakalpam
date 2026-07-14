import { NextResponse } from "next/server";
import { readData, writeData, defaultAnalytics } from "@/lib/admin-data";
import type { Analytics } from "@/lib/admin-data";

const WINDOW_MS = 5 * 1000;
const hits = new Map<string, number>();

function rateLimited(ip: string) {
  const now = Date.now();
  const last = hits.get(ip) ?? 0;
  if (now - last < WINDOW_MS) return true;
  hits.set(ip, now);
  return false;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) return NextResponse.json({ ok: true });

  let body: { page?: string; event?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: true });
  }

  const a = readData<Analytics>("analytics", defaultAnalytics);
  a.pageViews = a.pageViews || {};
  a.dailyViews = a.dailyViews || {};
  a.events = a.events || {};

  if (body.page) {
    a.pageViews[body.page] = (a.pageViews[body.page] || 0) + 1;
    const d = today();
    a.dailyViews[d] = (a.dailyViews[d] || 0) + 1;
  }
  if (body.event) {
    a.events[body.event] = (a.events[body.event] || 0) + 1;
  }

  writeData("analytics", a);
  return NextResponse.json({ ok: true });
}
