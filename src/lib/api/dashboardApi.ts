import type {
  ChannelShare,
  DashboardStats,
  HotelApproval,
  HotelProfile,
  RevenuePoint,
} from "@/types/types";

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock data layer for the dashboard home. Mirrors the future `dashboardApi`
// RTK Query slice (getDashboardStats / getRevenueChart / getPendingHotels).
// ─────────────────────────────────────────────────────────────────────────────

export interface DashboardPayload {
  profile: HotelProfile;
  stats: DashboardStats;
  revenue: RevenuePoint[];
  channelBreakdown: ChannelShare[];
  pendingHotels: HotelApproval[];
}

// TODO(RTK Query migration): replace with dashboardApi.useGetDashboardStatsQuery()
// Keep the same return shape (DashboardPayload) so calling components don't change.
export async function getDashboardStats(): Promise<DashboardPayload> {
  const res = await fetch("/mock/hotel.json");
  if (!res.ok) throw new Error("Failed to load dashboard stats.");
  const { data } = (await res.json()) as ApiEnvelope<DashboardPayload>;
  return data;
}

// TODO(RTK Query migration): replace with dashboardApi.useGetPendingHotelsQuery()
// SUPER_ADMIN only — hotels awaiting platform approval.
export async function getPendingHotels(): Promise<HotelApproval[]> {
  const payload = await getDashboardStats();
  return payload.pendingHotels;
}