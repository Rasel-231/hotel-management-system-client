"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  Check,
  Clock3,
  Copy,
  Crown,
  Gift,
  Percent,
  Sparkles,
  Tag,
  Truck,
} from "lucide-react";
import { toast } from "sonner";

import SectionHeading from "../../feature/components/hotels/ui/SectionHeading";
import { Reveal } from "../../../components/ui/reveal";
import PropertyCard from "../../feature/components/hotels/ui/PropertyCard";
import { properties } from "@/lib/data/properties";
import { cn } from "@/lib/utils";
import { Offer } from "@/types/types";

const OFFERS: (Offer & { region?: string })[] = [
  {
    id: "d1",
    title: "Save 25% on 3+ nights",
    description:
      "Apply automatically at checkout across select resorts worldwide until 30 September.",
    bg: "bg-forest",
    textColor: "text-cream",
    subColor: "text-white/75",
    icon: Percent,
  },
  {
    id: "d2",
    title: "Free breakfast, every morning",
    description:
      "Complimentary breakfast spread or room service, included on stays of 2 nights or more.",
    bg: "bg-gold-100",
    textColor: "text-ink",
    subColor: "text-caption",
    image:
      "https://images.unsplash.com/photo-1768319920501-2d124ccfd8dc?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "d3",
    title: "Free late checkout to 2 PM",
    description:
      "Sleep in — a 2 PM checkout on us, subject to availability. Save upwards of $40 per stay.",
    bg: "bg-forest-deep",
    textColor: "text-cream",
    subColor: "text-white/75",
    icon: Clock3,
  },
  {
    id: "d4",
    title: "Airport pickup included",
    description:
      "Private door-to-airport transfers on select stays — skip the taxi queue entirely.",
    bg: "bg-olive",
    textColor: "text-cream",
    subColor: "text-white/75",
    icon: Truck,
  },
  {
    id: "d5",
    title: "Spa credit of $50",
    description:
      "Fifty dollars toward any in-hotel spa treatment, redeemable once per stay.",
    bg: "bg-blush",
    textColor: "text-ink",
    subColor: "text-caption",
    icon: Sparkles,
  },
  {
    id: "d6",
    title: "Maldives fly-free",
    description:
      "Book 5+ nights in an overwater villa and we'll credit the return seaplane.",
    bg: "bg-forest-deep",
    textColor: "text-cream",
    subColor: "text-white/75",
    icon: Crown,
  },
];

const PROMO_CODES = [
  {
    code: "NEST10",
    label: "10% off your first booking",
    detail: "Any destination, any stay length",
  },
  {
    code: "WELCOME150",
    label: "$150 travel credit",
    detail: "On stays of 4 nights or more",
  },
  {
    code: "MALDIVES20",
    label: "20% off the Maldives",
    detail: "Overwater villas & house reefs",
  },
  {
    code: "HIDDEN15",
    label: "15% off boutique stays",
    detail: "Curated riads & city hotels",
  },
];

const MEMBER_PERKS = [
  {
    icon: Tag,
    title: "Member-only pricing",
    subtitle: "Quiet rooms, quieter prices",
  },
  {
    icon: Gift,
    title: "Birthday perk",
    subtitle: "$50 towards your next stay",
  },
  {
    icon: Clock3,
    title: "Late checkout",
    subtitle: "As late as 2 PM, free",
  },
  {
    icon: Crown,
    title: "Priority upgrades",
    subtitle: "Skipped queues, better rooms",
  },
];

const DEAL_STAYS = properties.filter((p) =>
  ["solstice-resort-maldives", "ivory-villa-bali", "ember-oak-istanbul", "costa-serena-amalfi"].includes(
    p.id,
  ),
);

function PromoCard() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopied(code);
    toast.success(`Code ${code} copied`, {
      description: "Paste it at checkout to apply the offer.",
    });
    window.setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {PROMO_CODES.map((promo) => (
        <div
          key={promo.code}
          className="relative overflow-hidden rounded-3xl border border-line bg-cream p-6 shadow-[0_18px_40px_-28px_rgba(13,43,36,0.4)]"
        >
          <BadgePercent className="absolute -right-3 -top-3 h-16 w-16 text-gold/15" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
            Promo code
          </p>
          <p className="mt-2 font-serif text-2xl tracking-wide text-forest-deep">
            {promo.code}
          </p>
          <p className="mt-1 text-sm font-medium text-ink">{promo.label}</p>
          <p className="mt-0.5 text-xs text-caption">{promo.detail}</p>
          <button
            type="button"
            onClick={() => copy(promo.code)}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-line bg-sand py-2.5 text-sm font-semibold text-forest transition-all hover:border-gold hover:bg-gold/10"
          >
            {copied === promo.code ? (
              <>
                <Check className="h-4 w-4 text-gold" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy code
              </>
            )}
          </button>
        </div>
      ))}
    </div>
  );
}

