"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

export function ViewsLineChart({ data }: { data: { date: string; views: number }[] }) {
  return (
    <div className="h-64 w-full rounded-xl border border-gray-200 bg-[#fdf6ec] p-4">
      <p className="mb-2 text-sm font-semibold text-[#1a3a2a]">Daily Views — Last 30 Days</p>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5ddc9" />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#6b7280" }} interval={4} />
          <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="views"
            stroke="#2d6a4f"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TopPagesBar({ data }: { data: { page: string; views: number }[] }) {
  return (
    <div className="h-64 w-full rounded-xl border border-gray-200 bg-white p-4">
      <p className="mb-2 text-sm font-semibold text-[#1a3a2a]">Top Pages</p>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 10, fill: "#6b7280" }} allowDecimals={false} />
          <YAxis
            type="category"
            dataKey="page"
            width={90}
            tick={{ fontSize: 10, fill: "#6b7280" }}
          />
          <Tooltip />
          <Bar dataKey="views" fill="#C9962A" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
