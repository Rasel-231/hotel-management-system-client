import type { Booking } from "@/types/types";

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  meta?: { page: number; limit: number; total: number };
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock data layer for the booking domain.
//
// These functions are the seam where RTK Query will slot in later: each one
// mirrors a future endpoint on `bookingApi` (see ../store/api for the pattern
// already used by userApi/roomApi). Callers only consume the return shape, so
// swapping the fetch for `bookingApi.useGetBookingsQuery()` is a close to
// find-and-replace change.
// ─────────────────────────────────────────────────────────────────────────────

function readEnvelope<T>(res: Response): Promise<ApiEnvelope<T>> {
  return res.json() as Promise<ApiEnvelope<T>>;
}

// TODO(RTK Query migration): replace with bookingApi.useGetBookingsQuery({ page, limit, status })
// in ../store/api/bookingApi/bookingApi.ts. Keep the same return shape (Booking[])
// so calling components don't change.
export async function getBookings(): Promise<Booking[]> {
  const res = await fetch("/mock/bookings.json");
  if (!res.ok) throw new Error("Failed to load bookings.");
  const { data } = await readEnvelope<Booking[]>(res);
  return data;
}

// TODO(RTK Query migration): replace with bookingApi.useGetBookingByIdQuery(id)
// (a `GET /bookings/:id` endpoint returning Booking).
export async function getBookingById(id: string): Promise<Booking | null> {
  const bookings = await getBookings();
  return bookings.find((b) => b.id === id) ?? null;
}

// TODO(RTK Query migration): replace with bookingApi.useGetBookingsQuery({ status: "pending" | ... })
// which will accept a status filter query param server-side.
export async function getBookingsByStatus(
  status: Booking["status"],
): Promise<Booking[]> {
  const bookings = await getBookings();
  return bookings.filter((b) => b.status === status);
}