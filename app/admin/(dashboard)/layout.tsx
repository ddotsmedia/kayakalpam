import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-session";
import { readData } from "@/lib/admin-data";
import type { Submission } from "@/lib/admin-data";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();
  if (!session) redirect("/admin/login");

  const submissions = readData<Submission[]>("submissions", []);
  const unread = submissions.filter((s) => !s.read).length;

  return <AdminShell unread={unread}>{children}</AdminShell>;
}
