"use client";

import { useMemo } from "react";
import {
  ArrowDownToDot,
  ArrowUpFromDot,
  BedDouble,
  Building2,
  Clock4,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatRelativeDay, todayKey } from "@/lib/format";
import type {
  Booking,
  DashboardStats,
  HotelRole,
  RevenuePoint,
} from "@/types/types";
import { ErrorState } from "@/components/admin/states";
import { StatusBadge } from "@/components/admin/StatusBadge";
import type { DashboardPayload } from "@/lib/api/dashboardApi";

interface OverviewSectionProps {
  payload?: DashboardPayload;
  bookings: Booking[];
  isLoading?: boolean;
  isError?: boolean;
  error?: string | null;
  onRetry?: () => void;
  role?: HotelRole;
  onSelectBooking?: (id: string) => void;
}

function formatRevenue(value: number): string {
  if (value >= 1000000) return `৳ ${(value / 1000000).toFixed(1)}L`;
  return `৳ ${(value / 1000).toFixed(0)}K`;
}

export default function OverviewSection({
  payload,
  bookings,
  isLoading,
  isError,
  error,
  onRetry,
  role = "ADMIN",
  onSelectBooking,
}: OverviewSectionProps) {
  const today = todayKey();

  const dayData = useMemo(() => {
    const active = (s: Booking["status"]) =>
      s === "pending" || s === "confirmed" || s === "checked-in";
    const arrivals = bookings
      .filter((b) => b.checkIn === today && active(b.status))
      .concat(
        bookings.filter((b) => b.checkIn === today && b.status === "checked-in"),
      )
      .filter((b, i, arr) => arr.findIndex((x) => x.id === b.id) === i)
      .sort((a, b) => a.room.number.localeCompare(b.room.number));
    const departures = bookings
      .filter((b) => b.checkOut === today && (b.status === "checked-in" || b.status === "confirmed"))
      .sort((a, b) => a.room.number.localeCompare(b.room.number));
    const pendingCheckIns = bookings.filter(
      (b) => b.checkIn === today && b.status === "confirmed",
    );
    return { arrivals, departures, pendingCheckIns };
  }, [bookings, today]);

  const stats: DashboardStats | undefined = payload?.stats;
  const revenue: RevenuePoint[] = payload?.revenue ?? [];
  const greetingName = payload?.profile.greetingName ?? "Salma";
  const hotelName = payload?.profile.brand ?? "Provah Grand";

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const kpis = [
    {
      label: "Occupancy today",
      display: stats ? `${stats.occupancyPct}%` : "—",
      icon: BedDouble,
      tone: "text-forest",
      bg: "bg-forest-100",
    },
    {
      label: "Revenue (MTD)",
      display: stats ? formatRevenue(stats.totalRevenue) : "—",
      icon: DollarSign,
      tone: "text-gold-800",
      bg: "bg-gold-100",
    },
    {
      label: "Arrivals today",
      display: String(dayData.arrivals.length),
      icon: ArrowDownToDot,
      tone: "text-olive",
      bg: "bg-olive/15",
    },
    {
      label: "Departures today",
      display: String(dayData.departures.length),
      icon: ArrowUpFromDot,
      tone: "text-caption",
      bg: "bg-sand",
    },
    {
      label: "Pending check-ins",
      display: String(dayData.pendingCheckIns.length),
      icon: Clock4,
      tone: "text-gold-800",
      bg: "bg-gold-100",
    },
  ];

  if (isLoading) {
    return (
      <section className="space-y-6">
        <div className="flex flex-col gap-1">
          <div className="h-7 w-64 animate-pulse rounded bg-sand" />
          <div className="h-4 w-44 animate-pulse rounded bg-sand" />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl border border-line bg-white" />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-xl border border-line bg-white" />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="space-y-6">
        <h2 className="font-serif text-2xl font-semibold text-forest-deep">
          {greeting}, {greetingName}
        </h2>
        <ErrorState message={error ?? "Failed to load dashboard."} onRetry={onRetry} />
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* ── Greeting ─────────────────────────────────────── */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-caption">
            {role === "SUPER_ADMIN" ? "Platform overview" : hotelName}
          </p>
          <h2 className="mt-1 font-serif text-2xl font-semibold tracking-tight text-forest-deep">
            {greeting}, {greetingName}
          </h2>
          <p className="mt-1 text-sm text-ink-soft/70">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs text-ink-soft">
          <TrendingUp size={13} className="text-forest" />
          {stats ? `${stats.availableRooms} rooms open of ${stats.totalRooms}` : "Rooms"}
        </div>
      </div>

      {/* ── KPI grid ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="rounded-xl border border-line bg-white p-4 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className={cn("flex size-9 items-center justify-center rounded-lg", k.bg)}>
                  <Icon size={16} className={k.tone} />
                </div>
                <span className="rounded-full border border-line bg-sand px-2 py-0.5 text-[10px] font-medium text-caption">
                  today
                </span>
              </div>
              <div className="mt-3 font-serif text-2xl font-bold tracking-tight text-forest-deep">
                {k.display}
              </div>
              <div className="mt-0.5 text-xs text-caption">{k.label}</div>
            </div>
          );
        })}
      </div>

      {/* ── Arrivals / departures + revenue ──────────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DayColumn
              title="Arriving today"
              count={dayData.arrivals.length}
              empty="No arrivals scheduled."
              items={dayData.arrivals}
              accent="border-l-forest"
              badge="text-forest"
              onSelect={onSelectBooking}
            />
            <DayColumn
              title="Departing today"
              count={dayData.departures.length}
              empty="No departures today."
              items={dayData.departures}
              accent="border-l-gold"
              badge="text-gold-800"
              onSelect={onSelectBooking}
            />
          </div>
        </div>

        {/* Revenue sparkline */}
        <div className="rounded-xl border border-line bg-white p-5">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-semibold text-ink">Revenue — last 7 days</span>
            <span className="text-xs text-caption">in ৳ K</span>
          </div>
          {revenue.length > 1 ? (
            <>
              <RevenueSparkline data={revenue} />
              <div className="mt-3 flex justify-between text-[11px] font-medium text-caption">
                {revenue.map((d) => (
                  <span key={d.label}>{d.label}</span>
                ))}
              </div>
            </>
          ) : (
            <div className="flex h-40 items-center justify-center text-xs text-caption">
              No revenue data yet
            </div>
          )}
        </div>
      </div>

      {/* ── SUPER_ADMIN: hotels awaiting approval ────────── */}
      {role === "SUPER_ADMIN" && payload?.pendingHotels.length ? (
        <div className="rounded-xl border border-line bg-white p-5">
          <div className="mb-3 flex items-center gap-2">
            <Building2 size={15} className="text-gold-800" />
            <span className="text-sm font-semibold text-ink">
              Hotels awaiting approval
            </span>
            <span className="rounded-full bg-gold-100 px-2 py-0.5 text-[10px] font-bold text-gold-800">
              {payload.pendingHotels.length}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {payload.pendingHotels.map((h) => (
              <div
                key={h.id}
                className="rounded-lg border border-line bg-sand/60 px-3 py-3"
              >
                <div className="text-[13px] font-medium text-ink">{h.name}</div>
                <div className="mt-0.5 text-[11px] text-caption">
                  {h.location} · {h.rooms} rooms
                </div>
                <div className="mt-1.5 text-[10px] font-medium text-gold-800">
                  Submitted {formatRelativeDay(h.submittedAt)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function DayColumn({
  title,
  count,
  empty,
  items,
  accent,
  badge,
  onSelect,
}: {
  title: string;
  count: number;
  empty: string;
  items: Booking[];
  accent: string;
  badge: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <div className={cn("rounded-xl border border-line bg-white p-5 border-l-4", accent)}>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-ink">{title}</span>
        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", badge === "text-forest" ? "bg-forest-100" : "bg-gold-100")}>
          {count}
        </span>
      </div>
      {count === 0 ? (
        <div className="flex h-28 items-center justify-center rounded-lg border border-dashed border-line text-xs text-caption">
          {empty}
        </div>
      ) : (
        <div className="space-y-2">
          {items.slice(0, 5).map((b) => (
            <button
              key={b.id}
              onClick={() => onSelect?.(b.id)}
              className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-2 text-left transition-colors hover:bg-sand"
            >
              <div className="min-w-0">
                <div className="truncate text-[13px] font-medium text-ink">{b.guest.name}</div>
                <div className="text-[11px] text-caption">Room {b.room.number}</div>
              </div>
              <StatusBadge status={b.status} />
            </button>
          ))}
          {items.length > 5 ? (
            <p className="pt-1 text-center text-[11px] text-caption">+{items.length - 5} more</p>
          ) : null}
        </div>
      )}
    </div>
  );
}

// ── Revenue area sparkline (palette-safe hex, no external dep) ────────────────
function RevenueSparkline({ data }: { data: RevenuePoint[] }) {
  const w = 560;
  const h = 160;
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const step = w / (data.length - 1);
  const points = data.map((d, i) => {
    const x = i * step;
    const y = h - ((d.value - min) / (max - min || 1)) * (h - 28) - 14;
    return [x, y] as [number, number];
  });
  const linePath = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const areaPath = `${linePath} L${w},${h} L0,${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none">
      <defs>
        <linearGradient id="rev-fill-nextstay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f4d4d" stopOpacity={0.18} />
          <stop offset="100%" stopColor="#1f4d4d" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#rev-fill-nextstay)" />
      <path
        d={linePath}
        fill="none"
        stroke="#1f4d4d"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4} fill="#ffffff" stroke="#c9a227" strokeWidth={2} />
      ))}
    </svg>
  );
}