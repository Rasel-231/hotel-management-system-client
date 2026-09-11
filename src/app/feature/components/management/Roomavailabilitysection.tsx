"use client";

import { useMemo, useState } from "react";
import { CalendarRange, Search } from "lucide-react";
import { RoomAvailabilityItem, RoomAvailabilityStatus } from "@/types/types";
import { statusLabel } from "@/lib/theme/Theme";
import { cn } from "@/lib/utils";

interface RoomAvailabilitySectionProps {
  rooms: RoomAvailabilityItem[];
  onCheckDates?: (checkIn: string, checkOut: string) => void;
}

const STATUS_FILTERS: Array<RoomAvailabilityStatus | "all"> = [
  "all",
  "available",
  "occupied",
  "reserved",
  "maintenance",
];

// ── Status badge (Tailwind) ───────────────────────────────────────────────────
const STATUS_STYLE: Record<
  RoomAvailabilityStatus,
  { bg: string; text: string; dot: string; border: string }
> = {
  available:   { bg: "bg-emerald-50",  text: "text-emerald-700", dot: "bg-emerald-500",  border: "border-emerald-200" },
  occupied:    { bg: "bg-indigo-50",   text: "text-indigo-700",  dot: "bg-indigo-500",   border: "border-indigo-200"  },
  reserved:    { bg: "bg-amber-50",    text: "text-amber-700",   dot: "bg-amber-500",    border: "border-amber-200"   },
  maintenance: { bg: "bg-red-50",      text: "text-red-700",     dot: "bg-red-500",      border: "border-red-200"     },
};

// Card left-border accent by status
const CARD_ACCENT: Record<RoomAvailabilityStatus, string> = {
  available:   "border-l-emerald-400",
  occupied:    "border-l-indigo-400",
  reserved:    "border-l-amber-400",
  maintenance: "border-l-red-400",
};

// Summary card color
const SUMMARY_STYLE = {
  available:   { num: "text-emerald-600", bg: "bg-emerald-50",  border: "border-emerald-200" },
  occupied:    { num: "text-indigo-600",  bg: "bg-indigo-50",   border: "border-indigo-200"  },
  reserved:    { num: "text-amber-600",   bg: "bg-amber-50",    border: "border-amber-200"   },
  maintenance: { num: "text-red-600",     bg: "bg-red-50",      border: "border-red-200"     },
};

function StatusDot({ status }: { status: RoomAvailabilityStatus }) {
  const s = STATUS_STYLE[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold", s.bg, s.text)}>
      <span className={cn("size-1.5 rounded-full", s.dot)} />
      {statusLabel[status]}
    </span>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function RoomAvailabilitySection({
  rooms,
  onCheckDates,
}: RoomAvailabilitySectionProps) {
  const [checkIn, setCheckIn]   = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [statusFilter, setStatusFilter] = useState<RoomAvailabilityStatus | "all">("all");
  const [typeFilter, setTypeFilter]     = useState<string>("all");

  // TODO: Replace with RTK Query useCheckRoomAvailabilityQuery({ checkIn, checkOut }) when dates are selected
  // TODO: Replace with RTK Query useGetRoomInventoryQuery() for the full room list

  const roomTypes = useMemo(
    () => ["all", ...Array.from(new Set(rooms.map((r) => r.type)))],
    [rooms],
  );

  const filtered = rooms.filter(
    (r) =>
      (statusFilter === "all" || r.status === statusFilter) &&
      (typeFilter === "all"   || r.type   === typeFilter),
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { available: 0, occupied: 0, reserved: 0, maintenance: 0 };
    rooms.forEach((r) => (c[r.status] = (c[r.status] ?? 0) + 1));
    return c;
  }, [rooms]);

  return (
    <div className="space-y-5">
      {/* ── Header ──────────────────────────────────────── */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Room Availability</h2>
        <p className="mt-1 text-sm text-slate-500">
          Check which rooms are free before confirming a new booking
        </p>
      </div>

      {/* ── Date check card ─────────────────────────────── */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 text-sm font-semibold text-slate-700">Check date range</div>
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Check-in
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Check-out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <button
            onClick={() => onCheckDates?.(checkIn, checkOut)}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition-colors hover:bg-indigo-700"
          >
            <CalendarRange size={15} />
            Check availability
          </button>
          <p className="flex items-center gap-1.5 text-xs text-slate-400">
            <Search size={12} />
            {/* TODO: Wire onCheckDates to useCheckRoomAvailabilityQuery({ checkIn, checkOut }) */}
            Filtering by status/type for now — connect to availability API
          </p>
        </div>
      </div>

      {/* ── Summary strip ────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(["available", "occupied", "reserved", "maintenance"] as RoomAvailabilityStatus[]).map(
          (s) => {
            const st = SUMMARY_STYLE[s];
            return (
              <div
                key={s}
                className={cn("rounded-xl border p-4", st.bg, st.border)}
              >
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {statusLabel[s]}
                </div>
                <div className={cn("mt-1.5 text-3xl font-bold tracking-tight", st.num)}>
                  {counts[s] ?? 0}
                </div>
                <div className="mt-0.5 text-[11px] text-slate-400">rooms</div>
              </div>
            );
          },
        )}
      </div>

      {/* ── Filters ──────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-all",
                statusFilter === s
                  ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700",
              )}
            >
              {s === "all" ? "All statuses" : statusLabel[s]}
            </button>
          ))}
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
        >
          {roomTypes.map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "All room types" : t}
            </option>
          ))}
        </select>
      </div>

      {/* ── Room grid ────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filtered.map((r) => {
          const s = STATUS_STYLE[r.status];
          return (
            <div
              key={r.number}
              className={cn(
                "rounded-xl border-l-4 border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5",
                CARD_ACCENT[r.status],
              )}
            >
              <div className="mb-2 flex items-start justify-between gap-1">
                <span className="text-lg font-bold text-slate-800">{r.number}</span>
                <StatusDot status={r.status} />
              </div>
              <div className="text-xs font-medium text-slate-600">{r.type}</div>
              <div className="mt-0.5 text-[11px] text-slate-400">{r.floor}</div>
              <div className={cn("mt-3 text-sm font-semibold", s.text)}>{r.price}/night</div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-5 rounded-xl border border-dashed border-slate-200 py-12 text-center text-sm text-slate-400">
            No rooms match this filter.
          </div>
        )}
      </div>
    </div>
  );
}
