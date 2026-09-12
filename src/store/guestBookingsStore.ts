"use client";

import { create } from "zustand";
import type { Booking } from "@/types/types";

// ─────────────────────────────────────────────────────────────────────────────
// Guest-side bookings store.
//
// Flow:  BookingWidget → /guest-form/[id] → ReservationForm
//        → this store.addBooking()        → /booking-confirmed/[ref]
//
// Bookings persist to localStorage so a refresh keeps them. The stored record
// uses the shared `Booking` domain shape (used by the admin dashboard too), so
// a future RTK Query mutation (POST /bookings) can replace `addBooking`
// wholesale with a one-line swap.
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = "guestBookings";
const BASE_REF = 2400;

export interface GuestBookingRoom {
  id: string;
  type: string;
  price: number;
  capacity: number;
  bedConfig?: string | null;
}

export interface GuestBookingGuest {
  name: string;
  email?: string;
  phone: string;
  idType: string;
  idNumber: string;
  address: string;
  purposeOfVisit: string;
}

export interface GuestBookingInput {
  hotelId: string;
  hotelName: string;
  room: GuestBookingRoom;
  checkIn: string; // yyyy-mm-dd
  checkOut: string; // yyyy-mm-dd
  adults: number;
  children: number;
  roomsCount: number;
  bookedBy: { name?: string; email?: string; phone?: string };
  bookedFor: "SELF" | "GUEST";
  guest?: GuestBookingGuest;
  specialRequests?: string;
  promoCode?: string;
}

interface GuestBookingsState {
  bookings: Booking[];
  addBooking: (input: GuestBookingInput) => Booking;
  findByRef: (ref: string) => Booking | undefined;
}

function loadBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Booking[]) : [];
  } catch {
    return [];
  }
}

function persist(bookings: Booking[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  } catch {
    // storage unavailable (private mode / quota) → in-memory only
  }
}

function nextRef(bookings: Booking[]): string {
  let max = BASE_REF;
  for (const b of bookings) {
    const n = Number.parseInt(b.id.replace("PB-", ""), 10);
    if (!Number.isNaN(n) && n > max) max = n;
  }
  return `PB-${max + 1}`;
}

function computeNights(checkIn: string, checkOut: string): number {
  const ms =
    new Date(`${checkOut}T00:00:00`).getTime() -
    new Date(`${checkIn}T00:00:00`).getTime();
  return Math.max(1, Math.round(ms / 86_400_000));
}

export const useGuestBookingsStore = create<GuestBookingsState>((set, get) => ({
  bookings: loadBookings(),

  addBooking: (input) => {
    const { bookings } = get();
    const id = nextRef(bookings);
    const nights = computeNights(input.checkIn, input.checkOut);

    const noteParts = [input.specialRequests?.trim()];
    if (input.promoCode) noteParts.push(`Promo: ${input.promoCode}`);
    const note = noteParts.filter(Boolean).join(" / ") || undefined;

    const booking: Booking = {
      id,
      guest:
        input.bookedFor === "GUEST" && input.guest
          ? {
              name: input.guest.name,
              email: input.guest.email ?? "",
              phone: input.guest.phone,
            }
          : {
              name: input.bookedBy.name ?? "Guest",
              email: input.bookedBy.email ?? "",
              phone: input.bookedBy.phone,
            },
      room: {
        number: input.room.id,
        type: input.room.type,
        rateName: input.room.bedConfig ?? `${input.room.capacity} guests`,
      },
      checkIn: input.checkIn,
      checkOut: input.checkOut,
      status: "confirmed",
      amount: input.room.price * nights * input.roomsCount,
      currency: "BDT",
      channel: "direct",
      adults: input.adults,
      children: input.children,
      nights,
      createdAt: new Date().toISOString(),
      source: "nextstay.hotel (web)",
      hotelId: input.hotelId,
      note,
      ...(input.bookedFor === "GUEST" && input.guest
        ? {
            registration: {
              idType: input.guest.idType,
              idNumber: input.guest.idNumber,
              address: input.guest.address,
              purposeOfVisit: input.guest.purposeOfVisit,
            },
          }
        : {}),
    };

    const next = [booking, ...bookings];
    set({ bookings: next });
    persist(next);
    return booking;
  },

  findByRef: (ref) => get().bookings.find((b) => b.id === ref),
}));