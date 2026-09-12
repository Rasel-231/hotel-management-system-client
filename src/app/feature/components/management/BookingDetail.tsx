"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  CreditCard,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { actionsForStatus } from "@/lib/bookingTransitions";
import { formatCurrency, formatDateLong, formatNights, formatRelativeDay } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Booking, HotelRole } from "@/types/types";

interface BookingDetailProps {
  booking: Booking;
  onBack: () => void;
  onStatusChange: (id: string, next: Booking["status"]) => void;
  role: HotelRole;
}

const EDIT_ROLES: HotelRole[] = ["SUPER_ADMIN", "ADMIN", "OWNER", "MANAGER", "FRONT_DESK"];

export default function BookingDetail({
  booking,
  onBack,
  onStatusChange,
  role,
}: BookingDetailProps) {
  const actions = actionsForStatus(booking.status);
  const canEdit = EDIT_ROLES.includes(role) && actions.length > 0;

  const handleAction = (action: (typeof actions)[number]) => {
    onStatusChange(booking.id, action.next);
    toast.success(`Booking ${booking.id} → ${action.label}`);
  };

  const row = (label: string, value: string) => (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <span className="text-xs font-medium text-caption">{label}</span>
      <span className="text-right text-[13px] font-medium text-ink">{value}</span>
    </div>
  );

  return (
    <div className="space-y-5">
      {/* ── Header ───────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-forest hover:text-forest-deep"
        >
          <ArrowLeft size={15} />
          Back to bookings
        </button>
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-sm font-semibold text-ink-soft">{booking.id}</span>
          <motion.div
            key={booking.status}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
          >
            <StatusBadge status={booking.status} />
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* ── Guest + itinerary ──────────────────────────── */}
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-xl border border-line bg-white p-5">
            <h3 className="font-serif text-base font-semibold text-forest-deep">
              Guest
            </h3>
            <div className="mt-1 flex items-start gap-3">
              <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full bg-forest-100 font-serif text-sm font-semibold text-forest">
                {booking.guest.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-ink">{booking.guest.name}</p>
                <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-caption">
                  <span className="inline-flex items-center gap-1">
                    <Mail size={12} /> {booking.guest.email}
                  </span>
                  {booking.guest.phone ? (
                    <span className="inline-flex items-center gap-1">
                      <Phone size={12} /> {booking.guest.phone}
                    </span>
                  ) : null}
                  {booking.guest.nationality ? (
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={12} /> {booking.guest.nationality}
                    </span>
                  ) : null}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-line bg-white p-5">
            <h3 className="font-serif text-base font-semibold text-forest-deep">
              Stay details
            </h3>
            <div className="mt-1 divide-y divide-line/60">
              {row("Room", `${booking.room.type} · ${booking.room.number}`)}
              {row("Rate plan", booking.room.rateName)}
              {row("Floor", booking.room.floor ?? "—")}
              {row(
                "Check-in",
                `${formatRelativeDay(booking.checkIn)} · ${formatDateLong(booking.checkIn)}`,
              )}
              {row(
                "Check-out",
                `${formatRelativeDay(booking.checkOut)} · ${formatDateLong(booking.checkOut)}`,
              )}
              {row("Nights", formatNights(booking.nights))}
              {row(
                "Guests",
                `${booking.adults} adult${booking.adults === 1 ? "" : "s"}${
                  booking.children > 0 ? ` · ${booking.children} child` : ""
                }`,
              )}
            </div>
            {booking.note ? (
              <p className="mt-3 rounded-lg bg-gold-100/60 px-3 py-2 text-xs text-gold-800">
                <span className="font-semibold">Guest note: </span>
                {booking.note}
              </p>
            ) : null}
          </div>
        </div>

        {/* ── Booking meta + actions ─────────────────────── */}
        <div className="space-y-4">
          <div className="rounded-xl border border-line bg-white p-5">
            <h3 className="font-serif text-base font-semibold text-forest-deep">
              Payment
            </h3>
            <div className="mt-1 divide-y divide-line/60">
              {row("Channel", booking.channel)}
              {booking.source ? row("Source", booking.source) : null}
              {row("Created", formatRelativeDay(toDay(booking.createdAt)))}
            </div>
            <div className="mt-3 flex items-center justify-between rounded-lg bg-forest-100 px-4 py-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest">
                <CreditCard size={14} /> Total
              </span>
              <span className="font-serif text-lg font-bold text-forest-deep">
                {formatCurrency(booking.amount, booking.currency)}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-line bg-white p-5">
            <h3 className="font-serif text-base font-semibold text-forest-deep">
              Reservation status
            </h3>
            <p className="mt-1 text-xs text-caption">
              {booking.status === "pending"
                ? "Awaiting confirmation or payment authorisation."
                : booking.status === "confirmed"
                  ? "Confirmed — ready for check-in on the arrival date."
                  : booking.status === "checked-in"
                    ? "Guest is currently on property."
                    : booking.status === "checked-out"
                      ? "Guest has checked out — flag as completed once settled."
                      : booking.status === "completed"
                        ? "This stay is fully settled."
                        : "This reservation is no longer active."}
            </p>
            {canEdit && (
              <div className="mt-4 space-y-2">
                {actions.map((a) => (
                  <Button
                    key={a.action}
                    onClick={() => handleAction(a)}
                    className={cn(
                      "w-full",
                      a.action === "cancel"
                        ? "border-danger/30 bg-danger/10 text-danger hover:bg-danger/20"
                        : a.next === "confirmed"
                          ? "bg-forest text-cream hover:bg-forest-deep"
                          : "bg-gold text-forest-deep hover:bg-gold-soft",
                    )}
                  >
                    {a.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function toDay(datetime: string): string {
  return datetime.slice(0, 10);
}