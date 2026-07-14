"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageCircle, Trash2, Check } from "lucide-react";
import { PageTitle, btnGhost, btnDanger, useToast, apiJson } from "@/components/admin/AdminKit";

type Submission = {
  id: string;
  name: string;
  phone: string;
  email: string;
  treatmentInterest: string;
  message: string;
  createdAt: string;
  read: boolean;
  type: string;
  country?: string;
};

const FILTERS = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "contact", label: "Contact" },
  { key: "telemedicine", label: "Telemedicine" },
];

export default function SubmissionsPage() {
  const [rows, setRows] = useState<Submission[]>([]);
  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { show, node } = useToast();

  async function load() {
    const { data } = await apiJson<Submission[]>("/api/admin/submissions", "GET");
    setRows(Array.isArray(data) ? data : []);
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return rows;
    if (filter === "unread") return rows.filter((r) => !r.read);
    return rows.filter((r) => (r.type || "contact") === filter);
  }, [rows, filter]);

  const unreadCount = rows.filter((r) => !r.read).length;

  async function markRead(id: string) {
    const { ok } = await apiJson("/api/admin/submissions", "PATCH", { id });
    if (ok) {
      setRows((rs) => rs.map((r) => (r.id === id ? { ...r, read: true } : r)));
      show("Marked read ✓");
    }
  }

  async function del(id: string) {
    const { ok } = await apiJson("/api/admin/submissions", "DELETE", { id });
    if (ok) {
      setRows((rs) => rs.filter((r) => r.id !== id));
      setOpenId(null);
      show("Deleted ✓");
    }
  }

  function waHref(s: Submission) {
    const text = `Hello ${s.name}, thank you for your enquiry about ${s.treatmentInterest || "our services"} at Sree Kayakalpam Vaidyashala.`;
    return `https://wa.me/919447412319?text=${encodeURIComponent(text)}`;
  }

  return (
    <div>
      <PageTitle
        title="Submissions"
        subtitle={`${rows.length} total · ${unreadCount} unread`}
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              filter === f.key
                ? "bg-[#2d6a4f] text-white"
                : "border border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {f.label}
            {f.key === "unread" && unreadCount > 0 && (
              <span className="ml-1.5 rounded-full bg-[#C9962A] px-1.5 text-xs text-[#1a3a2a]">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-400">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-200 py-12 text-center text-sm text-gray-400">
          No submissions.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-gray-400">
                  <th className="px-4 py-3 font-medium">#</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Treatment</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <FragmentRow
                    key={s.id}
                    index={i + 1}
                    s={s}
                    open={openId === s.id}
                    onToggle={() => setOpenId(openId === s.id ? null : s.id)}
                    onMarkRead={() => markRead(s.id)}
                    onDelete={() => del(s.id)}
                    waHref={waHref(s)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {node}
    </div>
  );
}

function FragmentRow({
  index,
  s,
  open,
  onToggle,
  onMarkRead,
  onDelete,
  waHref,
}: {
  index: number;
  s: Submission;
  open: boolean;
  onToggle: () => void;
  onMarkRead: () => void;
  onDelete: () => void;
  waHref: string;
}) {
  return (
    <>
      <tr
        className={`cursor-pointer border-t border-gray-100 hover:bg-gray-50 ${!s.read ? "font-semibold" : ""}`}
        onClick={onToggle}
      >
        <td className="px-4 py-3 text-gray-400">{index}</td>
        <td className="px-4 py-3 text-gray-800">{s.name}</td>
        <td className="px-4 py-3 text-gray-600">{s.phone}</td>
        <td className="px-4 py-3 text-gray-600">{s.treatmentInterest || "—"}</td>
        <td className="px-4 py-3 text-gray-500">
          {new Date(s.createdAt).toLocaleDateString("en-IN")}
        </td>
        <td className="px-4 py-3">
          {s.read ? (
            <span className="text-xs text-gray-400">Read</span>
          ) : (
            <span className="rounded-full bg-[#C9962A]/20 px-2 py-0.5 text-xs font-semibold text-[#7b3f00]">
              Unread
            </span>
          )}
        </td>
        <td className="px-4 py-3 text-right text-xs text-[#2d6a4f]">
          {open ? "Hide" : "View →"}
        </td>
      </tr>
      {open && (
        <tr className="border-t border-gray-100 bg-gray-50">
          <td colSpan={7} className="px-4 py-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Detail label="Name" value={s.name} />
              <Detail label="Phone" value={s.phone} />
              <Detail label="Email" value={s.email || "—"} />
              <Detail label="Type" value={s.type || "contact"} />
              <Detail label="Treatment Interest" value={s.treatmentInterest || "—"} />
              {s.country && <Detail label="Country" value={s.country} />}
            </div>
            <div className="mt-3">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Message</p>
              <p className="mt-1 whitespace-pre-wrap text-sm text-gray-700">{s.message}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-3 py-2 text-sm font-semibold text-white hover:brightness-95"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              {!s.read && (
                <button className={btnGhost} onClick={onMarkRead}>
                  <Check className="h-4 w-4" /> Mark Read
                </button>
              )}
              <button className={btnDanger} onClick={onDelete}>
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</p>
      <p className="text-sm text-gray-700">{value}</p>
    </div>
  );
}
