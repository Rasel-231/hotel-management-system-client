"use client";

import Image from "next/image";
import { Users, Ruler, BedDouble, Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { Property } from "@/lib/data/properties";

interface RoomVariant {
  id: string;
  name: string;
  guests: number;
  bed: string;
  size: number;
  price: number;
  perks: string[];
  image: string;
}

export default function RoomTypes({ property }: { property: Property }) {
  const rooms: RoomVariant[] = [
    {
      id: `${property.id}-standard`,
      name: "Standard Room",
      guests: 2,
      bed: "1 King bed",
      size: 34,
      price: property.price,
      perks: ["City or garden view", "Rain shower", "Nespresso machine"],
      image: property.images[1] ?? property.images[0],
    },
    {
      id: `${property.id}-deluxe`,
      name: "Deluxe Suite",
      guests: 3,
      bed: "1 King bed + sofa bed",
      size: 52,
      price: Math.round(property.price * 1.45),
      perks: ["Balcony or sea view", "Separate lounge", "Upgraded amenities"],
      image: property.images[2] ?? property.images[0],
    },
    {
      id: `${property.id}-signature`,
      name: "Signature Penthouse",
      guests: 4,
      bed: "2 King beds",
      size: 84,
      price: Math.round(property.price * 1.9),
      perks: ["Panoramic views", "Private terrace", "Butler on request"],
      image: property.images[0],
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {rooms.map((room) => (
        <article
          key={room.id}
          className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-cream transition-shadow hover:shadow-[0_24px_50px_-30px_rgba(13,43,36,0.5)]"
        >
          <div className="relative h-44 overflow-hidden">
            <Image
              src={room.image}
              alt={room.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
            <span className="absolute left-3 top-3 rounded-full bg-forest px-3 py-1 text-[11px] font-semibold text-cream">
              {room.name}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-5">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-soft">
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-gold" />
                Up to {room.guests} guests
              </span>
              <span className="flex items-center gap-1.5">
                <BedDouble className="h-3.5 w-3.5 text-gold" />
                {room.bed}
              </span>
              <span className="flex items-center gap-1.5">
                <Ruler className="h-3.5 w-3.5 text-gold" />
                {room.size} m²
              </span>
            </div>

            <ul className="mt-4 space-y-1.5">
              {room.perks.map((perk) => (
                <li
                  key={perk}
                  className="flex items-center gap-2 text-sm text-ink-soft"
                >
                  <Check className="h-4 w-4 shrink-0 text-olive" />
                  {perk}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-center justify-between pt-5">
              <p>
                <span className="text-xl font-bold text-forest">
                  ${room.price}
                </span>
                <span className="text-xs text-caption"> /night</span>
              </p>
              <Button
                size="sm"
                onClick={() =>
                  toast.success(`${room.name} selected`, {
                    description: "Set your dates in the booking card to confirm.",
                  })
                }
                className="rounded-full bg-forest px-5 text-cream hover:bg-forest/90"
              >
                Select
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}