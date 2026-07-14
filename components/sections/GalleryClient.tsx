"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { galleryCategories, type GalleryImage } from "@/lib/gallery";

export default function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const [touchX, setTouchX] = useState<number | null>(null);

  const shown = cat === "All" ? images : images.filter((i) => i.category === cat);

  const move = useCallback(
    (d: number) => setOpen((p) => (p === null ? p : (p + d + shown.length) % shown.length)),
    [shown.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, move]);

  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {galleryCategories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              cat === c ? "bg-primary text-white" : "bg-white text-primary border border-primary/20 hover:bg-primary/5"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="columns-2 gap-4 md:columns-3">
        {shown.map((img, i) => (
          <button
            key={img.src + i}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-lg"
          >
            <Image
              src={img.src}
              alt={img.captionEn}
              width={600}
              height={800}
              sizes="(max-width:768px) 50vw, 33vw"
              className="h-auto w-full transition-transform duration-300 group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-0 rounded-lg ring-2 ring-secondary/0 transition group-hover:ring-secondary" />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 to-transparent p-3 text-left text-white transition-transform duration-300 group-hover:translate-y-0">
              <span className="block text-sm font-semibold">{img.captionEn}</span>
              <span className="font-ml block text-xs text-secondary">{img.captionMl}</span>
            </span>
          </button>
        ))}
      </div>

      {open !== null && shown[open] && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/90 p-4"
          onClick={() => setOpen(null)}
          onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX === null) return;
            const dx = e.changedTouches[0].clientX - touchX;
            if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1);
            setTouchX(null);
          }}
        >
          <button type="button" aria-label="Close" className="absolute right-5 top-5 text-3xl text-white/80 hover:text-white">
            ✕
          </button>
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); move(-1); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-4xl text-white/70 hover:text-white"
          >
            ‹
          </button>
          <div className="relative max-h-[80vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={shown[open].src}
              alt={shown[open].captionEn}
              width={1200}
              height={1600}
              className="mx-auto h-auto max-h-[80vh] w-auto object-contain"
            />
          </div>
          <div className="mt-4 text-center text-white" onClick={(e) => e.stopPropagation()}>
            <p className="font-semibold">{shown[open].captionEn}</p>
            <p className="font-ml text-sm text-secondary">{shown[open].captionMl}</p>
          </div>
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => { e.stopPropagation(); move(1); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-4xl text-white/70 hover:text-white"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
