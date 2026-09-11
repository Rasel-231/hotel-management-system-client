import { WishlistState } from "@/types/types";
import { create } from "zustand";

export const useWishlistStore = create<WishlistState>((set, get) => ({
  ids: [],
  toggle: (id) => {
    const exists = get().ids.includes(id);
    set((state) => ({
      ids: exists
        ? state.ids.filter((i) => i !== id)
        : [...state.ids, id],
    }));
    return !exists;
  },
  has: (id) => get().ids.includes(id),
  remove: (id) =>
    set((state) => ({ ids: state.ids.filter((i) => i !== id) })),
}));