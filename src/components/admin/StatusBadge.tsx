"use client";

import { cn } from "@/lib/utils";
import { statusLabel, statusTailwind } from "@/lib/theme/Theme";

// ─────────────────────────────────────────────────────────────────────────────
// Single shared status badge for the whole dashboard. Every booking status,
// room status and filter chip uses this so the color treatment stays
// consistent (forest / gold / cream token system).
// ─────────────────────────────────────────────────────────────────────────────

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const tw = statusTailwind[status] ?? {
    bg: "bg-sand",
    text: "text-caption",
    dot: "bg-caption",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize",
        tw.bg,
        tw.text,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", tw.dot)} />
      {statusLabel[status] ?? status}
    </span>
  );
}