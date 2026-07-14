"use client";

import { useEffect, useState } from "react";
import { Trash2, Plus } from "lucide-react";
import {
  PageTitle,
  Tabs,
  Field,
  TextArea,
  btnPrimary,
  btnGhost,
  btnDanger,
  card,
  useToast,
  apiJson,
} from "@/components/admin/AdminKit";

type Treatment = {
  id: string;
  nameEn: string;
  nameMl: string;
  description: string;
  benefits: string;
  duration: string;
};
type Faq = { id: string; question: string; answer: string };
type Book = { titleMl: string; titleEn: string; author: string; description: string };
type Content = {
  hero: Record<string, string>;
  about: Record<string, string>;
  treatments: Treatment[];
  faq: Faq[];
  books: Book[];
};

const TABS = [
  { key: "hero", label: "Hero" },
  { key: "about", label: "About" },
  { key: "treatments", label: "Treatments" },
  { key: "faq", label: "FAQ" },
  { key: "books", label: "Books" },
];

const rid = () => Math.random().toString(36).slice(2, 9);

export default function ContentPage() {
  const [tab, setTab] = useState("hero");
  const [c, setC] = useState<Content | null>(null);
  const [saving, setSaving] = useState(false);
  const { show, node } = useToast();

  useEffect(() => {
    apiJson<Content>("/api/admin/content", "GET").then(({ data }) => {
      setC({
        hero: data.hero || {},
        about: data.about || {},
        treatments: data.treatments || [],
        faq: data.faq || [],
        books:
          data.books && data.books.length
            ? data.books
            : [emptyBook(), emptyBook()],
      });
    });
  }, []);

  async function save(section: string, data: unknown) {
    setSaving(true);
    const { ok } = await apiJson("/api/admin/content", "PATCH", { section, data });
    setSaving(false);
    show(ok ? "Saved ✓" : "Failed to save", ok ? "ok" : "err");
  }

  if (!c) return <p className="text-gray-400">Loading…</p>;

  const setHero = (k: string, v: string) => setC({ ...c, hero: { ...c.hero, [k]: v } });
  const setAbout = (k: string, v: string) => setC({ ...c, about: { ...c.about, [k]: v } });

  return (
    <div>
      <PageTitle title="Content Editor" subtitle="Edit site content sections" />
      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === "hero" && (
        <div className={`${card} max-w-2xl space-y-4`}>
          <Field label="Title (Malayalam)" value={c.hero.titleMl || ""} onChange={(v) => setHero("titleMl", v)} />
          <Field label="Title (English)" value={c.hero.titleEn || ""} onChange={(v) => setHero("titleEn", v)} />
          <Field label="Subtitle" value={c.hero.subtitle || ""} onChange={(v) => setHero("subtitle", v)} />
          <Field label="Subtitle (Malayalam)" value={c.hero.subtitleMl || ""} onChange={(v) => setHero("subtitleMl", v)} />
          <button disabled={saving} className={btnPrimary} onClick={() => save("hero", c.hero)}>
            Save Hero
          </button>
        </div>
      )}

      {tab === "about" && (
        <div className={`${card} max-w-2xl space-y-4`}>
          <Field label="Vaidyar Name (Malayalam)" value={c.about.vaidyarNameMl || ""} onChange={(v) => setAbout("vaidyarNameMl", v)} />
          <Field label="Vaidyar Name (English)" value={c.about.vaidyarNameEn || ""} onChange={(v) => setAbout("vaidyarNameEn", v)} />
          <TextArea label="Bio" rows={5} value={c.about.bio || ""} onChange={(v) => setAbout("bio", v)} />
          <Field label="Established" value={c.about.established || ""} onChange={(v) => setAbout("established", v)} />
          <Field label="Hours" value={c.about.hours || ""} onChange={(v) => setAbout("hours", v)} />
          <Field label="Address" value={c.about.address || ""} onChange={(v) => setAbout("address", v)} />
          <button disabled={saving} className={btnPrimary} onClick={() => save("about", c.about)}>
            Save About
          </button>
        </div>
      )}

      {tab === "treatments" && (
        <div className="space-y-4">
          {c.treatments.map((t, i) => (
            <div key={t.id} className={`${card} space-y-3`}>
              <div className="flex items-start justify-between gap-2">
                <div className="grid flex-1 gap-3 sm:grid-cols-2">
                  <Field label="Name (English)" value={t.nameEn} onChange={(v) => updItem("treatments", i, { nameEn: v })} />
                  <Field label="Name (Malayalam)" value={t.nameMl} onChange={(v) => updItem("treatments", i, { nameMl: v })} />
                </div>
                <button className={btnDanger} onClick={() => delItem("treatments", i)} aria-label="Delete">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <TextArea label="Description" value={t.description} onChange={(v) => updItem("treatments", i, { description: v })} />
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Benefits" value={t.benefits} onChange={(v) => updItem("treatments", i, { benefits: v })} />
                <Field label="Duration" value={t.duration} onChange={(v) => updItem("treatments", i, { duration: v })} />
              </div>
            </div>
          ))}
          <div className="flex gap-3">
            <button className={btnGhost} onClick={() => addItem("treatments", { id: rid(), nameEn: "", nameMl: "", description: "", benefits: "", duration: "" })}>
              <Plus className="h-4 w-4" /> Add Treatment
            </button>
            <button disabled={saving} className={btnPrimary} onClick={() => save("treatments", c.treatments)}>
              Save Treatments
            </button>
          </div>
        </div>
      )}

      {tab === "faq" && (
        <div className="space-y-4">
          {c.faq.map((f, i) => (
            <div key={f.id} className={`${card} space-y-3`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <Field label="Question" value={f.question} onChange={(v) => updItem("faq", i, { question: v })} />
                </div>
                <button className={btnDanger} onClick={() => delItem("faq", i)} aria-label="Delete">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <TextArea label="Answer" value={f.answer} onChange={(v) => updItem("faq", i, { answer: v })} />
            </div>
          ))}
          <div className="flex gap-3">
            <button className={btnGhost} onClick={() => addItem("faq", { id: rid(), question: "", answer: "" })}>
              <Plus className="h-4 w-4" /> Add FAQ
            </button>
            <button disabled={saving} className={btnPrimary} onClick={() => save("faq", c.faq)}>
              Save FAQ
            </button>
          </div>
        </div>
      )}

      {tab === "books" && (
        <div className="space-y-4">
          {c.books.map((b, i) => (
            <div key={i} className={`${card} space-y-3`}>
              <p className="text-sm font-semibold text-gray-500">Book {i + 1}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Title (Malayalam)" value={b.titleMl} onChange={(v) => updItem("books", i, { titleMl: v })} />
                <Field label="Title (English)" value={b.titleEn} onChange={(v) => updItem("books", i, { titleEn: v })} />
              </div>
              <Field label="Author" value={b.author} onChange={(v) => updItem("books", i, { author: v })} />
              <TextArea label="Description" value={b.description} onChange={(v) => updItem("books", i, { description: v })} />
            </div>
          ))}
          <button disabled={saving} className={btnPrimary} onClick={() => save("books", c.books)}>
            Save Books
          </button>
        </div>
      )}

      {node}
    </div>
  );

  function addItem(section: "treatments" | "faq", item: Treatment | Faq) {
    setC((prev) => (prev ? { ...prev, [section]: [...prev[section], item] } : prev));
  }
  function updItem(section: "treatments" | "faq" | "books", i: number, patch: Record<string, string>) {
    setC((prev) => {
      if (!prev) return prev;
      const arr = [...(prev[section] as Record<string, string>[])];
      arr[i] = { ...arr[i], ...patch };
      return { ...prev, [section]: arr };
    });
  }
  function delItem(section: "treatments" | "faq", i: number) {
    setC((prev) => {
      if (!prev) return prev;
      const arr = [...prev[section]];
      arr.splice(i, 1);
      return { ...prev, [section]: arr };
    });
  }
}

function emptyBook(): Book {
  return { titleMl: "", titleEn: "", author: "", description: "" };
}
