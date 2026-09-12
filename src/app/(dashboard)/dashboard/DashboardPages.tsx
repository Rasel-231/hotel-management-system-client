"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BarChart3, Building2, Construction, Settings, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import BookingsSection from "@/app/feature/components/management/Bookingssection";
import BookingDetail from "@/app/feature/components/management/BookingDetail";
import GuestInboxSection from "@/app/feature/components/management/Guestinboxsection";
import LiveChatSection from "@/app/feature/components/management/Livechatsection";
import NewBookingDialog, { type NewBookingInput } from "@/app/feature/components/management/NewBookingDialog";
import OverviewSection from "@/app/feature/components/management/Overviewsection";
import RoomAvailabilitySection from "@/app/feature/components/management/Roomavailabilitysection";
import RoomsServicesSection from "@/app/feature/components/management/Roomsservicessection";
import WebsiteControlSection from "@/app/feature/components/management/Websitecontrolsection";
import { useBookings, useDashboardStats, useRooms } from "@/hooks/useAdminQuery";
import type { AdminTabId } from "@/lib/roles";
import { useSessionStore } from "@/store/sessionStore";
import { useUiStore } from "@/store/uiStore";
import {
  mockChatMessages,
  mockChatThreads,
  mockGuestMessages,
  mockServiceRequests,
  mockWebsiteSections,
} from "@/lib/data/MockData";
import type { Booking } from "@/types/types";

// ── Placeholder for unbuilt/out-of-scope sections ────────────────────────────
const PLACEHOLDER_META: Record<
  string,
  { icon: React.ElementType; iconBg: string; iconColor: string; hint: string }
> = {
  platform: {
    icon: Building2,
    iconBg: "bg-forest-100",
    iconColor: "text-forest",
    hint: "Review new hotels submitting to the platform — coming soon",
  },
  staff: {
    icon: Users,
    iconBg: "bg-olive/15",
    iconColor: "text-olive",
    hint: "Shifts, roles & permissions — coming soon",
  },
  reports: {
    icon: BarChart3,
    iconBg: "bg-gold-100",
    iconColor: "text-gold-800",
    hint: "Occupancy, revenue & channel breakdowns — coming soon",
  },
  settings: {
    icon: Settings,
    iconBg: "bg-sand",
    iconColor: "text-caption",
    hint: "Hotel profile, taxes & payment methods — coming soon",
  },
};

function Placeholder({ title, sub, tabId }: { title: string; sub: string; tabId: string }) {
  const meta = PLACEHOLDER_META[tabId] ?? {
    icon: Construction,
    iconBg: "bg-sand",
    iconColor: "text-caption",
    hint: sub,
  };
  const Icon = meta.icon;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-forest-deep">
          {title}
        </h2>
        <p className="mt-1 text-sm text-ink-soft/70">{sub}</p>
      </div>
      <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-line bg-white p-10 text-center">
        <div className={cn("flex size-16 items-center justify-center rounded-2xl", meta.iconBg)}>
          <Icon size={28} className={meta.iconColor} />
        </div>
        <div>
          <p className="text-base font-semibold text-ink">{title}</p>
          <p className="mt-1 max-w-xs text-sm text-caption">{meta.hint}</p>
        </div>
        <span className="rounded-full border border-line bg-sand px-3 py-1 text-xs font-medium text-caption">
          Under construction
        </span>
      </div>
    </div>
  );
}

