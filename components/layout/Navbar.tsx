"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { nav, navGroups, site, waLink } from "@/lib/site";

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-secondary" aria-hidden>
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3C8.18 18.94 11 18 14 18c8 0 8-10 8-13-1 1-3 1.5-5 2-1.83.46-3.3 1.2-4.6 2.06C9.86 10.13 8.6 11.7 8 14c1.07-1.5 2.5-3 5-4z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 bg-[#1a3a2a] transition-shadow ${
        scrolled ? "shadow-md backdrop-blur supports-[backdrop-filter]:bg-[#1a3a2a]/95" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 leading-tight">
          <LeafIcon />
          <span className="flex flex-col">
            <span className="font-heading text-lg font-bold text-white">Sree Kayakalpam</span>
            <span className="font-ml text-xs text-secondary">{site.nameMl}</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-5 lg:flex">
          {navGroups.map((g) =>
            g.children ? (
              <li key={g.label} className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-white/75 transition-colors hover:text-secondary"
                >
                  {g.label} <span className="text-[10px]">▼</span>
                </button>
                <ul className="invisible absolute left-0 top-full z-50 min-w-44 rounded-xl border border-white/10 bg-[#1a3a2a] p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
                  {g.children.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        className={`block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/10 hover:text-secondary ${
                          pathname === c.href ? "text-secondary" : "text-white/80"
                        }`}
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={g.href}>
                <Link
                  href={g.href!}
                  className={`text-sm font-medium transition-colors hover:text-secondary ${
                    pathname === g.href ? "text-secondary" : "text-white/75"
                  }`}
                >
                  {g.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phoneRaw}`}
            className="hidden items-center gap-1.5 text-[12px] text-white/75 transition-colors hover:text-secondary md:flex"
          >
            <Phone size={13} className="shrink-0" aria-hidden /> {site.phone}
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-[#C9962A] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent sm:inline-block"
          >
            Book Consultation
          </a>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="text-2xl text-white lg:hidden"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-[#1a3a2a] lg:hidden">
          <ul className="flex flex-col px-4 py-3">
            {nav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block py-2 text-sm font-medium text-white/80 hover:text-secondary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 border-t border-white/10 px-4 py-3">
            <a href={`tel:${site.phoneRaw}`} className="flex items-center gap-1.5 text-sm font-semibold text-secondary">
              <Phone size={14} className="shrink-0" aria-hidden /> {site.phone}
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#C9962A] px-5 py-2 text-center text-sm font-semibold text-white"
            >
              Book Consultation on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
