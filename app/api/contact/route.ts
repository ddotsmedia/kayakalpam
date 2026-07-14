import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contactSchema";
import { readData, writeData } from "@/lib/admin-data";
import type { Submission } from "@/lib/admin-data";

const WINDOW_MS = 60 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed." }, { status: 422 });
  }

  const { name, phone, email, treatmentInterest, message, type, country } = parsed.data;

  // Persist to the admin inbox (best-effort) regardless of email delivery.
  try {
    const submissions = readData<Submission[]>("submissions", []);
    const submission: Submission = {
      id: Date.now().toString(),
      name,
      phone,
      email: email || "",
      treatmentInterest,
      message,
      createdAt: new Date().toISOString(),
      read: false,
      type: type ?? "contact",
      ...(country ? { country } : {}),
    };
    submissions.push(submission);
    writeData("submissions", submissions);
  } catch (e) {
    console.error("Failed to store submission", e);
  }

  const subject =
    type === "telemedicine"
      ? `Telemedicine Enquiry: ${name}${country ? ` (${country})` : ""}`
      : `Enquiry: ${treatmentInterest} — ${name}`;
  const to = process.env.CONTACT_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  // If email isn't configured, the enquiry is still saved to the inbox above.
  if (!apiKey || !to) {
    console.warn("Contact API: RESEND_API_KEY or CONTACT_EMAIL not configured; stored only.");
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Sree Kayakalpam <onboarding@resend.dev>",
      to,
      replyTo: email || undefined,
      subject,
      text: [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email || "—"}`,
        country ? `Country: ${country}` : "",
        `Interest: ${treatmentInterest}`,
        type ? `Type: ${type}` : "",
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Resend error", e);
    // Submission is already stored; report success to the visitor.
    return NextResponse.json({ ok: true });
  }
}
