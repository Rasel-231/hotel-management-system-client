"use client";

import { HandCoins, BadgeCheck, Headset, Undo2 } from "lucide-react";

type Feature = {
  icon: React.ElementType;
  title: string;
  subtitle: string;
};

const features: Feature[] = [
  { icon: HandCoins, title: "Best Price Guarantee", subtitle: "Match or refund" },
  { icon: BadgeCheck, title: "Verified Reviews", subtitle: "Real guest stays" },
  { icon: Headset, title: "24/7 Support", subtitle: "Humans, day or night" },
  { icon: Undo2, title: "Free Cancellation", subtitle: "Up to 48h before" },
];

export default function WhyChooseStayEase() {
  return (
    <section className="w-full py-14 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          Why book with us
        </p>
        <h2 className="text-center font-serif text-3xl text-forest">
          Stays you can trust, prices you&apos;ll love
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {features.map(({ icon: Icon, title, subtitle }) => (
            <div
              key={title}
              className="flex flex-col items-center rounded-3xl border border-line bg-cream px-4 py-7 text-center transition-shadow hover:shadow-[0_18px_40px_-28px_rgba(13,43,36,0.45)]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest/10">
                <Icon
                  className="h-6 w-6 text-forest"
                  strokeWidth={1.75}
                />
              </span>
              <p className="mt-4 text-sm font-semibold text-ink leading-snug">
                {title}
              </p>
              <p className="mt-1 text-xs text-caption">{subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}