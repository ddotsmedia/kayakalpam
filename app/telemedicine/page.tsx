import type { Metadata } from "next";
import { seoMeta } from "@/lib/seo";
import { ClipboardList, CalendarDays, Pill, Globe } from "lucide-react";
import TelemedicineForm from "@/components/sections/TelemedicineForm";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { site, waLink } from "@/lib/site";

export function generateMetadata(): Metadata {
  return seoMeta("/telemedicine", {
  title: "Online Ayurvedic Consultation | Vaidyar Shine Bhaskar | Sree Kayakalpam Vaidyashala",
  description:
    "Book an online Ayurvedic consultation with Vaidyar Shine Bhaskar from anywhere in the world. Video consultation via WhatsApp or Google Meet. Ideal for NRI patients and Kerala diaspora.",
  alternates: { canonical: "/telemedicine" },
  });
}

const steps = [
  { Icon: ClipboardList, title: "Share Your Concern", desc: "WhatsApp or fill the form with your symptoms and health history." },
  { Icon: CalendarDays, title: "Book Your Slot", desc: "Choose a convenient time. Consultations via WhatsApp Video or Google Meet." },
  { Icon: Pill, title: "Receive Your Treatment Plan", desc: "Personalised Ayurvedic advice + medicine recommendations. Medicines shipped to your address." },
];

const faqs = [
  { q: "How does the online consultation work?", a: "After you submit the booking form, we confirm a slot on WhatsApp. At the scheduled time, Vaidyar consults you over WhatsApp Video, Google Meet or phone, then shares a personalised treatment plan." },
  { q: "Can medicines be shipped to my country?", a: "Yes. Classical Ayurvedic medicines can be shipped internationally following your consultation, subject to your country's import rules." },
  { q: "What platform is used for video consultation?", a: "WhatsApp Video, Google Meet or a phone call — whichever you prefer. You choose when booking." },
  { q: "Is online Ayurvedic consultation effective?", a: "For most non-emergency conditions, a detailed history, observation and discussion let the Vaidyar assess your prakriti and prescribe effectively. Emergencies always need in-person hospital care first." },
  { q: "How do I pay for the consultation?", a: "Payment details will be shared on WhatsApp after booking confirmation. We accept bank transfer and UPI." },
];

