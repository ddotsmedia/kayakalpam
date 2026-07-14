import type { Metadata } from "next";
import { Droplets, Hand, Waves, Leaf } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import ContactForm from "@/components/sections/ContactForm";
import CtaBanner from "@/components/sections/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbLd } from "@/lib/seo-meta";
import { waLink } from "@/lib/site";

export function generateMetadata(): Metadata {
  return buildMetadata("/karkidaka");
}

const therapyLd = {
  "@context": "https://schema.org",
  "@type": "MedicalTherapy",
  name: "Karkidaka Chikitsa",
  alternateName: "Monsoon Ayurvedic Rejuvenation",
  description:
    "Karkidaka Chikitsa is the traditional Kerala monsoon-season Ayurvedic rejuvenation and detoxification programme, offered during July–August at Sree Kayakalpam Vaidyashala, Malappuram.",
  medicineSystem: "Ayurveda",
  relevantSpecialty: "Ayurvedic",
  provider: {
    "@type": "MedicalBusiness",
    name: "Sree Kayakalpam Vaidyashala",
    telephone: "+919447412319",
    url: "https://kayakalpamvaidyasala.com",
  },
};

const therapies = [
  { Icon: Droplets, name: "Panchakarma", desc: "Classical five-fold purification to clear toxins accumulated through the year." },
  { Icon: Hand, name: "Njavara Kizhi", desc: "Medicated rice-bolus massage that nourishes tissues and restores strength." },
  { Icon: Waves, name: "Shirodhara", desc: "Warm medicated-oil stream over the forehead to calm body and mind." },
  { Icon: Leaf, name: "Rasayana", desc: "Rejuvenation regimen with classical tonics for immunity and vitality." },
];

const faqs = [
  {
    q: "What is the best time for Karkidaka Chikitsa?",
    a: "The Malayalam month of Karkidakam (mid-July to mid-August) is considered the ideal season. During the monsoon the body is most receptive to treatment and herbs are at their most potent.",
  },
  {
    q: "How long is a Karkidaka treatment course?",
    a: "Courses typically run from 7 to 21 days depending on your constitution and goals. Vaidyar Shine Bhaskar designs a personalised schedule after assessing your prakriti.",
  },
  {
    q: "Can I do Karkidaka Chikitsa online?",
    a: "The core therapies are hands-on and done at the Vaidyashala in Malappuram, but Vaidyar can advise on Karkidaka diet, kizhi and Rasayana medicines over an online consultation, with medicines shipped to you.",
  },
];

export default function KarkidakaPage() {
  return (
    <>
      <JsonLd data={therapyLd} />
      <JsonLd data={breadcrumbLd([["Home", "/"], ["Karkidaka Chikitsa", "/karkidaka"]])} />

      {/* 1 — Hero */}
      <section className="bg-gradient-to-br from-[#0f2a1a] to-[#2d6a4f] py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <span className="inline-flex rounded-full border border-secondary/40 bg-white/10 px-4 py-1.5 text-sm">
            July – August | Peak Ayurveda Season
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold sm:text-5xl">Karkidaka Chikitsa Season</h1>
          <p className="font-ml mt-2 text-2xl text-secondary">കർക്കിടക ചികിൽസ</p>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            Traditional monsoon rejuvenation and detoxification at Sree Kayakalpam Vaidyashala,
            Mampoyil, Malappuram — personally supervised by Vaidyar Shine Bhaskar.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a href="#book" className="rounded-full bg-[#C9962A] px-7 py-3 text-sm font-semibold text-[#1a3a2a] hover:brightness-95">
              Book Karkidaka Package →
            </a>
            <a
              href={waLink("I'd like to book a Karkidaka Chikitsa package")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* 2 — What is Karkidaka Chikitsa */}
      <section className="bg-bg py-16">
        <div className="mx-auto max-w-[680px] px-4">
          <SectionHeading title="What is Karkidaka Chikitsa?" titleMl="കർക്കിടക ചികിൽസ എന്നാൽ" />
          <div className="space-y-4 leading-relaxed text-text">
            <p>
              Karkidakam, the last month of the Malayalam calendar, falls in the heart of the Kerala
              monsoon. For generations it has been the month set aside for healing — when families
              turn to Ayurvedic diet, medicated gruel (karkidaka kanji) and rejuvenation therapy to
              rebuild strength before the year ahead.
            </p>
            <p>
              The monsoon is <em>Visarga kala</em> — the season when the body is most receptive to
              treatment. Cool, moist weather calms the aggravated doshas of summer, the channels of
              the body open, and classical herbs are at their most potent. This makes Karkidakam the
              single best window in the year for detoxification and Rasayana (rejuvenation).
            </p>
            <p>
              During a Karkidaka course at Sree Kayakalpam Vaidyashala, Vaidyar Shine Bhaskar assesses
              your prakriti and prescribes a personalised regimen — purification therapies, medicated
              massage, a seasonal diet and classical tonics prepared in-house — to clear accumulated
              toxins and restore vitality, immunity and clarity.
            </p>
          </div>
        </div>
      </section>

      {/* 3 — Treatments */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title="Treatments During Karkidaka" titleMl="കർക്കിടക ചികിത്സകൾ" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {therapies.map((t) => (
              <div key={t.name} className="rounded-2xl border border-primary/15 bg-bg p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <t.Icon size={22} aria-hidden />
                </span>
                <h3 className="mt-3 font-heading text-lg font-bold text-[#1a3a2a]">{t.name}</h3>
                <p className="mt-2 text-sm text-muted">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Why choose */}
      <section className="bg-bg py-16">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeading title="Why Sree Kayakalpam for Karkidaka" />
          <ul className="space-y-4 text-text">
            <li className="rounded-2xl border border-primary/15 bg-white p-5">
              <strong className="text-[#1a3a2a]">Seasonal in-house medicines.</strong> Classical
              formulas are prepared by hand over a wood-fire for the Karkidaka season — no commercial
              fillers.
            </li>
            <li className="rounded-2xl border border-primary/15 bg-white p-5">
              <strong className="text-[#1a3a2a]">Classical formulas from Ashtanga Hridayam.</strong>{" "}
              Every regimen follows the authentic texts, adapted to your constitution.
            </li>
            <li className="rounded-2xl border border-primary/15 bg-white p-5">
              <strong className="text-[#1a3a2a]">Personal supervision by Vaidyar Shine Bhaskar.</strong>{" "}
              He sees and assesses every patient himself — no packages sold blind.
            </li>
          </ul>
        </div>
      </section>

      {/* 5 — Booking form */}
      <section id="book" className="scroll-mt-24 bg-white py-16">
        <div className="mx-auto max-w-2xl px-4">
          <SectionHeading title="Book Your Karkidaka Package" titleMl="ബുക്ക് ചെയ്യുക" />
          <p className="mb-6 text-center text-sm text-muted">
            Select “Kayakalpa Chikitsa” or “General Enquiry” and mention your preferred dates —
            we’ll design a Karkidaka schedule for you.
          </p>
          <div className="rounded-2xl bg-bg p-6 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* 6 — FAQ */}
      <section className="bg-bg py-16">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeading title="Karkidaka Chikitsa FAQs" />
          <Accordion items={faqs} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
