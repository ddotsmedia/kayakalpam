"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Upload, Trash2, Plus, RefreshCw } from "lucide-react";
import {
  PageTitle,
  Tabs,
  Field,
  btnPrimary,
  btnGhost,
  btnDanger,
  card,
  inputCls,
  labelCls,
  useToast,
  apiJson,
} from "@/components/admin/AdminKit";

type MediaFile = { name: string; size: number; path: string };
type GalleryImage = { src: string; category: string; captionEn: string; captionMl: string };

const CATEGORIES = ["Clinic", "Medicines", "Treatments", "Vaidyar"];

function kb(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.round(bytes / 1024)} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function MediaPage() {
  const [tab, setTab] = useState("files");
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [busy, setBusy] = useState(false);
  const uploadRef = useRef<HTMLInputElement>(null);
  const replaceRef = useRef<HTMLInputElement>(null);
  const [replaceName, setReplaceName] = useState<string | null>(null);
  const { show, node } = useToast();

  async function loadFiles() {
    const { data } = await apiJson<MediaFile[]>("/api/admin/media/list", "GET");
    setFiles(Array.isArray(data) ? data : []);
  }
  async function loadGallery() {
    const { data } = await apiJson<GalleryImage[]>("/api/admin/gallery", "GET");
    setGallery(Array.isArray(data) ? data : []);
  }
  useEffect(() => {
    loadFiles();
    loadGallery();
  }, []);

  async function upload(file: File, filename: string, replace: boolean) {
    setBusy(true);
    const fd = new FormData();
    fd.append("file", file);
    if (filename) fd.append("filename", filename);
    if (replace) fd.append("replace", "true");
    const res = await fetch("/api/admin/media/upload", { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (res.ok) {
      show("Uploaded ✓");
      loadFiles();
    } else {
      show(data.error || "Upload failed", "err");
    }
  }

  function onUploadNew(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) upload(f, f.name, false);
    e.target.value = "";
  }

  function onReplacePick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f && replaceName) upload(f, replaceName, true);
    e.target.value = "";
    setReplaceName(null);
  }

  // ---- gallery helpers ----
  async function saveGallery(next: GalleryImage[]) {
    setGallery(next);
    const { ok } = await apiJson("/api/admin/gallery", "PUT", next);
    show(ok ? "Gallery saved ✓" : "Failed", ok ? "ok" : "err");
  }
  function updGallery(i: number, patch: Partial<GalleryImage>) {
    setGallery((g) => g.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  }
  function removeGallery(i: number) {
    saveGallery(gallery.filter((_, idx) => idx !== i));
  }
  function addToGallery(src: string) {
    if (gallery.some((g) => g.src === src)) {
      show("Already in gallery", "err");
      return;
    }
    saveGallery([...gallery, { src, category: "Clinic", captionEn: "", captionMl: "" }]);
  }

  return (
    <div>
      <PageTitle title="Media Manager" subtitle="Images and gallery" />
      <Tabs
        tabs={[
          { key: "files", label: "Files" },
          { key: "gallery", label: "Gallery" },
        ]}
        active={tab}
        onChange={setTab}
      />

      {tab === "files" && (
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <button className={btnPrimary} disabled={busy} onClick={() => uploadRef.current?.click()}>
              <Upload className="h-4 w-4" /> Upload New
            </button>
            <button className={btnGhost} onClick={loadFiles}>
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
            <input ref={uploadRef} type="file" accept=".jpg,.jpeg,.png,.webp" hidden onChange={onUploadNew} />
            <input ref={replaceRef} type="file" accept=".jpg,.jpeg,.png,.webp" hidden onChange={onReplacePick} />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {files.map((f) => (
              <div key={f.name} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="relative aspect-square bg-gray-50">
                  <Image src={f.path} alt={f.name} fill sizes="200px" className="object-cover" />
                </div>
                <div className="p-2">
                  <p className="truncate text-xs font-medium text-gray-700" title={f.name}>
                    {f.name}
                  </p>
                  <p className="text-xs text-gray-400">{kb(f.size)}</p>
                  <button
                    className="mt-1 w-full rounded border border-gray-300 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"
                    onClick={() => {
                      setReplaceName(f.name);
                      replaceRef.current?.click();
                    }}
                  >
                    Replace
                  </button>
                </div>
              </div>
            ))}
          </div>
          {files.length === 0 && (
            <p className="py-12 text-center text-sm text-gray-400">No images yet.</p>
          )}
        </div>
      )}

      {tab === "gallery" && (
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-500">In Gallery ({gallery.length})</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((g, i) => (
                <div key={g.src + i} className={`${card} space-y-2`}>
                  <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-50">
                    <Image src={g.src} alt={g.captionEn} fill sizes="300px" className="object-cover" />
                  </div>
                  <Field label="Caption (English)" value={g.captionEn} onChange={(v) => updGallery(i, { captionEn: v })} />
                  <Field label="Caption (Malayalam)" value={g.captionMl} onChange={(v) => updGallery(i, { captionMl: v })} />
                  <label className="block">
                    <span className={labelCls}>Category</span>
                    <select
                      value={g.category}
                      onChange={(e) => updGallery(i, { category: e.target.value })}
                      className={inputCls}
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                  <div className="flex gap-2">
                    <button className={btnPrimary} onClick={() => saveGallery(gallery)}>
                      Save
                    </button>
                    <button className={btnDanger} onClick={() => removeGallery(i)}>
                      <Trash2 className="h-4 w-4" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-500">Add from Images</h3>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {files.map((f) => (
                <button
                  key={f.name}
                  onClick={() => addToGallery(f.path)}
                  className="group relative overflow-hidden rounded-lg border border-gray-200"
                >
                  <div className="relative aspect-square bg-gray-50">
                    <Image src={f.path} alt={f.name} fill sizes="120px" className="object-cover" />
                  </div>
                  <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                    <Plus className="h-6 w-6 text-white" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {node}
    </div>
  );
}
