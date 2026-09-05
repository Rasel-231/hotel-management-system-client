"use client";

import { Globe2, Leaf, HeartHandshake, ShieldCheck, type LucideIcon } from "lucide-react";

type Commitment = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
};

const commitments: Commitment[] = [
  {
    icon: Leaf,
    title: "Eco-Friendly Certification",
    subtitle: "Sustainable Stays",
  },
  {
    icon: HeartHandshake,
    title: "Local Community Support",
    subtitle: "Empowering Destinations",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    subtitle: "Trusted Bookings",
  },
];

export default function OurCommitments() {
  return (
    <section className="w-full py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          Our commitments
        </p>
        <h2 className="font-serif text-3xl text-forest">
          Travel that gives back
        </h2>

        <div className="relative mt-8 overflow-hidden rounded-[2rem] bg-sand px-6 py-10 sm:px-12 sm:py-14 ring-1 ring-line">
          <div className="pointer-events-none absolute -top-16 -left-10 h-56 w-56 rounded-full bg-forest/15 blur-3xl" />
          <div className="pointer-events-none absolute -top-10 right-0 h-48 w-48 rounded-full bg-gold/15 blur-3xl" />
          <div className="pointer-events-none absolute top-16 left-1/3 h-40 w-40 rounded-full bg-olive/15 blur-3xl" />

          {/* featured commitment */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-cream shadow-sm ring-1 ring-line">
              <Globe2
                className="h-9 w-9 sm:h-10 sm:w-10 text-forest"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="mt-4 font-serif text-xl text-forest">
              Term of Property
            </h3>
            <p className="mt-1 text-sm text-caption">Sustainable Stays</p>
          </div>

          <div className="relative z-10 mt-10 grid grid-cols-3 gap-6 sm:mt-12 sm:gap-6">
            {commitments.map(({ icon: Icon, title, subtitle }) => (
              <div key={title} className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream shadow-sm ring-1 ring-line">
                  <Icon className="h-7 w-7 text-olive" strokeWidth={1.5} />
                </div>
                <h4 className="mt-3 text-sm font-semibold text-ink leading-snug sm:text-[15px]">
                  {title}
                </h4>
                <p className="mt-1 text-xs text-caption sm:text-sm">{subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}