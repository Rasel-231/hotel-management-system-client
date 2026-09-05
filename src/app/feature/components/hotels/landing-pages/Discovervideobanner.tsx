"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";

type DiscoverVideoBannerProps = {
  /** Direct .mp4 URL — used if youtubeId is not provided */
  videoUrl?: string;
  /** YouTube video id (e.g. "dQw4w9WgXcQ") — takes priority over videoUrl */
  youtubeId?: string;
};

export default function DiscoverVideoBanner({
  videoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  youtubeId,
}: DiscoverVideoBannerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full px-4 sm:px-8 py-14 sm:py-20">
        <button
          onClick={() => setOpen(true)}
          className="group relative mx-auto block w-full max-w-5xl aspect-[16/9] overflow-hidden rounded-[2rem] text-left ring-1 ring-line"
        >
          <Image
            src="https://images.unsplash.com/photo-1720530522502-df0adff8143b?q=80&w=1600&auto=format&fit=crop"
            alt="Aerial view of an overwater resort in the Maldives"
            fill
            sizes="(max-width: 640px) 100vw, 1100px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/70 via-forest-deep/15 to-forest-deep/75" />

          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
              Watch the film
            </p>
            <h2 className="text-white">
              <span className="block font-serif italic text-3xl sm:text-5xl">
                Discover Paradise
              </span>
              <span className="mt-2 block text-2xl sm:text-3xl font-semibold tracking-wide">
                in one minute
              </span>
            </h2>

            <div className="mt-8 flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform group-hover:scale-110">
                <Play
                  className="h-5 w-5 text-forest-deep translate-x-[1px]"
                  fill="#0d2b24"
                />
              </span>
              <span className="text-white text-sm font-medium tracking-wide">
                Watch now
              </span>
            </div>
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl aspect-video overflow-hidden rounded-xl bg-black"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close video"
                className="absolute -top-10 right-0 sm:top-3 sm:right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
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
                <div className="flex h-full w-full items-center justify-center text-white/70 text-sm px-6 text-center">
                  Preview unavailable — provide a <code className="mx-1">videoUrl</code>{" "}
                  (.mp4) or <code className="mx-1">youtubeId</code> prop.
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}