import type { Metadata } from "next";
import { buildMetadata, breadcrumbLd } from "@/lib/seo-meta";
import JsonLd from "@/components/JsonLd";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import BookCard from "@/components/ui/BookCard";
import CtaBanner from "@/components/sections/CtaBanner";
import { books } from "@/lib/books";
import { site } from "@/lib/site";

export function generateMetadata(): Metadata {
  return buildMetadata("/about");
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([["Home", "/"], ["About", "/about"]])} />
      <PageHeader
        image="/images/hero.jpg"
        alt="Sree Kayakalpam Vaidyashala consultation room"
        title="About the Vaidyashala"
        titleMl="ഞങ്ങളെക്കുറിച്ച്"
        subtitle="A hereditary centre of authentic Kerala Ayurveda and rare Visha Chikitsa."
      />

      <section className="bg-bg py-16">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeading eyebrow="Our Heritage" title="A Parampara Vaidyashala" titleMl="പാരമ്പര്യ വൈദ്യശാല" />
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              Sree Kayakalpam Vaidyashala is a hereditary centre of Kerala Ayurveda, established in
              Malappuram and rooted in a lineage of traditional physicians. Here, classical
              scholarship meets living practice — every patient is seen, assessed and treated
              personally.
            </p>
            <p>
              The Vaidyashala maintains an extensive in-house pharmacy of more than 100 classical
              formulations. Many are prepared by hand over a wood-fire cauldron, the traditional
              method that preserves the potency and integrity of each medicine.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-md">
            <Image src="/images/consult.jpg" alt="Vaidyar Shine Bhaskar with patient records" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div>
            <SectionHeading eyebrow="The Physician" title="Vaidyar Shine Bhaskar" titleMl={site.vaidyarMl} center={false} />
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Vaidyar Shine Bhaskar is a hereditary Ayurvedic physician and a rare specialist in
                Visha Chikitsa (Agada Tantra) — the classical science of toxicology covering
                snakebite, scorpion, spider and insect venom.
              </p>
              <p>
                He is also a published author of two Malayalam works on Ayurveda, committed to
                preserving and sharing traditional knowledge for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="Authenticity" title="Our Pharmacy" titleMl="ഔഷധശാല" />
          <div className="grid gap-6 sm:grid-cols-2">
            {["/images/pharmacy-1.jpg", "/images/pharmacy-2.jpg"].map((src, i) => (
              <div key={src} className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-md">
                <Image src={src} alt={`Vaidyar at the in-house herbal pharmacy ${i + 1}`} fill sizes="(max-width:640px) 100vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-dark py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="Published Works" title="Books by the Vaidyar" titleMl="ഗ്രന്ഥങ്ങൾ" light />
          <div className="grid gap-6 lg:grid-cols-2">
            {books.map((b) => (
              <BookCard key={b.title} book={b} light />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <SectionHeading eyebrow="Our Philosophy" title="Practice Philosophy" />
          <p className="text-muted leading-relaxed">
            We believe authentic healing comes from respecting the classical texts, knowing the
            patient personally, and never compromising on the quality of medicine. Tradition is not
            nostalgia here — it is a daily discipline.
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
