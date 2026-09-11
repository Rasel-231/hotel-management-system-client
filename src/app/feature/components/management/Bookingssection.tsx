"use client";

import { useState } from "react";
import { Plus, ChevronRight } from "lucide-react";
import { Booking, BookingStatus } from "@/types/types";
import { statusTailwind, statusLabel } from "@/lib/theme/Theme";
import { cn } from "@/lib/utils";

interface BookingsSectionProps {
  bookings: Booking[];
  onNewBooking?: () => void;
  onSelectBooking?: (booking: Booking) => void;
}

const FILTERS: Array<BookingStatus | "all"> = [
  "all",
  "confirmed",
  "checked-in",
  "pending",
  "cancelled",
];

// ── Status Badge (pure Tailwind) ──────────────────────────────────────────────
function Badge({ status }: { status: BookingStatus }) {
  const tw = statusTailwind[status] ?? {
    bg: "bg-slate-100", text: "text-slate-500", dot: "bg-slate-400",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize",
        tw.bg, tw.text,
      )}
    >
      <span className={cn("size-1.5 rounded-full", tw.dot)} />
      {statusLabel[status] ?? status}
    </span>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function BookingsSection({
  bookings,
  onNewBooking,
  onSelectBooking,
}: BookingsSectionProps) {
  // TODO: Replace with RTK Query useGetBookingsQuery({ status: filter, page, limit })
  const [filter, setFilter] = useState<BookingStatus | "all">("all");

  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  // Count per status for filter badges
  const counts = FILTERS.reduce<Record<string, number>>((acc, f) => {
    acc[f] = f === "all" ? bookings.length : bookings.filter((b) => b.status === f).length;
    return acc;
  }, {});

  return (
    <div className="space-y-5">
      {/* ── Header ──────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Bookings</h2>
          <p className="mt-1 text-sm text-slate-500">
            {bookings.length} reservations across all channels
          </p>
        </div>
        <button
          onClick={onNewBooking}
          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition-colors hover:bg-indigo-700 active:bg-indigo-800"
        >
          <Plus size={15} />
          New booking
        </button>
      </div>

      {/* ── Filter tabs ─────────────────────────────────── */}
      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((f) => {
          const isActive = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
                isActive
                  ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700",
              )}
            >
              <span className="capitalize">
                {f === "all" ? "All bookings" : statusLabel[f] ?? f}
              </span>
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                  isActive ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500",
                )}
              >
                {counts[f]}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Table ───────────────────────────────────────── */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {["Booking ID", "Guest", "Room", "Check-in", "Check-out", "Amount", "Status", ""].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((b) => (
                <tr
                  key={b.id}
                  onClick={() => onSelectBooking?.(b)}
                  className={cn(
                    "transition-colors",
                    onSelectBooking
                      ? "cursor-pointer hover:bg-indigo-50/40"
                      : "hover:bg-slate-50/60",
                  )}
                >
                  <td className="px-4 py-3 font-mono text-xs font-medium text-slate-400">{b.id}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{b.guest}</td>
                  <td className="px-4 py-3 text-slate-500">{b.room}</td>
                  <td className="px-4 py-3 text-slate-500">{b.checkIn}</td>
                  <td className="px-4 py-3 text-slate-500">{b.checkOut}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{b.amount}</td>
                  <td className="px-4 py-3">
                    <Badge status={b.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {onSelectBooking && <ChevronRight size={15} />}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-sm text-slate-400">
                    No bookings match this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
