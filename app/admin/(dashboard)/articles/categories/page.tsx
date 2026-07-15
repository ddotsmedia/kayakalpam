"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, Pencil, ArrowLeft } from "lucide-react";
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

type Category = { id: string; label: string; labelMl: string; description?: string; createdAt: string };
type Article = { id: string; category: string };

type FormState = { id?: string; label: string; labelMl: string; description: string };

export default function CategoriesPage() {
  const [cats, setCats] = useState<Category[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [editing, setEditing] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const { show, node } = useToast();

  async function load() {
    const { data } = await apiJson<Category[]>("/api/admin/categories", "GET");
    setCats(Array.isArray(data) ? data : []);
  }
  useEffect(() => {
    load();
    apiJson<Article[]>("/api/admin/articles", "GET").then(({ data }) =>
      setArticles(Array.isArray(data) ? data : []),
    );
  }, []);

  function countFor(c: Category) {
    return articles.filter((a) => a.category === c.id || a.category === c.label).length;
  }

  async function save() {
    if (!editing) return;
    if (!editing.label.trim() || editing.label.trim().length < 2) {
      show("Label EN is required (min 2 chars)", "err");
      return;
    }
    setSaving(true);
    const method = editing.id ? "PATCH" : "POST";
    const { ok, data } = await apiJson<{ error?: string }>(
      "/api/admin/categories",
      method,
      editing,
    );
    setSaving(false);
    if (ok) {
      show(editing.id ? "Updated ✓" : "Created ✓");
      setEditing(null);
      load();
    } else {
      show(data?.error || "Save failed", "err");
    }
  }

  async function del(c: Category) {
    if (!confirm(`Delete "${c.label}"? This cannot be undone.`)) return;
    const { ok, data } = await apiJson<{ error?: string }>("/api/admin/categories", "DELETE", {
      id: c.id,
    });
    if (ok) {
      setCats((xs) => xs.filter((x) => x.id !== c.id));
      show("Deleted ✓");
    } else {
      show(data?.error || "Cannot delete", "err");
    }
  }

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/articles"
        className="mb-4 flex w-fit items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Articles
      </Link>

      <div className="flex items-center justify-between">
        <PageTitle title="Article Categories" subtitle={`${cats.length} categories`} />
        <button
          className="inline-flex items-center gap-2 rounded-lg bg-[#C9962A] px-4 py-2 text-sm font-semibold text-[#1a3a2a] hover:brightness-95"
          onClick={() => setEditing({ label: "", labelMl: "", description: "" })}
        >
          <Plus className="h-4 w-4" /> New Category
        </button>
      </div>

      {editing && (
        <div className={`${card} mb-6 space-y-3`}>
          <p className="font-heading font-bold text-[#1a3a2a]">
            {editing.id ? "Edit Category" : "New Category"}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Label EN *" value={editing.label} maxLength={40} onChange={(v) => setEditing({ ...editing, label: v })} />
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Label ML</span>
              <input
                value={editing.labelMl}
                maxLength={60}
                onChange={(e) => setEditing({ ...editing, labelMl: e.target.value })}
                className="font-ml w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#2d6a4f] focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]"
              />
            </label>
          </div>
          <TextArea
            label="Description (optional)"
            maxLength={200}
            value={editing.description}
            onChange={(v) => setEditing({ ...editing, description: v })}
          />
          {editing.id && (
            <p className="text-xs text-gray-400">
              Category ID <code className="rounded bg-gray-100 px-1">{editing.id}</code> cannot be
              changed (articles reference it).
            </p>
          )}
          <div className="flex gap-2">
            <button className={btnPrimary} disabled={saving} onClick={save}>
              {editing.id ? "Save Changes" : "Create Category"}
            </button>
            <button className={btnGhost} onClick={() => setEditing(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-gray-400">
                <th className="px-4 py-3 font-medium">Name (EN)</th>
                <th className="px-4 py-3 font-medium">Name (ML)</th>
                <th className="px-4 py-3 font-medium">Articles</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {cats.map((c) => {
                const count = countFor(c);
                return (
                  <tr key={c.id} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-800">{c.label}</td>
                    <td className="font-ml px-4 py-3 text-gray-600">{c.labelMl || "—"}</td>
                    <td className="px-4 py-3 text-gray-500">{count}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          className={btnGhost}
                          onClick={() =>
                            setEditing({
                              id: c.id,
                              label: c.label,
                              labelMl: c.labelMl,
                              description: c.description || "",
                            })
                          }
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          className={btnDanger}
                          disabled={count > 0}
                          title={count > 0 ? `Used by ${count} article(s) — reassign them first` : "Delete"}
                          onClick={() => del(c)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {cats.length === 0 && (
          <p className="py-12 text-center text-sm text-gray-400">No categories yet.</p>
        )}
      </div>
      {node}
    </div>
  );
}
