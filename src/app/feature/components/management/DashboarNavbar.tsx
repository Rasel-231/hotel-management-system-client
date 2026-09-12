"use client";

import { Bell, Menu, Search } from "lucide-react";
import { useSessionStore } from "@/store/sessionStore";

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
  const user = useSessionStore((s) => s.user);
  const hotel = user.hotelName ?? "Provah Grand";

  // TODO: Replace with RTK Query useGetNotificationsQuery() for live notification count
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-line bg-cream/80 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-7">
      {/* ── Left: hamburger + search ─────────────────────── */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-line text-ink-soft transition-colors hover:bg-sand hover:text-ink lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={17} />
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-line bg-sand px-3 py-2 transition-colors focus-within:border-gold/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-gold/20 sm:max-w-sm">
          <Search size={14} className="shrink-0 text-caption" />
          <input
            placeholder="Search bookings, guests, rooms…"
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-caption"
          />
        </div>
      </div>

      {/* ── Right: hotel pill + notifications + avatar ────── */}
      <div className="flex items-center gap-2">
        <span className="hidden items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 text-[11px] font-semibold text-ink-soft sm:inline-flex">
          <span className="size-1.5 rounded-full bg-forest" />
          {hotel}
        </span>

        <button
          type="button"
          className="relative inline-flex size-9 items-center justify-center rounded-lg border border-line text-ink-soft transition-colors hover:bg-sand hover:text-ink"
          aria-label="Notifications"
        >
          <Bell size={16} />
          {notificationCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-bold text-forest-deep ring-1 ring-cream">
              {notificationCount}
            </span>
          )}
        </button>

        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-forest to-forest-deep text-[11px] font-bold text-gold-soft shadow-sm">
          {initials}
        </div>
      </div>
    </header>
  );
}