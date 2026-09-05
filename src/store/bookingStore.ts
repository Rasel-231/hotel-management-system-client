import { create } from "zustand";

interface BookingState {
  propertyId: string | null;
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  children: number;
  rooms: number;
  promoCode: string;
  selectProperty: (propertyId: string) => void;
  setDates: (checkIn: Date | null, checkOut: Date | null) => void;
  setGuests: (adults: number, children: number, rooms: number) => void;
  setPromoCode: (code: string) => void;
  clear: () => void;
}

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