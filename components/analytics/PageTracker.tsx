"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    const controller = new AbortController();
    fetch("/api/admin/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: pathname }),
      signal: controller.signal,
      keepalive: true,
    }).catch(() => {});
    return () => controller.abort();
  }, [pathname]);

  return null;
}
