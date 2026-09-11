"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionHeading from "../ui/SectionHeading";
import { Testimonial } from "@/types/types";

const AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
];

const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "The booking took less than three minutes and the room matched every photo — check-in was completely seamless.",
    name: "Naima Rahman",
    location: "Dhaka, BD",
    avatar: AVATARS[0],
  },
  {
    id: "t2",
    quote:
      "One of the best decisions I've made this year. The staff remembered our names and the little touches made it unforgettable.",
    name: "James Adler",
    location: "London, UK",
    avatar: AVATARS[1],
  },
  {
    id: "t3",
    quote:
      "Support answered at 2 AM and actually solved my issue instead of reading from a script. Rare and appreciated.",
    name: "Sana Karim",
    location: "Dubai, AE",
    avatar: AVATARS[2],
  },
  {
    id: "t4",
    quote:
      "The price we saw at search was the price we paid at checkout. No surprise fees, no last-minute markup.",
    name: "Devon Cole",
    location: "Austin, US",
    avatar: AVATARS[3],
  },
  {
    id: "t5",
    quote:
      "A rare find — beautiful spaces, thoughtful details, generous late checkout. This is hospitality done properly.",
    name: "Priya Nair",
    location: "Mumbai, IN",
    avatar: AVATARS[4],
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="relative flex-shrink-0 snap-start w-[78vw] sm:w-[360px] rounded-3xl border border-line p-6 sm:p-7 shadow-[0_18px_40px_-28px_rgba(13,43,36,0.4)]">
      <Quote
        className="h-7 w-7 text-gold-soft"
        fill="currentColor"
        strokeWidth={0}
      />
      <div className="mt-3 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
        ))}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft line-clamp-4">
        {testimonial.quote}
      </p>
      <div className="mt-5 flex items-center gap-3">
        <div className="relative h-11 w-11 rounded-full overflow-hidden shrink-0 ring-2 ring-gold/40">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            sizes="44px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
          <p className="text-xs text-caption">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 16
      : 1;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActive(Math.min(index, testimonials.length - 1));
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 16
      : 0;
    el.scrollTo({ left: i * cardWidth, behavior: "smooth" });
  };

  return (
    <section className="w-full  py-2 sm:py-7 ">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Guest stories"
          title="Loved by travellers, worldwide"
          description="Real reviews from verified stays — the good, the honest, and the occasionally glowing."
          align="center"
          className="mb-10"
        />

        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === active ? "w-5 bg-gold" : "w-1.5 bg-line",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
