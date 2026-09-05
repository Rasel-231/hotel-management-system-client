"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, MapPin, Star, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import type { Property } from "@/lib/data/properties";
import { useWishlistStore } from "@/store/wishlistStore";
import { cn } from "@/lib/utils";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop";

interface PropertyCardProps {
  property: Property;
  index?: number;
  className?: string;
}

export default function PropertyCard({
  property,
  index = 0,
  className,
}: PropertyCardProps) {
  const { has, toggle } = useWishlistStore();
  const liked = has(property.id);

  const onToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggle(property.id);
    if (added) {
      toast.success(`Saved ${property.name} to wishlist`, {
        description: "Find it any time from the heart icon.",
      });
    } else {
      toast.message(`Removed ${property.name} from wishlist`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
      className={cn("group", className)}
    >
      <Link
        href={`/hotels/${property.id}`}
        className="flex flex-col gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-3xl"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand shadow-[0_18px_40px_-24px_rgba(13,43,36,0.4)]">
          <Image
            src={property.images[0] || FALLBACK_IMG}
            alt={property.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />

          {property.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold text-forest-deep shadow-sm">
              {property.badge}
            </span>
          )}

          <button
            type="button"
            aria-label={liked ? "Remove from wishlist" : "Save to wishlist"}
            onClick={onToggleWishlist}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-cream/90 backdrop-blur-sm text-forest transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Heart
              className={cn(
                "h-[18px] w-[18px] transition-colors",
                liked ? "fill-danger text-danger" : "text-forest"
              )}
            />
          </button>

          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-forest-deep/40 to-transparent" />
        </div>

        <div className="flex items-start justify-between gap-3 px-0.5">
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 truncate text-xs text-caption">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-gold" />
              <span className="truncate">
                {property.location}, {property.country}
              </span>
            </p>
            <h3 className="mt-1 truncate font-serif text-lg text-forest leading-tight">
              {property.name}
            </h3>
            <p className="mt-1 flex items-center gap-1 text-xs text-ink-soft">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" />
              <b className="font-semibold text-ink">{property.rating}</b>
              <span className="text-caption">
                ({property.reviewCount.toLocaleString()} reviews)
              </span>
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[11px] text-caption">from</p>
            <p className="font-semibold text-forest">
              <span className="text-lg">
                {property.currency === "USD" ? "$" : property.currency}{" "}
                {property.price}
              </span>
              <span className="text-sm font-normal text-caption">/night</span>
            </p>
          </div>
        </div>

        <ButtonCta />
      </Link>
    </motion.div>
  );
}

function ButtonCta() {
  return (
    <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-forest px-4 py-2 text-xs font-semibold text-cream transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_10px_20px_-10px_rgba(31,77,77,0.8)]">
      View details
      <ArrowRight className="h-3.5 w-3.5" />
    </span>
  );
}