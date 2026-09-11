import { BookingState } from "@/types/types";
import { create } from "zustand";
export const useBookingStore = create<BookingState>((set) => ({
  propertyId: null,
  checkIn: null,
  checkOut: null,
  adults: 2,
  children: 0,
  rooms: 1,
  promoCode: "",
  selectProperty: (propertyId) => set({ propertyId }),
  setDates: (checkIn, checkOut) => set({ checkIn, checkOut }),
  setGuests: (adults, children, rooms) => set({ adults, children, rooms }),
  setPromoCode: (promoCode) => set({ promoCode }),
  clear: () =>
    set({
      propertyId: null,
      checkIn: null,
      checkOut: null,
      adults: 2,
      children: 0,
      rooms: 1,
      promoCode: "",
    }),
}));