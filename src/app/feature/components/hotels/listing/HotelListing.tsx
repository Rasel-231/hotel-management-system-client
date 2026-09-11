"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, ArrowUpDown, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import PropertyCard from "../ui/PropertyCard";
import SearchBar from "../ui/SearchBar";
import { FilterPanel, MobileFilterSheet } from "../ui/FilterPanel";
import { properties } from "@/lib/data/properties";
import { useSearchStore, type SortOption } from "@/store/searchStore";
import { cn } from "@/lib/utils";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "popular", label: "Most popular" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

export default function HotelListing() {
  const { query, filters, setFilters } = useSearchStore();
  const [sheetOpen, setSheetOpen] = useState(false);

  const results = useMemo(() => {
    let list = [...properties];

    if (query.destination.trim()) {
      const q = query.destination.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.country.toLowerCase().includes(q),
      );
    }

    list = list.filter((p) => p.price <= filters.priceRange[1]);

    if (filters.stars.length > 0) {
      const min = Math.min(...filters.stars);
      list = list.filter((p) => p.rating >= min);
    }

    if (filters.propertyTypes.length > 0) {
      list = list.filter((p) => filters.propertyTypes.includes(p.type));
    }

    if (filters.amenities.length > 0) {
      list = list.filter((p) =>
        filters.amenities.every((a) => p.amenities.includes(a)),
      );
    }

    switch (filters.sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }

    return list;
  }, [query.destination, filters]);

  const activeSortLabel =
    SORT_OPTIONS.find((o) => o.value === filters.sort)?.label ?? "Recommended";

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
      <div className="pt-8 md:pt-14">
        <SearchBar />
      </div>

      <header className="mt-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-800">
            {results.length} stays
          </p>
          <h1 className="mt-1 font-serif text-3xl text-forest md:text-4xl">
            {query.destination.trim()
              ? `Stays in ${query.destination.trim()}`
              : "Find your escape"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setSheetOpen(true)}
            className="lg:hidden rounded-full border-line bg-cream text-forest hover:bg-sand"
          >
            <SlidersHorizontal className="h-4 w-4 text-gold" />
            Filters
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-full border border-line bg-cream px-5 text-sm font-medium text-forest transition-colors hover:bg-sand focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
              )}
            >
              <ArrowUpDown className="h-4 w-4 text-gold" />
              {activeSortLabel}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              {SORT_OPTIONS.map((opt) => (
                <DropdownMenuItem
                  key={opt.value}
                  onClick={() => setFilters({ sort: opt.value })}
                  className={cn(
                    filters.sort === opt.value && "font-semibold text-forest",
                  )}
                >
                  {opt.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <FilterPanel />

        <section>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((property, i) => (
                <PropertyCard key={property.id} property={property} index={i} />
              ))}
            </div>
          ) : (
            <EmptyState onReset={() => setFilters({ sort: filters.sort })} />
          )}
        </section>
      </div>

      <MobileFilterSheet open={sheetOpen} onOpenChange={setSheetOpen} />
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-cream px-6 py-7 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sand text-forest">
        <SearchX className="h-7 w-7" />
      </span>
      <h3 className="mt-5 font-serif text-2xl text-forest">
        No stays match your filters
      </h3>
      <p className="mt-2 max-w-sm text-sm text-ink-soft/80">
        Try widening your budget, removing some amenities, or clearing the
        filters to see more places.
      </p>
      <Button
        onClick={onReset}
        className="mt-6 rounded-full border border-gold-800/50 bg-transparent px-6 text-gold-800 hover:bg-gold-100"
      >
        Clear filters
      </Button>
    </div>
  );
}
