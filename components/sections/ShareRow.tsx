"use client";

import { useState } from "react";

export default function ShareRow({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-semibold text-accent">Share:</span>
      <a
        href={`https://wa.me/?text=${enc(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-[#25D366] px-4 py-1.5 text-sm font-semibold text-white"
      >
        WhatsApp
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-[#1877F2] px-4 py-1.5 text-sm font-semibold text-white"
      >
        Facebook
      </a>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard?.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="rounded-full border border-primary/30 px-4 py-1.5 text-sm font-semibold text-primary hover:bg-primary/5"
      >
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
}
