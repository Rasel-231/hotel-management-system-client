"use client";

import { TrendingUp, TrendingDown, BedDouble, DollarSign, Users, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { KpiItem, RevenuePoint, ServiceRequest } from "@/types/types";

interface OverviewSectionProps {
  greetingName?: string;
  hotelName?: string;
  dateLabel?: string;
  kpis: KpiItem[];
  revenue: RevenuePoint[];
  attention: ServiceRequest[];
}

// ── KPI icon + color map ─────────────────────────────────────────────────────
const KPI_META: Array<{
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}> = [
  { icon: BedDouble,     iconBg: "bg-indigo-50",  iconColor: "text-indigo-600"  },
  { icon: DollarSign,    iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
  { icon: Users,         iconBg: "bg-sky-50",     iconColor: "text-sky-600"     },
  { icon: AlertTriangle, iconBg: "bg-amber-50",   iconColor: "text-amber-600"   },
];

// ── KPI Card ─────────────────────────────────────────────────────────────────
function KpiCard({ item, meta }: { item: KpiItem; meta: typeof KPI_META[0] }) {
  const { icon: Icon, iconBg, iconColor } = meta;
  return (
    <div className="flex flex-1 min-w-[180px] flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Icon + delta */}
      <div className="flex items-start justify-between">
        <div className={cn("flex size-10 items-center justify-center rounded-lg", iconBg)}>
          <Icon size={18} className={iconColor} />
        </div>
        {item.delta && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
              item.up
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-50 text-amber-700",
            )}
          >
            {item.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {item.delta}
          </span>
        )}
      </div>

      {/* Value + label */}
      <div>
        <div className="text-2xl font-bold tracking-tight text-slate-900">{item.value}</div>
        <div className="mt-0.5 text-xs text-slate-500">{item.label}</div>
      </div>
    </div>
  );
}

// ── Revenue Area Sparkline ────────────────────────────────────────────────────
function RevenueSparkline({ data }: { data: RevenuePoint[] }) {
  const w = 560;
  const h = 180;
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
        <linearGradient id="rev-fill-v2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#4F46E5" stopOpacity={0.15} />
          <stop offset="100%" stopColor="#4F46E5" stopOpacity={0}    />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#rev-fill-v2)" />
      <path d={linePath} fill="none" stroke="#4F46E5" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4} fill="#FFFFFF" stroke="#4F46E5" strokeWidth={2} />
      ))}
    </svg>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function OverviewSection({
  greetingName = "Salma",
  hotelName     = "Provah Grand",
  dateLabel     = "Thursday, 11 September",
  kpis,
  revenue,
  attention,
}: OverviewSectionProps) {
  // TODO: Replace with RTK Query useGetDashboardStatsQuery() — kpis & stats
  // TODO: Replace with RTK Query useGetRevenueChartQuery({ range: "7d" }) — revenue sparkline
  // TODO: Replace with RTK Query useGetServiceRequestsQuery({ urgent: true }) — attention items

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-6">
      {/* ── Page heading ──────────────────────────────────── */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          {greeting}, {greetingName} 👋
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {hotelName} · {dateLabel}
        </p>
      </div>

      {/* ── KPI cards ────────────────────────────────────── */}
      <div className="flex flex-wrap gap-4">
        {kpis.map((k, i) => (
          <KpiCard key={k.label} item={k} meta={KPI_META[i % KPI_META.length]} />
        ))}
      </div>

      {/* ── Revenue chart + Attention ─────────────────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Revenue sparkline (2/3 width on lg) */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <div className="mb-1 text-sm font-semibold text-slate-800">
            Revenue — last 7 days
          </div>
          <div className="mb-4 text-xs text-slate-400">in ৳ thousands</div>
          <RevenueSparkline data={revenue} />
          <div className="mt-3 flex justify-between text-[11px] text-slate-400 font-medium">
            {revenue.map((d) => (
              <span key={d.label}>{d.label}</span>
            ))}
          </div>
        </div>

        {/* Needs attention (1/3 width on lg) */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 text-sm font-semibold text-slate-800">Needs attention</div>
          <div className="space-y-3">
            {attention.slice(0, 4).map((r, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-3 pb-3",
                  i < Math.min(3, attention.length - 1) && "border-b border-slate-100",
                )}
              >
                {/* Urgency indicator */}
                <div
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                    r.urgent
                      ? "bg-red-100 text-red-600"
                      : "bg-slate-100 text-slate-400",
                  )}
                >
                  {r.urgent ? "!" : i + 1}
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-medium text-slate-800 leading-snug">
                    Room {r.room} — {r.request}
                  </div>
                  <div className="mt-0.5 text-[11px] text-slate-400">
                    {r.guest} · {r.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
