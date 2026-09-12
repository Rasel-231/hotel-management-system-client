"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Building2, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { groupLabel, navItemsForRole, ROLE_LABELS } from "@/lib/roles";
import { useSessionStore } from "@/store/sessionStore";

interface SidebarProps {
  hotelName?: string;
  open?: boolean;
  onNavigate?: () => void;
}

export default function Sidebar({
  hotelName,
  open = false,
  onNavigate,
}: SidebarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const active = (searchParams.get("tab") as string) || "overview";

  const { user, signOut } = useSessionStore();
  const name = hotelName ?? user.hotelName ?? "NextStay Hotel";
  const role = user.role;
  const groups = navItemsForRole(role);

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  const handleSignOut = () => {
    signOut();
    // TODO: wire to userApi logout mutation + server-side session invalidation.
    router.push("/");
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-full w-64 shrink-0 flex-col border-r border-line bg-forest-deep transition-transform duration-300 lg:static lg:translate-x-0",
        open ? "translate-x-0 shadow-2xl" : "-translate-x-full",
      )}
    >
      {/* ── Brand header ─────────────────────────────────── */}
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold text-forest-deep shadow-sm">
          <Building2 size={18} />
        </div>
        <div className="min-w-0">
          <div className="truncate font-serif text-[15px] font-semibold text-cream">
            {name}
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-gold-soft">
            Admin Dashboard
          </div>
        </div>
      </div>

      {/* ── Navigation (role-scoped) ─────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {groups.map(({ group, items }, gi) => (
          <div key={group} className={gi > 0 ? "mt-4" : ""}>
            <div className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-cream/40">
              {groupLabel(group)}
            </div>
            {items.map((tab) => {
              const Icon = tab.icon;
              const isActive = active === tab.id;
              return (
                <Link
                  key={tab.id}
                  href={`?tab=${tab.id}`}
                  onClick={onNavigate}
                  className={cn(
                    "relative flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-cream/10 text-gold-soft"
                      : "text-cream/70 hover:bg-white/5 hover:text-cream",
                  )}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-gold" />
                  )}
                  <Icon size={16} className={isActive ? "text-gold-soft" : "text-cream/45"} />
                  {tab.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* ── User footer ──────────────────────────────────── */}
      <div className="border-t border-white/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-800 text-[11px] font-bold text-forest-deep">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px] font-semibold text-cream">{user.name}</div>
            <div className="truncate text-[11px] text-cream/50">{ROLE_LABELS[role]}</div>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            aria-label="Sign out"
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-cream/50 transition-colors hover:bg-white/10 hover:text-cream"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}