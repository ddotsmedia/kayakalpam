import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { requireAdmin } from "@/lib/admin-session";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const ALLOWED = [".jpg", ".jpeg", ".png", ".webp"];
const MAX_BYTES = 5 * 1024 * 1024;

function sanitize(name: string) {
  const ext = path.extname(name).toLowerCase();
  const base = path
    .basename(name, path.extname(name))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return { base: base || "image", ext };
}

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File exceeds 5MB" }, { status: 413 });
  }

  const rawName = (form.get("filename") as string) || file.name;
  const { base, ext } = sanitize(rawName);
  if (!ALLOWED.includes(ext)) {
    return NextResponse.json(
      { error: "Only .jpg, .jpeg, .png, .webp allowed" },
      { status: 415 },
    );
  }

  fs.mkdirSync(IMAGES_DIR, { recursive: true });

  // If "replace" flag set, keep the given name; else avoid clobbering.
  const replace = form.get("replace") === "true";
  let filename = `${base}${ext}`;
  if (!replace) {
    let n = 1;
    while (fs.existsSync(path.join(IMAGES_DIR, filename))) {
      filename = `${base}-${n}${ext}`;
      n++;
    }
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(IMAGES_DIR, filename), buffer);

  return NextResponse.json({ ok: true, path: `/images/${filename}` });
}
