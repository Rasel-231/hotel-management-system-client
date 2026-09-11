"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { HotelMockPayload } from "@/types/types";
import { fallbackHotelMockPayload } from "@/lib/data/MockData";

type HotelMockState = {
  data: HotelMockPayload | null;
  isLoading: boolean;
  error: string | null;
};

const HotelMockContext = createContext<HotelMockState | null>(null);

export function HotelMockDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<HotelMockState>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    // TODO: Replace with RTK Query hook useGetDashboardStatsQuery()
    // TODO: Replace with RTK Query hook useGetBookingsQuery()
    // TODO: Replace with RTK Query hook useGetRoomsQuery()
    fetch("/data/hotel-mock-data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load hotel mock data");
        return res.json() as Promise<HotelMockPayload>;
      })
      .then((json) => {
        if (cancelled) return;
        setState({ data: json, isLoading: false, error: null });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setState({
          data: fallbackHotelMockPayload,
          isLoading: false,
          error: err instanceof Error ? err.message : "Using local fallback data",
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <HotelMockContext.Provider value={state}>{children}</HotelMockContext.Provider>
  );
}

export function useHotelMockData(): HotelMockState {
  const ctx = useContext(HotelMockContext);
  if (!ctx) {
    throw new Error("useHotelMockData must be used inside HotelMockDataProvider");
  }
  return ctx;
}
