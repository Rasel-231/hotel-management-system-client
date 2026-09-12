"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  BedDouble,
  CalendarDays,
  IdCard,
  MessageSquareText,
  SearchX,
  Users,
} from "lucide-react";
import { useGuestBookingsStore } from "@/store/guestBookingsStore";
import { formatCurrency, formatDate } from "@/lib/format";
import { StatusBadge } from "@/components/admin/StatusBadge";

const PURPOSES: Record<string, string> = {
  BUSINESS: "Business",
  LEISURE: "Leisure",
  MEDICAL: "Medical",
  OFFICIAL: "Official",
  OTHER: "Other",
};

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-line last:border-0 py-2.5">
      <dt className="text-sm text-caption">{label}</dt>
      <dd className="text-right text-sm font-medium text-ink">{value}</dd>
    </div>
  );
}

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-cream p-5 sm:p-6">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-lg bg-forest-100 text-forest">
          {icon}
        </span>
        <h2 className="font-serif text-lg text-forest">{title}</h2>
      </div>
      <dl>{children}</dl>
    </section>
  );
}

export default function BookingConfirmedClient({ ref: bookingRef }: { ref: string }) {
  const bookings = useGuestBookingsStore((s) => s.bookings);
  const booking = useMemo(
    () => bookings.find((b) => b.id === bookingRef),
    [bookings, bookingRef],
  );

  if (!booking) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-sand text-caption">
          <SearchX className="h-7 w-7" />
        </span>
        <h1 className="mt-5 font-serif text-2xl text-forest">
          Booking not found
        </h1>
        <p className="mt-2 text-sm text-ink-soft/80">
          We couldn&apos;t find a booking with reference{" "}
          <span className="font-semibold text-ink">{bookingRef}</span>. It may
          have been cleared from this device.
        </p>
        <Link
          href="/hotels"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-cream px-5 py-2.5 text-sm font-medium text-forest transition-colors hover:border-gold-400 hover:bg-gold-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Browse stays
        </Link>
      </div>
    );
  }

  const isGuestBooking = !!booking.registration;
  const guestsText = `${booking.adults} adult${booking.adults > 1 ? "s" : ""}${
    booking.children > 0 ? `, ${booking.children} child${booking.children > 1 ? "ren" : ""}` : ""
  }`;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      {/* ── Header ─────────────────────────────────────── */}
      <div className="text-center">
        <span className="inline-flex size-16 items-center justify-center rounded-full bg-forest text-cream shadow-[0_16px_30px_-14px_rgba(13,43,36,0.9)]">
          <BadgeCheck className="h-8 w-8" />
        </span>
        <h1 className="mt-5 font-serif text-3xl text-forest">
          Booking confirmed
        </h1>
        <p className="mt-2 text-sm text-ink-soft/80">
          Thank you, {booking.guest.name.split(" ")[0]}. A confirmation has been
          sent to {booking.guest.email || "your contact details"}.
        </p>
        <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-line bg-cream px-4 py-2">
          <span className="text-xs text-caption">Reference</span>
          <span className="font-mono text-sm font-bold text-forest">
            {booking.id}
          </span>
          <StatusBadge status={booking.status} />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <SectionCard
          title={booking.room.type}
          icon={<BedDouble className="h-4 w-4" />}
        >
          <DetailRow
            label="Room"
            value={`Room ${booking.room.number} · ${booking.room.rateName}`}
          />
          <DetailRow label="Check-in" value={formatDate(booking.checkIn)} />
          <DetailRow label="Check-out" value={formatDate(booking.checkOut)} />
          <DetailRow
            label="Nights"
            value={`${booking.nights} night${booking.nights > 1 ? "s" : ""}`}
          />
          <DetailRow label="Guests" value={guestsText} />
          <DetailRow label="Source" value={booking.source ?? "Direct"} />
        </SectionCard>

        <SectionCard
          title={isGuestBooking ? "Guest registration" : "Booked by"}
          icon={<Users className="h-4 w-4" />}
        >
          <DetailRow label="Name" value={booking.guest.name} />
          <DetailRow label="Phone" value={booking.guest.phone ?? "—"} />
          {booking.guest.email && (
            <DetailRow label="Email" value={booking.guest.email} />
          )}
          {booking.registration && (
            <>
              <DetailRow
                label="ID"
                value={`${booking.registration.idType} · ${booking.registration.idNumber}`}
              />
              <DetailRow label="Address" value={booking.registration.address} />
              <DetailRow
                label="Purpose of visit"
                value={
                  PURPOSES[booking.registration.purposeOfVisit] ??
                  booking.registration.purposeOfVisit
                }
              />
            </>
          )}
        </SectionCard>

        {booking.note && (
          <SectionCard
            title="Special requests"
            icon={<MessageSquareText className="h-4 w-4" />}
          >
            <p className="text-sm leading-relaxed text-ink-soft">{booking.note}</p>
          </SectionCard>
        )}

        <section className="rounded-2xl border border-gold-soft bg-gold-100 px-5 py-5 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-gold-800">
              <CalendarDays className="h-4 w-4" />
              Total due at property
            </div>
            <span className="font-serif text-2xl font-bold text-forest-deep">
              {formatCurrency(booking.amount, booking.currency)}
            </span>
          </div>
          <p className="mt-1 text-xs text-gold-800/80">
            $ taxes &amp; fees included · pay at the hotel, no prepayment needed.
          </p>
        </section>

        <div className="flex flex-col items-center gap-3 pt-2">
          <Link
            href="/hotels"
            className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest-deep"
          >
            Browse more stays
          </Link>
          {booking.hotelId && (
            <Link
              href={`/hotels/${booking.hotelId}`}
              className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-forest"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to the property
            </Link>
          )}
        </div>
      </div>

      {/* tiny footer */}
      <p className="mt-10 flex items-center justify-center gap-1.5 text-xs text-caption">
        <IdCard className="h-3.5 w-3.5" />
        Carry your valid ID — it&apos;s required for local registration.
      </p>
    </div>
  );
}