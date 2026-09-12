import type { BookingStatus } from "@/types/types";

// ─────────────────────────────────────────────────────────────────────────────
// Status lifecycle for bookings. These action buttons drive the booking flow
// end-to-end (mock data): they optimistically update local state and toast a
// confirmation. When the backend lands they become mutations on bookingApi
// (PATCH /bookings/:id/status) — keep the transition rules identical.
// ─────────────────────────────────────────────────────────────────────────────

export interface StatusAction {
  action: "confirm" | "check-in" | "check-out" | "complete" | "cancel" | "no-show";
  label: string;
  next: BookingStatus;
}

const TRANSITIONS: Partial<Record<BookingStatus, StatusAction[]>> = {
  pending: [
    { action: "confirm", label: "Confirm booking", next: "confirmed" },
    { action: "cancel", label: "Cancel booking", next: "cancelled" },
  ],
  confirmed: [
    { action: "check-in", label: "Check in", next: "checked-in" },
    { action: "no-show", label: "Mark no show", next: "no-show" },
    { action: "cancel", label: "Cancel booking", next: "cancelled" },
  ],
  "checked-in": [{ action: "check-out", label: "Check out", next: "checked-out" }],
  "checked-out": [{ action: "complete", label: "Mark completed", next: "completed" }],
};

export function actionsForStatus(status: BookingStatus): StatusAction[] {
  return TRANSITIONS[status] ?? [];
}

export function canTransition(
  status: BookingStatus,
  action: StatusAction["action"],
): boolean {
  return (TRANSITIONS[status] ?? []).some((a) => a.action === action);
}