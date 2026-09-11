"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import BookingWidget from "./BookingWidget";

import { useBookingStore } from "@/store/bookingStore";
import { Property } from "@/types/types";

export default function MobileBookingBar({ property }: { property: Property }) {
  const [open, setOpen] = useState(false);
  const checkIn = useBookingStore((s) => s.checkIn);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 p-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] text-caption">
              {checkIn ? "Selected dates" : "From"}
            </p>
            <p className="truncate text-base font-bold text-forest">
              ${property.price}
              <span className="text-xs font-normal text-caption"> /night</span>
            </p>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="h-12 flex-1 rounded-full bg-gold px-6 text-[15px] font-semibold text-forest-deep hover:bg-gold-soft"
          >
            Book now
          </Button>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="max-h-[88vh] rounded-t-3xl">
          <SheetHeader className="border-b border-line pb-3">
            <SheetTitle className="font-serif text-lg text-forest">
              Reserve your stay
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-1 py-4">
            <BookingWidget property={property} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
