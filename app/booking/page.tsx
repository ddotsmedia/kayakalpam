import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo-meta";

export function generateMetadata(): Metadata {
  return buildMetadata("/booking");
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="bg-[#1a3a2a] py-16 text-center text-white">
        <h1 className="font-heading text-5xl font-bold">
          Book Your Appointment
        </h1>
        <p className="mt-3 text-secondary">
          Consult with Vaidyar Shine Bhaskar
        </p>
      </section>

      {/* Info */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-secondary/20 bg-white p-6">
            <h2 className="mb-4 font-heading text-2xl font-bold">
              In-Person Visit
            </h2>
            <p className="mb-4 text-muted">
              Visit our clinic at Mampoyil, Malappuram
            </p>
            <p className="font-semibold">📞 +91 9447412319</p>
          </div>

          <div className="rounded-lg border border-secondary/20 bg-white p-6">
            <h2 className="mb-4 font-heading text-2xl font-bold">
              Online Consultation
            </h2>
            <p className="mb-4 text-muted">
              WhatsApp Video / Google Meet / Phone
            </p>
            <p className="text-sm text-muted">
              Perfect for NRI patients worldwide
            </p>
          </div>
        </div>

        {/* Simple form placeholder */}
        <div className="mt-12">
          <p className="text-center text-muted">
            📅 Booking system coming soon. Please WhatsApp us directly:
          </p>
          <div className="mt-6 text-center">
            <a
              href="https://wa.me/919447412319"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-700"
            >
              WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* Clinic Info */}
      <section className="bg-white/50 py-12">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h3 className="font-heading text-2xl font-bold">Clinic Hours</h3>
          <p className="mt-4 text-muted">Monday – Saturday, 8:00 AM – 6:00 PM</p>
          <p className="mt-2 text-muted">Sunday: Closed</p>
          <p className="mt-6 font-semibold">
            Mampoyil, Chunkathara, Malappuram, Kerala 676505
          </p>
        </div>
      </section>
    </div>
  );
}
