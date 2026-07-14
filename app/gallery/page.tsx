import type { Metadata } from "next";
import { buildMetadata, breadcrumbLd } from "@/lib/seo-meta";
import JsonLd from "@/components/JsonLd";
import GalleryClient from "@/components/sections/GalleryClient";
import CtaBanner from "@/components/sections/CtaBanner";
import { readData } from "@/lib/data";
import { galleryFallback, type GalleryImage } from "@/lib/gallery";

export function generateMetadata(): Metadata {
  return buildMetadata("/gallery");
}

export default function GalleryPage() {
  const images = readData<GalleryImage[]>("gallery", galleryFallback);
  return (
    <>
      <JsonLd data={breadcrumbLd([["Home", "/"], ["Gallery", "/gallery"]])} />
      <section className="bg-[#1a3a2a] py-14 text-center text-white">
        <p className="font-ml text-lg text-secondary">ഗാലറി</p>
        <h1 className="mt-1 font-heading text-4xl font-bold sm:text-5xl">Gallery</h1>
        <p className="mx-auto mt-3 max-w-xl px-4 text-white/80">
          A glimpse of our clinic, in-house pharmacy, traditional medicine preparation and healing
          herbs.
        </p>
      </section>

      <section className="bg-bg py-12">
        <div className="mx-auto max-w-6xl px-4">
          <GalleryClient images={images} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
