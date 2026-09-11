"use client";

import Link from "next/link";
import {
  ChevronLeft,
  MapPin,
  Star,
  Heart,
  Share2,
  Check,
  Waves,
  Flower2,
  Coffee,
  Wifi,
  Dumbbell,
  Plane,
  PawPrint,
  Home,
  UtensilsCrossed,
  Car,
  ShowerHead,
  Building2,
  Eye,
  Fish,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import Gallery from "./Gallery";
import BookingWidget from "./BookingWidget";
import MobileBookingBar from "./MobileBookingBar";
import RoomTypes from "./RoomTypes";
import Reviews from "./Reviews";
import SimilarProperties from "./SimilarProperties";
import { Property } from "@/types/types";
import { useWishlistStore } from "@/store/wishlistStore";
import { cn } from "@/lib/utils";

const AMENITY_ICONS: Record<string, LucideIcon> = {
  Pool: Waves,
  Spa: Flower2,
  "Free breakfast": Coffee,
  "Free wifi": Wifi,
  Gym: Dumbbell,
  "Airport shuttle": Plane,
  "Pet friendly": PawPrint,
  "Family rooms": Home,
  Restaurant: UtensilsCrossed,
  Parking: Car,
  "Hot tub": ShowerHead,
  "Rooftop terrace": Building2,
  "Sea views": Eye,
  Snorkelling: Fish,
  Concierge: Briefcase,
  "Ski storage": Briefcase,
  "Air conditioning": Eye,
  Housekeeping: Check,
  "Boat transfers": Plane,
  "Private pool": Waves,
  "Private hot tub": ShowerHead,
};

export default function PropertyDetail({ property }: { property: Property }) {
  const { has, toggle } = useWishlistStore();
  const liked = has(property.id);

  const onShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    } catch {
      toast.message("Share this page with your travel crew");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-8 md:px-8 lg:pb-16">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-caption">
        <Link
          href="/hotels"
          className="flex items-center gap-1 hover:text-forest"
        >
          <ChevronLeft className="h-4 w-4" />
          All stays
        </Link>
        <span>/</span>
        <span className="truncate text-ink">{property.name}</span>
      </nav>

      <Gallery property={property} />

      {/* Header */}
      <div className="mt-7 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {property.badge && (
              <span className="rounded-full bg-gold px-3 py-1 text-[11px] font-semibold text-forest-deep">
                {property.badge}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-sm text-caption">
              <MapPin className="h-4 w-4 text-gold" />
              {property.location}, {property.country}
            </span>
          </div>
          <h1 className="mt-2 font-serif text-3xl text-forest md:text-5xl">
            {property.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full bg-forest px-3 py-1.5 text-sm font-semibold text-cream">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" />
              {property.rating}
            </span>
            <span className="text-sm text-caption">
              {property.reviewCount.toLocaleString()} verified reviews
            </span>
            <span className="hidden text-line sm:block">|</span>
            <span className="flex items-center gap-1 text-sm text-caption">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < property.stars ? "fill-gold text-gold" : "text-line",
                  )}
                />
              ))}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onShare}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-cream text-forest transition-colors hover:bg-sand focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Share property"
          >
            <Share2 className="h-[18px] w-[18px]" />
          </button>
          <button
            type="button"
            onClick={() => {
              const added = toggle(property.id);
              toast[added ? "success" : "message"](
                `${property.name} ${added ? "saved to" : "removed from"} wishlist`,
              );
            }}
            className={cn(
              "flex h-11 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
              liked
                ? "border-danger/30 bg-danger/10 text-danger"
                : "border-line bg-cream text-forest hover:bg-sand",
            )}
          >
            <Heart
              className={cn("h-[18px] w-[18px]", liked && "fill-danger")}
            />
            {liked ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      {/* Body grid */}
      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0 space-y-12">
          {/* About */}
          <section>
            <h2 className="font-serif text-2xl text-forest">
              About this property
            </h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              {property.description}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {property.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-center gap-1.5 rounded-full border border-line bg-cream px-3.5 py-1.5 text-xs font-medium text-forest"
                >
                  <Check className="h-3.5 w-3.5 text-olive" />
                  {h}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-forest">Amenities</h2>
            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
              {property.amenities.map((amenity) => {
                const Icon = AMENITY_ICONS[amenity] ?? Check;
                return (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 rounded-2xl border border-line bg-cream px-4 py-3"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sand text-forest">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-ink">{amenity}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Rooms */}
          <section>
            <h2 className="font-serif text-2xl text-forest">
              Choose your room
            </h2>
            <p className="mb-4 mt-1 text-sm text-caption">
              Prices per room, per night — adjust dates and guests above.
            </p>
            <RoomTypes property={property} />
          </section>

          {/* Reviews */}
          <section>
            <h2 className="font-serif text-2xl text-forest">Guest reviews</h2>
            <p className="mb-4 mt-1 text-sm text-caption">
              Based on real stays — recent and verified.
            </p>
            <Reviews property={property} />
          </section>
        </div>
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <BookingWidget property={property} />
          </div>
        </aside>
      </div>
      <section className="mt-16">
        <h2 className="mb-5 font-serif text-2xl text-forest">
          You may also love
        </h2>
        <SimilarProperties currentId={property.id} />
      </section>

      <MobileBookingBar property={property} />
    </div>
  );
}
