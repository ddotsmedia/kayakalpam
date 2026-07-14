export const sanitise = {
  text: (s: unknown, max = 1000): string => String(s ?? "").trim().slice(0, max),

  phone: (s: unknown): string =>
    String(s ?? "")
      .replace(/[^\d+\-() ]/g, "")
      .slice(0, 20),

  filename: (s: string): string =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, ""),

  html: (s: unknown): string => {
    const str = String(s ?? "");
    return str
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<iframe[\s\S]*?>/gi, "")
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
      .replace(/javascript:/gi, "")
      .slice(0, 50000);
  },

  slug: (s: string): string =>
    s
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 100),

  // Recursively trim + cap every string in an arbitrary JSON-safe value.
  deep: <T>(value: T, max = 5000): T => {
    if (typeof value === "string") return sanitise.text(value, max) as unknown as T;
    if (Array.isArray(value)) return value.map((v) => sanitise.deep(v, max)) as unknown as T;
    if (value && typeof value === "object") {
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(value)) out[k] = sanitise.deep(v, max);
      return out as T;
    }
    return value;
  },
};
