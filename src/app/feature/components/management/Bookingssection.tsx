"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, ChevronRight, Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { statusLabel } from "@/lib/theme/Theme";
import { formatCurrency, formatDate, formatNights } from "@/lib/format";
import type { Booking, BookingStatus } from "@/types/types";
import { EmptyState, ErrorState, TableRowSkeleton } from "@/components/admin/states";
import { StatusBadge } from "@/components/admin/StatusBadge";

const STATUS_ORDER: BookingStatus[] = [
  "pending",
  "confirmed",
  "checked-in",
  "checked-out",
  "completed",
  "no-show",
  "cancelled",
];

type SortKey = "id" | "guest" | "room" | "checkIn" | "checkOut" | "amount";
type SortDir = "asc" | "desc";

interface BookingsSectionProps {
  bookings: Booking[];
  isLoading?: boolean;
  isError?: boolean;
  error?: string | null;
  onRetry?: () => void;
  onSelectBooking?: (id: string) => void;
  onNewBooking?: () => void;
}

export default function BookingsSection({
  bookings,
  isLoading,
  isError,
  error,
  onRetry,
  onSelectBooking,
  onNewBooking,
}: BookingsSectionProps) {
  const [filter, setFilter] = useState<BookingStatus | "all">("all");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("checkIn");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: bookings.length };
    for (const b of bookings) c[b.status] = (c[b.status] ?? 0) + 1;
    return c;
  }, [bookings]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = bookings.filter(
      (b) =>
        (filter === "all" || b.status === filter) &&
        (!q ||
          b.guest.name.toLowerCase().includes(q) ||
          b.id.toLowerCase().includes(q) ||
          b.room.number.includes(q)),
    );
    return list.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortKey === "amount") return (a.amount - b.amount) * dir;
      const av = String(a[sortKey]).toLowerCase();
      const bv = String(b[sortKey]).toLowerCase();
      return av < bv ? -1 * dir : av > bv ? 1 * dir : 0;
    });
  }, [bookings, filter, query, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "checkIn" || key === "checkOut" ? "desc" : "asc");
    }
  };

  const SortHeader = ({ label, k, className }: { label: string; k: SortKey; className?: string }) => (
    <button
      type="button"
      onClick={() => toggleSort(k)}
      className={cn(
        "inline-flex items-center gap-1 text-left outline-none hover:text-forest",
        sortKey === k && "text-forest",
        className,
      )}
    >
      {label}
      <ArrowUpDown
        size={11}
        className={cn(
          "opacity-40 transition-opacity",
          sortKey === k && "opacity-100",
          sortKey === k && sortDir === "asc" && "rotate-180",
        )}
      />
    </button>
  );

  if (isLoading) {
    return (
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-forest-deep">Bookings</h2>
            <p className="mt-1 text-sm text-ink-soft/70">Loading your reservation list…</p>
          </div>
          <div className="h-9 w-32 animate-pulse rounded-lg bg-sand" />
        </div>
        <div className="overflow-hidden rounded-xl border border-line bg-white">
          <div className="border-b border-line bg-sand px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-caption">
            Loading rows
          </div>
          {Array.from({ length: 7 }).map((_, i) => (
            <TableRowSkeleton key={i} cols={7} />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="space-y-5">
        <h2 className="font-serif text-2xl font-semibold text-forest-deep">Bookings</h2>
        <ErrorState message={error ?? "Failed to load bookings."} onRetry={onRetry} />
      </section>
    );
  }

  return (
    <section className="space-y-5">
      {/* ── Header ──────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-forest-deep">
            Bookings
          </h2>
          <p className="mt-1 text-sm text-ink-soft/70">
            {bookings.length} reservations across all channels
          </p>
        </div>
        <button
          onClick={onNewBooking}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-cream shadow-sm transition-colors hover:bg-forest-deep"
        >
          <Plus size={15} />
          New booking
        </button>
      </div>

      {/* ── Status filter chips ─────────────────────────── */}
      <div className="flex flex-wrap items-center gap-1.5">
        <FilterChip active={filter === "all"} count={counts.all ?? 0} onClick={() => setFilter("all")}>
          All bookings
        </FilterChip>
        {STATUS_ORDER.map((s) => (
          <FilterChip key={s} active={filter === s} count={counts[s] ?? 0} onClick={() => setFilter(s)}>
            {statusLabel[s]}
          </FilterChip>
        ))}
      </div>

      {/* ── Search ──────────────────────────────────────── */}
      <div className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 transition-colors focus-within:border-gold/50 focus-within:ring-2 focus-within:ring-gold/20 sm:max-w-sm">
        <Search size={14} className="shrink-0 text-caption" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search guest, ID or room…"
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-caption"
        />
      </div>

      {/* ── Table ───────────────────────────────────────── */}
      <div className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_2px_rgba(13,43,36,0.04),0_12px_28px_-18px_rgba(13,43,36,0.25)]">
        <div className="max-h-[calc(100vh-360px)] overflow-x-auto overflow-y-auto">
          <table className="w-full min-w-[860px] text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="border-b border-line bg-sand">
                {[
                  { label: "Booking ID", k: "id" as SortKey },
                  { label: "Guest", k: "guest" as SortKey },
                  { label: "Room", k: "room" as SortKey },
                  { label: "Check-in", k: "checkIn" as SortKey },
                  { label: "Check-out", k: "checkOut" as SortKey },
                  { label: "Amount", k: "amount" as SortKey },
                ].map((h) => (
                  <th key={h.k} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-caption">
                    <SortHeader label={h.label} k={h.k} />
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-caption">
                  Status
                </th>
                <th className="w-8 px-4 py-3" aria-label="Open" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line/70">
              {filtered.map((b) => (
                <tr
                  key={b.id}
                  onClick={() => onSelectBooking?.(b.id)}
                  className={cn(
                    "group transition-colors",
                    onSelectBooking ? "cursor-pointer hover:bg-forest-100/50" : "hover:bg-sand/60",
                  )}
                >
                  <td className="px-4 py-3 font-mono text-xs font-medium text-caption">{b.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-ink">{b.guest.name}</div>
                    <div className="text-[11px] text-caption">
                      {b.adults} guest{b.adults > 1 ? "s" : ""} · {formatNights(b.nights)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-ink-soft">{b.room.type}</div>
                    <div className="text-[11px] text-caption">Room {b.room.number}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-ink-soft">{formatDate(b.checkIn)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-ink-soft">{formatDate(b.checkOut)}</span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-forest-deep">
                    {formatCurrency(b.amount, b.currency)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="px-4 py-3 text-line group-hover:text-gold-800">
                    {onSelectBooking && <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <EmptyState
              title={query || filter !== "all" ? "No bookings match this filter" : "No bookings yet"}
              description={
                query || filter !== "all"
                  ? "Try a different search term or status."
                  : "Create your first reservation to start tracking arrivals."
              }
            />
          )}
        </div>
      </div>
    </section>
  );
}

function FilterChip({
  active,
  count,
  onClick,
  children,
}: {
  active: boolean;
  count: number;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-all",
        active
          ? "border-gold-soft bg-gold-100 text-gold-800"
          : "border-line bg-white text-ink-soft hover:border-gold-400/60 hover:text-ink",
      )}
    >
      {children}
      <span
        className={cn(
          "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
          active ? "bg-gold text-forest-deep" : "bg-sand text-caption",
        )}
      >
        {count}
      </span>
    </button>
  );
}