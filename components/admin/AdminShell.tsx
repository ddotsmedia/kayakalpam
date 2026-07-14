"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Search,
  Inbox,
  Image as ImageIcon,
  Star,
  BookOpen,
  LogOut,
  Leaf,
  Menu,
  X,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/seo", label: "SEO", icon: Search },
  { href: "/admin/submissions", label: "Submissions", icon: Inbox },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/articles", label: "Articles", icon: BookOpen },
];

export default function AdminShell({
  children,
  unread = 0,
}: {
  children: React.ReactNode;
  unread?: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const Sidebar = (
    <div className="flex h-full flex-col bg-[#1a3a2a] text-white">
      <div className="flex items-center gap-2 px-5 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
          <Leaf className="h-5 w-5 text-[#C9962A]" />
        </span>
        <div>
          <p className="font-heading text-sm font-bold leading-tight">Sree Kayakalpam</p>
          <p className="text-xs text-white/60">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-[#C9962A] text-[#1a3a2a]"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" />
              <span className="flex-1">{label}</span>
              {href === "/admin/submissions" && unread > 0 && (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-xs font-bold ${
                    active ? "bg-[#1a3a2a] text-white" : "bg-[#C9962A] text-[#1a3a2a]"
                  }`}
                >
                  {unread}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={logout}
        className="mx-3 mb-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
      >
        <LogOut className="h-[18px] w-[18px]" />
        Logout
      </button>

      <div className="border-t border-white/10 px-5 py-3 text-xs text-white/50">
        <p className="font-medium text-white/70">admin</p>
        <p>v1.0.0</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-60 lg:block">{Sidebar}</aside>

      {/* Mobile top bar */}
      <div className="flex items-center gap-3 bg-[#1a3a2a] px-4 py-3 text-white lg:hidden">
        <button onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </button>
        <span className="font-heading text-sm font-bold">Admin Panel</span>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-2 top-3 z-10 text-white"
            >
              <X className="h-6 w-6" />
            </button>
            {Sidebar}
          </div>
        </div>
      )}

      <main className="min-h-screen bg-white p-6 lg:ml-60 lg:p-8">{children}</main>
    </div>
  );
}
