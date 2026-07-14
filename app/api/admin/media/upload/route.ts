import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { requireAdmin } from "@/lib/admin-session";
import { rateLimit, getIP } from "@/lib/rate-limit";
import { sanitise } from "@/lib/sanitise";

const IMAGES_DIR = path.resolve(process.cwd(), "public", "images");
const ALLOWED = ["jpg", "jpeg", "png", "webp"];
const MAX_BYTES = 5 * 1024 * 1024;

export async function POST(req: Request) {
  // 1. Auth
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // 2. Rate limit (20 uploads / IP / hour)
  const ip = getIP(req);
  const { allowed } = rateLimit(`upload:${ip}`, 20, 60 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json({ error: "Too many uploads" }, { status: 429 });
  }

  // 3. Parse form data
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

  // 4. Size check
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 413 });
  }

  // 5. Extension check
  const rawName = ((form.get("filename") as string) || file.name || "").toLowerCase();
  const ext = rawName.split(".").pop() ?? "";
  if (!ALLOWED.includes(ext)) {
    return NextResponse.json(
      { error: "Only .jpg, .jpeg, .png, .webp allowed" },
      { status: 415 },
    );
  }

  // 6. Magic-byte check (content must match an image type)
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const isJPEG = bytes[0] === 0xff && bytes[1] === 0xd8;
  const isPNG = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  const isWEBP =
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50;
  if (!isJPEG && !isPNG && !isWEBP) {
    return NextResponse.json(
      { error: "File content does not match type" },
      { status: 400 },
    );
  }

  // 7. Sanitise filename + normalise extension + path-traversal guard
  const base = sanitise.filename(rawName.replace(/\.[^.]+$/, "")) || "image";
  const safeExt = ext === "jpeg" ? "jpeg" : ext;
  fs.mkdirSync(IMAGES_DIR, { recursive: true });

  const replace = form.get("replace") === "true";
  let filename = `${base}.${safeExt}`;
  if (!replace) {
    let n = 1;
    while (fs.existsSync(path.join(IMAGES_DIR, filename))) {
      filename = `${base}-${n}.${safeExt}`;
      n++;
    }
  }

  const safePath = path.resolve(IMAGES_DIR, filename);
  if (safePath !== IMAGES_DIR && !safePath.startsWith(IMAGES_DIR + path.sep)) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  // 8. Write file
  fs.writeFileSync(safePath, Buffer.from(buffer));
  return NextResponse.json({ ok: true, path: `/images/${filename}` });
}
