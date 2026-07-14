import Image from "next/image";
import Button from "@/components/ui/Button";
import { waLink } from "@/lib/site";
import type { Book } from "@/lib/books";

export default function BookCard({ book, light = false }: { book: Book; light?: boolean }) {
  return (
    <div
      className={`flex flex-col gap-5 rounded-2xl p-6 sm:flex-row ${
        light ? "bg-white/5" : "bg-white shadow-sm"
      }`}
    >
      <div className="relative mx-auto h-64 w-44 shrink-0 overflow-hidden rounded-lg shadow-md">
        <Image src={book.image} alt={book.title} fill sizes="176px" className="object-cover" />
      </div>
      <div className="flex flex-col">
        <h3 className={`font-ml text-xl font-bold ${light ? "text-secondary" : "text-accent"}`}>
          {book.titleMl}
        </h3>
        {book.subtitleMl && (
          <p className={`font-ml text-sm ${light ? "text-white/70" : "text-primary"}`}>
            {book.subtitleMl}
          </p>
        )}
        <p className={`mt-1 text-sm font-semibold ${light ? "text-white/90" : "text-text"}`}>
          {book.title}
        </p>
        <p className={`mt-3 flex-1 text-sm leading-relaxed ${light ? "text-white/70" : "text-muted"}`}>
          {book.description}
        </p>
        <div className="mt-4">
          <Button
            href={waLink(`I'd like to enquire about the book "${book.titleMl}"`)}
            external
            variant="gold"
          >
            Enquire on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
