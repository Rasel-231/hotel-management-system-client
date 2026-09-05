"use client";

import { useMemo } from "react";
import {
  SlidersHorizontal,
  Star,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  PROPERTY_TYPES,
  priceBounds,
  properties,
} from "@/lib/data/properties";
import { useSearchStore } from "@/store/searchStore";

const AMENITY_OPTIONS = [
  "Pool",
  "Spa",
  "Free breakfast",
  "Free wifi",
  "Gym",
  "Airport shuttle",
  "Pet friendly",
  "Family rooms",
  "Restaurant",
  "Parking",
];

const STAR_OPTIONS = [5, 4, 3];

function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h3 className="mb-3 text-xs font-semibold tracking-[0.14em] uppercase text-caption">
      {children}
    </h3>
  );
}

function FilterControls() {
  const { filters, setFilters, resetFilters } = useSearchStore();

  const maxBound = priceBounds[1];

  const toggleInList = (list: string[], value: string) =>
    list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value];

  return (
    <div className="flex flex-col gap-7">
      {/* Price */}
      <div>
        <div className="flex items-baseline justify-between mb-3">
          <SectionTitle>Budget per night</SectionTitle>
          <span className="text-sm font-semibold text-forest">
            ${filters.priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min={priceBounds[0]}
          max={maxBound}
          step={10}
          value={filters.priceRange[1]}
          onChange={(e) =>
            setFilters({ priceRange: [priceBounds[0], Number(e.target.value)] })
          }
          className="w-full accent-forest cursor-pointer"
          aria-label="Maximum price per night"
        />
        <div className="mt-1 flex justify-between text-[11px] text-caption">
          <span>${priceBounds[0]}</span>
          <span>${maxBound}+</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span
            className={cn(
              "text-xs",
              filters.priceRange[1] >= maxBound
                ? "text-caption"
                : "font-semibold text-forest"
            )}
          >
            Up to ${filters.priceRange[1]}
          </span>
          <span className="text-xs text-caption">/night</span>
        </div>
      </div>

      {/* Guest rating */}
      <div>
        <SectionTitle>Guest rating</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {STAR_OPTIONS.map((star) => {
            const active = filters.stars.includes(star);
            return (
              <button
                key={star}
                type="button"
                onClick={() =>
                  setFilters({
                    stars: active
                      ? filters.stars.filter((s) => s !== star)
                      : [...filters.stars, star],
                  })
                }
                className={cn(
                  "flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm transition-colors",
                  active
                    ? "border-forest bg-forest text-cream"
                    : "border-line bg-cream text-ink-soft hover:border-forest/40"
                )}
              >
                <Star
                  className={cn(
                    "h-3.5 w-3.5",
                    active ? "fill-gold text-gold" : "text-gold"
                  )}
                />
                {star}+
              </button>
            );
          })}
        </div>
      </div>

      {/* Property type */}
      <div>
        <SectionTitle>Property type</SectionTitle>
        <div className="flex flex-col gap-2">
          {PROPERTY_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() =>
                setFilters({
                  propertyTypes: toggleInList(
                    filters.propertyTypes,
                    type.value
                  ),
                })
              }
              className="group flex items-center justify-between text-sm"
            >
              <span className="flex items-center gap-2.5 text-ink">
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-md border transition-colors",
                    filters.propertyTypes.includes(type.value)
                      ? "border-forest bg-forest text-cream"
                      : "border-line bg-cream group-hover:border-forest/40"
                  )}
                >
                  {filters.propertyTypes.includes(type.value) && (
                    <Check className="h-3 w-3" />
                  )}
                </span>
                {type.label}
              </span>
              <span className="text-xs text-caption">
                {properties.filter((p) => p.type === type.value).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <SectionTitle>Amenities</SectionTitle>
        <div className="flex flex-col gap-2">
          {AMENITY_OPTIONS.map((amenity) => (
            <button
              key={amenity}
              type="button"
              onClick={() =>
                setFilters({
                  amenities: toggleInList(filters.amenities, amenity),
                })
              }
              className="group flex items-center gap-2.5 text-sm text-ink"
            >
              <span
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-md border transition-colors",
                  filters.amenities.includes(amenity)
                    ? "border-forest bg-forest text-cream"
                    : "border-line bg-cream group-hover:border-forest/40"
                )}
              >
                {filters.amenities.includes(amenity) && <Check className="h-3 w-3" />}
              </span>
              {amenity}
            </button>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        onClick={resetFilters}
        className="w-full rounded-full border-line bg-cream text-forest hover:bg-sand"
      >
        Clear all filters
      </Button>
    </div>
  );
}

export function FilterPanel({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-y-auto rounded-3xl border border-line bg-cream p-6 lg:block",
        className
      )}
    >
      <div className="mb-6 flex items-center gap-2 border-b border-line pb-4">
        <SlidersHorizontal className="h-4 w-4 text-gold" />
        <span className="font-serif text-lg text-forest">Filters</span>
      </div>
      <FilterControls />
    </aside>
  );
}

export function MobileFilterSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { filterCount, resetFilters } = useFilterCounts();
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[85vh] rounded-t-3xl">
        <SheetHeader className="flex-row items-center justify-between border-b border-line">
          <SheetTitle className="flex items-center gap-2 font-serif text-lg text-forest">
            <SlidersHorizontal className="h-4 w-4 text-gold" />
            Filters
            {filterCount > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gold px-1.5 text-[11px] font-bold text-forest-deep">
                {filterCount}
              </span>
            )}
          </SheetTitle>
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs font-medium text-caption hover:text-danger"
          >
            Clear all
          </button>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4 py-5">
          <FilterControls />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function useFilterCounts() {
  const filters = useSearchStore((s) => s.filters);
  const resetFilters = useSearchStore((s) => s.resetFilters);
  const filterCount = useMemo(
    () =>
      filters.stars.length +
      filters.propertyTypes.length +
      filters.amenities.length +
      (filters.priceRange[1] < priceBounds[1] ? 1 : 0),
    [filters]
  );
  return { filterCount, resetFilters };
}