"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Testimonial } from "@/lib/testimonials";

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const list = items.length ? items : [];
  const [i, setI] = useState(0);
  if (list.length === 0) return null;
  const t = list[Math.min(i, list.length - 1)];
  const go = (d: number) => setI((p) => (p + d + list.length) % list.length);

  return (
    <section className="bg-bg py-16">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeading eyebrow="Patient Voices" title="What Our Patients Say" />
        <div className="rounded-2xl border border-primary/15 bg-white p-8 text-center shadow-sm">
          <p className="text-secondary" aria-hidden>
            ★★★★★
          </p>
          <p className="mt-4 text-lg italic leading-relaxed text-text">“{t.text}”</p>
          <p className="mt-4 font-semibold text-accent">{t.name}</p>
          <p className="text-sm text-muted">{t.district}</p>
        </div>
        {list.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous"
              className="h-10 w-10 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-white"
            >
              ‹
            </button>
            <div className="flex gap-2">
              {list.map((_, n) => (
                <span
                  key={n}
                  className={`h-2 w-2 rounded-full ${n === i ? "bg-secondary" : "bg-primary/25"}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next"
              className="h-10 w-10 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-white"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
