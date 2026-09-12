import type { Booking, BookingStatus, Room, RoomStatus } from "@/types/types";
import { toDateKey } from "@/lib/format";

/** Statuses that actually hold a room. */
const ACTIVE_BOOKING_STATUSES = new Set<BookingStatus>(["confirmed", "checked-in"]);
const RESERVED_STATUSES = new Set<BookingStatus>(["pending"]);

interface RoomWithStatus extends Omit<Room, "status"> {
  status: RoomStatus;
}

function rangesOverlap(
  aStart: string,
  aEnd: string,
  bStart: string,
  bEnd: string,
): boolean {
  return aStart < bEnd && bStart < aEnd;
}

/**
 * Compute per-room availability for a stay window.
 *
 * A room is:
 *  - `occupied`   when a confirmed/checked-in booking overlaps the stay
 *  - `reserved`   when a pending booking overlaps the stay
 *  - `maintenance` when the snapshot status says so (never bookable)
 *  - `available`  otherwise
 *
 * TODO(RTK Query migration): replace with roomApi.useCheckRoomAvailabilityQuery({
 *   checkIn, checkOut, hotelId }) once the real endpoint exists. Keep the same
 * return shape (Room[]) so calling components don't change.
 */
export function computeAvailability(
  rooms: Room[],
  bookings: Booking[],
  checkIn?: string,
  checkOut?: string,
): RoomWithStatus[] {
  if (!checkIn || !checkOut) {
    // Snapshot mode — reflect the room inventory status as-is.
    return rooms.map((r) => ({ ...r }));
  }

  return rooms.map((room) => {
    const active = bookings.filter(
      (b) =>
        b.room.number === room.number &&
        (b.status === "pending" ||
          b.status === "confirmed" ||
          b.status === "checked-in") &&
        rangesOverlap(checkIn, checkOut, b.checkIn, b.checkOut),
    );

    if (room.status === "maintenance") {
      return { ...room, status: "maintenance" as const };
    }
    if (active.some((b) => ACTIVE_BOOKING_STATUSES.has(b.status))) {
      return { ...room, status: "occupied" as const };
    }
    if (active.some((b) => RESERVED_STATUSES.has(b.status))) {
      return { ...room, status: "reserved" as const };
    }
    return { ...room, status: "available" as const };
  });
}

/**
 * Bookings that overlap a given day — used by the calendar/availability views
 * to surface who is staying where on a specific date.
 */
export function bookingsOnDay(bookings: Booking[], day: string): Booking[] {
  const key = toDateKey(day);
  return bookings.filter(
    (b) => b.checkIn <= key && key < b.checkOut,
  );
}