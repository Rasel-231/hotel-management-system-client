"use client";

import { useCallback, useEffect, useState } from "react";
import { getBookingById, getBookings } from "@/lib/api/bookingApi";
import { getDashboardStats, type DashboardPayload } from "@/lib/api/dashboardApi";
import { getRooms } from "@/lib/api/roomApi";
import type { Booking, Room } from "@/types/types";

// ─────────────────────────────────────────────────────────────────────────────
// Thin data hooks that wrap the mock fetch layer (src/lib/api/*).
//
// Each hook returns the classic `{ data, isLoading, isError, error, refetch }`
// contract so components can render loading / error / empty states, and so they
// can later swap to the matching RTK Query hook with a one-line change.
// ─────────────────────────────────────────────────────────────────────────────

interface QueryState<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  refetch: () => void;
}

function useMockQuery<T>(fetcher: () => Promise<T>): QueryState<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetcher()
      .then((result) => {
        if (cancelled) return;
        setData(result);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Something went wrong.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [fetcher, attempt]);

  const refetch = useCallback(() => {
    setError(null);
    setIsLoading(true);
    setAttempt((a) => a + 1);
  }, []);

  return {
    data,
    isLoading,
    isError: error !== null,
    error,
    refetch,
  };
}

// TODO(RTK Query migration): these hooks map 1:1 to future RTK Query hooks —
// useBookings  → bookingApi.useGetBookingsQuery()
// useBookingById → bookingApi.useGetBookingByIdQuery(id)
// useRooms      → roomApi.useGetRoomsByHotelIdQuery(hotelId)
// useDashboardStats → dashboardApi.useGetDashboardStatsQuery()
// The components keep consuming { data, isLoading, error } so the swap is a
// one-line change per hook.

export function useBookings(): QueryState<Booking[]> {
  return useMockQuery(getBookings);
}

export function useBookingById(id: string | null): QueryState<Booking | null> {
  return useMockQuery(
    useCallback(() => (id ? getBookingById(id) : Promise.resolve(null)), [id]),
  );
}

export function useRooms(): QueryState<Room[]> {
  return useMockQuery(getRooms);
}

export function useDashboardStats(): QueryState<DashboardPayload> {
  return useMockQuery(getDashboardStats);
}