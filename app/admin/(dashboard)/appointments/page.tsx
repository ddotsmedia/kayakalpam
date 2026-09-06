"use client";

import { useState, useEffect } from "react";
import { Appointment, BookingSettings } from "@/lib/booking";
import Link from "next/link";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<
    "all" | "pending" | "confirmed" | "cancelled"
  >("pending");
  const [settings, setSettings] = useState<BookingSettings | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/api/admin/appointments");
        const data = await res.json();
        setAppointments(data.appointments || []);
      } catch (e) {
        console.error("Error loading appointments:", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filtered = appointments.filter(
    (a) => filter === "all" || a.status === filter
  );

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    today: appointments.filter(
      (a) =>
        a.preferredDate ===
        new Date().toISOString().split("T")[0]
    ).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold">Appointments</h1>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="rounded-lg border border-secondary px-4 py-2 text-secondary hover:bg-secondary/10"
        >
          {showSettings ? "Hide" : "Booking"} Settings
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-secondary/20 bg-white p-4">
          <p className="text-sm text-muted">Total</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="rounded-lg border border-secondary/20 bg-white p-4">
          <p className="text-sm text-muted">Pending</p>
          <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="rounded-lg border border-secondary/20 bg-white p-4">
          <p className="text-sm text-muted">Today</p>
          <p className="text-3xl font-bold">{stats.today}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 border-b border-secondary/20">
        {(["all", "pending", "confirmed", "cancelled"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 font-semibold capitalize ${
              filter === f
                ? "border-b-2 border-secondary text-secondary"
                : "text-muted hover:text-text"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-secondary/20">
        <table className="w-full">
          <thead className="bg-secondary/10">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Treatment
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Time</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center">
                  Loading...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted">
                  No appointments
                </td>
              </tr>
            ) : (
              filtered.map((apt) => (
                <tr key={apt.id} className="border-t border-secondary/20">
                  <td className="px-4 py-3">{apt.name}</td>
                  <td className="px-4 py-3 text-sm">{apt.phone}</td>
                  <td className="px-4 py-3 text-sm">{apt.treatmentInterest}</td>
                  <td className="px-4 py-3 text-sm">{apt.preferredDate}</td>
                  <td className="px-4 py-3 text-sm">{apt.preferredTime}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        apt.status === "pending"
                          ? "bg-yellow-100 text-yellow-900"
                          : apt.status === "confirmed"
                            ? "bg-green-100 text-green-900"
                            : "bg-red-100 text-red-900"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {apt.waUrl && (
                      <a
                        href={apt.waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        WhatsApp
                      </a>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
