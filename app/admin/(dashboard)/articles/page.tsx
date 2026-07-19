"use client";

import { useEffect, useState } from "react";
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

type Status = "published" | "draft";

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
  status?: Status;
};
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
  status: Status;
};

const emptyForm: FormState = {
  titleEn: "",
  titleMl: "",
  category: "health-tips",
  tags: "",
  excerpt: "",
  contentEn: "",
  contentMl: "",
  coverImage: "",
  featured: false,
  status: "published",
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const { show, node } = useToast();

  async function load() {
    const { data } = await apiJson<Article[]>("/api/admin/articles", "GET");
    setArticles(Array.isArray(data) ? data : []);
  }
  useEffect(() => {
    load();
    apiJson<Category[]>("/api/admin/categories", "GET").then(({ data }) =>
      setCategories(Array.isArray(data) ? data : []),
    );
  }, []);

  const categoryLabel = (value: string) =>
    categories.find((c) => c.id === value || c.label === value)?.label ?? value;

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    try {
      const res = await fetch("/api/admin/media/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.ok) {
        setEditing((prev) => (prev ? { ...prev, coverImage: data.path } : prev));
      } else {
        alert(data.error ?? "Upload failed");
      }
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

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
      status: a.status === "draft" ? "draft" : "published",
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
    const coverImage = editing.coverImage;
    const setCoverImage = (v: string) => setEditing((p) => (p ? { ...p, coverImage: v } : p));
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

          {/* Cover image */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "#C9962A", fontWeight: 500 }}>
              Cover Image
              <span style={{ color: "#888", fontWeight: 400, fontSize: 12, marginLeft: 6 }}>(optional)</span>
            </label>

            {coverImage && (
              <div style={{ marginTop: 8, position: "relative", display: "inline-block" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImage}
                  alt="cover preview"
                  style={{ width: 200, height: 130, objectFit: "cover", borderRadius: 8, display: "block" }}
                />
                <button
                  type="button"
                  onClick={() => setCoverImage("")}
                  style={{
                    position: "absolute", top: 4, right: 4, background: "rgba(0,0,0,0.6)", color: "#fff",
                    border: "none", borderRadius: "50%", width: 24, height: 24, cursor: "pointer",
                    fontSize: 14, lineHeight: "24px", textAlign: "center",
                  }}
                >
                  ×
                </button>
              </div>
            )}

            {!coverImage && (
              <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <label
                  style={{
                    cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "8px 14px", border: "1px solid #2D6A4F", borderRadius: 6, color: "#2D6A4F",
                    fontSize: 13, fontWeight: 500, background: "#fff",
                  }}
                >
                  <input type="file" accept="image/jpeg,image/png,image/webp" style={{ display: "none" }} onChange={handleCoverUpload} />
                  {uploading ? "Uploading..." : "↑ Upload Image"}
                </label>

                <button
                  type="button"
                  onClick={async () => {
                    if (!existingImages.length) {
                      const res = await fetch("/api/admin/media/list");
                      const data = await res.json();
                      const arr = Array.isArray(data) ? data : (data.files ?? []);
                      setExistingImages(
                        arr.map((f: { name?: string; path?: string }) => f.path ?? "/images/" + (f.name ?? "")),
                      );
                    }
                    setShowImagePicker(true);
                  }}
                  style={{
                    padding: "8px 14px", border: "1px solid #ccc", borderRadius: 6, color: "#555",
                    fontSize: 13, background: "#fff", cursor: "pointer",
                  }}
                >
                  Select from library
                </button>
              </div>
            )}

            {coverImage && (
              <div style={{ marginTop: 6, display: "flex", gap: 8 }}>
                <label style={{ cursor: "pointer", fontSize: 12, color: "#2D6A4F", textDecoration: "underline" }}>
                  <input type="file" accept="image/jpeg,image/png,image/webp" style={{ display: "none" }} onChange={handleCoverUpload} />
                  Replace image
                </label>
                <span style={{ color: "#ccc" }}>|</span>
                <button
                  type="button"
                  onClick={() => setCoverImage("")}
                  style={{ fontSize: 12, color: "#888", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                >
                  Remove
                </button>
              </div>
            )}

            <p style={{ fontSize: 11, color: "#aaa", marginTop: 6 }}>
              JPG, PNG or WebP · Max 5MB · Leave empty for no cover image
            </p>
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={editing.featured}
              onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
              className="h-4 w-4 accent-[#2d6a4f]"
            />
            Featured article
            <span className="text-xs text-gray-400">(only one article can be featured)</span>
          </label>

          {/* Status */}
          <div>
            <span className={labelCls}>Status</span>
            <div className="flex flex-wrap gap-4">
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="status"
                  checked={editing.status !== "draft"}
                  onChange={() => setEditing({ ...editing, status: "published" })}
                  className="h-4 w-4 accent-[#2d6a4f]"
                />
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-gray-700">Published — visible on site</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="status"
                  checked={editing.status === "draft"}
                  onChange={() => setEditing({ ...editing, status: "draft" })}
                  className="h-4 w-4 accent-gray-500"
                />
                <span className="h-2 w-2 rounded-full bg-gray-400" />
                <span className="text-gray-700">Draft — not visible on site</span>
              </label>
            </div>
          </div>

          <div className="flex gap-2">
            <button className={btnPrimary} disabled={saving} onClick={save}>
              {editing.id ? "Save Changes" : "Publish Article"}
            </button>
            <button className={btnGhost} onClick={() => setEditing(null)}>
              Cancel
            </button>
          </div>
        </div>

        {/* Image picker modal */}
        {showImagePicker && (
          <div
            style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={() => setShowImagePicker(false)}
          >
            <div
              style={{ background: "#fff", borderRadius: 12, padding: 24, maxWidth: 600, width: "90%", maxHeight: "80vh", overflow: "auto" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ margin: 0 }}>Select Cover Image</h3>
                <button type="button" onClick={() => setShowImagePicker(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>
                  ×
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                {existingImages.map((img) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={img}
                    src={img}
                    alt={img.split("/").pop()}
                    onClick={() => {
                      setCoverImage(img);
                      setShowImagePicker(false);
                    }}
                    style={{ width: "100%", height: 90, objectFit: "cover", borderRadius: 6, cursor: "pointer", border: "2px solid transparent" }}
                    onMouseOver={(e) => (e.currentTarget.style.border = "2px solid #C9962A")}
                    onMouseOut={(e) => (e.currentTarget.style.border = "2px solid transparent")}
                  />
                ))}
              </div>
              {!existingImages.length && (
                <p style={{ color: "#888", textAlign: "center" }}>No images in library yet. Upload one above.</p>
              )}
            </div>
          </div>
        )}
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
                <th className="px-4 py-3 font-medium">Status</th>
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
                  <td className="px-4 py-3">
                    {a.status === "draft" ? (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
                        Draft
                      </span>
                    ) : (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                        Live
                      </span>
                    )}
                  </td>
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
