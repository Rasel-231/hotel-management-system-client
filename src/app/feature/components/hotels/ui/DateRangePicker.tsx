"use client";

import { differenceInCalendarDays, format } from "date-fns";
import { CalendarIcon, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { DateRange } from "react-day-picker";

interface DateRangePickerProps {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  className?: string;
  placeholder?: string;
  align?: "start" | "center" | "end";
}

export default function DateRangePicker({
  value,
  onChange,
  className,
  placeholder = "Select dates",
  align = "center",
}: DateRangePickerProps) {
  const nights = value?.from && value?.to
    ? differenceInCalendarDays(value.to, value.from)
    : 0;

  const hasFullRange = Boolean(value?.from && value?.to);
  const fromDate = value?.from;
  const toDate = value?.to;

  const triggerLabel = value?.from
    ? value.to
      ? `${format(value.from, "EEE, MMM d")} – ${format(value.to, "EEE, MMM d")}`
      : format(value.from, "EEE, MMM d")
    : null;

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
              <CalendarIcon className="h-4 w-4 text-gold" />
              {triggerLabel ? (
                <span className="text-sm font-semibold text-ink">
                  {triggerLabel}
                </span>
              ) : (
                <span className="text-sm text-caption">{placeholder}</span>
              )}
            </span>
            {nights > 0 && (
              <span className="flex items-center gap-1 pl-6 text-[11px] font-medium text-caption">
                <Sparkles className="h-3 w-3 text-gold" />
                {nights} night{nights > 1 ? "s" : ""}
              </span>
            )}
          </Button>
        }
      />
      <PopoverContent
        align={align}
        className="w-auto max-w-[520px] overflow-hidden rounded-2xl border-line p-0 shadow-[0_30px_60px_-20px_rgba(13,43,36,0.5)]"
      >
        <Calendar
          mode="range"
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
          captionLayout="dropdown"
          startMonth={new Date(new Date().getFullYear(), 0, 1)}
          endMonth={new Date(new Date().getFullYear() + 2, 11, 31)}
          defaultMonth={value?.from}
          classNames={{
            months:
              "gap-3 px-3 pb-3 pt-2 sm:flex-col sm:max-h-[420px] md:flex-row",
            month: "gap-1",
            month_caption: "h-8 justify-center text-sm font-semibold text-forest",
            dropdowns: "h-8 text-sm font-semibold text-forest",
            weekday:
              "text-[11px] font-bold uppercase tracking-wide text-caption py-1",
            today: "text-gold font-bold after:absolute after:bottom-0.5 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-4 after:bg-gold",
          }}
          disabled={{ before: new Date() }}
        />
        {hasFullRange && fromDate && toDate && (
          <div className="flex items-center justify-between border-t border-line/60 bg-sand/60 px-5 py-3">
            <span className="flex items-center gap-2 text-xs font-medium text-ink">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              {nights} night{nights > 1 ? "s" : ""} selected
            </span>
            <span className="text-xs font-semibold text-forest">
              {format(fromDate, "MMM d")} – {format(toDate, "MMM d")}
            </span>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}