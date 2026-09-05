"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Expand, ChevronLeft, ChevronRight, X } from "lucide-react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Property } from "@/lib/data/properties";
import { cn } from "@/lib/utils";

interface GalleryProps {
  property: Property;
}

export default function Gallery({ property }: GalleryProps) {
  const images = property.images;
  // Pad to 5 slots so the grid is always full (reuse images as placeholder).
  const slots = useMemo(() => {
    const result = [...images];
    for (let i = 0; i < 5; i++) {
      result[i] = result[i] ?? images[i % images.length];
    }
    return result.slice(0, 5);
  }, [images]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = () => setLightboxIndex(null);
  const step = (dir: 1 | -1) =>
    setLightboxIndex((cur) =>
      cur === null ? cur : (cur + dir + slots.length) % slots.length
    );

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 md:gap-3">
        {slots.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setLightboxIndex(i)}
            aria-label={`View ${property.name} photo ${i + 1} larger`}
            className={cn(
              "group relative overflow-hidden rounded-2xl bg-sand focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
              i === 0 &&
                "col-span-4 row-span-1 h-[220px] sm:h-[320px] md:col-span-2 md:row-span-2 md:h-auto"
            )}
          >
            <Image
              src={src}
              alt={`${property.name} — photo ${i + 1}`}
              fill
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 bg-forest-deep/0 transition-colors group-hover:bg-forest-deep/20" />
            <span className="absolute bottom-2 right-2 hidden h-8 w-8 items-center justify-center rounded-full bg-cream/90 text-forest opacity-0 transition-opacity group-hover:opacity-100 md:flex">
              <Expand className="h-4 w-4" />
            </span>
          </button>
        ))}
      </div>

      <Dialog open={lightboxIndex !== null} onOpenChange={(o) => !o && close()}>
        <DialogContent className="max-w-5xl overflow-hidden bg-forest-deep/95 p-0">
          <div className="relative h-[70vh] w-full">
            {lightboxIndex !== null && (
              <Image
                src={slots[lightboxIndex]}
                alt={`${property.name} — photo ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            )}
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => step(-1)}
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/15 text-cream backdrop-blur-md hover:bg-cream/30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => step(1)}
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/15 text-cream backdrop-blur-md hover:bg-cream/30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Close photo viewer"
              onClick={close}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream/15 text-cream backdrop-blur-md hover:bg-cream/30"
            >
              <X className="h-5 w-5" />
            </button>
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-forest-deep/70 px-3 py-1 text-xs text-cream">
              {(lightboxIndex ?? 0) + 1} / {slots.length}
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}