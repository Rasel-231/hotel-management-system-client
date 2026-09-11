"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  LayoutGrid,
  CalendarCheck,
  BedDouble,
  Globe,
  MessageCircle,
  Inbox,
  Users,
  BarChart3,
  Settings,
  CalendarRange,
  Building2,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useHotelMockData } from "@/hooks/useHotelMockData";

export const ADMIN_TABS = [
  { id: "overview",      label: "Overview",         icon: LayoutGrid,    group: "main" },
  { id: "bookings",      label: "Bookings",          icon: CalendarCheck, group: "main" },
  { id: "rooms",         label: "Rooms & Services",  icon: BedDouble,     group: "main" },
  { id: "availability",  label: "Room Availability", icon: CalendarRange, group: "main" },
  { id: "website",       label: "Website Control",   icon: Globe,         group: "tools" },
  { id: "chat",          label: "Live Chat",          icon: MessageCircle, group: "tools" },
  { id: "inbox",         label: "Guest Messages",     icon: Inbox,         group: "tools" },
  { id: "staff",         label: "Staff",              icon: Users,         group: "manage" },
  { id: "reports",       label: "Reports",            icon: BarChart3,     group: "manage" },
  { id: "settings",      label: "Settings",           icon: Settings,      group: "manage" },
] as const;

export type AdminTab = (typeof ADMIN_TABS)[number]["id"];

interface SidebarProps {
  hotelName?: string;
  adminName?: string;
  adminRole?: string;
  open?: boolean;
  onNavigate?: () => void;
}

const GROUP_LABELS: Record<string, string> = {
  main:   "Main",
  tools:  "Tools",
  manage: "Manage",
};

export default function Sidebar({
  hotelName,
  adminName,
  adminRole,
  open = false,
  onNavigate,
}: SidebarProps) {
  const searchParams = useSearchParams();
  const active = (searchParams.get("tab") as AdminTab) || "overview";

  // TODO: Replace with RTK Query useGetHotelProfileQuery() to pull live hotel info
  const { data } = useHotelMockData();
  const name    = hotelName ?? data?.hotel.name    ?? "NextStay Hotel";
  const manager = adminName ?? data?.hotel.manager ?? "Salma Akter";
  const role    = adminRole ?? data?.hotel.role    ?? "General Manager";

  const groups = Array.from(new Set(ADMIN_TABS.map((t) => t.group)));

  const initials = manager
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-full w-64 shrink-0 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0",
        open ? "translate-x-0 shadow-2xl" : "-translate-x-full",
      )}
    >
      {/* ── Brand header ─────────────────────────────────── */}
      <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-sm shadow-indigo-200">
          <Building2 size={18} />
        </div>
        <div className="min-w-0">
          <div className="truncate text-[13px] font-semibold text-slate-900">{name}</div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-indigo-500">
            Admin Dashboard
          </div>
        </div>
      </div>

      {/* ── Navigation ───────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {groups.map((group, gi) => (
          <div key={group} className={gi > 0 ? "mt-4" : ""}>
            <div className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              {GROUP_LABELS[group]}
            </div>
            {ADMIN_TABS.filter((t) => t.group === group).map((tab) => {
              const Icon     = tab.icon;
              const isActive = active === tab.id;
              return (
                <Link
                  key={tab.id}
                  href={`?tab=${tab.id}`}
                  onClick={onNavigate}
                  className={cn(
                    "relative flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800",
                  )}
                >
                  {/* Active left bar */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-indigo-600" />
                  )}
                  <Icon
                    size={16}
                    className={isActive ? "text-indigo-600" : "text-slate-400"}
                  />
                  {tab.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* ── User footer ──────────────────────────────────── */}
      <div className="border-t border-slate-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-[11px] font-bold text-white shadow-sm">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px] font-semibold text-slate-900">{manager}</div>
            <div className="truncate text-[11px] text-slate-400">{role}</div>
          </div>
          <button
            type="button"
            aria-label="Sign out"
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
