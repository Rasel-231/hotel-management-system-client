"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import type { Property } from "@/lib/data/properties";

const REVIEWER_AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
];

const REVIEW_SEEDS = [
  {
    name: "Ayesha Rahman",
    location: "Dhaka, BD",
    text: "Impeccable from start to finish. The staff remembered our names and the room felt like a private sanctuary. Would book again without a second thought.",
  },
  {
    name: "James Carter",
    location: "London, UK",
    text: "A rare find — beautiful spaces, thoughtful details, and honest service. Check-in took two minutes and the little treats in the room were a lovely touch.",
  },
  {
    name: "Sofia Marino",
    location: "Milan, IT",
    text: "The location is unbeatable and everything felt brand-new. Bed was dreamy, wifi fast, breakfast generous. Highly recommend the suite with the view.",
  },
  {
    name: "Daniel Kim",
    location: "Seoul, KR",
    text: "Booked for our anniversary and they went above and beyond — a bottle waiting, late checkout granted. This is hospitality done properly.",
  },
  {
    name: "Priya Nair",
    location: "Mumbai, IN",
    text: "Spotless rooms and a gorgeous lobby. The concierge arranged transfers and dinner recommendations that made the whole trip feel effortless.",
  },
];

export default function Reviews({ property }: { property: Property }) {
  const distribution = [76, 18, 4, 1, 1];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
      {/* Summary */}
      <div className="rounded-3xl border border-line bg-cream p-6">
        <p className="text-5xl font-bold text-forest">{property.rating}</p>
        <p className="mt-1 text-sm text-caption">
          from {property.reviewCount.toLocaleString()} verified reviews
        </p>
        <div className="mt-4 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cnStar(i)}
            />
          ))}
        </div>

        <div className="mt-6 space-y-2.5">
          {distribution.map((percent, idx) => {
            const label = 5 - idx;
            return (
              <div key={label} className="flex items-center gap-3 text-xs">
                <span className="w-8 shrink-0 text-caption">{label}★</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-sand">
                  <div
                    className="h-full rounded-full bg-gold"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right text-caption">
                  {percent}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {REVIEW_SEEDS.map((review, i) => (
          <figure
            key={review.name}
            className="relative flex flex-col rounded-3xl border border-line bg-cream p-6"
          >
            <Quote className="absolute right-6 top-6 h-8 w-8 text-line" />
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
              &ldquo;{review.text}&rdquo;
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="relative h-11 w-11 overflow-hidden rounded-full">
                <Image
                  src={REVIEWER_AVATARS[i % REVIEWER_AVATARS.length]}
                  alt={review.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </span>
              <div>
                <p className="text-sm font-semibold text-forest">
                  {review.name}
                </p>
                <p className="text-xs text-caption">
                  {review.location} · {2024 + i % 3} · Stayed {i + 1} night
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function cnStar(i: number) {
  const filled = i <= 1 ? "fill-gold text-gold" : "text-line";
  return `h-6 w-6 ${filled}`;
}