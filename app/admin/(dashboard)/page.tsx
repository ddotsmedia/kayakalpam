import Link from "next/link";
import { readData, defaultAnalytics } from "@/lib/admin-data";
import type { Analytics, Submission } from "@/lib/admin-data";
import { ViewsLineChart, TopPagesBar } from "@/components/admin/DashboardCharts";
import { PageTitle } from "@/components/admin/AdminKit";
import {
  Eye,
  CalendarDays,
  Inbox,
  MailOpen,
  MessageCircle,
  BookOpen,
  Share2,
} from "lucide-react";

export const dynamic = "force-dynamic";

function last30() {
  const out: string[] = [];
  const d = new Date();
  for (let i = 29; i >= 0; i--) {
    const x = new Date(d);
    x.setDate(d.getDate() - i);
    out.push(x.toISOString().slice(0, 10));
  }
  return out;
}

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{label}</p>
        <span
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ backgroundColor: accent + "22", color: accent }}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-2 font-heading text-3xl font-bold text-[#1a3a2a]">{value}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const a = readData<Analytics>("analytics", defaultAnalytics);
  const submissions = readData<Submission[]>("submissions", []);

  const pageViews = a.pageViews || {};
  const dailyViews = a.dailyViews || {};
  const events = a.events || {};

  const totalViews = Object.values(pageViews).reduce((s, n) => s + n, 0);
  const today = new Date().toISOString().slice(0, 10);
  const todayViews = dailyViews[today] || 0;
  const unread = submissions.filter((s) => !s.read).length;

  const lineData = last30().map((d) => ({
    date: d.slice(5),
    views: dailyViews[d] || 0,
  }));

  const topPages = Object.entries(pageViews)
    .sort((x, y) => y[1] - x[1])
    .slice(0, 5)
    .map(([page, views]) => ({ page: page === "/" ? "Home" : page, views }));

  const recent = [...submissions]
    .sort((x, y) => y.createdAt.localeCompare(x.createdAt))
    .slice(0, 5);

  return (
    <div>
      <PageTitle title="Dashboard" subtitle="Overview of site activity and enquiries" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Page Views" value={totalViews} icon={Eye} accent="#2d6a4f" />
        <StatCard label="Today's Views" value={todayViews} icon={CalendarDays} accent="#C9962A" />
        <StatCard label="Total Submissions" value={submissions.length} icon={Inbox} accent="#7b3f00" />
        <StatCard label="Unread Submissions" value={unread} icon={MailOpen} accent="#c0392b" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <ViewsLineChart data={lineData} />
        <TopPagesBar data={topPages.length ? topPages : [{ page: "—", views: 0 }]} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="WhatsApp Clicks"
          value={events.whatsapp || 0}
          icon={MessageCircle}
          accent="#25D366"
        />
        <StatCard label="Book Clicks" value={events.book || 0} icon={BookOpen} accent="#2d6a4f" />
        <StatCard label="Share Clicks" value={events.share || 0} icon={Share2} accent="#C9962A" />
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="font-heading text-lg font-bold text-[#1a3a2a]">Recent Submissions</h2>
          <Link href="/admin/submissions" className="text-sm font-medium text-[#2d6a4f] hover:underline">
            View all →
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-gray-400">No submissions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-gray-400">
                  <th className="px-5 py-2 font-medium">Name</th>
                  <th className="px-5 py-2 font-medium">Treatment</th>
                  <th className="px-5 py-2 font-medium">Date</th>
                  <th className="px-5 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((s) => (
                  <tr key={s.id} className="border-t border-gray-100">
                    <td className="px-5 py-3 font-medium text-gray-800">{s.name}</td>
                    <td className="px-5 py-3 text-gray-600">{s.treatmentInterest || "—"}</td>
                    <td className="px-5 py-3 text-gray-500">
                      {new Date(s.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-5 py-3">
                      {s.read ? (
                        <span className="text-gray-400">Read</span>
                      ) : (
                        <span className="rounded-full bg-[#C9962A]/20 px-2 py-0.5 text-xs font-semibold text-[#7b3f00]">
                          Unread
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/admin/content"
          className="rounded-lg bg-[#2d6a4f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1f4d39]"
        >
          Edit Content
        </Link>
        <Link
          href="/admin/articles"
          className="rounded-lg bg-[#C9962A] px-4 py-2 text-sm font-semibold text-[#1a3a2a] hover:brightness-95"
        >
          Add Article
        </Link>
        <Link
          href="/admin/submissions"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          View Submissions
        </Link>
      </div>
    </div>
  );
}