export default function DealsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-forest-deep">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-10 h-80 w-80 rounded-full bg-olive/25 blur-3xl" />
        <div className="relative mx-auto flex min-h-[460px] max-w-7xl flex-col justify-center px-5 py-24 sm:min-h-[520px] md:px-8">
          <div className="max-w-2xl">
            <p className="mb-4 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              <span className="inline-block h-[1.5px] w-6 bg-gold" />
              Deals, refreshed weekly
            </p>
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-cream sm:text-5xl md:text-6xl">
              More stay for
              <br />
              every budget
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-cream/75 sm:text-base">
              Member-only rates, instant promo codes and perks most travellers
              miss — all on verified stays worldwide.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-transparent px-7 py-3 text-sm font-semibold text-gold transition-all duration-300 hover:bg-gold hover:text-forest-deep"
              >
                <Crown className="h-4 w-4" />
                Unlock member prices
              </Link>
              <Link
                href="/hotels"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-cream transition-colors hover:border-gold hover:text-gold"
              >
                <ArrowRight className="h-4 w-4" />
                Browse stays
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-gold" />

      {/* Offer grid */}
      <section className="w-full py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Limited season"
            title="Offers already on the table"
            description="No trickery — every deal below is live today. Apply automatically or with the code shown."
          />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OFFERS.map((offer, i) => {
              const Icon = offer.icon;
              return (
                <Reveal key={offer.id} delay={(i % 3) * 90}>
                <div
                  className={cn(
                    "group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-7",
                    offer.bg,
                  )}
                >
                  {offer.image && (
                    <div className="absolute bottom-0 right-0 h-[75%] w-[48%] overflow-hidden rounded-tl-3xl">
                      <Image
                        src={offer.image}
                        alt={offer.title}
                        fill
                        sizes="400px"
                        className="object-cover img-tone"
                      />
                    </div>
                  )}
                  {Icon && !offer.image && (
                    <Icon
                      className={cn(
                        "absolute right-5 top-5 h-8 w-8 opacity-70",
                        offer.textColor,
                      )}
                      strokeWidth={1.5}
                    />
                  )}
                  <div className="relative z-10 max-w-[62%]">
                    {offer.region && (
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                        {offer.region}
                      </p>
                    )}
                    <h3
                      className={cn(
                        "font-serif text-xl leading-snug",
                        offer.textColor,
                      )}
                    >
                      {offer.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 text-xs leading-relaxed sm:text-sm",
                        offer.subColor,
                      )}
                    >
                      {offer.description}
                    </p>
                  </div>
                  <Link
                    href="/hotels"
                    className={cn(
                      "relative z-10 mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-sm transition-all group-hover:gap-3",
                      offer.textColor,
                      offer.bg === "bg-gold-100" || offer.bg === "bg-blush"
                        ? "hover:bg-white/30"
                        : "hover:bg-white/20",
                    )}
                  >
                    See eligible stays
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Promo codes */}
      <section className="w-full border-t border-line bg-sand py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Copy, paste, save"
            title="Promo codes that actually work"
            description="Short on time? Grab one of these and paste it at checkout. New codes land every week."
          />
          <div className="mt-8">
            <PromoCard />
          </div>
        </div>
      </section>

      {/* Member perks */}
      <section className="w-full py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <SectionHeading
              eyebrow="Prices get better"
              title="Why everyone books as a member"
              description="Registration is free, takes a minute, and unlocks the rates you see on every other deal site — minus the games."
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {MEMBER_PERKS.map(({ icon: Icon, title, subtitle }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 rounded-3xl border border-line bg-cream p-5 transition-shadow hover:shadow-[0_18px_40px_-28px_rgba(13,43,36,0.45)]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-forest/10">
                    <Icon className="h-5 w-5 text-forest" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{title}</p>
                    <p className="mt-0.5 text-xs text-caption">{subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Discounted stays */}
      <section className="w-full border-t border-line bg-sand py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Right now, on discount"
            title="This week's biggest savings"
            description="A shortlist of stays with active member pricing — the badge tells you the deal at a glance."
          />
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 bg-sand sm:grid-cols-2 lg:grid-cols-4">
            {DEAL_STAYS.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative isolate overflow-hidden bg-forest-deep py-16 sm:py-20">
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-5 text-center md:px-8">
          <Crown className="h-8 w-8 text-gold" />
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            One account, every deal
          </p>
          <h2 className="mt-2 max-w-2xl font-serif text-3xl text-cream sm:text-4xl">
            Your next stay is already discounted
          </h2>
          <p className="mt-3 max-w-xl text-sm text-cream/70 sm:text-base">
            Create a free account, unlock member pricing, and keep every saved
            deal in one place.
          </p>
          <Link
            href="/register"
            className="mt-8 rounded-full border border-gold/60 bg-transparent px-8 py-3.5 text-sm font-semibold text-gold transition-all duration-300 hover:bg-gold hover:text-forest-deep"
          >
            Create your free account
          </Link>
        </div>
      </section>
    </div>
  );
}