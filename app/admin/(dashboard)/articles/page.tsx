"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Trash2, Pencil, ArrowLeft, Tag } from "lucide-react";
import {
  PageTitle,
  Field,
  TextArea,
  btnPrimary,
  btnGhost,
  btnDanger,
  card,
  inputCls,
  labelCls,
  useToast,
  apiJson,
} from "@/components/admin/AdminKit";

type Article = {
  id: string;
  slug: string;
  titleEn: string;
  titleMl: string;
  excerpt: string;
  contentEn: string;
  contentMl: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  coverImage: string;
  readTimeMinutes: number;
};
type MediaFile = { name: string; path: string };
type Category = { id: string; label: string; labelMl: string };

type FormState = {
  id?: string;
  slug?: string;
  titleEn: string;
  titleMl: string;
  category: string;
  tags: string;
  excerpt: string;
  contentEn: string;
  contentMl: string;
  coverImage: string;
  featured: boolean;
};

const emptyForm: FormState = {
  titleEn: "",
  titleMl: "",
  category: "health-tips",
  tags: "",
  excerpt: "",
  contentEn: "",
  contentMl: "",
  coverImage: "/images/hero.jpg",
  featured: false,
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [images, setImages] = useState<MediaFile[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const { show, node } = useToast();

  async function load() {
    const { data } = await apiJson<Article[]>("/api/admin/articles", "GET");
    setArticles(Array.isArray(data) ? data : []);
  }
  useEffect(() => {
    load();
    apiJson<MediaFile[]>("/api/admin/media/list", "GET").then(({ data }) =>
      setImages(Array.isArray(data) ? data : []),
    );
    apiJson<Category[]>("/api/admin/categories", "GET").then(({ data }) =>
      setCategories(Array.isArray(data) ? data : []),
    );
  }, []);

  const categoryLabel = (value: string) =>
    categories.find((c) => c.id === value || c.label === value)?.label ?? value;

  function startNew() {
    setEditing({ ...emptyForm, category: categories[0]?.id ?? "health-tips" });
  }
  function startEdit(a: Article) {
    setEditing({
      id: a.id,
      slug: a.slug,
      titleEn: a.titleEn,
      titleMl: a.titleMl,
      category: a.category,
      tags: (a.tags || []).join(", "),
      excerpt: a.excerpt,
      contentEn: a.contentEn,
      contentMl: a.contentMl,
      coverImage: a.coverImage,
      featured: a.featured,
    });
  }

  async function save() {
    if (!editing) return;
    if (!editing.titleEn.trim()) {
      show("Title EN is required", "err");
      return;
    }
    setSaving(true);
    const method = editing.id ? "PATCH" : "POST";
    const { ok } = await apiJson("/api/admin/articles", method, editing);
    setSaving(false);
    if (ok) {
      show(editing.id ? "Updated ✓" : "Published ✓");
      setEditing(null);
      load();
    } else {
      show("Save failed", "err");
    }
  }

  async function del(id: string) {
    const { ok } = await apiJson("/api/admin/articles", "DELETE", { id });
    if (ok) {
      setArticles((a) => a.filter((x) => x.id !== id));
      show("Deleted ✓");
    }
  }

  async function toggleFeatured(a: Article) {
    const { ok } = await apiJson("/api/admin/articles", "PATCH", {
      id: a.id,
      featured: !a.featured,
    });
    if (ok) load();
  }

  if (editing) {
    return (
      <div className="max-w-3xl">
        <button className="mb-4 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700" onClick={() => setEditing(null)}>
          <ArrowLeft className="h-4 w-4" /> Back to list
        </button>
        <PageTitle title={editing.id ? "Edit Article" : "New Article"} />
        {editing.slug && (
          <p className="mb-4 text-sm text-gray-500">
            Slug: <code className="rounded bg-gray-100 px-2 py-0.5 text-[#2d6a4f]">{editing.slug}</code>
          </p>
        )}

        <div className={`${card} space-y-4`}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Title EN" value={editing.titleEn} onChange={(v) => setEditing({ ...editing, titleEn: v })} />
            <Field label="Title ML" value={editing.titleMl} onChange={(v) => setEditing({ ...editing, titleMl: v })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block">
                <span className={labelCls}>Category</span>
                <select
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  className={inputCls}
                >
                  {!categories.some((c) => c.id === editing.category || c.label === editing.category) && (
                    <option value={editing.category}>{editing.category}</option>
                  )}
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </label>
              <Link
                href="/admin/articles/categories"
                className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-[#2d6a4f] hover:underline"
              >
                <Tag className="h-3 w-3" /> Manage Categories →
              </Link>
            </div>
            <Field label="Tags (comma-separated)" value={editing.tags} onChange={(v) => setEditing({ ...editing, tags: v })} />
          </div>
          <TextArea label="Excerpt (max 200)" maxLength={200} value={editing.excerpt} onChange={(v) => setEditing({ ...editing, excerpt: v })} />
          <TextArea label="Content EN (HTML allowed)" rows={10} value={editing.contentEn} onChange={(v) => setEditing({ ...editing, contentEn: v })} />
          <TextArea label="Content ML (optional)" rows={6} value={editing.contentMl} onChange={(v) => setEditing({ ...editing, contentMl: v })} />

          <label className="block">
            <span className={labelCls}>Cover Image</span>
            <select
              value={editing.coverImage}
              onChange={(e) => setEditing({ ...editing, coverImage: e.target.value })}
              className={inputCls}
            >
              {images.map((im) => (
                <option key={im.path} value={im.path}>
                  {im.name}
                </option>
              ))}
              {!images.some((im) => im.path === editing.coverImage) && (
                <option value={editing.coverImage}>{editing.coverImage}</option>
              )}
            </select>
            {editing.coverImage && (
              <div className="relative mt-2 h-32 w-full max-w-xs overflow-hidden rounded-lg border border-gray-200">
                <Image src={editing.coverImage} alt="cover" fill sizes="320px" className="object-cover" />
              </div>
            )}
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={editing.featured}
              onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
              className="h-4 w-4 accent-[#2d6a4f]"
            />
            Featured article
          </label>

          <div className="flex gap-2">
            <button className={btnPrimary} disabled={saving} onClick={save}>
              {editing.id ? "Save Changes" : "Publish Article"}
            </button>
            <button className={btnGhost} onClick={() => setEditing(null)}>
              Cancel
            </button>
          </div>
        </div>
        {node}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <PageTitle title="Articles" subtitle={`${articles.length} articles`} />
        <div className="flex gap-2">
          <Link href="/admin/articles/categories" className={btnGhost}>
            <Tag className="h-4 w-4" /> Manage Categories
          </Link>
          <button className={btnPrimary} onClick={startNew}>
            <Plus className="h-4 w-4" /> New Article
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-gray-400">
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Featured</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">{a.titleEn}</td>
                  <td className="px-4 py-3 text-gray-600">{categoryLabel(a.category)}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(a.publishedAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={a.featured}
                      onChange={() => toggleFeatured(a)}
                      className="h-4 w-4 accent-[#C9962A]"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button className={btnGhost} onClick={() => startEdit(a)}>
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button className={btnDanger} onClick={() => del(a.id)}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {articles.length === 0 && (
          <p className="py-12 text-center text-sm text-gray-400">No articles yet.</p>
        )}
      </div>
      {node}
    </div>
  );
}
