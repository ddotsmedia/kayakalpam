import Image from "next/image";
import { MapPin } from "lucide-react";
import Button from "@/components/ui/Button";
import { site, waLink } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-gradient-to-br from-[#0f2a1a] to-[#2d6a4f] sm:min-h-[88vh]">
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-2/3 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #C9962A 0, #C9962A 1px, transparent 1px, transparent 14px)",
        }}
      />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:py-20 md:grid-cols-[1fr_auto]">
        <div className="text-white">
          <p className="font-ml text-sm tracking-wide text-white/60">{site.nameMl}</p>
          <h1 className="mt-2 max-w-2xl font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {site.name}
          </h1>
          <p className="mt-3 max-w-2xl font-heading text-xl italic text-secondary">
            {site.tagline}
          </p>
          <p className="mt-4 max-w-xl text-white/85">
            Parampara Kerala tradition, rare Visha Chikitsa specialty, and classical medicines
            prepared in-house by {site.vaidyar}.
          </p>
          <p className="font-ml mt-2 max-w-xl text-sm text-white/70">{site.taglineMl}</p>

          <span className="mt-5 mb-4 inline-flex max-w-fit items-center gap-2 rounded-full border border-secondary/40 bg-white/10 px-4 py-1.5 text-sm leading-snug text-white/90">
            <MapPin size={15} className="shrink-0 text-secondary" aria-hidden />
            <span>{site.address.full}</span>
          </span>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={waLink()} external variant="gold">
              Book a Consultation
            </Button>
            <Button href="/treatments" variant="outlineLight">
              Explore Treatments
            </Button>
          </div>
        </div>

        <div className="hidden justify-self-center md:block">
          <div className="relative h-80 w-80 overflow-hidden rounded-full border-4 border-secondary/70 shadow-2xl">
            <Image
              src="/images/hero.jpg"
              alt="Vaidyar Shine Bhaskar at the traditional teak consultation desk of Sree Kayakalpam Vaidyashala"
              fill
              priority
              sizes="320px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
