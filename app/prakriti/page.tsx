import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prakriti Quiz | Discover Your Dosha",
  description:
    "The Prakriti (dosha) self-assessment quiz from Sree Kayakalpam Vaidyashala is coming soon. Meanwhile, WhatsApp us for a personalised consultation.",
  alternates: { canonical: "/prakriti" },
};

export default function PrakritiPage() {
  return (
    <>
      <PageHeader
        image="/images/herbs.jpg"
        alt="Herbs at the herbal store"
        title="Discover Your Dosha"
        titleMl="നിങ്ങളുടെ പ്രകൃതി അറിയൂ"
        subtitle="Our interactive Prakriti quiz is on its way."
      />
      <section className="bg-bg py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-accent">Coming Soon</h2>
          <p className="mt-3 text-muted leading-relaxed">
            We are preparing a free Prakriti self-assessment to help you understand your Vata, Pitta
            and Kapha balance. In the meantime, reach out for a personalised consultation.
          </p>
          <div className="mt-6 flex justify-center">
            <Button href={waLink("I'd like a personalised prakriti consultation")} external variant="gold">
              WhatsApp for a Consultation
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
