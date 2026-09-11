"use client";

import { Bell, Menu, Search } from "lucide-react";
import { useHotelMockData } from "@/hooks/useHotelMockData";

interface TopbarProps {
  onSearch?: (query: string) => void;
  notificationCount?: number;
  onMenuClick?: () => void;
}

export default function Topbar({
  onSearch,
  notificationCount = 0,
  onMenuClick,
}: TopbarProps) {
  // TODO: Replace with RTK Query useGetHotelProfileQuery() for brand name
  const { data } = useHotelMockData();
  const hotel    = data?.hotel.brand ?? "Provah Grand";
  const manager  = data?.hotel.manager ?? "Salma Akter";

  // TODO: Replace with RTK Query useGetNotificationsQuery() for live notification count
  const initials = manager
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-7">
      {/* ── Left: hamburger + search ─────────────────────── */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-800 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={17} />
        </button>

        {/* Search bar */}
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 transition-colors focus-within:border-indigo-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 sm:max-w-sm">
          <Search size={14} className="shrink-0 text-slate-400" />
          <input
            placeholder="Search bookings, guests, rooms…"
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* ── Right: hotel pill + notifications + avatar ────── */}
      <div className="flex items-center gap-2">
        {/* Hotel brand pill */}
        <span className="hidden items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-500 sm:inline-flex">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          {hotel}
        </span>

        {/* Notification bell */}
        <button
          type="button"
          className="relative inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
          aria-label="Notifications"
        >
          <Bell size={16} />
          {notificationCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[9px] font-bold text-white ring-1 ring-white">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Manager avatar */}
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-[11px] font-bold text-white shadow-sm cursor-default select-none">
          {initials}
        </div>
      </div>
    </header>
  );
}
