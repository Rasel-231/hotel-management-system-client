"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

type Retreat = {
  id: string;
  image: string;
  title: string;
  location: string;
  description: string;
};

const retreats: Retreat[] = [
  {
    id: "r1",
    image:
      "https://images.unsplash.com/photo-1595521624992-48a59aef95e3?q=80&w=800&auto=format&fit=crop",
    title: "Scandinavian Forest Cabin",
    location: "Nordmarka, Norway",
    description:
      "A-frame cabin, pine forest views, wood-fired sauna, and a private deck for northern-light nights.",
  },
  {
    id: "r2",
    image:
      "https://images.unsplash.com/photo-1599313354145-2329b2dd172e?q=80&w=800&auto=format&fit=crop",
    title: "Riverside Wooden Lodge",
    location: "Bighorn River, Montana",
    description:
      "Fly-fishing steps from the door, a stone fireplace, and river views from every window.",
  },
  {
    id: "r3",
    image:
      "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?q=80&w=800&auto=format&fit=crop",
    title: "Mountain View Retreat",
    location: "Aspen, Colorado",
    description:
      "Panoramic ridgeline views, a wraparound porch, and trailheads that start right outside.",
  },
  {
    id: "r4",
    image:
      "https://images.unsplash.com/photo-1618140052121-39fc6db33972?q=80&w=800&auto=format&fit=crop",
    title: "Countryside Cabin",
    location: "Cotswolds, England",
    description:
      "Ivy-covered stone walls, a wood-burning stove, and rolling green hills on every side.",
  },
  {
    id: "r5",
    image:
      "https://images.unsplash.com/photo-1728051104503-e1a4a19d638c?q=80&w=800&auto=format&fit=crop",
    title: "Tropical Pool Villa",
    location: "Ubud, Bali",
    description:
      "A private plunge pool ringed by palms, open-air living, and jungle sounds at dusk.",
  },
  {
    id: "r6",
    image:
      "https://images.unsplash.com/photo-1571984405176-5958bd9ac31d?q=80&w=800&auto=format&fit=crop",
    title: "Sunset Beach Resort",
    location: "Seminyak, Bali",
    description:
      "Palm-fringed poolside loungers steps from the sand, timed perfectly for golden hour.",
  },
];

function RetreatCard({ retreat }: { retreat: Retreat }) {
  return (
    <div
      data-card
      className="
        flex shrink-0 snap-start flex-col overflow-hidden rounded-2xl
        border border-line bg-cream shadow-sm transition-shadow
        hover:shadow-md sm:flex-row
        w-[82%] sm:w-[46%] lg:w-[31.5%]
      "
    >
      <div className="relative aspect-[4/3] w-full shrink-0 sm:aspect-auto sm:w-[42%]">
        <Image
          src={retreat.image}
          alt={retreat.title}
          fill
          sizes="(max-width: 640px) 82vw, (max-width: 1024px) 46vw, 31vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <h3 className="text-[15px] font-semibold leading-snug text-ink sm:text-base">
            {retreat.title}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-caption">
            <MapPin className="h-3 w-3" strokeWidth={1.75} />
            {retreat.location}
          </p>
          <p className="mt-2.5 text-xs leading-relaxed text-ink-soft line-clamp-2 sm:text-sm sm:line-clamp-3">
            {retreat.description}
          </p>
        </div>
        <Button
          size="sm"
          className="mt-4 w-fit rounded-full bg-forest text-cream hover:bg-forest-deep"
        >
          Check rates
        </Button>
      </div>
    </div>
  );
}

export default function CuratedRetreatsSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollToIndex = (
    index: number,
    behavior: ScrollBehavior = "smooth",
  ) => {
    const track = trackRef.current;
    const card = track?.querySelectorAll<HTMLElement>("[data-card]")[index];
    if (track && card) {
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior });
    }
  };

  const goNext = () => {
    setActiveIndex((i) => {
      const next = (i + 1) % retreats.length;
      scrollToIndex(next);
      return next;
    });
  };

  const goPrev = () => {
    setActiveIndex((i) => {
      const prev = (i - 1 + retreats.length) % retreats.length;
      scrollToIndex(prev);
      return prev;
    });
  };

  // Autoplay — pauses on hover, touch, or keyboard focus, and is skipped
  // entirely for people who have reduced motion turned on.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (isPaused) return;
    const id = window.setInterval(goNext, 4000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, activeIndex]);

  const resumeAfterTouch = () => {
    window.setTimeout(() => setIsPaused(false), 2500);
  };

  return (
    <section
      className="w-full py-14 sm:py-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={resumeAfterTouch}
    >
      <div className="mx-auto mb-6 flex max-w-7xl items-end justify-between gap-4 px-4 sm:mb-8 md:px-8">
        <div>
          <h2 className="font-serif text-2xl text-forest sm:text-3xl">
            Retreats worth planning around
          </h2>
          <p className="mt-1.5 max-w-md text-sm text-ink-soft">
            Six stays our editors keep coming back to, refreshed every month.
          </p>
        </div>
        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous retreat"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-forest transition-colors hover:bg-forest hover:text-cream"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next retreat"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-forest transition-colors hover:bg-forest hover:text-cream"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Curated retreats"
        className="
          flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth
          px-4 pb-2 sm:gap-5 md:px-8
          [-ms-overflow-style:none] [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {retreats.map((retreat) => (
          <RetreatCard key={retreat.id} retreat={retreat} />
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-1.5">
        {retreats.map((retreat, i) => (
          <button
            key={retreat.id}
            type="button"
            aria-label={`Go to ${retreat.title}`}
            aria-current={i === activeIndex}
            onClick={() => {
              setActiveIndex(i);
              scrollToIndex(i);
            }}
            className={`h-1.5 rounded-full transition-all ${
              i === activeIndex ? "w-6 bg-forest" : "w-1.5 bg-line"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
