"use client";

import { useState } from "react";

export type AccordionItem = { q: string; a: string };

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-primary/15 rounded-2xl border border-primary/15 bg-white shadow-sm">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-semibold text-accent">{item.q}</span>
              <span
                className={`shrink-0 text-secondary transition-transform ${isOpen ? "rotate-45" : ""}`}
                aria-hidden
              >
                ＋
              </span>
            </button>
            {isOpen && <p className="px-5 pb-5 text-muted leading-relaxed">{item.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
