"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { DiscoverVideoBannerProps } from "@/types/types";

export default function DiscoverVideoBanner({
  videoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  youtubeId,
  thumbnail = "https://images.unsplash.com/photo-1720530522502-df0adff8143b?q=80&w=1600&auto=format&fit=crop",
  duration = "2:14",
}: DiscoverVideoBannerProps) {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="w-full px-5 py-8 sm:py-16 md:px-8">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group mx-auto grid w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-line bg-cream text-left shadow-sm transition-shadow hover:shadow-md sm:grid-cols-[1fr_1.35fr]"
        >
          {/* Text panel */}
          <div className="order-2 flex flex-col justify-center gap-3 p-6 sm:order-1 sm:p-9">
            <p className="text-xs text-caption">
              Behind the resorts we recommend
            </p>
            <h2 className="font-serif text-2xl leading-snug text-forest sm:text-[1.85rem]">
              A closer look at paradise, in one minute
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
              A short film on the villas, reefs and quiet corners behind our
              favourite Maldives stays.
            </p>
            <span className="mt-2 inline-flex items-center gap-2.5 text-sm font-medium text-forest">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-cream transition-transform group-hover:scale-105">
                <Play
                  className="h-3 w-3 translate-x-[1px]"
                  fill="currentColor"
                />
              </span>
              Watch the film — {duration}
            </span>
          </div>

          {/* Thumbnail panel — this frame morphs into the modal on open */}
          <motion.div
            layoutId="video-banner-frame"
            className="relative order-1 aspect-[4/3] w-full overflow-hidden sm:order-2 sm:aspect-auto"
          >
            <Image
              src={thumbnail}
              alt="Aerial view of an overwater resort in the Maldives"
              fill
              sizes="(max-width: 640px) 100vw, 700px"
              className="object-cover img-tone transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-forest-deep/50 to-transparent sm:hidden" />
            <span className="absolute right-3 top-3 rounded-full bg-forest-deep/70 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
              {duration}
            </span>
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-forest-deep/90 p-4 backdrop-blur-sm "
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Discover Paradise film"
          >
            <motion.div
              layoutId="video-banner-frame"
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-xl bg-black"
            >
              <button
                ref={closeButtonRef}
                onClick={() => setOpen(false)}
                aria-label="Close video"
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                <X className="h-5 w-5" />
              </button>

              {youtubeId ? (
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                  title="Discover Paradise"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : videoUrl ? (
                <video
                  className="h-full w-full"
                  src={videoUrl}
                  controls
                  autoPlay
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm text-white/70">
                  Preview unavailable — provide a{" "}
                  <code className="mx-1">videoUrl</code> (.mp4) or{" "}
                  <code className="mx-1">youtubeId</code> prop.
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
