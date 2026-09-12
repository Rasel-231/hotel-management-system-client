"use client";

import { useEffect } from "react";
import { differenceInCalendarDays } from "date-fns";
import { ShieldCheck, Undo2, Sparkles, Lock } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import DateRangePicker from "../ui/DateRangePicker";
import GuestsSelector from "../ui/GuestsSelector";
import { useBookingStore } from "@/store/bookingStore";
import type { DateRange } from "react-day-picker";
import { Property } from "@/types/types";
import { useRouter } from "next/navigation";

const VALID_PROMOS = ["STAY10", "RESORT10"];

export default function BookingWidget({ property }: { property: Property }) {
  const router = useRouter();
  const {
    propertyId,
    checkIn,
    checkOut,
    adults,
    children,
    rooms,
    promoCode,
    selectProperty,
    setDates,
    setGuests,
    setPromoCode,
  } = useBookingStore();

  useEffect(() => {
    selectProperty(property.id);
  }, [property.id, selectProperty]);

  const range: DateRange = {
    from: checkIn ?? undefined,
    to: checkOut ?? undefined,
  };

  const symbol = property.currency === "USD" ? "$" : property.currency;

  const nightsRaw =
    checkIn && checkOut
      ? differenceInCalendarDays(checkOut, checkIn)
      : 0;
  const nights = Math.max(0, nightsRaw);

  const promoValid = VALID_PROMOS.includes(promoCode.trim().toUpperCase());
  const subtotal = nights ? property.price * nights * rooms : 0;
  const discount = promoValid ? Math.round(subtotal * 0.1) : 0;
  const taxes = Math.round((subtotal - discount) * 0.12);
  const total = subtotal - discount + taxes;

  const handleBook = () => {
    if (!checkIn || !checkOut) {
      toast.error("Select your check-in and check-out dates first");
      return;
    }
    if (nightsRaw < 1) {
      toast.error("Check-out must be after check-in");
      return;
    }
    if (propertyId !== property.id) selectProperty(property.id);
    router.push(`/guest-form/${property.id}`);
  };

  return (
    <div className="rounded-3xl border border-line bg-cream p-6 shadow-[0_24px_50px_-28px_rgba(13,43,36,0.45)]">
      <div className="flex items-baseline justify-between">
        <p>
          <span className="text-2xl font-bold text-forest">
            {symbol} {property.price}
          </span>
          <span className="text-sm text-caption"> /night</span>
        </p>
        <span className="flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-1 text-xs font-semibold text-forest">
          <Sparkles className="h-3.5 w-3.5 text-gold" />
          {property.stars} star
        </span>
      </div>

      <div className="mt-5 space-y-3">
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-caption">
            Check-in / Check-out
          </p>
          <DateRangePicker
            value={range}
            onChange={(r) => setDates(r?.from ?? null, r?.to ?? null)}
          />
        </div>
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-caption">
            Guests & rooms
          </p>
          <GuestsSelector
            value={{ adults, children, rooms }}
            onChange={(g) => setGuests(g.adults, g.children, g.rooms)}
          />
        </div>
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-caption">
            Promo code
          </p>
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Try STAY10"
            className="w-full rounded-2xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none placeholder:text-caption focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
          {promoValid && (
            <p className="mt-1.5 text-xs font-medium text-olive">
              Promo applied — 10% off confirmed.
            </p>
          )}
        </div>
      </div>

      {nights > 0 && (
        <div className="mt-6 space-y-2.5 border-t border-line pt-5 text-sm">
          <Row
            label={`${symbol}${property.price} × ${nights} night${nights > 1 ? "s" : ""} × ${rooms}`}
            value={subtotal}
            symbol={symbol}
          />
          {promoValid && (
            <Row
              label="Promo discount (10%)"
              value={discount}
              symbol={symbol}
              subtract
              accent
            />
          )}
          <Row label="Taxes & fees (12%)" value={taxes} symbol={symbol} />
          <div className="flex items-center justify-between border-t border-line pt-3 text-base font-bold text-forest">
            <span>Total</span>
            <span>
              {symbol}
              {total.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      <Button
        size="lg"
        onClick={handleBook}
        className="mt-6 w-full rounded-full bg-gold px-6 py-6 text-[15px] font-semibold text-forest-deep shadow-[0_12px_24px_-10px_rgba(201,162,39,0.8)] hover:bg-gold-soft"
      >
        Book now
      </Button>

      <ul className="mt-5 space-y-2 text-xs text-caption">
        <li className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 shrink-0 text-olive" />
          Free cancellation up to 48h before check-in.
        </li>
        <li className="flex items-center gap-2">
          <Undo2 className="h-4 w-4 shrink-0 text-olive" />
          No prepayment needed — pay at the property.
        </li>
        <li className="flex items-center gap-2">
          <Lock className="h-4 w-4 shrink-0 text-olive" />
          Encrypted, secure checkout.
        </li>
      </ul>
    </div>
  );
}

function Row({
  label,
  value,
  symbol,
  subtract = false,
  accent = false,
}: {
  label: string | number;
  value: number;
  symbol: string;
  subtract?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-ink-soft">
      <span>{label}</span>
      <span className={accent ? "font-semibold text-olive" : ""}>
        {subtract ? "−" : ""}
        {symbol}
        {value.toLocaleString()}
      </span>
    </div>
  );
}
