import Link from "next/link";
import Icon from "@/components/ui/Icon";
import type { Treatment } from "@/lib/treatments";

export default function TreatmentCard({ t }: { t: Treatment }) {
  const dark = t.highlight;
  return (
    <Link
      href={`/treatments#${t.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md ${
        dark ? "border-secondary bg-[#1a3a2a]" : "border-gray-200 bg-gray-50"
      }`}
    >
      {dark && (
        <span className="absolute right-4 top-4 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-bold tracking-wide text-white">
          RARE
        </span>
      )}
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${
          dark ? "bg-secondary text-white" : "bg-primary text-white"
        }`}
        aria-hidden
      >
        <Icon name={t.icon} size={22} />
      </span>
      <h3 className={`mt-3 font-heading text-[15px] font-medium ${dark ? "text-white" : "text-[#1a3a2a]"}`}>
        {t.name}
      </h3>
      <p className={`font-ml ${dark ? "text-secondary" : "text-primary"}`}>{t.nameMl}</p>
      <p className={`mt-2 flex-1 text-[13px] leading-relaxed ${dark ? "text-white/70" : "text-[#6b7280]"}`}>
        {t.short}
      </p>
      <span
        className={`mt-4 text-sm font-semibold ${
          dark ? "text-secondary group-hover:text-white" : "text-secondary group-hover:text-accent"
        }`}
      >
        Learn more →
      </span>
    </Link>
  );
}
