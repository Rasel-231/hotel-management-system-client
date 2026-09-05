"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowRight } from "lucide-react";

import { properties, type Property } from "@/lib/data/properties";

export default function SimilarProperties({
  currentId,
}: {
  currentId: string;
}) {
  const similar = properties.filter((p) => p.id !== currentId).slice(0, 4);

  return (
    <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-2 md:-mx-8 md:px-8">
      {similar.map((property) => (
        <SimilarCard key={property.id} property={property} />
      ))}
    </div>
  );
}

function SimilarCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/hotels/${property.id}`}
      className="group w-[260px] shrink-0 snap-start overflow-hidden rounded-3xl border border-line bg-cream transition-shadow hover:shadow-[0_24px_50px_-30px_rgba(13,43,36,0.5)]"
    >
      <div className="relative h-40 overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.name}
          fill
          sizes="260px"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
      </div>
      <div className="p-4">
        <p className="flex items-center gap-1.5 truncate text-xs text-caption">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-gold" />
          <span className="truncate">
            {property.location}, {property.country}
          </span>
        </p>
        <h3 className="mt-1 truncate font-serif text-lg text-forest">
          {property.name}
        </h3>
        <div className="mt-2 flex items-end justify-between">
          <p className="flex items-center gap-1 text-xs">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            <b>{property.rating}</b>
          </p>
          <p className="text-sm font-semibold text-forest">
            <span className="text-base">${property.price}</span>
            <span className="text-xs font-normal text-caption">/night</span>
          </p>
          <ArrowRight className="h-4 w-4 text-forest opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </div>
    </Link>
  );
}