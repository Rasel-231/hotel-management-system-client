"use client";

import { Users, Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface GuestsState {
  adults: number;
  children: number;
  rooms: number;
}

interface GuestsSelectorProps {
  value: GuestsState;
  onChange: (value: GuestsState) => void;
  className?: string;
  align?: "start" | "center" | "end";
}

function Stepper({
  label,
  hint,
  value,
  onChange,
  min = 0,
  max = 10,
}: {
  label: string;
  hint: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  const decrement = (
    <button
      type="button"
      aria-label={`Decrease ${label}`}
      disabled={value <= min}
      onClick={() => onChange(Math.max(min, value - 1))}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-cream text-forest transition-all duration-200 hover:border-gold hover:bg-gold/10 hover:text-gold active:scale-90 disabled:pointer-events-none disabled:opacity-30"
    >
      <Minus className="h-4 w-4" />
    </button>
  );
  const increment = (
    <button
      type="button"
      aria-label={`Increase ${label}`}
      disabled={value >= max}
      onClick={() => onChange(Math.min(max, value + 1))}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-cream text-forest transition-all duration-200 hover:border-gold hover:bg-gold/10 hover:text-gold active:scale-90 disabled:pointer-events-none disabled:opacity-30"
    >
      <Plus className="h-4 w-4" />
    </button>
  );

  return (
    <div className="flex items-center justify-between gap-4 py-1">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink">{label}</p>
        <p className="truncate text-xs text-caption">{hint}</p>
      </div>
      <div className="flex items-center gap-1.5">
        {decrement}
        <span className="w-8 text-center text-base font-bold text-forest tabular-nums">
          {value}
        </span>
        {increment}
      </div>
    </div>
  );
}

export default function GuestsSelector({
  value,
  onChange,
  className,
  align = "center",
}: GuestsSelectorProps) {
  const parts: string[] = [];
  if (value.adults > 0) {
    parts.push(
      `${value.adults} adult${value.adults > 1 ? "s" : ""}`
    );
  }
  if (value.children > 0) {
    parts.push(
      `${value.children} child${value.children > 1 ? "ren" : ""}`
    );
  }
  const totalGuests = value.adults + value.children;
  const label =
    totalGuests === 0
      ? "Add guests"
      : `${parts.join(" · ")} · ${value.rooms} room${value.rooms > 1 ? "s" : ""}`;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            className={cn(
              "group flex-col items-start justify-center gap-1 rounded-2xl border border-line bg-cream px-4 py-3 h-auto w-full text-left font-normal hover:bg-sand hover:border-gold/50 focus-visible:bg-cream",
              className
            )}
          >
            <span className="flex items-center gap-2 text-ink">
              <Users className="h-4 w-4 text-gold" />
              {totalGuests === 0 ? (
                <span className="text-sm text-caption">{label}</span>
              ) : (
                <span className="text-sm font-semibold text-ink">{label}</span>
              )}
            </span>
            <span className="pl-6 text-[11px] font-medium text-caption">
              {value.rooms > 1 ? `${value.rooms} rooms` : "1 room"} · up to{" "}
              {value.rooms * 4} guests
            </span>
          </Button>
        }
      />
      <PopoverContent
        align={align}
        className="w-[320px] overflow-hidden rounded-2xl border-line p-0 shadow-[0_30px_60px_-20px_rgba(13,43,36,0.5)]"
      >
        <div className="flex items-center gap-2 border-b border-line/60 bg-sand/60 px-5 py-3">
          <Users className="h-4 w-4 text-gold" />
          <span className="text-sm font-semibold text-forest">
            {totalGuests === 0
              ? "Who's staying?"
              : `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`
            }
          </span>
        </div>
        <div className="flex flex-col gap-4 p-5">
          <Stepper
            label="Adults"
            hint="Ages 13 or above"
            min={1}
            value={value.adults}
            onChange={(adults) => onChange({ ...value, adults })}
          />
          <div className="h-px bg-line/50" />
          <Stepper
            label="Children"
            hint="Ages 2–12"
            value={value.children}
            onChange={(children) => onChange({ ...value, children })}
          />
          <div className="h-px bg-line/50" />
          <Stepper
            label="Rooms"
            hint="Max guests per room"
            min={1}
            value={value.rooms}
            onChange={(rooms) => onChange({ ...value, rooms })}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}