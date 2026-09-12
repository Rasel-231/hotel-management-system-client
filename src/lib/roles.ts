import type { HotelRole } from "@/types/types";
import {
  BarChart3,
  BedDouble,
  Building2,
  CalendarCheck,
  CalendarRange,
  Globe,
  Inbox,
  LayoutGrid,
  MessageCircle,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Role-aware navigation for the admin dashboard.
//
// Each nav item declares the roles that may see it. `navItemsForRole(role)`
// returns the filtered, grouped list the Sidebar renders. Keep the item `id`s
// in sync with the `?tab=` router in (dashboard)/dashboard/DashboardPages.tsx.
//
// NOTE: role checks here are UI-only. Real authorization must be enforced
// server-side once the auth backend is wired up (see sessionStore).
// ─────────────────────────────────────────────────────────────────────────────

export type AdminTabId =
  | "overview"
  | "bookings"
  | "availability"
  | "rooms"
  | "platform"
  | "website"
  | "chat"
  | "inbox"
  | "staff"
  | "reports"
  | "settings";

export interface AdminNavItem {
  id: AdminTabId;
  label: string;
  icon: LucideIcon;
  group: "main" | "tools" | "manage" | "platform";
  roles: HotelRole[];
}

const ALL_HOTEL_ROLES: HotelRole[] = [
  "SUPER_ADMIN",
  "ADMIN",
  "OWNER",
  "MANAGER",
];

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid, group: "main", roles: ALL_HOTEL_ROLES },
  { id: "bookings", label: "Bookings", icon: CalendarCheck, group: "main", roles: ["SUPER_ADMIN", "ADMIN", "OWNER", "MANAGER", "FRONT_DESK"] },
  { id: "rooms", label: "Rooms & Services", icon: BedDouble, group: "main", roles: ALL_HOTEL_ROLES.concat("HOUSEKEEPING") },
  { id: "availability", label: "Room Availability", icon: CalendarRange, group: "main", roles: ["SUPER_ADMIN", "ADMIN", "OWNER", "MANAGER", "FRONT_DESK", "HOUSEKEEPING"] },
  { id: "platform", label: "Platform Hotels", icon: Building2, group: "platform", roles: ["SUPER_ADMIN"] },
  { id: "website", label: "Website Control", icon: Globe, group: "tools", roles: ["SUPER_ADMIN", "ADMIN", "OWNER", "MANAGER"] },
  { id: "chat", label: "Live Chat", icon: MessageCircle, group: "tools", roles: ["SUPER_ADMIN", "ADMIN", "OWNER", "MANAGER", "FRONT_DESK"] },
  { id: "inbox", label: "Guest Messages", icon: Inbox, group: "tools", roles: ["SUPER_ADMIN", "ADMIN", "OWNER", "MANAGER", "FRONT_DESK", "HOUSEKEEPING"] },
  { id: "staff", label: "Staff", icon: Users, group: "manage", roles: ["SUPER_ADMIN", "ADMIN", "OWNER", "MANAGER"] },
  { id: "reports", label: "Reports", icon: BarChart3, group: "manage", roles: ["SUPER_ADMIN", "ADMIN", "OWNER", "MANAGER"] },
  { id: "settings", label: "Settings", icon: Settings, group: "manage", roles: ["SUPER_ADMIN", "ADMIN", "OWNER"] },
];

const GROUP_LABELS: Record<AdminNavItem["group"], string> = {
  main: "Main",
  tools: "Tools",
  manage: "Manage",
  platform: "Platform",
};

export function navItemsForRole(role: HotelRole): {
  group: AdminNavItem["group"];
  items: AdminNavItem[];
}[] {
  const filtered = ADMIN_NAV_ITEMS.filter((item) => item.roles.includes(role));
  const groups = Array.from(new Set(filtered.map((i) => i.group)));
  return groups.map((group) => ({
    group,
    items: filtered.filter((i) => i.group === group),
  }));
}

export function groupLabel(group: AdminNavItem["group"]): string {
  return GROUP_LABELS[group];
}

export const ROLE_LABELS: Record<HotelRole, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Hotel Admin",
  OWNER: "Hotel Owner",
  MANAGER: "General Manager",
  FRONT_DESK: "Front Desk",
  HOUSEKEEPING: "Housekeeping",
};