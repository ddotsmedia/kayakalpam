import type { Metadata } from "next";
import { AlertTriangle, Phone, ShieldAlert } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaBanner from "@/components/sections/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbLd } from "@/lib/seo-meta";
import { site, waLink } from "@/lib/site";

export function generateMetadata(): Metadata {
  return buildMetadata("/visha-chikitsa");
}

const therapyLd = {
  "@context": "https://schema.org",
  "@type": "MedicalTherapy",
  name: "Visha Chikitsa (Agada Tantra)",
  alternateName: "Ayurvedic Toxicology",
  description:
    "Traditional Ayurvedic toxicology (Agada Tantra) for snakebite, scorpion sting, insect venom and poisoning, offered by Vaidyar Shine Bhaskar at Sree Kayakalpam Vaidyashala, Malappuram, Kerala.",
  medicineSystem: "Ayurveda",
  relevantSpecialty: "Toxicology",
  provider: {
    "@type": "MedicalBusiness",
    name: "Sree Kayakalpam Vaidyashala",
    telephone: "+919447412319",
    url: "https://kayakalpamvaidyasala.com",
  },
};

const conditions = [
  "Snake bite",
  "Scorpion sting",
  "Spider bite",
  "Centipede bite",
  "Bee & wasp sting",
  "Rat bite",
  "Insect venom",
  "Food poisoning (herbal)",
];

const steps = [
  { n: "1", title: "Assessment", desc: "Careful examination of the bite, symptoms and the patient's condition." },
  { n: "2", title: "Classical herbal antidotes", desc: "Agada formulations and procedures drawn from the classical texts." },
  { n: "3", title: "Recovery care", desc: "Follow-up regimen and diet to clear residual toxins and rebuild strength." },
];

export default function VishaChikitsaPage() {
  return (
    <>
      <JsonLd data={therapyLd} />
      <JsonLd data={breadcrumbLd([["Home", "/"], ["Visha Chikitsa", "/visha-chikitsa"]])} />

      {/* 1 — Hero */}
      <section className="border-b-4 border-red-600 bg-[#0f2a1a] py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-red-500/10 px-4 py-1.5 text-sm text-red-200">
            <ShieldAlert size={16} aria-hidden /> Agada Tantra — Classical Toxicology
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold sm:text-5xl">Visha Chikitsa</h1>
          <p className="font-ml mt-2 text-2xl text-secondary">വിഷ ചികിൽസ</p>
          <a
            href={`tel:${site.phoneRaw}`}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-base font-semibold text-white hover:bg-red-700"
          >
            <Phone size={18} aria-hidden /> Emergency: {site.phone}
          </a>
          <p className="mx-auto mt-5 flex max-w-xl items-start gap-2 rounded-lg bg-white/10 p-3 text-left text-sm text-white/85">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-300" aria-hidden />
            <span>
              Always seek hospital emergency care first. Traditional Visha Chikitsa is a
              complementary treatment given alongside modern medical care.
            </span>
          </p>
        </div>
      </section>

      {/* 2 — What is Visha Chikitsa */}
      <section className="bg-bg py-16">
        <div className="mx-auto max-w-[680px] px-4">
          <SectionHeading title="What is Visha Chikitsa (Agada Tantra)?" titleMl="വിഷ ചികിൽസ" />
          <div className="space-y-4 leading-relaxed text-text">
            <p>
              Visha Chikitsa, known in the classical texts as <em>Agada Tantra</em>, is one of the
              eight branches of Ashtanga Ayurveda. It is the science of toxicology — the study and
              treatment of venoms, poisons and their antidotes.
            </p>
            <p>
              Preserved in Kerala through hereditary lineages, it treats envenomation from snakes,
              scorpions and insects, as well as accumulated and food-borne toxins, using classical
              herbal antidotes (agada), purification and dietary regulation.
            </p>
          </div>
        </div>
      </section>

      {/* 3 — Conditions */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading title="Conditions Treated" titleMl="ചികിത്സിക്കുന്ന അവസ്ഥകൾ" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {conditions.map((c) => (
              <div
                key={c}
                className="rounded-xl border border-primary/15 bg-bg p-4 text-center text-sm font-medium text-[#1a3a2a]"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Expertise */}
      <section className="bg-bg py-16">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeading title="Vaidyar Shine Bhaskar's Expertise" />
          <ul className="space-y-4 text-text">
            <li className="rounded-2xl border border-primary/15 bg-white p-5">
              <strong className="text-[#1a3a2a]">Author of “Visha Chikitsa Agadam Amrutham”</strong> —
              a Malayalam reference text on Agada Tantra that few practitioners in Kerala are
              qualified to write.
            </li>
            <li className="rounded-2xl border border-primary/15 bg-white p-5">
              <strong className="text-[#1a3a2a]">Years of practice in the Malappuram region</strong>,
              carrying forward a hereditary tradition of toxicology.
            </li>
            <li className="rounded-2xl border border-primary/15 bg-white p-5">
              <strong className="text-[#1a3a2a]">One of few practitioners</strong> still qualified in
              this rare classical branch of Ayurveda.
            </li>
          </ul>
        </div>
      </section>

      {/* 5 — Approach */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading title="Treatment Approach" />
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-primary/15 bg-bg p-6 text-center shadow-sm">
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                  {s.n}
                </span>
                <h3 className="mt-3 font-heading text-lg font-bold text-[#1a3a2a]">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Emergency note + CTA */}
      <section className="bg-[#0f2a1a] py-16 text-center text-white">
        <div className="mx-auto max-w-2xl px-4">
          <p className="mx-auto mb-6 flex max-w-xl items-start gap-2 rounded-lg bg-red-500/15 p-4 text-left text-sm">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-300" aria-hidden />
            <span>
              For any venomous bite: go to hospital immediately. Contact us on WhatsApp for
              traditional supportive care alongside hospital treatment.
            </span>
          </p>
          <a
            href={waLink("EMERGENCY: Visha Chikitsa guidance needed")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-lg font-semibold text-white shadow-lg hover:brightness-95"
          >
            <Phone size={20} aria-hidden /> WhatsApp Now — {site.phone}
          </a>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
