import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo-meta";

export function generateMetadata(): Metadata {
  return buildMetadata("/seasonal");
}

const seasons = [
  {
    id: "karkidaka",
    nameEn: "Karkidaka (Monsoon)",
    nameMl: "കർക്കിടകം",
    months: "June–August",
    dosha: "Vata aggravated, Pitta accumulates",
    treatments: ["Panchakarma", "Njavara Kizhi", "Karkidaka Massage"],
    foods: ["Warm foods", "Oily meals", "Digestible items"],
    avoid: ["Raw foods", "Cold drinks", "Heavy meals"],
    highlight: true
  },
  {
    id: "sharad",
    nameEn: "Sharad (Autumn)",
    nameMl: "ശരത്",
    months: "September–October",
    dosha: "Pitta peaks — skin and digestive issues",
    treatments: ["Virechana", "Cooling therapies"],
    foods: ["Bitter foods", "Sweet items", "Cooling foods"],
    avoid: ["Spicy foods", "Sour items", "Fermented foods"]
  },
  {
    id: "hemanta",
    nameEn: "Hemanta (Early Winter)",
    nameMl: "ഹേമന്ത",
    months: "November–December",
    dosha: "Strongest digestive fire — nourishment time",
    treatments: ["Abhyanga", "Rasayana", "Tonic medicines"],
    foods: ["Heavy foods", "Nourishing items", "Sweet & sour"],
    avoid: ["Fasting", "Light foods", "Reducing diets"]
  },
  {
    id: "shishira",
    nameEn: "Shishira (Late Winter)",
    nameMl: "ശിശിര",
    months: "January–February",
    dosha: "Kapha accumulates, Vata aggravated",
    treatments: ["Udvartana", "Warming therapies"],
    foods: ["Hot foods", "Spicy items", "Light meals"],
    avoid: ["Cold foods", "Excess dairy", "Too many sweets"]
  },
  {
    id: "vasanta",
    nameEn: "Vasanta (Spring)",
    nameMl: "വസന്ത",
    months: "March–April",
    dosha: "Kapha liquefies — cleansing season",
    treatments: ["Vamana", "Nasya", "Kapha-reducing therapies"],
    foods: ["Light foods", "Dry items", "Bitter & pungent"],
    avoid: ["Heavy foods", "Oily items", "Sweets"]
  },
  {
    id: "grishma",
    nameEn: "Grishma (Summer)",
    nameMl: "ഗ്രീഷ്മ",
    months: "May–June",
    dosha: "Pitta rises, body weakened",
    treatments: ["Shirodhara", "Cooling oil treatments"],
    foods: ["Sweet foods", "Liquid-rich", "Cooling foods"],
    avoid: ["Spicy foods", "Salty items", "Sour foods"]
  }
];

export default function SeasonalPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="bg-[#1a3a2a] py-16 text-center text-white">
        <h1 className="font-heading text-5xl font-bold">Ritucharya</h1>
        <p className="mt-3 font-ml text-xl text-secondary">ഋതുചര്യ</p>
        <p className="mt-4 text-white/80">
          Seasonal Ayurvedic Guidelines
        </p>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="prose prose-invert max-w-none">
          <p className="text-muted">
            Ritucharya is the Ayurvedic science of adapting diet,
            lifestyle and treatment to the six seasons. Each season
            brings specific effects on the doshas (Vata, Pitta, Kapha).
            Ayurveda prescribes precise guidelines to maintain balance
            throughout the year.
          </p>
        </div>
      </section>

      {/* Seasons Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {seasons.map((s) => (
            <div
              key={s.id}
              className={`rounded-lg border-2 p-6 ${
                s.highlight
                  ? "border-secondary bg-secondary/5"
                  : "border-secondary/20 bg-white"
              }`}
            >
              <h3 className="font-heading text-xl font-bold">{s.nameEn}</h3>
              <p className="font-ml text-lg text-secondary">{s.nameMl}</p>
              <p className="mt-2 text-sm text-muted">{s.months}</p>
              
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase text-secondary">
                    Dosha Effect
                  </p>
                  <p className="text-sm text-muted">{s.dosha}</p>
                </div>
                
                <div>
                  <p className="text-xs font-semibold uppercase text-secondary">
                    Treatments
                  </p>
                  <ul className="mt-1 space-y-1">
                    {s.treatments.map((t) => (
                      <li key={t} className="text-sm">• {t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Karkidaka Banner */}
      <section className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-lg border-2 border-secondary bg-secondary/10 p-8 text-center">
          <h2 className="mb-3 font-heading text-2xl font-bold">
            🌧 Karkidaka Season is NOW
          </h2>
          <p className="mb-6 text-muted">
            June–August: The most important month for Ayurvedic treatment
            in Kerala. Begin Panchakarma or Njavara Kizhi during this period
            for maximum benefit.
          </p>
          <Link
            href="/karkidaka"
            className="inline-block rounded-lg bg-secondary px-6 py-3 font-semibold text-white hover:bg-secondary/90"
          >
            Explore Karkidaka Chikitsa
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white/50 py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-6 font-heading text-3xl font-bold">
            Begin Your Seasonal Treatment
          </h2>
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
              WhatsApp Vaidyar
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
