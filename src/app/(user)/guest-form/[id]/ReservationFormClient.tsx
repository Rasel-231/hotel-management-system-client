"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CalendarClock, Loader2 } from "lucide-react";
import { useGetRoomsByHotelIdQuery } from "@/store/api/roomApi/roomApi";
import { useBookingStore } from "@/store/bookingStore";
import {
  useGuestBookingsStore,
  type GuestBookingRoom,
} from "@/store/guestBookingsStore";
import ReservationForm, {
  type CurrentActor,
  type ReservationPayload,
} from "@/app/feature/components/hotels/detail/ReservationForm";

/** "yyyy-mm-dd" input value from a Date (or "" when unset). */
function toDateInput(date: Date | null): string {
  if (!date) return "";
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

/**
 * Who is making this booking? Prefers the signed-in account persisted by the
 * auth flow (localStorage "user"), otherwise falls back to an anonymous guest.
 */
function resolveActor(): CurrentActor {
  if (typeof window === "undefined") {
    return { id: "", name: "", email: "", role: "GUEST" };
  }
  try {
    const raw = window.localStorage.getItem("user");
    if (raw) {
      const user = JSON.parse(raw) as {
        id?: string;
        name?: string;
        email?: string;
      };
      return {
        id: user.id ?? "",
        name: user.name ?? "Guest",
        email: user.email ?? "",
        phone: null,
        role: "USER",
      };
    }
  } catch {
    // fall through to anonymous guest
  }
  return { id: "", name: "Guest", email: "", role: "GUEST" };
}

const HOTEL_NAME = "Hotel NextStay";

export default function ReservationFormClient({
  hotelId,
}: {
  hotelId: string;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: roomsData, isLoading: roomsLoading } =
    useGetRoomsByHotelIdQuery(hotelId);
  const rooms = useMemo(() => roomsData?.data ?? [], [roomsData]);

  const bookingStore = useBookingStore();
  const addBooking = useGuestBookingsStore((s) => s.addBooking);

  // Resolve once at mount — sign-in state does not change mid-page.
  const actor = useMemo(() => resolveActor(), []);

  const handleSubmit = useCallback(
    async (payload: ReservationPayload) => {
      setIsSubmitting(true);
      try {
        const room = rooms.find((r) => r.id === payload.roomId);
        if (!room) throw new Error("Selected room is no longer available");

        const booking = addBooking({
          hotelId,
          hotelName: HOTEL_NAME,
          room: room as GuestBookingRoom,
          checkIn: payload.checkIn,
          checkOut: payload.checkOut,
          adults: payload.adults,
          children: payload.children,
          roomsCount: payload.roomsCount,
          bookedBy: {
            name: actor.name,
            email: actor.email,
            phone: actor.phone ?? undefined,
          },
          bookedFor: payload.bookedFor,
          guest: payload.guest
            ? {
                name: payload.guest.name,
                email: payload.guest.email,
                phone: payload.guest.phone,
                idType: payload.guest.idType,
                idNumber: payload.guest.idNumber,
                address: payload.guest.address,
                purposeOfVisit: payload.guest.purposeOfVisit,
              }
            : undefined,
          specialRequests: payload.specialRequests,
          promoCode: bookingStore.promoCode || undefined,
        });

        toast.success("Booking confirmed!", {
          description: `Reference ${booking.id} — see you soon.`,
        });
        router.push(`/booking-confirmed/${booking.id}`);
      } catch {
        toast.error("Booking could not be created. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [actor, addBooking, bookingStore.promoCode, hotelId, rooms, router],
  );

  if (roomsLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-caption">
          <Loader2 className="h-7 w-7 animate-spin text-gold-800" />
          <span className="text-sm">Loading rooms…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      {rooms.length === 0 && (
        <div className="mx-auto mb-6 flex max-w-5xl items-center gap-3 rounded-xl border border-line bg-cream px-4 py-3 text-sm text-caption">
          <CalendarClock className="h-4 w-4 shrink-0 text-gold-800" />
          We couldn&apos;t fetch live availability. You can still fill in the
          form and we&apos;ll confirm your room by phone.
        </div>
      )}
      <ReservationForm
        hotelId={hotelId}
        hotelName={HOTEL_NAME}
        rooms={rooms}
        actor={actor}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        initialValues={{
          checkIn: toDateInput(bookingStore.checkIn),
          checkOut: toDateInput(bookingStore.checkOut),
          adults: bookingStore.adults || 1,
          children: bookingStore.children || 0,
          roomsCount: bookingStore.rooms || 1,
        }}
      />
    </div>
  );
}