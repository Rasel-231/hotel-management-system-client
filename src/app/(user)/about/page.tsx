import Image from "next/image";
import { Reveal } from "../../../components/ui/reveal";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Compass,
  HeartHandshake,
  Leaf,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import SectionHeading from "../../feature/components/hotels/ui/SectionHeading";
import Testimonials from "../../feature/components/hotels/landing-pages/Testimonials";

const STATS = [
  { value: "120+", label: "Countries served" },
  { value: "1.2M", label: "Verified stays" },
  { value: "4.8", label: "Average guest rating" },
  { value: "24/7", label: "Human support" },
];

const VALUES = [
  {
    icon: BadgeCheck,
    title: "Verified, always",
    subtitle:
      "Every stay is checked by a human — photos, owners, and reviews included.",
  },
  {
    icon: HeartHandshake,
    title: "Hospitality first",
    subtitle:
      "We started as hosts. If it wouldn't delight us as guests, it doesn't ship.",
  },
  {
    icon: Leaf,
    title: "Travel that gives back",
    subtitle:
      "A share of every booking supports local communities and eco-certified stays.",
  },
  {
    icon: ShieldCheck,
    title: "Radically transparent",
    subtitle:
      "The price at search is the price at checkout. No surprises, ever.",
  },
];

const TIMELINE = [
  {
    year: "2016",
    title: "Two hosts, one spreadsheet",
    subtitle:
      "Founded in Dhaka with a shared laptop and a firm rule: never book a stay we'd refuse ourselves.",
  },
  {
    year: "2019",
    title: "A million nights booked",
    subtitle:
      "Crossed a million verified nights and opened our first regional support desk.",
  },
  {
    year: "2022",
    title: "The eco standard",
    subtitle:
      "Launched our certified-sustainable badge and partnered with local conservation funds.",
  },
  {
    year: "Today",
    title: "120+ countries and counting",
    subtitle:
      "A small team with an outsized obsession — making great stays feel effortless.",
  },
];

const TEAM = [
  {
    name: "Arif Hossain",
    role: "Co-founder & CEO",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Meher Chowdhury",
    role: "Co-founder & Chief of Hospitality",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Tanvir Islam",
    role: "Head of Product",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-forest-deep">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2400&auto=format&fit=crop"
            alt="Resort pool overlooking the ocean at dusk"
            fill
            priority
            sizes="100vw"
            className="object-cover img-tone"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/85 to-forest-deep/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[500px] max-w-7xl flex-col justify-center px-5 py-24 sm:min-h-[560px] md:px-8">
          <div className="max-w-2xl">
            <p className="mb-4 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              <span className="inline-block h-[1.5px] w-6 bg-gold" />
              Our story
            </p>
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-cream sm:text-5xl md:text-6xl">
              We built the booking
              <br />
              we wished existed
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-cream/75 sm:text-base">
              NestStay began with two hosts, a shared laptop, and one firm rule:
              never book a stay we wouldn&apos;t sleep in ourselves. A decade on,
              that rule still runs the whole company.
            </p>
          </div>
        </div>
      </section>

      <div className="divider-gold" />

      {/* Story */}
      <section className="w-full py-12 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop"
                alt="Luxury hotel lobby interior"
                width={1600}
                height={1100}
                className="object-cover img-tone"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 hidden rounded-2xl border border-line bg-cream px-6 py-5 shadow-[0_20px_50px_-28px_rgba(13,43,36,0.5)] sm:block md:-right-6">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                <Compass className="h-4 w-4" />
                Since 2016
              </p>
              <p className="mt-1.5 font-serif text-2xl text-forest">
                1.2M happy nights
              </p>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Why NestStay"
              title="A tiny team with an outsized obsession"
              description=""
            />
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-soft sm:text-[15px]">
              <p>
                We used to lose hours comparing rates, squinting at pixelated
                photos, and crossing our fingers about what would greet us at
                check-in. Every frustration was a feature we wanted to kill —
                so we started listing stays the way we&apos;d want them listed
                ourselves.
              </p>
              <p>
                Today NestStay connects travellers with 120+ countries worth of
                verified hotels, resorts and homestays. The team is still
                compact, the photos are still vetted by humans, and the prices
                you see are still the prices you pay.
              </p>
              <p>
                If a stay wouldn&apos;t delight us as guests, it doesn&apos;t
                make the list. That&apos;s the whole strategy.
              </p>
            </div>
            <Link
              href="/hotels"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3 text-sm font-semibold text-cream transition-all hover:bg-forest-deep"
            >
              Explore our stays
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="relative isolate overflow-hidden bg-forest-deep py-14 sm:py-16">
        <div className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 -bottom-16 h-64 w-64 rounded-full bg-olive/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 md:grid-cols-4 md:px-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-4xl text-gold sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-cream/60 sm:text-sm sm:tracking-[0.2em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="w-full py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="What we stand on"
            title="The values behind every booking"
            description="Four principles that survive every roadmap, launch and layover."
            align="center"
            className="mb-10"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, subtitle }, i) => (
              <Reveal key={title} delay={i * 90}>
                <div className="flex h-full flex-col rounded-3xl border border-line bg-cream p-6 card-lux">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest/10">
                  <Icon className="h-6 w-6 text-forest" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 font-serif text-lg text-forest">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {subtitle}
                </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="w-full border-t border-line bg-sand py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="The road so far"
            title="From spreadsheet to 120 countries"
          />
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((item) => (
              <div key={item.year} className="relative">
                <div className="h-1 w-10 rounded-full bg-gold" />
                <p className="mt-4 font-serif text-2xl text-forest">
                  {item.year}
                </p>
                <h3 className="mt-1.5 text-sm font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="w-full py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="The people"
            title="A small team, hands on the details"
            description="Founders still read every support thread and taste-test every perk."
            align="center"
            className="mb-10"
          />
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
            {TEAM.map((member, i) => (
              <Reveal key={member.name} delay={i * 90}>
                <div className="flex h-full flex-col items-center rounded-3xl border border-line bg-cream p-6 text-center card-lux">
                <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-gold/50">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    sizes="96px"
                    className="object-cover img-tone"
                  />
                </div>
                <h3 className="mt-4 font-serif text-lg text-forest">
                  {member.name}
                </h3>
                <p className="mt-1 flex items-center gap-1 text-xs text-caption">
                  <MapPin className="h-3 w-3 text-gold" />
                  {member.role}
                </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <div className="w-full border-t border-line py-12 sm:py-16">
        <Testimonials />
      </div>

      {/* CTA band */}
      <section className="relative isolate overflow-hidden bg-forest-deep py-16 sm:py-20">
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-olive/20 blur-3xl" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-5 text-center md:px-8">
          <Sparkles className="h-8 w-8 text-gold" />
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            Come stay with us
          </p>
          <h2 className="mt-2 max-w-2xl font-serif text-3xl text-cream sm:text-4xl">
            Your kind of quiet is out there
          </h2>
          <p className="mt-3 max-w-xl text-sm text-cream/70 sm:text-base">
            Browse verified stays, grab a current deal, and let this small team
            make booking feel like the easy part.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/destinations"
              className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-forest-deep transition-all hover:bg-gold-soft"
            >
              Explore destinations
            </Link>
            <Link
              href="/deals"
              className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-cream transition-colors hover:border-gold hover:text-gold"
            >
              View current deals
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}