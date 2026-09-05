"use client";

import * as React from "react";
import Image from "next/image";
import { Sunrise, Moon, Users, Baby, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * ResortHero
 * -----------------------------------------------------------------------
 * Hero section for a Maldives resort booking landing page.
 *
 * Setup:
 * 1. Requires shadcn/ui `button` and `select` components:
 *      npx shadcn@latest add button select
 * 2. Uses next/font — add to your layout or swap for your own font loader.
 * 3. Swap HERO_IMAGE for your own asset (drop it in /public and reference
 *    it locally, e.g. "/images/maldives-pool.jpg") for production use.
 * 4. If you keep a remote URL, allow the domain in next.config.js:
 *      images: { remotePatterns: [{ hostname: "images.unsplash.com" }] }
 */

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2400&auto=format&fit=crop";

const DAY_OPTIONS = Array.from({ length: 28 }, (_, i) => i + 1);
const NIGHT_OPTIONS = Array.from({ length: 14 }, (_, i) => i + 1);
const GUEST_OPTIONS = Array.from({ length: 8 }, (_, i) => i + 1);
const CHILD_OPTIONS = Array.from({ length: 6 }, (_, i) => i);

export function ResortHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0B2A2E]">
      {/* Background photograph */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Overwater villa pool at a Maldives resort at dusk"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Left-to-right scrim so the headline stays legible over the water */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2A2E] via-[#0B2A2E]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A2E] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[640px] max-w-6xl flex-col justify-between px-6 pb-28 pt-24 sm:px-10 lg:pb-32">
        <div className="max-w-xl">
          <h1 className="font-serif text-[2.75rem] leading-[1.05] tracking-tight text-white sm:text-6xl">
            Find your quiet
            <br />
            stretch of ocean
          </h1>
          <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-white/75">
            Overwater villas, private lagoons and house-reef diving —
            hand-picked stays across the Maldives, ready when you are.
          </p>
          <Button
            size="lg"
            className="mt-8 h-12 rounded-full bg-[#C9A15B] px-8 text-[15px] font-medium text-[#1B2A2E] hover:bg-[#D9B378]"
          >
            Browse resorts
          </Button>
        </div>

        {/* Floating search / booking bar */}
        <div className="mt-16 rounded-2xl border border-white/15 bg-white/10 p-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
            <SearchField
              icon={<Sunrise className="h-4 w-4" />}
              label="Arriving"
              value="25"
              suffix="Sep"
              options={DAY_OPTIONS}
            />
            <SearchField
              icon={<Moon className="h-4 w-4" />}
              label="Nights"
              value="2"
              suffix="nights"
              options={NIGHT_OPTIONS}
            />
            <SearchField
              icon={<Users className="h-4 w-4" />}
              label="Guests"
              value="2"
              suffix="adults"
              options={GUEST_OPTIONS}
            />
            <SearchField
              icon={<Baby className="h-4 w-4" />}
              label="Children"
              value="1"
              suffix="child"
              options={CHILD_OPTIONS}
            />
            <Button className="col-span-2 h-full min-h-[52px] w-full rounded-xl bg-[#1F7A6C] px-6 text-[15px] font-medium text-white hover:bg-[#256F63] sm:col-span-4 lg:col-span-1 lg:w-auto">
              <Search className="mr-2 h-4 w-4" />
              Check stays
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SearchField({
  icon,
  label,
  value,
  suffix,
  options,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  suffix: string;
  options: number[];
}) {
  return (
    <div className="rounded-xl bg-white/5 px-4 py-2.5">
      <div className="flex items-center gap-1.5 text-[11px] font-medium text-white/60">
        {icon}
        {label}
      </div>
      <Select defaultValue={value}>
        <SelectTrigger className="h-auto border-0 bg-transparent p-0 text-[15px] font-medium text-white shadow-none focus:ring-0 [&>svg]:text-white/60">
          <SelectValue>
            {value} <span className="text-white/60">{suffix}</span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={String(opt)}>
              {opt} {suffix}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default ResortHero;
