"use client";

import { useEffect, useState } from "react";
import { Trash2, Plus, Star } from "lucide-react";
import {
  PageTitle,
  Field,
  TextArea,
  btnPrimary,
  btnGhost,
  btnDanger,
  card,
  useToast,
  apiJson,
} from "@/components/admin/AdminKit";

type Testimonial = {
  id: string;
  name: string;
  district: string;
  text: string;
  rating: number;
  active: boolean;
  createdAt: string;
};

function Stars({ value, onChange }: { value: number; onChange?: (n: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange?.(n)}
          className={onChange ? "cursor-pointer" : "cursor-default"}
        >
          <Star
            className={`h-5 w-5 ${n <= value ? "fill-[#C9962A] text-[#C9962A]" : "text-gray-300"}`}
          />
        </button>
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", district: "", rating: 5, text: "" });
  const { show, node } = useToast();

  async function load() {
    const { data } = await apiJson<Testimonial[]>("/api/admin/testimonials", "GET");
    setItems(Array.isArray(data) ? data : []);
  }
  useEffect(() => {
    load();
  }, []);

  async function add() {
    if (!form.name || !form.text) {
      show("Name and text required", "err");
      return;
    }
    const { ok } = await apiJson("/api/admin/testimonials", "POST", form);
    if (ok) {
      setAdding(false);
      setForm({ name: "", district: "", rating: 5, text: "" });
      show("Added ✓");
      load();
    }
  }

  async function toggleActive(t: Testimonial) {
    const { ok } = await apiJson("/api/admin/testimonials", "PATCH", {
      id: t.id,
      active: !t.active,
    });
    if (ok) {
      setItems((its) => its.map((x) => (x.id === t.id ? { ...x, active: !x.active } : x)));
    }
  }

  async function del(id: string) {
    const { ok } = await apiJson("/api/admin/testimonials", "DELETE", { id });
    if (ok) {
      setItems((its) => its.filter((x) => x.id !== id));
      show("Deleted ✓");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <PageTitle title="Testimonials" subtitle="Manage patient reviews shown on the site" />
        <button className={btnPrimary} onClick={() => setAdding((v) => !v)}>
          <Plus className="h-4 w-4" /> Add Testimonial
        </button>
      </div>

      {adding && (
        <div className={`${card} mb-6 max-w-xl space-y-3`}>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Field label="District" value={form.district} onChange={(v) => setForm({ ...form, district: v })} />
          </div>
          <div>
            <span className="mb-1 block text-sm font-medium text-gray-700">Rating</span>
            <Stars value={form.rating} onChange={(n) => setForm({ ...form, rating: n })} />
          </div>
          <TextArea label="Testimonial" value={form.text} onChange={(v) => setForm({ ...form, text: v })} />
          <div className="flex gap-2">
            <button className={btnPrimary} onClick={add}>
              Save
            </button>
            <button className={btnGhost} onClick={() => setAdding(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <div key={t.id} className={`${card} flex flex-col`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-gray-800">{t.name}</p>
                <p className="text-xs text-gray-500">{t.district}</p>
              </div>
              <Stars value={t.rating} />
            </div>
            <p className="mt-3 flex-1 text-sm italic text-gray-600">“{t.text}”</p>
            <div className="mt-4 flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={t.active}
                  onChange={() => toggleActive(t)}
                  className="h-4 w-4 accent-[#2d6a4f]"
                />
                <span className={t.active ? "text-[#2d6a4f]" : "text-gray-400"}>
                  {t.active ? "Active" : "Hidden"}
                </span>
              </label>
              <button className={btnDanger} onClick={() => del(t.id)}>
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && !adding && (
        <p className="py-12 text-center text-sm text-gray-400">
          No testimonials yet. The public site shows built-in placeholder reviews until you add some.
        </p>
      )}
      {node}
    </div>
  );
}
