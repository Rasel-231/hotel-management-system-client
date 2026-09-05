"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

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
  align = "start",
}: DateRangePickerProps) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start gap-2 rounded-2xl border-line bg-cream px-4 py-6 text-left font-normal hover:bg-sand",
              !value?.from && "text-caption",
              className
            )}
          >
            <CalendarIcon className="h-4 w-4 text-gold" />
            {value?.from ? (
              value.to ? (
                <span className="text-ink">
                  {format(value.from, "MMM d")} – {format(value.to, "MMM d")}
                </span>
              ) : (
                <span className="text-ink">{format(value.from, "MMM d")}</span>
              )
            ) : (
              <span className="text-caption">{placeholder}</span>
            )}
          </Button>
        }
      />
      <PopoverContent align={align} className="w-auto p-0">
        <Calendar
          mode="range"
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
          defaultMonth={value?.from}
          disabled={{ before: new Date() }}
        />
      </PopoverContent>
    </Popover>
  );
}