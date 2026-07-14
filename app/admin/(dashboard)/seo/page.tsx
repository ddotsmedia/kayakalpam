"use client";

import { useEffect, useState } from "react";
import { PageTitle, btnPrimary, useToast, apiJson } from "@/components/admin/AdminKit";

const PAGES = [
  "/",
  "/about",
  "/treatments",
  "/conditions",
  "/books",
  "/contact",
  "/faq",
  "/gallery",
  "/blog",
  "/telemedicine",
];

type Entry = { title: string; description: string };
type SeoMap = Record<string, Entry>;

function counterColor(len: number, limit: number) {
  if (len > limit) return "text-red-600";
  if (len > limit - 15) return "text-orange-500";
  return "text-green-600";
}

export default function SeoPage() {
  const [map, setMap] = useState<SeoMap>({});
  const [savingPage, setSavingPage] = useState("");
  const { show, node } = useToast();

  useEffect(() => {
    apiJson<SeoMap>("/api/admin/seo", "GET").then(({ data }) => setMap(data || {}));
  }, []);

  const upd = (page: string, field: keyof Entry, value: string) =>
    setMap((m) => {
      const existing: Entry = m[page] ?? { title: "", description: "" };
      return { ...m, [page]: { ...existing, [field]: value } };
    });

  async function save(page: string) {
    setSavingPage(page);
    const { ok } = await apiJson("/api/admin/seo", "PATCH", {
      page,
      data: map[page] || { title: "", description: "" },
    });
    setSavingPage("");
    show(ok ? "Saved ✓" : "Failed", ok ? "ok" : "err");
  }

  return (
    <div>
      <PageTitle title="SEO Editor" subtitle="Per-page meta title & description overrides" />

      <div className="space-y-4">
        {PAGES.map((page) => {
          const e = map[page] || { title: "", description: "" };
          const tLen = (e.title || "").length;
          const dLen = (e.description || "").length;
          return (
            <div key={page} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <code className="rounded bg-gray-100 px-2 py-0.5 text-sm font-semibold text-[#2d6a4f]">
                  {page}
                </code>
                <button
                  className={btnPrimary}
                  disabled={savingPage === page}
                  onClick={() => save(page)}
                >
                  Save
                </button>
              </div>

              <label className="mb-3 block">
                <span className="mb-1 flex items-center justify-between text-sm font-medium text-gray-700">
                  Title
                  <span className={`text-xs ${counterColor(tLen, 60)}`}>{tLen}/60</span>
                </span>
                <input
                  value={e.title || ""}
                  maxLength={90}
                  onChange={(ev) => upd(page, "title", ev.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#2d6a4f] focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]"
                />
              </label>

              <label className="block">
                <span className="mb-1 flex items-center justify-between text-sm font-medium text-gray-700">
                  Description
                  <span className={`text-xs ${counterColor(dLen, 160)}`}>{dLen}/160</span>
                </span>
                <input
                  value={e.description || ""}
                  maxLength={220}
                  onChange={(ev) => upd(page, "description", ev.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#2d6a4f] focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]"
                />
              </label>
            </div>
          );
        })}
      </div>
      {node}
    </div>
  );
}
