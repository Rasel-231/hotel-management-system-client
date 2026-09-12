"use client";

import { useMemo, useState } from "react";
import { CalendarRange } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDate } from "@/lib/format";
import { computeAvailability } from "@/lib/availability";
import { statusLabel } from "@/lib/theme/Theme";
import type { Booking, Room, RoomStatus } from "@/types/types";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { CardGridSkeleton, EmptyState, ErrorState } from "@/components/admin/states";

const STATUS_FILTERS: Array<RoomStatus | "all"> = [
  "all",
  "available",
  "reserved",
  "occupied",
  "maintenance",
];

interface RoomAvailabilitySectionProps {
  rooms: Room[];
  bookings: Booking[];
  isLoading?: boolean;
  isError?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

function RoomsSummary({ rooms }: { rooms: Room[] }) {
  const counts = useMemo(() => {
    const c: Record<RoomStatus, number> = {
      available: 0,
      occupied: 0,
      reserved: 0,
      maintenance: 0,
    };
    for (const r of rooms) c[r.status] = (c[r.status] ?? 0) + 1;
    return c;
  }, [rooms]);

  const items: { status: RoomStatus; num: string; bg: string }[] = [
    { status: "available", num: "text-forest", bg: "bg-forest-100" },
    { status: "reserved", num: "text-gold-800", bg: "bg-gold-100" },
    { status: "occupied", num: "text-olive", bg: "bg-olive/15" },
    { status: "maintenance", num: "text-danger", bg: "bg-blush/60" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((it) => (
        <div key={it.status} className="rounded-xl border border-line bg-white px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-caption">
              {statusLabel[it.status]}
            </span>
            <span className={cn("size-2 rounded-full", it.bg)} />
          </div>
          <div className={cn("mt-1.5 font-serif text-3xl font-bold tracking-tight", it.num)}>
            {counts[it.status] ?? 0}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RoomAvailabilitySection({
  rooms,
  bookings,
  isLoading,
  isError,
  error,
  onRetry,
}: RoomAvailabilitySectionProps) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [dateChecked, setDateChecked] = useState(false);
  const [statusFilter, setStatusFilter] = useState<RoomStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const range = useMemo(
    () => (dateChecked && checkIn && checkOut ? { checkIn, checkOut } : null),
    [dateChecked, checkIn, checkOut],
  );

  const availability = useMemo(
    () => computeAvailability(rooms, bookings, range?.checkIn, range?.checkOut),
    [rooms, bookings, range],
  );

  const roomTypes = useMemo(
    () => ["all", ...Array.from(new Set(rooms.map((r) => r.type)))],
    [rooms],
  );

  const filtered = useMemo(
    () =>
      availability.filter(
        (r) =>
          (statusFilter === "all" || r.status === statusFilter) &&
          (typeFilter === "all" || r.type === typeFilter),
      ),
    [availability, statusFilter, typeFilter],
  );

  const dateInputClass =
    "rounded-lg border border-line bg-sand px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-gold/60 focus:ring-2 focus:ring-gold/20";

  return (
    <section className="space-y-5">
      {/* ── Header ──────────────────────────────────────── */}
      <div>
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-forest-deep">
          Room Availability
        </h2>
        <p className="mt-1 text-sm text-ink-soft/70">
          Check which rooms are free before confirming a new booking
        </p>
      </div>

      {isLoading ? (
        <>
          <CardGridSkeleton count={7} />
        </>
      ) : isError ? (
        <ErrorState message={error ?? "Failed to load availability."} onRetry={onRetry} />
      ) : (
        <>
          {/* ── Date range check ─────────────────────────── */}
          <div className="rounded-xl border border-line bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <CalendarRange size={15} className="text-gold-800" />
              <span className="text-sm font-semibold text-ink">Check date range</span>
              {dateChecked && range ? (
                <span className="ml-auto text-[11px] font-medium text-forest">
                  Showing {formatDate(range.checkIn)} → {formatDate(range.checkOut)}
                </span>
              ) : (
                <span className="ml-auto text-[11px] text-caption">Today&apos;s snapshot</span>
              )}
            </div>
            <div className="flex flex-wrap items-end gap-3">
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-caption">
                  Check-in
                </label>
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className={dateInputClass} />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-caption">
                  Check-out
                </label>
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className={dateInputClass} />
              </div>
              <button
                onClick={() => setDateChecked(!!checkIn && !!checkOut && checkOut > checkIn)}
                className="inline-flex items-center gap-2 rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-forest-deep"
              >
                Check availability
              </button>
            </div>
          </div>

          {/* ── Summary strip ────────────────────────────── */}
          <RoomsSummary rooms={availability} />

          {/* ── Filters ──────────────────────────────────── */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {STATUS_FILTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-all",
                    statusFilter === s
                      ? "border-gold-soft bg-gold-100 text-gold-800"
                      : "border-line bg-white text-ink-soft hover:border-gold-400/60 hover:text-ink",
                  )}
                >
                  {s === "all" ? "All statuses" : statusLabel[s]}
                </button>
              ))}
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-lg border border-line bg-white px-3 py-1.5 text-xs text-ink-soft outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/20"
            >
              {roomTypes.map((t) => (
                <option key={t} value={t}>
                  {t === "all" ? "All room types" : t}
                </option>
              ))}
            </select>
          </div>

          {/* ── Room grid ────────────────────────────────── */}
          {filtered.length === 0 ? (
            <EmptyState
              title="No rooms match this filter"
              description="Try clearing the status or room type filter."
            />
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filtered.map((r) => (
                <div
                  key={r.id}
                  className={cn(
                    "rounded-xl border border-line bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
                    r.status === "maintenance" && "opacity-70",
                    r.status === "available" && "border-l-4 border-l-forest",
                    r.status === "reserved" && "border-l-4 border-l-gold",
                    r.status === "occupied" && "border-l-4 border-l-olive",
                    r.status === "maintenance" && "border-l-4 border-l-danger",
                  )}
                >
                  <div className="mb-2 flex items-start justify-between gap-1">
                    <span className="font-serif text-lg font-bold text-forest-deep">{r.number}</span>
                    <StatusBadge status={r.status} />
                  </div>
                  <div className="text-xs font-medium text-ink-soft">{r.type}</div>
                  <div className="mt-0.5 text-[11px] text-caption">
                    {r.floor} · {r.bedConfig}
                  </div>
                  <div className="mt-3 text-sm font-semibold text-forest">
                    {formatCurrency(r.baseRate)}/night
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}