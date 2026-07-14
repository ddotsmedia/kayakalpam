import type { Metadata } from "next";
import { buildMetadata, breadcrumbLd } from "@/lib/seo-meta";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/layout/PageHeader";
import Accordion from "@/components/ui/Accordion";
import CtaBanner from "@/components/sections/CtaBanner";
import { faqs } from "@/lib/faqs";

export function generateMetadata(): Metadata {
  return buildMetadata("/faq");
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([["Home", "/"], ["FAQ", "/faq"]])} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHeader
        image="/images/pharmacy-1.jpg"
        alt="Vaidyar at the herbal pharmacy"
        title="Frequently Asked Questions"
        titleMl="പതിവ് ചോദ്യങ്ങൾ"
        subtitle="Answers on Ayurveda, Visha Chikitsa, treatments and booking."
      />

      <section className="bg-bg py-16">
        <div className="mx-auto max-w-3xl px-4">
          <Accordion items={faqs} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
