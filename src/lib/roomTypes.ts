import type { Room, RoomType } from "@/types/types";
import { formatCurrency } from "@/lib/format";

/**
 * Aggregate raw room inventory into the per-type summary used by the
 * Rooms & Services view.
 *
 * TODO(RTK Query migration): replace with roomApi.useGetRoomTypesQuery()
 * when the server exposes this aggregation; keep the RoomType[] return shape.
 */
export function aggregateRoomTypes(rooms: Room[]): RoomType[] {
  const byType = new Map<string, Room[]>();
  for (const room of rooms) {
    const list = byType.get(room.type) ?? [];
    list.push(room);
    byType.set(room.type, list);
  }

  return Array.from(byType.entries()).map(([name, list]) => {
    const occupied = list.filter((r) => r.status === "occupied").length;
    const firstRate = list[0]?.baseRate ?? 0;
    return {
      name,
      total: list.length,
      occupied,
      price: formatCurrency(firstRate),
      activeRequests: 0,
    };
  });
}