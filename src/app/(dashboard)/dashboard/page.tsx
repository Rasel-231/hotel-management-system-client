import Link from "next/link";
import { CalendarDays, Heart, User } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <h1 className="font-serif text-4xl text-forest">Your dashboard</h1>
      <p className="mt-2 max-w-xl text-ink-soft">
        Manage upcoming stays, saved properties, and your profile — all in one
        place.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          {
            icon: CalendarDays,
            title: "Upcoming bookings",
            desc: "Review, amend, or cancel your upcoming stays.",
            href: "/dashboard?tab=bookings",
          },
          {
            icon: Heart,
            title: "Wishlist",
            desc: "Properties you&apos;ve saved for later.",
            href: "/hotels",
          },
          {
            icon: User,
            title: "Profile settings",
            desc: "Update your details and preferences.",
            href: "/dashboard?tab=profile",
          },
        ].map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group rounded-3xl border border-line bg-cream p-6 transition-shadow hover:shadow-[0_24px_50px_-30px_rgba(13,43,36,0.5)]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-cream transition-colors group-hover:bg-gold group-hover:text-forest-deep">
              <card.icon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 font-serif text-xl text-forest">
              {card.title}
            </h2>
            <p className="mt-1 text-sm text-ink-soft">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
