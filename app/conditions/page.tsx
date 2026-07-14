import type { Metadata } from "next";
import { buildMetadata, breadcrumbLd } from "@/lib/seo-meta";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/layout/PageHeader";
import CtaBanner from "@/components/sections/CtaBanner";
import Icon from "@/components/ui/Icon";
import { conditions } from "@/lib/conditions";

export function generateMetadata(): Metadata {
  return buildMetadata("/conditions");
}

export default function ConditionsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([["Home", "/"], ["Conditions Treated", "/conditions"]])} />
      <PageHeader
        image="/images/pharmacy-2.jpg"
        alt="Vaidyar at the medicine shelves"
        title="Conditions Treated"
        titleMl="ചികിത്സിക്കുന്ന രോഗങ്ങൾ"
        subtitle="From rare envenomation care to everyday chronic ailments."
      />

      <section className="bg-bg py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {conditions.map((c) => (
              <div
                key={c.name}
                className={`flex items-center gap-4 rounded-2xl border p-5 shadow-sm ${
                  c.highlight ? "border-accent bg-accent/5" : "border-primary/15 bg-white"
                }`}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    c.highlight ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                  }`}
                  aria-hidden
                >
                  <Icon name={c.icon} size={22} />
                </span>
                <div>
                  <h2 className={`font-heading text-lg font-bold ${c.highlight ? "text-accent" : "text-[#1a3a2a]"}`}>
                    {c.name}
                  </h2>
                  <p className="font-ml text-sm text-primary">{c.nameMl}</p>
                  {c.highlight && (
                    <span className="mt-1 inline-block text-xs font-bold uppercase tracking-wide text-accent">
                      Visha Chikitsa Specialty
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted">
            For any venomous bite or medical emergency, seek immediate hospital care and call us for
            guidance.
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
