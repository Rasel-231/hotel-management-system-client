"use client";

import { create } from "zustand";

// ─────────────────────────────────────────────────────────────────────────────
// Local UI state for the admin dashboard (sidebar, dialogs, detail panel).
// Contrast with domain data, which flows through the mock fetch layer
// (src/lib/api/*) and later RTK Query. Only transient view-state lives here.
// ─────────────────────────────────────────────────────────────────────────────

interface UiState {
  sidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;

  /** Booking detail panel shown inside the Bookings tab. */
  activeBookingId: string | null;
  openBookingDetail: (id: string) => void;
  closeBookingDetail: () => void;

  /** "New booking" dialog. */
  newBookingOpen: boolean;
  openNewBooking: () => void;
  closeNewBooking: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: false,
  openSidebar: () => set({ sidebarOpen: true }),
  closeSidebar: () => set({ sidebarOpen: false }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  activeBookingId: null,
  openBookingDetail: (id) => set({ activeBookingId: id }),
  closeBookingDetail: () => set({ activeBookingId: null }),

  newBookingOpen: false,
  openNewBooking: () => set({ newBookingOpen: true }),
  closeNewBooking: () => set({ newBookingOpen: false }),
}));