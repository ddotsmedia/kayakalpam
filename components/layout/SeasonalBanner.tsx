"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSeasonCampaign } from "@/lib/season";

const KEY = "skv-banner-dismissed";

export default function SeasonalBanner() {
  const [show, setShow] = useState(false);
  const [campaign, setCampaign] = useState({ message: "", cta: "", href: "/contact" });

  useEffect(() => {
    setCampaign(getSeasonCampaign());
    if (localStorage.getItem(KEY) !== "1") setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="bg-accent text-white text-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2">
        <div className="flex flex-1 flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
          <span className="text-xs sm:text-sm">{campaign.message}</span>
          <Link
            href={campaign.href || "/contact"}
            className="rounded-full bg-secondary px-3 py-0.5 text-xs font-semibold hover:bg-white hover:text-accent"
          >
            {campaign.cta}
          </Link>
        </div>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => {
            localStorage.setItem(KEY, "1");
            setShow(false);
          }}
          className="ml-auto shrink-0 text-white/80 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
