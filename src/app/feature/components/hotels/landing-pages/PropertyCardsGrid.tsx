"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import PropertyCard from "../ui/PropertyCard";
import SectionHeading from "../ui/SectionHeading";
import { properties } from "@/lib/data/properties";

const INITIAL_COUNT = 8;

export default function PropertyCardsGrid() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? properties : properties.slice(0, INITIAL_COUNT);

  return (
    <section className="w-full py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Handpicked stays"
            title="Featured properties"
            description="From overwater villas to alpine lodges — a shortlist we'd happily sleep in ourselves."
          />
          <Link
            href="/hotels"
            className="group btn-gold-outline inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
          >
            View all stays
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <motion.div
          layout
          className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence initial={false}>
            {visible.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {properties.length > INITIAL_COUNT && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="group inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3 text-sm font-semibold text-cream transition-all hover:bg-forest-deep hover:shadow-[0_14px_28px_-12px_rgba(13,43,36,0.6)]"
            >
              {showAll ? "Show fewer stays" : "View all stays"}
              <ArrowRight
                className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 ${showAll ? "rotate-90" : ""}`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
