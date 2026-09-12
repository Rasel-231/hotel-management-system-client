"use client";

import type { ReactNode } from "react";
import { statusColor, statusLabel } from "@/lib/theme/Theme";
import { cn } from "@/lib/utils";

export function AdminPageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-forest-deep">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 text-sm text-ink-soft/70">{description}</p>
        ) : null}
      </div>
      {actions}
    </div>
  );
}

export function AdminCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-line bg-white shadow-[0_1px_2px_rgba(13,43,36,0.04),0_12px_28px_-18px_rgba(13,43,36,0.25)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const color = statusColor[status] ?? "#8a7a5c";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize"
      style={{ color, background: `${color}18` }}
    >
      <span className="size-1.5 rounded-full" style={{ background: color }} />
      {statusLabel[status] ?? status}
    </span>
  );
}