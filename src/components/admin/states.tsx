"use client";

import { AlertTriangle, RefreshCw, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Shared loading / empty / error treatments for every dashboard list view.
// Keeps the happy path consistent across sections (loading skeletons on rows,
// a calm empty state, and a recoverable error state).
// ─────────────────────────────────────────────────────────────────────────────

export function TableRowSkeleton({ cols }: { cols: number }) {
  return (
    <div className="animate-pulse space-y-2 px-4 py-3">
      <div className="flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <div
            key={i}
            className="h-3.5 flex-1 rounded bg-sand"
            style={{ opacity: 1 - i * 0.12 }}
          />
        ))}
      </div>
    </div>
  );
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-xl border border-line bg-white p-4">
          <div className="h-4 w-1/3 rounded bg-sand" />
          <div className="mt-3 h-3 w-2/3 rounded bg-sand" />
          <div className="mt-2 h-3 w-1/2 rounded bg-sand" />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({
  title = "Nothing here yet",
  description,
  action,
  className,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-line bg-white px-6 py-14 text-center",
        className,
      )}
    >
      <div className="flex size-11 items-center justify-center rounded-full bg-sand text-caption">
        <SearchX size={20} />
      </div>
      <div>
        <p className="text-sm font-semibold text-ink">{title}</p>
        {description ? (
          <p className="mt-1 max-w-xs text-xs text-caption">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function ErrorState({
  message,
  onRetry,
  className,
}: {
  message: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-danger/25 bg-danger/5 px-6 py-12 text-center",
        className,
      )}
    >
      <div className="flex size-11 items-center justify-center rounded-full bg-blush/60 text-danger">
        <AlertTriangle size={20} />
      </div>
      <div>
        <p className="text-sm font-semibold text-ink">Couldn&apos;t load this view</p>
        <p className="mt-1 max-w-sm text-xs text-ink-soft/70">{message}</p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="gap-1.5">
          <RefreshCw size={13} />
          Try again
        </Button>
      )}
    </div>
  );
}