import type { Metadata } from "next";
import Link from "next/link";
import { treatments } from "@/lib/treatments-data";
import { buildMetadata } from "@/lib/seo-meta";

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const t = treatments.find((x) => x.slug === params.slug);
  if (!t) return {};
  return buildMetadata("/treatments");
}

export default function TreatmentPage({ params }: { params: { slug: string } }) {
  const treatment = treatments.find((t) => t.slug === params.slug);
  if (!treatment) return <div>Treatment not found</div>;

  const others = treatments.filter((t) => t.slug !== treatment.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="bg-[#1a3a2a] py-16 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="font-heading text-5xl font-bold">{treatment.nameEn}</h1>
          <p className="mt-3 font-ml text-2xl text-secondary">{treatment.nameMl}</p>
          <p className="mt-4 italic text-white/80">{treatment.tagline}</p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        {/* Overview */}
        <div className="mb-12 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 font-heading text-2xl font-bold">About</h2>
            <p className="text-muted">{treatment.tagline}</p>
          </div>
          <div className="rounded-lg border border-secondary/20 bg-white p-6">
            <p className="mb-2 font-semibold">⏱ Duration</p>
            <p className="mb-6 text-muted">{treatment.duration}</p>
            <Link
              href="/booking"
              className="block rounded-lg bg-secondary px-4 py-2 text-center font-semibold text-white hover:bg-secondary/90"
            >
              Book Now
            </Link>
          </div>
        </div>

        {/* Conditions */}
        <div className="mb-12">
          <h2 className="mb-6 font-heading text-2xl font-bold">Suitable For</h2>
          <div className="flex flex-wrap gap-3">
            {treatment.conditions.map((c) => (
              <span
                key={c}
                className="rounded-full bg-green-100 px-4 py-2 text-green-900"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Procedure */}
        <div className="mb-12">
          <h2 className="mb-6 font-heading text-2xl font-bold">How It Works</h2>
          <ol className="space-y-3">
            {treatment.procedure.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-white font-semibold">
                  {i + 1}
                </span>
                <span className="pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Benefits */}
        <div className="mb-12">
          <h2 className="mb-6 font-heading text-2xl font-bold">Benefits</h2>
          <ul className="space-y-2">
            {treatment.benefits.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="text-secondary">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="rounded-lg border-2 border-secondary bg-secondary/10 p-8 text-center">
          <h3 className="mb-4 font-heading text-2xl font-bold">
            Begin {treatment.nameEn}
          </h3>
          <p className="mb-6 text-muted">
            Contact Vaidyar Shine Bhaskar to start your treatment
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/booking"
              className="rounded-lg bg-secondary px-6 py-3 font-semibold text-white hover:bg-secondary/90"
            >
              Book Appointment
            </Link>
            <a
              href="https://wa.me/919447412319"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border-2 border-secondary px-6 py-3 font-semibold text-secondary hover:bg-secondary/10"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Other Treatments */}
      {others.length > 0 && (
        <section className="bg-white/50 py-12">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="mb-8 font-heading text-2xl font-bold">
              Other Treatments
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {others.map((t) => (
                <Link
                  key={t.slug}
                  href={`/treatments/${t.slug}`}
                  className="rounded-lg border border-secondary/20 bg-white p-6 hover:border-secondary hover:shadow-md transition-all"
                >
                  <h3 className="font-heading text-lg font-bold">{t.nameEn}</h3>
                  <p className="mt-2 text-sm text-muted">{t.tagline}</p>
                  <p className="mt-4 text-secondary hover:underline">Learn More →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
