"use client";

import { Wrench, Sparkles, DoorOpen, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { RoomType, ServiceRequest } from "@/types/types";

interface RoomsServicesSectionProps {
  rooms: RoomType[];
  requests: ServiceRequest[];
  onResolve?: (request: ServiceRequest) => void;
}

// ── Request type icon ─────────────────────────────────────────────────────────
function RequestIcon({ request }: { request: string }) {
  if (/ac|cool|temperature|maintenance/i.test(request))
    return <Wrench size={15} className="text-red-600" />;
  if (/towel|clean|housekeep|service/i.test(request))
    return <Sparkles size={15} className="text-amber-600" />;
  return <DoorOpen size={15} className="text-indigo-600" />;
}

// ── Room type card ────────────────────────────────────────────────────────────
function RoomTypeCard({ room }: { room: RoomType }) {
  const pct = Math.round((room.occupied / room.total) * 100);
  const fillColor =
    pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-indigo-500" : "bg-emerald-500";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <div className="text-[13px] font-semibold text-slate-800">{room.name}</div>
          <div className="mt-0.5 text-xs text-slate-400">{room.price}/night</div>
        </div>
        {room.activeRequests > 0 && (
          <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
            {room.activeRequests} req{room.activeRequests > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Occupancy progress */}
      <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn("h-full rounded-full transition-all", fillColor)}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500">
          {room.occupied}/{room.total} occupied
        </span>
        <span
          className={cn(
            "font-semibold",
            pct >= 90 ? "text-red-600" : pct >= 70 ? "text-indigo-600" : "text-emerald-600",
          )}
        >
          {pct}%
        </span>
      </div>
    </div>
  );
}

// ── Service request row ───────────────────────────────────────────────────────
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
        req.urgent
          ? "border-red-200 bg-red-50/40"
          : "border-slate-200 bg-white",
      )}
    >
      <div className="flex items-center gap-3">
        {/* Icon badge */}
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg",
            req.urgent ? "bg-red-100" : "bg-slate-100",
          )}
        >
          <RequestIcon request={req.request} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-medium text-slate-800">
              Room {req.room} — {req.request}
            </span>
            {req.urgent && (
              <span className="rounded-full bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-600">
                URGENT
              </span>
            )}
          </div>
          <div className="mt-0.5 text-[11px] text-slate-400">
            {req.guest} · {req.time}
          </div>
        </div>
      </div>

      <button
        onClick={() => onResolve?.(req)}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
      >
        <CheckCircle2 size={13} />
        Resolve
      </button>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function RoomsServicesSection({
  rooms,
  requests,
  onResolve,
}: RoomsServicesSectionProps) {
  // TODO: Replace with RTK Query useGetRoomTypesQuery() — room inventory & occupancy
  // TODO: Replace with RTK Query useGetServiceRequestsQuery({ status: "open" }) — active requests
  // TODO: Replace useGetServiceRequestsQuery with real-time WebSocket subscription or polling

  return (
    <div className="space-y-6">
      {/* ── Header ──────────────────────────────────────── */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Rooms & Services</h2>
        <p className="mt-1 text-sm text-slate-500">
          Inventory, rates, and active guest requests
        </p>
      </div>

      {/* ── Room type grid ───────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {rooms.map((r) => (
          <RoomTypeCard key={r.name} room={r} />
        ))}
      </div>

      {/* ── Active requests ──────────────────────────────── */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-700">Active service requests</h3>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
            {requests.length} open
          </span>
        </div>
        <div className="space-y-2">
          {requests.map((r, i) => (
            <ServiceRow key={i} req={r} onResolve={onResolve} />
          ))}
        </div>
      </div>
    </div>
  );
}