export default function TelemedicinePage() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="bg-gradient-to-br from-[#0f2a1a] to-[#2d6a4f] py-16 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-white/10 px-4 py-1.5 text-sm">
              <Globe size={16} className="text-secondary" aria-hidden /> Online Consultation Available Worldwide
            </span>
            <h1 className="mt-4 font-heading text-4xl font-bold sm:text-5xl">
              Consult Vaidyar Shine Bhaskar Online
            </h1>
            <p className="font-ml mt-2 text-xl text-secondary">ഓൺലൈൻ ആയുർവേദ ചികിൽസ</p>
            <p className="mt-4 max-w-xl text-white/85">
              Receive authentic Kerala Ayurvedic guidance from Vaidyar Shine Bhaskar — from the
              comfort of your home, anywhere in the world.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#booking" variant="gold">Book Video Consultation</Button>
              <Button href={waLink("I'd like an online consultation")} external variant="outlineLight">
                WhatsApp First
              </Button>
            </div>
          </div>
          <div className="hidden justify-self-center md:block" aria-hidden>
            <svg viewBox="0 0 200 200" className="h-56 w-56 text-secondary">
              <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="3" />
              <ellipse cx="100" cy="100" rx="30" ry="70" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="30" y1="100" x2="170" y2="100" stroke="currentColor" strokeWidth="2" />
              <line x1="40" y1="65" x2="160" y2="65" stroke="currentColor" strokeWidth="2" />
              <line x1="40" y1="135" x2="160" y2="135" stroke="currentColor" strokeWidth="2" />
              <rect x="120" y="120" width="56" height="40" rx="6" fill="#1a3a2a" stroke="currentColor" strokeWidth="3" />
              <polygon points="176,128 192,120 192,160 176,152" fill="currentColor" />
            </svg>
          </div>
        </div>
      </section>

      {/* 2 — How it works */}
      <section className="bg-bg py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow="Simple Process" title="How It Works" />
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="rounded-2xl border border-primary/15 bg-white p-6 text-center shadow-sm">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <s.Icon size={24} aria-hidden />
                </span>
                <p className="mt-3 text-xs font-bold uppercase tracking-widest text-secondary">Step {i + 1}</p>
                <h3 className="mt-1 font-heading text-lg font-bold text-accent">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Consultation types */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow="Choose Your Consultation" title="Consultation Types" />
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col rounded-2xl border border-primary/15 bg-bg p-6 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-accent">Initial Consultation</h3>
              <p className="text-sm text-secondary">45–60 min</p>
              <ul className="mt-3 flex-1 space-y-1 text-sm text-muted">
                <li>✓ First-time patients</li>
                <li>✓ Full health assessment</li>
                <li>✓ Prakriti analysis</li>
                <li>✓ Treatment plan</li>
              </ul>
              <div className="mt-4"><Button href="#booking" variant="green">Book Now</Button></div>
            </div>
            <div className="flex flex-col rounded-2xl border border-primary/15 bg-bg p-6 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-accent">Follow-up Consultation</h3>
              <p className="text-sm text-secondary">20–30 min</p>
              <ul className="mt-3 flex-1 space-y-1 text-sm text-muted">
                <li>✓ Existing patients</li>
                <li>✓ Progress review</li>
                <li>✓ Medicine adjustment</li>
              </ul>
              <div className="mt-4"><Button href="#booking" variant="green">Book Now</Button></div>
            </div>
            <div className="flex flex-col rounded-2xl border-2 border-red-500 bg-red-50 p-6 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-red-700">Visha Chikitsa Emergency</h3>
              <p className="text-sm font-semibold text-red-600">WhatsApp only · immediate response</p>
              <p className="mt-3 flex-1 text-sm text-muted">
                Snakebite / scorpion sting first-aid guidance. For any venomous bite, reach a
                hospital immediately and message us for guidance.
              </p>
              <div className="mt-4">
                <a
                  href={waLink("EMERGENCY: Visha Chikitsa guidance needed")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700"
                >
                  WhatsApp Now — Emergency
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — NRI */}
      <section className="bg-bg py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <SectionHeading eyebrow="For NRI Patients" title="Connecting Kerala's Diaspora with Authentic Healing" />
          <p className="text-muted leading-relaxed">
            Vaidyar Shine Bhaskar has guided patients across the UAE, Qatar, Kuwait, Saudi Arabia,
            Oman, Bahrain, and beyond. Classical Ayurvedic medicines can be shipped internationally
            upon consultation.
          </p>
          <p className="mt-6 text-sm font-semibold tracking-wide text-primary">
            UAE · Qatar · Kuwait · Saudi Arabia · Oman · Bahrain · UK · USA · Australia
          </p>
          <p className="mt-4 text-sm text-muted">
            Time zone: Consultations available IST 8AM–6PM (UAE: 6:30AM–4:30PM | UK: 2:30AM–12:30PM)
          </p>
        </div>
      </section>

      {/* 5 — Booking form */}
      <section id="booking" className="scroll-mt-24 bg-white py-16">
        <div className="mx-auto max-w-2xl px-4">
          <SectionHeading eyebrow="Get Started" title="Book Your Online Consultation" />
          <TelemedicineForm />
        </div>
      </section>

      {/* 6 — FAQ */}
      <section className="bg-bg py-16">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeading eyebrow="Questions" title="Telemedicine FAQs" />
          <Accordion items={faqs} />
        </div>
      </section>

      {/* 7 — CTA banner */}
      <section className="bg-primary-dark py-14 text-center text-white">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-3xl font-bold text-white">Ready to Begin? We&apos;re One Message Away.</h2>
          <div className="mt-6 flex justify-center">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#25D366] px-8 py-4 text-lg font-semibold text-white shadow-lg"
            >
              WhatsApp {site.phone}
            </a>
          </div>
          <p className="mt-3 text-sm text-white/70">Typical response time: within 2 hours</p>
        </div>
      </section>
    </>
  );
}