// ── Dashboard page router (single route, `?tab=` switching, existing pattern) ─
export default function AdminDashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = (searchParams.get("tab") as AdminTabId) || "overview";
  const bookingId = searchParams.get("booking");

  const role = useSessionStore((s) => s.user.role);
  const newBookingOpen = useUiStore((s) => s.newBookingOpen);
  const closeNewBooking = useUiStore((s) => s.closeNewBooking);

  const bookingsQuery = useBookings();
  const roomsQuery = useRooms();
  const statsQuery = useDashboardStats();

  // Local copy of bookings is the working state (status transitions, new
  // reservations). The mock fetch seeds it; RTK Query cache + mutations will
  // replace both the fetch and this local copy later.
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [lastSeeded, setLastSeeded] = useState(bookingsQuery.data);

  // Seed local state when the (mock) fetch returns — adjusting state during
  // render keeps this in sync without an extra effect pass.
  if (bookingsQuery.data !== lastSeeded) {
    setLastSeeded(bookingsQuery.data);
    if (bookingsQuery.data) setBookings(bookingsQuery.data);
  }

  const handleSelectBooking = useCallback((id: string) => {
    router.replace(`?tab=bookings&booking=${id}`);
  }, [router]);

  const handleCloseBooking = useCallback(() => {
    router.replace("?tab=bookings");
  }, [router]);

  const handleStatusChange = useCallback((id: string, next: Booking["status"]) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: next } : b)));
  }, []);

  const handleCreateBooking = useCallback(
    (input: NewBookingInput) => {
      const rooms = roomsQuery.data ?? [];
      const room = rooms.find((r) => r.id === input.roomId);
      if (!room) return;

      const nightMs = 86_400_000;
      const nights = Math.max(
        1,
        Math.round(
          (new Date(`${input.checkOut}T00:00:00`).getTime() -
            new Date(`${input.checkIn}T00:00:00`).getTime()) /
            nightMs,
        ),
      );

      const nextNumber = bookings.reduce((max, b) => {
        const n = parseInt(b.id.replace("PB-", ""), 10);
        return Number.isNaN(n) ? max : Math.max(max, n);
      }, 2200);

      const booking: Booking = {
        id: `PB-${nextNumber + 1}`,
        guest: { name: input.guestName, email: input.email, phone: input.phone },
        room: {
          number: room.number,
          type: room.type,
          floor: room.floor,
          rateName: room.bedConfig,
        },
        checkIn: input.checkIn,
        checkOut: input.checkOut,
        status: "pending",
        amount: room.baseRate * nights,
        currency: "BDT",
        channel: "direct",
        adults: input.adults,
        children: 0,
        nights,
        createdAt: new Date().toISOString(),
        source: "nextstay.hotel (admin)",
      };

      setBookings((prev) => [booking, ...prev]);
    },
    [bookings, roomsQuery.data],
  );

  const onRetryBookings = useCallback(() => bookingsQuery.refetch(), [bookingsQuery]);
  const onRetryRooms = useCallback(() => roomsQuery.refetch(), [roomsQuery]);
  const onRetryStats = useCallback(() => statsQuery.refetch(), [statsQuery]);

  switch (tab) {
    case "bookings":
      if (bookingId) {
        const booking = bookings.find((b) => b.id === bookingId);
        return booking ? (
          <BookingDetail
            booking={booking}
            onBack={handleCloseBooking}
            onStatusChange={handleStatusChange}
            role={role}
          />
        ) : (
          <BookingsSection
            bookings={bookings}
            isLoading={bookingsQuery.isLoading}
            isError={bookingsQuery.isError}
            error={bookingsQuery.error}
            onRetry={onRetryBookings}
            onSelectBooking={handleSelectBooking}
            onNewBooking={() => useUiStore.getState().openNewBooking()}
          />
        );
      }
      return (
        <>
          <BookingsSection
            bookings={bookings}
            isLoading={bookingsQuery.isLoading}
            isError={bookingsQuery.isError}
            error={bookingsQuery.error}
            onRetry={onRetryBookings}
            onSelectBooking={handleSelectBooking}
            onNewBooking={() => useUiStore.getState().openNewBooking()}
          />
          <NewBookingDialog
            open={newBookingOpen}
            onOpenChange={(open) => (open ? useUiStore.getState().openNewBooking() : closeNewBooking())}
            rooms={roomsQuery.data ?? []}
            onCreated={handleCreateBooking}
          />
        </>
      );

    case "availability":
      return (
        <RoomAvailabilitySection
          rooms={roomsQuery.data ?? []}
          bookings={bookings}
          isLoading={roomsQuery.isLoading}
          isError={roomsQuery.isError}
          error={roomsQuery.error}
          onRetry={onRetryRooms}
        />
      );

    case "rooms":
      return (
        <>
          <RoomsServicesSection
            rooms={roomsQuery.data ?? []}
            requests={mockServiceRequests}
            isLoading={roomsQuery.isLoading}
            isError={roomsQuery.isError}
            error={roomsQuery.error}
            onRetry={onRetryRooms}
          />
        </>
      );

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

    case "platform":
      return (
        <Placeholder title="Platform Hotels" sub="Approvals for hotels joining NextStay" tabId="platform" />
      );

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
          payload={statsQuery.data}
          bookings={bookings}
          isLoading={statsQuery.isLoading}
          isError={statsQuery.isError}
          error={statsQuery.error}
          onRetry={onRetryStats}
          role={role}
          onSelectBooking={handleSelectBooking}
        />
      );
  }
}