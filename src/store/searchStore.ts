import { create } from "zustand";

export interface SearchQuery {
  destination: string;
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  children: number;
  rooms: number;
}

export type SortOption =
  | "recommended"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "popular";

export interface SearchFilters {
  priceRange: [number, number];
  stars: number[];
  propertyTypes: string[];
  amenities: string[];
  sort: SortOption;
}

const initialQuery: SearchQuery = {
  destination: "",
  checkIn: null,
  checkOut: null,
  adults: 2,
  children: 0,
  rooms: 1,
};

const initialFilters: SearchFilters = {
  priceRange: [0, 5000],
  stars: [],
  propertyTypes: [],
  amenities: [],
  sort: "recommended",
};

interface SearchState {
  query: SearchQuery;
  filters: SearchFilters;
  setQuery: (patch: Partial<SearchQuery>) => void;
  setFilters: (patch: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  reset: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: initialQuery,
  filters: initialFilters,
  setQuery: (patch) =>
    set((state) => ({ query: { ...state.query, ...patch } })),
  setFilters: (patch) =>
    set((state) => ({ filters: { ...state.filters, ...patch } })),
  resetFilters: () =>
    set((state) => ({ filters: { ...initialFilters, sort: state.filters.sort } })),
  reset: () => set({ query: initialQuery, filters: initialFilters }),
}));