"use client";

import BookingsSection from "@/app/feature/components/management/Bookingssection";
import GuestInboxSection from "@/app/feature/components/management/Guestinboxsection";
import LiveChatSection from "@/app/feature/components/management/Livechatsection";
import OverviewSection from "@/app/feature/components/management/Overviewsection";
import RoomAvailabilitySection from "@/app/feature/components/management/Roomavailabilitysection";
import RoomsServicesSection from "@/app/feature/components/management/Roomsservicessection";
import { AdminTab } from "@/app/feature/components/management/Sidebar";
import WebsiteControlSection from "@/app/feature/components/management/Websitecontrolsection";
import {
  mockBookings,
  mockChatMessages,
  mockChatThreads,
  mockGuestMessages,
  mockKpis,
  mockRevenue,
  mockRoomAvailability,
  mockRooms,
  mockServiceRequests,
  mockWebsiteSections,
} from "@/lib/data/MockData";
import { useSearchParams } from "next/navigation";
import { Users, BarChart3, Settings, Construction } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Placeholder for unbuilt sections ─────────────────────────────────────────
const PLACEHOLDER_META: Record<
  string,
  { icon: React.ElementType; iconBg: string; iconColor: string; hint: string }
> = {
  staff: {
    icon: Users,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    hint: "Shifts, roles & permissions — coming soon",
  },
  reports: {
    icon: BarChart3,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    hint: "Occupancy, revenue & channel breakdowns — coming soon",
  },
  settings: {
    icon: Settings,
    iconBg: "bg-slate-50",
    iconColor: "text-slate-600",
    hint: "Hotel profile, taxes & payment methods — coming soon",
  },
};

function Placeholder({ title, sub, tabId }: { title: string; sub: string; tabId: string }) {
  const meta = PLACEHOLDER_META[tabId] ?? {
    icon: Construction,
    iconBg: "bg-slate-50",
    iconColor: "text-slate-400",
    hint: sub,
  };
  const Icon = meta.icon;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{sub}</p>
      </div>
      <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <div className={cn("flex size-16 items-center justify-center rounded-2xl", meta.iconBg)}>
          <Icon size={28} className={meta.iconColor} />
        </div>
        <div>
          <p className="text-base font-semibold text-slate-700">{title}</p>
          <p className="mt-1 max-w-xs text-sm text-slate-400">{meta.hint}</p>
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-400">
          Under construction
        </span>
      </div>
    </div>
  );
}

// ── Dashboard page router ─────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  const searchParams = useSearchParams();
  const tab = (searchParams.get("tab") as AdminTab) || "overview";

  // TODO: All mock data below will be replaced with RTK Query hooks per-section.
  // See each section component file for specific TODO comments on which hooks to use.

  switch (tab) {
    case "bookings":
      return <BookingsSection bookings={mockBookings} />;

    case "rooms":
      return (
        <RoomsServicesSection rooms={mockRooms} requests={mockServiceRequests} />
      );

    case "availability":
      return <RoomAvailabilitySection rooms={mockRoomAvailability} />;

    case "website":
      return <WebsiteControlSection sections={mockWebsiteSections} />;

    case "chat":
      return (
        <LiveChatSection
          threads={mockChatThreads}
          messagesByThread={mockChatMessages}
        />
      );

    case "inbox":
      return <GuestInboxSection messages={mockGuestMessages} />;

    case "staff":
      return (
        <Placeholder title="Staff" sub="Shifts, roles and permissions" tabId="staff" />
      );

    case "reports":
      return (
        <Placeholder
          title="Reports"
          sub="Occupancy, revenue and channel breakdowns"
          tabId="reports"
        />
      );

    case "settings":
      return (
        <Placeholder
          title="Settings"
          sub="Hotel profile, taxes, payment methods"
          tabId="settings"
        />
      );

    case "overview":
    default:
      return (
        <OverviewSection
          kpis={mockKpis}
          revenue={mockRevenue}
          attention={mockServiceRequests}
        />
      );
  }
}
