"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Landmark,
  Home,
  Building2,
  Shirt,
  Palmtree,
  Grid3x3,
  type LucideIcon,
} from "lucide-react";

interface CategoryDto {
  label: string;
  icon: string;
}

interface Destination {
  name: string;
  tag: string;
  src: string;
  mobileClassName: string;
  desktopClassName: string;
}

interface Category {
  label: string;
  icon: LucideIcon;
}

const iconMap: Record<string, LucideIcon> = {
  Landmark,
  Home,
  Building2,
  Shirt,
  Palmtree,
  Grid3x3,
};

interface CategoryPillProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
}

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
      className="flex flex-col items-center gap-2 shrink-0 focus:outline-none"
    >
      <motion.div
        animate={{
          backgroundColor: active ? "#1c1917" : "#fafaf9",
          borderColor: active ? "#1c1917" : "#e7e5e4",
        }}
        transition={{ duration: 0.2 }}
        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl border flex items-center justify-center"
      >
        <Icon
          size={18}
          strokeWidth={1.6}
          className={`sm:hidden ${active ? "text-white" : "text-stone-700"}`}
        />
        <Icon
          size={22}
          strokeWidth={1.6}
          className={`hidden sm:block ${active ? "text-white" : "text-stone-700"}`}
        />
      </motion.div>
      <span
        className={`text-[10px] sm:text-xs ${active ? "text-stone-900 font-medium" : "text-stone-500"}`}
      >
        {label}
      </span>
    </motion.button>
  );
}

interface DestinationCardProps extends Destination {
  index: number;
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      whileHover="hover"
      className={`relative rounded-2xl overflow-hidden cursor-pointer ${mobileClassName} ${desktopClassName}`}
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
          className="object-cover object-center"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
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
      <div className="w-full mx-auto  p-8 rounded-3xl flex items-center justify-center min-h-[300px]">
        <p className="text-stone-500 text-sm animate-pulse">
          Loading destinations...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto  p-4 sm:p-5 md:p-8 rounded-3xl">
      <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-1 -mx-1 px-1">
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

      <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-stone-900 mt-5 md:mt-6 mb-3 md:mb-4">
        Featured destinations
      </h2>

      <div className="grid grid-cols-3 grid-rows-2 gap-3 sm:gap-4 h-[380px] sm:h-[440px] md:h-[520px] items-stretch">
        {destinations.map((d, i) => (
          <DestinationCard key={`${d.name}-${i}`} index={i} {...d} />
        ))}
      </div>
    </div>
  );
}
