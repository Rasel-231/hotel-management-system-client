"use client";

import * as React from "react";
import Image from "next/image";
import { Sunrise, Moon, Users, Baby, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2400&auto=format&fit=crop";

const DAY_OPTIONS = Array.from({ length: 28 }, (_, i) => i + 1);
const NIGHT_OPTIONS = Array.from({ length: 14 }, (_, i) => i + 1);
const GUEST_OPTIONS = Array.from({ length: 8 }, (_, i) => i + 1);
const CHILD_OPTIONS = Array.from({ length: 6 }, (_, i) => i);

export function ResortHero() {
  const dotRef = React.useRef<HTMLDivElement | null>(null);
  const [active, setActive] = React.useState(false);

  return (
    <section
      className="relative isolate overflow-hidden bg-forest-deep lg:cursor-none"
      onMouseMove={(e) => {
        if (dotRef.current) {
          dotRef.current.style.left = `${e.clientX}px`;
          dotRef.current.style.top = `${e.clientY}px`;
        }
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {/* Gold cursor dot — desktop only */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed z-[9999] hidden lg:block"
        style={{
          opacity: active ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        <span className="relative flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full bg-gold/20 animate-ping" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-gold shadow-[0_0_12px_rgba(201,162,39,0.6)]" />
        </span>
      </div>
      {/* Background photograph */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Overwater villa pool at a Maldives resort at dusk"
          fill
          priority
          className="object-cover img-tone"
          sizes="100vw"
        />
        {/* Left-to-right scrim so the headline stays legible over the water */}
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[100px] max-w-6xl flex-col justify-between px-6 pb-8 sm:pb-24 pt-8 sm:pt-24 sm:min-h-[640px] sm:px-10  lg:pb-32">
        <div className="max-w-xl">
          <h1 className="font-serif text-[1.75rem] leading-[1.1] tracking-tight text-white sm:text-[2.75rem] sm:leading-[1.05] lg:text-6xl">
            Find your quiet
            <br />
            stretch of ocean
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75 sm:mt-5 sm:text-[1.05rem]">
            Overwater villas, private lagoons and house-reef diving —
            hand-picked stays across the Maldives, ready when you are.
          </p>
<Button
            size="lg"
            className="mt-8 h-12 rounded-full border border-gold/60 bg-transparent px-8 text-[15px] font-medium text-gold transition-all duration-300 hover:bg-gold hover:text-forest-deep"
          >
            Browse resorts
          </Button>
        </div>

        {/* Floating search / booking bar */}
        <div className="mt-4 rounded-2xl border border-white/15 bg-white/10 p-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-4">
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
            <Button className="col-span-2 h-full min-h-[52px] w-full rounded-xl bg-forest px-6 text-[15px] font-medium text-white hover:bg-forest-deep sm:col-span-4 lg:col-span-1 lg:w-auto">
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
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(value);
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative rounded-xl bg-white/5 px-4 py-2.5 duration-200 hover:bg-white/10"
    >
      <div className="flex items-center gap-1.5 text-[11px] font-medium text-white/60">
        {icon}
        {label}
      </div>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-6 w-full items-center gap-1 rounded text-[15px] font-medium text-white outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        {selected} <span className="text-white/60">{suffix}</span>
        <ChevronDown
          className={`ml-auto h-4 w-4 text-white/60 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={label}
          className="absolute bottom-full left-0 z-30 mb-2 max-h-44 w-44 overflow-y-auto rounded-xl border border-white/15 bg-forest-deep/95 p-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl"
        >
          {options.map((opt) => {
            const current = String(opt) === selected;
            return (
              <button
                key={opt}
                type="button"
                role="option"
                aria-selected={current}
                onClick={() => {
                  setSelected(String(opt));
                  setOpen(false);
                }}
                className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${
                  current
                    ? "bg-gold/10 text-gold"
                    : "text-white/90 hover:bg-white/10 hover:text-gold"
                }`}
              >
                {opt} {suffix}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ResortHero;
