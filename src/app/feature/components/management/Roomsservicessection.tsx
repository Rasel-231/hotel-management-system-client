"use client";

import { useMemo } from "react";
import { CheckCircle2, DoorOpen, Sparkles, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { aggregateRoomTypes } from "@/lib/roomTypes";
import type { Room, ServiceRequest } from "@/types/types";
import { ErrorState, CardGridSkeleton, EmptyState } from "@/components/admin/states";

interface RoomsServicesSectionProps {
  rooms: Room[];
  requests: ServiceRequest[];
  isLoading?: boolean;
  isError?: boolean;
  error?: string | null;
  onRetry?: () => void;
  onResolve?: (request: ServiceRequest) => void;
}

function RequestIcon({ request }: { request: string }) {
  if (/ac|cool|temperature|maintenance/i.test(request)) return <Wrench size={15} className="text-danger" />;
  if (/towel|clean|housekeep|service/i.test(request)) return <Sparkles size={15} className="text-gold-800" />;
  return <DoorOpen size={15} className="text-forest" />;
}

function RoomTypeCard({ room }: { room: { name: string; total: number; occupied: number; price: string } }) {
  const pct = room.total > 0 ? Math.round((room.occupied / room.total) * 100) : 0;
  const fillColor = pct >= 90 ? "bg-danger" : pct >= 70 ? "bg-olive" : "bg-forest";

  return (
    <div className="rounded-xl border border-line bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <div className="text-[13px] font-semibold text-ink">{room.name}</div>
          <div className="mt-0.5 text-xs text-caption">{room.price}/night</div>
        </div>
      </div>
      <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-sand">
        <div
          className={cn("h-full rounded-full transition-all", fillColor)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-ink-soft">
          {room.occupied}/{room.total} occupied
        </span>
        <span
          className={cn(
            "font-semibold",
            pct >= 90 ? "text-danger" : pct >= 70 ? "text-olive" : "text-forest",
          )}
        >
          {pct}%
        </span>
      </div>
    </div>
  );
}

function ServiceRow({
  req,
  onResolve,
}: {
  req: ServiceRequest;
  onResolve?: (r: ServiceRequest) => void;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-xl border p-4 transition-shadow hover:shadow-sm",
        req.urgent ? "border-danger/30 bg-danger/5" : "border-line bg-white",
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg",
            req.urgent ? "bg-blush/60" : "bg-sand",
          )}
        >
          <RequestIcon request={req.request} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-medium text-ink">
              Room {req.room} — {req.request}
            </span>
            {req.urgent && (
              <span className="rounded-full bg-danger/10 px-1.5 py-0.5 text-[10px] font-bold text-danger">
                URGENT
              </span>
            )}
          </div>
          <div className="mt-0.5 text-[11px] text-caption">
            {req.guest} · {req.time}
          </div>
        </div>
      </div>
      <button
        onClick={() => onResolve?.(req)}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-forest/40 hover:bg-forest-100/60 hover:text-forest"
      >
        <CheckCircle2 size={13} />
        Resolve
      </button>
    </div>
  );
}

export default function RoomsServicesSection({
  rooms,
  requests,
  isLoading,
  isError,
  error,
  onRetry,
  onResolve,
}: RoomsServicesSectionProps) {
  // TODO: Replace with RTK Query useGetRoomTypesQuery() — room inventory & occupancy
  // TODO: Replace with RTK Query useGetServiceRequestsQuery({ status: "open" }) — active requests
  const roomTypes = useMemo(() => aggregateRoomTypes(rooms), [rooms]);

  return (
    <div className="space-y-6">
      {/* ── Header ──────────────────────────────────────── */}
      <div>
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-forest-deep">
          Rooms & Services
        </h2>
        <p className="mt-1 text-sm text-ink-soft/70">
          Inventory, rates, and active guest requests
        </p>
      </div>

      {isLoading ? (
        <CardGridSkeleton count={5} />
      ) : isError ? (
        <ErrorState message={error ?? "Failed to load rooms."} onRetry={onRetry} />
      ) : (
        <>
          {/* ── Room type grid ───────────────────────────── */}
          {roomTypes.length === 0 ? (
            <EmptyState title="No room inventory yet" description="Import your room types to see occupancy here." />
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {roomTypes.map((r) => (
                <RoomTypeCard key={r.name} room={r} />
              ))}
            </div>
          )}

          {/* ── Active requests ──────────────────────────── */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-ink">Active service requests</h3>
              {requests.length > 0 && (
                <span className="rounded-full bg-gold-100 px-2 py-0.5 text-xs font-bold text-gold-800">
                  {requests.length} open
                </span>
              )}
            </div>
            {requests.length === 0 ? (
              <EmptyState title="No active requests" description="Guest service requests will appear here." />
            ) : (
              <div className="space-y-2">
                {requests.map((r, i) => (
                  <ServiceRow key={i} req={r} onResolve={onResolve} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}