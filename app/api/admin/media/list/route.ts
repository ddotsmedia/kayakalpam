import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { requireAdmin } from "@/lib/admin-session";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const ALLOWED = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"];

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!fs.existsSync(IMAGES_DIR)) return NextResponse.json([]);

  const files = fs
    .readdirSync(IMAGES_DIR)
    .filter((f) => ALLOWED.includes(path.extname(f).toLowerCase()))
    .map((name) => {
      const stat = fs.statSync(path.join(IMAGES_DIR, name));
      return { name, size: stat.size, path: `/images/${name}` };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return NextResponse.json(files);
}
