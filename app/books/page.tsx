import type { Metadata } from "next";
import { buildMetadata, breadcrumbLd } from "@/lib/seo-meta";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/layout/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import BookCard from "@/components/ui/BookCard";
import CtaBanner from "@/components/sections/CtaBanner";
import { books } from "@/lib/books";

export function generateMetadata(): Metadata {
  return buildMetadata("/books");
}

export default function BooksPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([["Home", "/"], ["Books", "/books"]])} />
      <PageHeader
        image="/images/book-visha.jpg"
        alt="Cover of Visha Chikitsa Agadam Amrutham"
        title="Published Works"
        titleMl="ഗ്രന്ഥങ്ങൾ"
        subtitle="Malayalam Ayurveda books authored by Vaidyar Shine Bhaskar."
      />

      <section className="bg-bg py-16">
        <div className="mx-auto max-w-4xl px-4">
          <SectionHeading
            eyebrow="By Vaidyar Shine Bhaskar"
            title="Preserving Traditional Knowledge"
            titleMl="പാരമ്പര്യ അറിവ് സംരക്ഷിക്കുന്നു"
          />
          <div className="space-y-8">
            {books.map((b) => (
              <BookCard key={b.title} book={b} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
