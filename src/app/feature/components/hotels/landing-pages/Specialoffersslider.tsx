"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  Percent,
  Clock3,
  Car,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Offer = {
  id: string;
  title: string;
  description: string;
  bg: string;
  textColor: string;
  subColor: string;
  icon?: React.ElementType;
  image?: string;
};

const offers: Offer[] = [
  {
    id: "o1",
    title: "Save 25% On 3+ Nights",
    description:
      "Save 25% on 3+ nights, terms and conditions apply, and book to your dates.",
    bg: "bg-[#1f4d4d]",
    textColor: "text-white",
    subColor: "text-white/75",
    icon: Percent,
  },
  {
    id: "o2",
    title: "Free Breakfast",
    description:
      "Enjoy a complimentary breakfast spread each morning, or choose room service instead.",
    bg: "bg-[#f3e6cf]",
    textColor: "text-[#241c10]",
    subColor: "text-[#6b5c3f]",
    image:
      "https://images.unsplash.com/photo-1768319920501-2d124ccfd8dc?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "o3",
    title: "Free Late Checkout",
    description:
      "Check out at 2 PM instead of the usual time, no extra charge, subject to availability.",
    bg: "bg-[#26324a]",
    textColor: "text-white",
    subColor: "text-white/75",
    icon: Clock3,
  },
  {
    id: "o4",
    title: "Airport Pickup Included",
    description:
      "A complimentary private transfer from the airport straight to your room.",
    bg: "bg-[#4a5a3f]",
    textColor: "text-white",
    subColor: "text-white/75",
    icon: Car,
  },
  {
    id: "o5",
    title: "Spa Credit $50",
    description:
      "Fifty dollars toward any spa treatment, redeemable once per stay.",
    bg: "bg-[#e8d4d4]",
    textColor: "text-[#241c10]",
    subColor: "text-[#6b5c3f]",
    icon: Sparkles,
  },
];

function OfferCard({ offer }: { offer: Offer }) {
  const Icon = offer.icon;
  return (
    <div
      className={cn(
        "relative flex-shrink-0 snap-start overflow-hidden rounded-2xl",
        "w-[68vw] sm:w-[300px] h-[190px]",
        offer.bg,
      )}
    >
      {offer.image && (
        <div className="absolute bottom-0 right-0 h-[70%] w-[46%] overflow-hidden rounded-tl-2xl">
          <Image
            src={offer.image}
            alt={offer.title}
            fill
            sizes="200px"
            className="object-cover"
          />
        </div>
      )}

      {Icon && !offer.image && (
        <Icon
          className={cn(
            "absolute top-4 right-4 h-6 w-6",
            offer.textColor,
            "opacity-70",
          )}
          strokeWidth={1.5}
        />
      )}

      <div className="relative z-10 flex h-full max-w-[62%] flex-col justify-center p-5">
        <h3
          className={cn("font-bold text-[17px] leading-snug", offer.textColor)}
        >
          {offer.title}
        </h3>
        <p className={cn("mt-2 text-xs leading-relaxed", offer.subColor)}>
          {offer.description}
        </p>
      </div>
    </div>
  );
}

export default function SpecialOffersSlider() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({
      left: dir * 316,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex items-end justify-between mb-5 sm:mb-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Limited season
            </p>
            <h2 className="font-serif text-3xl text-forest">
              Special offers on your stay
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden sm:inline text-sm font-medium text-forest hover:text-gold"
            >
              View all
            </a>
            <div className="hidden sm:flex items-center gap-2">
              <button
                aria-label="Scroll left"
                onClick={() => scrollByCard(-1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-cream text-forest hover:bg-sand"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                aria-label="Scroll right"
                onClick={() => scrollByCard(1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-cream text-forest hover:bg-sand"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
}
