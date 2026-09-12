import type { Room } from "@/types/types";

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  meta?: { page: number; limit: number; total: number };
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock data layer for the room domain. Mirrors the future `roomApi` endpoints
// (see src/store/api/roomApi/roomApi.ts for the existing RTK Query slice).
// ─────────────────────────────────────────────────────────────────────────────

// TODO(RTK Query migration): replace with roomApi.useGetRoomsByHotelIdQuery(hotelId)
// Keep the same return shape (Room[]) so calling components don't change.
export async function getRooms(): Promise<Room[]> {
  const res = await fetch("/mock/rooms.json");
  if (!res.ok) throw new Error("Failed to load rooms.");
  const { data } = (await res.json()) as ApiEnvelope<Room[]>;
  return data;
}

// TODO(RTK Query migration): replace with roomApi.useGetRoomAvailabilityQuery({ checkIn, checkOut })
// which returns the room inventory with per-room status computed for the dates.
export async function getRoomById(id: string): Promise<Room | null> {
  const rooms = await getRooms();
  return rooms.find((r) => r.id === id) ?? null;
}