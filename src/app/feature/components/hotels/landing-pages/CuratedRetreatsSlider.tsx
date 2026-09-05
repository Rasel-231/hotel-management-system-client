"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
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
      className="
        flex-shrink-0
        w-[88vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]
        flex overflow-hidden rounded-2xl border border-line
        bg-cream shadow-sm
      "
    >
      <div className="relative w-[38%] shrink-0">
        <Image
          src={retreat.image}
          alt={retreat.title}
          fill
          sizes="(max-width: 640px) 34vw, 220px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <h3 className="font-semibold text-[15px] sm:text-base text-ink leading-snug">
            {retreat.title}
          </h3>
          <p className="mt-0.5 text-xs text-caption">{retreat.location}</p>
          <p className="mt-2 text-xs sm:text-sm text-ink-soft leading-relaxed line-clamp-3">
            {retreat.description}
          </p>
        </div>
        <Button
          size="sm"
          className="mt-4 w-fit rounded-full bg-forest text-cream hover:bg-forest-deep"
        >
          Check Rates
        </Button>
      </div>
    </div>
  );
}

export default function CuratedRetreatsSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const [loopWidth, setLoopWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (trackRef.current) {
      setLoopWidth(trackRef.current.scrollWidth / 2);
    }
  }, []);

  useEffect(() => {
    if (!loopWidth) return;
    if (isPaused) {
      controls.stop();
      return;
    }
    const duration = loopWidth / 45;
    controls.start({
      x: -loopWidth,
      transition: { duration, ease: "linear", repeat: Infinity },
    });
  }, [loopWidth, isPaused, controls]);

  const items = [...retreats, ...retreats];

  return (
    <section className="w-full py-14 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-8 mb-6 sm:mb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          Editor&apos;s pick
        </p>
        <h2 className="font-serif text-3xl text-forest">
          Curated Retreats of the Month
        </h2>
      </div>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-sand to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-sand to-transparent z-10" />

        <motion.div
          ref={trackRef}
          animate={controls}
          className="flex gap-4 sm:gap-5 px-4 sm:px-8 w-max"
        >
          {items.map((retreat, i) => (
            <RetreatCard key={`${retreat.id}-${i}`} retreat={retreat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
