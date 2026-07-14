import type { Metadata } from "next";
import { seoMeta } from "@/lib/seo";
import Image from "next/image";
import { BookOpen, Shield, FlaskConical, Star, GitBranch, Flame, Heart } from "lucide-react";
import Hero from "@/components/sections/Hero";
import FindUs from "@/components/sections/FindUs";
import CtaBanner from "@/components/sections/CtaBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import TreatmentCard from "@/components/ui/TreatmentCard";
import BookCard from "@/components/ui/BookCard";
import Button from "@/components/ui/Button";
import { treatments } from "@/lib/treatments";
import { books } from "@/lib/books";
import { waLink } from "@/lib/site";

const pillars = [
  { Icon: BookOpen, title: "Published", sub: "Author" },
  { Icon: Shield, title: "Visha Chikitsa", sub: "Specialist" },
  { Icon: FlaskConical, title: "In-House", sub: "Medicines" },
  { Icon: Star, title: "4.5★", sub: "Rated" },
];

const why = [
  {
    Icon: GitBranch,
    title: "Third-generation Parampara Practice",
    desc: "Kerala Ayurveda handed down through three generations of physicians.",
  },
  {
    Icon: Flame,
    title: "Every Medicine Made by Hand",
    desc: "Vaidyar prepares each formula himself over a wood-fire cauldron.",
  },
  {
    Icon: Shield,
    title: "One of Kerala's Few Visha Chikitsa Specialists",
    desc: "Trained in Agada Tantra — snakebite, scorpion and insect-venom care.",
  },
  {
    Icon: Heart,
    title: "Vaidyar Sees Every Patient Himself",
    desc: "No assistants, no packages — every patient is assessed by Vaidyar.",
  },
];

export function generateMetadata(): Metadata {
  return seoMeta("/", { alternates: { canonical: "/" } });
}

export default function Home() {
  return (
    <>
      <Hero />

      {/* Trust bar */}
      <section className="border-t-2 border-secondary bg-primary text-white">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-y-5 divide-white/15 px-4 py-6 sm:grid-cols-4 sm:divide-x">
          {pillars.map((p) => (
            <div key={p.title} className="flex items-center justify-center gap-3 px-3 text-center">
              <p.Icon size={18} className="shrink-0 text-secondary" aria-hidden />
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-bold">{p.title}</span>
                <span className="text-xs text-white/70">{p.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* About snippet */}
      <section className="bg-bg py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-md">
            <Image src="/images/consult.jpg" alt="Vaidyar Shine Bhaskar consulting a patient" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="max-w-[640px]">
            <SectionHeading eyebrow="Our Heritage" title="A Parampara Vaidyashala" titleMl="പാരമ്പര്യ വൈദ്യശാല" center={false} />
            <p className="leading-relaxed text-text">
              At Mampoyil in Malappuram, Vaidyar Shine Bhaskar prepares every medicine himself — over
              a wood-fire, from classical formulas preserved across generations. He has authored two
              books on traditional practice, including a dedicated work on Visha Chikitsa that few
              practitioners in Kerala are qualified to write.
            </p>
            <p className="mt-3 leading-relaxed text-text">
              Patients come from across the district and the Gulf. The Vaidyashala does not advertise
              packages or promise quick fixes. It treats.
            </p>
            <div className="mt-6">
              <Button href="/about" variant="outlineDark">Read Our Story</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Published works */}
      <section className="bg-primary-dark py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Books by Vaidyar Shine Bhaskar" titleMl="ഗ്രന്ഥങ്ങൾ" light />
          <div className="grid gap-6 lg:grid-cols-2">
            {books.map((b) => (
              <BookCard key={b.title} book={b} light />
            ))}
          </div>
        </div>
      </section>

      {/* Treatments grid */}
      <section className="bg-bg py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Our Treatments" titleMl="ചികിത്സകൾ" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {treatments.slice(0, 6).map((t) => (
              <TreatmentCard key={t.slug} t={t} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button href="/treatments" variant="green">View All Treatments</Button>
          </div>
        </div>
      </section>

      {/* Medicine prep */}
      <section className="relative isolate py-20">
        <Image src="/images/medicine.jpg" alt="Vaidyar preparing medicine in a brass cauldron over wood-fire" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-primary-dark/85" />
        <div className="relative mx-auto max-w-7xl px-4 text-white">
          <SectionHeading title="Medicines Made the Traditional Way" titleMl="ഔഷധ നിർമ്മാണം" light />
          <div className="grid gap-6 text-center sm:grid-cols-3">
            {[
              { n: "100+", l: "In-house formulations" },
              { n: "Wood-fire", l: "Traditional cauldron method" },
              { n: "Hands-on", l: "Personally by Vaidyar" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-white/10 p-6">
                <p className="font-heading text-3xl font-bold text-secondary">{s.n}</p>
                <p className="mt-1 text-white/85">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-bg py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="The Sree Kayakalpam Difference" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w) => (
              <div key={w.title} className="rounded-2xl border border-primary/15 bg-white p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <w.Icon size={22} aria-hidden />
                </span>
                <h3 className="mt-3 font-heading text-lg font-bold text-[#1a3a2a]">{w.title}</h3>
                <p className="mt-2 text-sm text-muted">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust CTA (real reviews to be added later) */}
      <section className="bg-[#1a3a2a] py-20 text-center text-white">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="font-heading text-[22px] font-medium sm:text-[28px]">
            Patients Across Kerala Trust Sree Kayakalpam
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Join thousands who have experienced authentic parampara Ayurvedic care.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href={waLink("I'd like to share my experience with Sree Kayakalpam Vaidyashala")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#C9962A] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent"
            >
              Share Your Experience →
            </a>
          </div>
        </div>
      </section>

      <FindUs />
      <CtaBanner />
    </>
  );
}
