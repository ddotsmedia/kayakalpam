import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-session";
import { readData, writeData } from "@/lib/admin-data";

type GalleryImage = {
  src: string;
  category: string;
  captionEn: string;
  captionMl: string;
};

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(readData<GalleryImage[]>("gallery", []));
}

export async function PUT(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: GalleryImage[];
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "Expected an array" }, { status: 400 });
  }

  writeData("gallery", body);
  revalidatePath("/gallery");
  return NextResponse.json({ ok: true });
}
