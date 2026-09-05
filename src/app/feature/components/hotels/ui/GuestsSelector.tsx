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
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        <p className="text-xs text-caption">{hint}</p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={`Decrease ${label}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="h-9 w-9 rounded-full border-line text-forest hover:bg-sand"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-6 text-center text-sm font-semibold text-ink tabular-nums">
          {value}
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={`Increase ${label}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="h-9 w-9 rounded-full border-line text-forest hover:bg-sand"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default function GuestsSelector({
  value,
  onChange,
  className,
  align = "start",
}: GuestsSelectorProps) {
  const total = value.adults + value.children;
  const label =
    total === 0
      ? "Add guests"
      : `${total} guest${total > 1 ? "s" : ""}, ${value.rooms} room${value.rooms > 1 ? "s" : ""}`;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start gap-2 rounded-2xl border-line bg-cream px-4 py-6 text-left font-normal hover:bg-sand",
              total === 0 ? "text-caption" : "text-ink",
              className
            )}
          >
            <Users className="h-4 w-4 text-gold" />
            {label}
          </Button>
        }
      />
      <PopoverContent align={align} className="w-[300px]">
        <div className="flex flex-col gap-5 p-3">
          <Stepper
            label="Adults"
            hint="Ages 13 or above"
            min={1}
            value={value.adults}
            onChange={(adults) => onChange({ ...value, adults })}
          />
          <Stepper
            label="Children"
            hint="Ages 2–12"
            value={value.children}
            onChange={(children) => onChange({ ...value, children })}
          />
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