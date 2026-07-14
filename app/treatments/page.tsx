import type { Metadata } from "next";
import { buildMetadata, breadcrumbLd } from "@/lib/seo-meta";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import CtaBanner from "@/components/sections/CtaBanner";
import Icon from "@/components/ui/Icon";
import { treatments } from "@/lib/treatments";
import { waLink } from "@/lib/site";

export function generateMetadata(): Metadata {
  return buildMetadata("/treatments");
}

export default function TreatmentsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([["Home", "/"], ["Treatments", "/treatments"]])} />
      <PageHeader
        image="/images/herbs.jpg"
        alt="Vaidyar selecting herbs at the herbal store"
        title="Our Treatments"
        titleMl="ചികിത്സകൾ"
        subtitle="Classical Kerala Ayurveda, tailored to your prakriti and condition."
      />

      <div className="mx-auto max-w-7xl gap-10 px-4 py-16 lg:grid lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-secondary">On this page</p>
            {treatments.map((t) => (
              <a
                key={t.slug}
                href={`#${t.slug}`}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-text hover:bg-primary/5 hover:text-primary"
              >
                {t.name}
              </a>
            ))}
          </nav>
        </aside>

        <div className="space-y-12">
          {treatments.map((t) => (
            <article
              key={t.slug}
              id={t.slug}
              className={`scroll-mt-24 rounded-2xl border p-7 shadow-sm ${
                t.highlight ? "border-secondary bg-secondary/5" : "border-primary/15 bg-white"
              }`}
            >
              {t.highlight && (
                <span className="mb-3 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  Rare Specialty
                </span>
              )}
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary" aria-hidden>
                  <Icon name={t.icon} size={24} />
                </span>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-[#1a3a2a]">{t.name}</h2>
                  <p className="font-ml text-primary">{t.nameMl}</p>
                </div>
              </div>
              <p className="mt-4 text-muted leading-relaxed">{t.description}</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-accent">Benefits</h3>
                  <ul className="mt-2 space-y-1 text-sm text-muted">
                    {t.benefits.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="text-secondary">✓</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-accent">Typical Duration</h3>
                  <p className="mt-2 text-sm text-muted">{t.duration}</p>
                </div>
              </div>
              <div className="mt-6">
                <Button href={waLink(`I'd like to know more about ${t.name} at Sree Kayakalpam Vaidyashala`)} external variant="gold">
                  Enquire about {t.name.split(" ")[0]}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <CtaBanner />
    </>
  );
}
