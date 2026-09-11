import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, MapPin, Mountain, Sun, Waves } from "lucide-react";

import SearchBar from "../../feature/components/hotels/ui/SearchBar";
import SectionHeading from "../../feature/components/hotels/ui/SectionHeading";
import PropertyCard from "../../feature/components/hotels/ui/PropertyCard";
import { properties } from "@/lib/data/properties";
import { cn } from "@/lib/utils";

const DESTINATIONS = [
  {
    name: "Maldives",
    tag: "Overwater villas & house reefs",
    count: 148,
    src: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1600&auto=format&fit=crop",
    span: "row-span-2",
  },
  {
    name: "Bali, Indonesia",
    tag: "Jungle villas & rice terraces",
    count: 263,
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Paris, France",
    tag: "Landmarks & river cafés",
    count: 412,
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Kyoto, Japan",
    tag: "Temples & bamboo groves",
    count: 187,
    src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Santorini, Greece",
    tag: "Caldera cliff houses",
    count: 96,
    src: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Swiss Alps",
    tag: "Alpine lodges & glaciers",
    count: 154,
    src: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Dubai, UAE",
    tag: "Skyline & desert luxury",
    count: 308,
    src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "New York, US",
    tag: "Lofts & city lights",
    count: 521,
    src: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Costa Rica",
    tag: "Rainforest treehouses",
    count: 74,
    src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Marrakesh, Morocco",
    tag: "Riads & candle-lit lanes",
    count: 132,
    src: "https://images.unsplash.com/photo-1519449556851-5720b33024e7?q=80&w=1600&auto=format&fit=crop",
  },
];

const HIGHLIGHTED = properties.filter(
  (p) =>
    ["Bali, Indonesia", "Maldives", "Bernese Alps, Switzerland"].includes(
      p.country,
    ) && p.id !== "terra-garden-ubud",
);

const MOODS = [
  { icon: Waves, label: "Beach & island" },
  { icon: Mountain, label: "Mountains & trails" },
  { icon: Compass, label: "Hidden gems" },
  { icon: Sun, label: "Desert sun" },
  { icon: MapPin, label: "City lights" },
];

export default function DestinationsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-forest-deep">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2400&auto=format&fit=crop"
            alt="Paris at golden hour"
            fill
            priority
            sizes="100vw"
            className="object-cover img-tone"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/80 to-forest-deep/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[520px] max-w-7xl flex-col justify-end px-5 pb-10 pt-32 sm:min-h-[560px] md:px-8 md:pb-16">
          <div className="max-w-2xl">
            <p className="mb-4 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              <span className="inline-block h-[1.5px] w-6 bg-gold" />
              Explore the world
            </p>
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-cream sm:text-5xl md:text-6xl">
              Destinations that
              <br />
              deserve the detour
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-cream/75 sm:text-base">
              From overwater bungalows in the Maldives to candle-lit riads in
              Marrakesh — hand-picked places, ready when you are.
            </p>
          </div>

          <div className="mt-10">
            <SearchBar />
          </div>
        </div>
      </section>

      <div className="divider-gold" />

      {/* Moods */}
      <section className="w-full py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {MOODS.map(({ icon: Icon, label }) => (
              <Link
                key={label}
                href="/hotels"
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-sand px-5 py-2.5 text-sm font-medium text-forest transition-all hover:border-gold hover:bg-gold/10"
              >
                <Icon
                  className="h-4 w-4 text-gold transition-transform group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Destination grid */}
      <section className="w-full pb-10 sm:pb-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Browse by place"
              title="Pick your postcard"
              description="Tens of thousands of verified stays across 120+ countries — tap a place to see what's there."
            />
            <Link
              href="/hotels"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream transition-all hover:bg-forest-deep"
            >
              See all hotels
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mx-auto mt-8 grid max-w-6xl auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] md:grid-cols-4 md:gap-4">
            {DESTINATIONS.map((dest) => (
              <Link
                key={dest.name}
                href="/hotels"
                className={cn(
                  "group relative overflow-hidden rounded-2xl",
                  dest.span,
                )}
              >
                <Image
                  src={dest.src}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover img-tone transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-forest-deep/20 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-3 md:p-5">
                  <h3 className="font-serif text-base leading-tight text-white md:text-xl">
                    {dest.name}
                  </h3>
                  <p className="mt-0.5 text-[10px] text-white/75 md:text-xs">
                    {dest.tag}
                  </p>
                  <span className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold text-forest-deep opacity-0 transition-all duration-300 group-hover:opacity-100">
                    {dest.count} stays
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured stays */}
      <section className="w-full border-t border-line bg-sand py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Where the crowd goes"
            title="Stays we can't stop booking"
            description="Our most-loved stays across Bali, the Maldives and the Swiss Alps — guest favourites with stays that sell out first."
          />
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 bg-sand sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTED.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative isolate overflow-hidden bg-forest-deep py-16 sm:py-20">
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-olive/20 blur-3xl" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-5 text-center md:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            Plan something special
          </p>
          <h2 className="max-w-2xl font-serif text-3xl text-cream sm:text-4xl">
            Not sure where the map should take you next?
          </h2>
          <p className="mt-3 max-w-xl text-sm text-cream/70 sm:text-base">
            Tell us the season, the mood and the budget — our travel editors
            will shortlist the places worth your annual leave.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/deals"
              className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-forest-deep transition-all hover:bg-gold-soft"
            >
              See current deals
            </Link>
            <Link
              href="/hotels"
              className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-cream transition-colors hover:border-gold hover:text-gold"
            >
              Browse all destinations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}