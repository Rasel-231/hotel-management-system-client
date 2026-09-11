"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import DateRangePicker from "./DateRangePicker";
import GuestsSelector from "./GuestsSelector";
import { useSearchStore } from "@/store/searchStore";
import type { DateRange } from "react-day-picker";

export default function SearchBar() {
  const router = useRouter();
  const { query, setQuery } = useSearchStore();
  const [destination, setDestination] = useState(query.destination ?? "");
  const range: DateRange = { from: query.checkIn ?? undefined, to: query.checkOut ?? undefined };

  const updateDates = (r: DateRange | undefined) => {
    setQuery({ checkIn: r?.from ?? null, checkOut: r?.to ?? null });
  };

  const updateGuests = (guests: {
    adults: number;
    children: number;
    rooms: number;
  }) => {
    setQuery(guests);
  };

  const submit = () => {
    setQuery({ destination: destination.trim() });
    router.push("/hotels");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="grid w-full grid-cols-1 gap-3 rounded-3xl border border-line bg-cream p-2 shadow-[0_24px_50px_-28px_rgba(13,43,36,0.45)] sm:grid-cols-2 lg:grid-cols-[1.4fr_1.2fr_1fr_auto] lg:gap-0 lg:divide-x lg:divide-line/70"
    >
      <label className="flex flex-col justify-center gap-1 rounded-2xl px-4 py-3 sm:py-4 lg:rounded-none lg:px-5">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-caption">
          Destination
        </span>
        <span className="flex items-center gap-2 text-ink">
          <MapPin className="h-4 w-4 shrink-0 text-gold" />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="City, resort or landmark"
            className="w-full bg-transparent text-sm font-medium outline-none placeholder:font-normal placeholder:text-caption"
          />
        </span>
      </label>

      <div className="flex flex-col justify-center gap-1 rounded-2xl px-4 py-3 sm:py-4 lg:rounded-none lg:px-5">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-caption">
          Check-in – Check-out
        </span>
        <DateRangePicker
          value={range}
          onChange={updateDates}
          className="border-0 bg-transparent px-0 py-0 shadow-none hover:border-transparent hover:bg-transparent focus-visible:bg-transparent"
        />
      </div>

      <div className="flex flex-col justify-center gap-1 rounded-2xl px-4 py-3 sm:py-4 lg:rounded-none lg:px-5">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-caption">
          Guests & rooms
        </span>
        <GuestsSelector
          value={{
            adults: query.adults,
            children: query.children,
            rooms: query.rooms,
          }}
          onChange={updateGuests}
          className="border-0 bg-transparent px-0 py-0 shadow-none hover:border-transparent hover:bg-transparent focus-visible:bg-transparent"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="h-full min-h-[52px] self-stretch rounded-2xl bg-gold px-8 text-[15px] font-semibold text-forest-deep shadow-[0_10px_24px_-10px_rgba(201,162,39,0.8)] hover:bg-gold-soft sm:rounded-2xl lg:min-h-0"
      >
        <Search className="h-4 w-4" />
        Search
      </Button>
    </form>
  );
}