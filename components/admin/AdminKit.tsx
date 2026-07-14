"use client";

import { useCallback, useState } from "react";

export const inputCls =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-[#2d6a4f] focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]";
export const labelCls = "mb-1 block text-sm font-medium text-gray-700";
export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[#2d6a4f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1f4d39] disabled:opacity-50";
export const btnGold =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[#C9962A] px-4 py-2 text-sm font-semibold text-[#1a3a2a] hover:brightness-95 disabled:opacity-50";
export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50";
export const btnDanger =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50";
export const card = "rounded-xl border border-gray-200 bg-white p-6 shadow-sm";

export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="font-heading text-2xl font-bold text-[#1a3a2a]">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
}

export function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <input
        type={type}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
    </label>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  rows = 4,
  maxLength,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  maxLength?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <textarea
        rows={rows}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
    </label>
  );
}

export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { key: string; label: string }[];
  active: string;
  onChange: (k: string) => void;
}) {
  return (
    <div className="mb-6 flex flex-wrap gap-1 border-b border-gray-200">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium ${
            active === t.key
              ? "border-[#C9962A] text-[#2d6a4f]"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

type ToastState = { text: string; kind: "ok" | "err" } | null;

export function useToast() {
  const [msg, setMsg] = useState<ToastState>(null);
  const show = useCallback((text: string, kind: "ok" | "err" = "ok") => {
    setMsg({ text, kind });
    setTimeout(() => setMsg(null), 2600);
  }, []);
  const node = msg ? (
    <div
      className={`fixed bottom-6 right-6 z-50 rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-lg ${
        msg.kind === "ok" ? "bg-[#2d6a4f]" : "bg-red-600"
      }`}
    >
      {msg.text}
    </div>
  ) : null;
  return { show, node };
}

export async function apiJson<T = unknown>(
  url: string,
  method: string,
  body?: unknown,
): Promise<{ ok: boolean; data: T }> {
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = (await res.json().catch(() => ({}))) as T;
  return { ok: res.ok, data };
}
