import type { Metadata } from "next";
import { seoMeta } from "@/lib/seo";
import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/sections/ContactForm";
import { site, waLink } from "@/lib/site";

const MAPS_EMBED =
  process.env.NEXT_PUBLIC_MAPS_EMBED ||
  "https://www.google.com/maps?q=Mampoyil%2C+Chunkathara%2C+Malappuram%2C+Kerala+676505&output=embed";

export function generateMetadata(): Metadata {
  return seoMeta("/contact", {
  title: "Book Consultation | +91 9447412319",
  description:
    "Book a consultation at Sree Kayakalpam Vaidyashala, Mampoyil, Chunkathara, Malappuram, Kerala. Call or WhatsApp +91 9447412319 or send an enquiry online.",
  alternates: { canonical: "/contact" },
  });
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        image="/images/consult.jpg"
        alt="Vaidyar Shine Bhaskar at the consultation desk"
        title="Book a Consultation"
        titleMl="ബന്ധപ്പെടുക"
        subtitle="Send an enquiry, or call and WhatsApp us directly."
      />

      <section className="bg-bg py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="font-heading text-2xl font-bold text-accent">Send an Enquiry</h2>
            <p className="mt-1 mb-6 text-sm text-muted">We usually respond within a day.</p>
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold text-accent">Reach Us</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-accent">Address</dt>
                  <dd className="text-muted">{site.address.full}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-accent">Phone / WhatsApp</dt>
                  <dd>
                    <a href={`tel:${site.phoneRaw}`} className="text-primary hover:text-secondary">
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-accent">Hours</dt>
                  <dd className="text-muted">{site.hours}</dd>
                </div>
              </dl>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white"
                >
                  WhatsApp
                </a>
                <a
                  href={`tel:${site.phoneRaw}`}
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Call Now
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-sm">
              <iframe
                title="Map to Sree Kayakalpam Vaidyashala"
                src={MAPS_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[300px] w-full border-0"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
