"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Landmark,
  Home,
  Building2,
  Shirt,
  Palmtree,
  Grid3x3,
  type LucideIcon,
} from "lucide-react";
import {
  Category,
  CategoryDto,
  CategoryPillProps,
  Destination,
  DestinationCardProps,
} from "@/types/types";
const iconMap: Record<string, LucideIcon> = {
  Landmark,
  Home,
  Building2,
  Shirt,
  Palmtree,
  Grid3x3,
};

function CategoryPill({
  icon: Icon,
  label,
  active,
  onClick,
}: CategoryPillProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      className="flex flex-col items-center gap-2 shrink-0 focus:outline-none relative pb-3 "
    >
      <motion.div
        animate={{
          backgroundColor: active ? "#1f4d4d" : "#0d2b24",
          borderColor: active ? "#1f4d4d" : "#e7ddc9",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center"
      >
        <Icon
          size={18}
          strokeWidth={1.6}
          className={`sm:hidden ${active ? "text-white" : "text-white/75"}`}
        />
        <Icon
          size={22}
          strokeWidth={1.6}
          className={`hidden sm:block ${active ? "text-white" : "text-white/75"}`}
        />
      </motion.div>
      <span
        className={`text-[10px] sm:text-xs transition-colors duration-200 ${active ? "text-forest font-semibold" : "text-caption"}`}
      >
        {label}
      </span>
      {active && (
        <motion.div
          layoutId="category-indicator"
          className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-gold"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </motion.button>
  );
}

function DestinationCard({
  name,
  tag,
  src,
  mobileClassName,
  desktopClassName,
  index,
}: DestinationCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      whileHover="hover"
      className={`relative rounded-2xl overflow-hidden  cursor-pointer ${mobileClassName} ${desktopClassName}`}
    >
      <motion.div
        variants={{ hover: { scale: 1.06 } }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center img-tone"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-forest-deep/10 to-transparent" />
      <motion.div
        variants={{ hover: { y: -2 } }}
        transition={{ duration: 0.3 }}
        className="relative h-full flex flex-col justify-end p-3 md:p-5"
      >
        <h3 className="text-white font-serif text-base md:text-xl leading-tight">
          {name}
        </h3>
        <p className="text-white/75 text-[10px] md:text-xs mt-0.5">{tag}</p>
      </motion.div>
    </motion.div>
  );
}

export default function FeaturedDestinations() {
  const [active, setActive] = useState<string>("Resorts");
  const [categories, setCategories] = useState<Category[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/data.json");
        const data = await res.json();

        const formattedCategories = data.categories.map((cat: CategoryDto) => ({
          label: cat.label,
          icon: iconMap[cat.icon] || Grid3x3,
        }));

        setCategories(formattedCategories);
        setDestinations(data.destinations);
      } catch (error) {
        console.error("Failed to load JSON data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="w-full mx-auto p-8 rounded-3xl flex flex-col items-center justify-center min-h-[220px] gap-3">
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-forest/10">
          <span className="absolute inline-flex h-8 w-8 rounded-full bg-gold opacity-75 animate-ping" />
          <span className="inline-flex h-6 w-6 rounded-full border-2 border-gold" />
        </span>
        <p className="text-sm font-serif text-forest animate-pulse">
          Opening our favourite places…
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:py-16 md:px-8">
      <div className="flex gap-5 sm:gap-8 overflow-x-auto pb-4 -mx-1 px-1 justify-baseline border-b border-b-line">
        {categories.map((cat) => (
          <CategoryPill
            key={cat.label}
            icon={cat.icon}
            label={cat.label}
            active={active === cat.label}
            onClick={() => setActive(cat.label)}
          />
        ))}
      </div>

      <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-forest mt-5 md:mt-6 mb-3 md:mb-4">
        Featured destinations
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="grid grid-cols-3 grid-rows-2 gap-3 sm:gap-4 h-[380px] sm:h-[440px] md:h-[520px] items-stretch"
        >
          {destinations.map((d, i) => (
            <DestinationCard key={`${d.name}-${i}`} index={i} {...d} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
