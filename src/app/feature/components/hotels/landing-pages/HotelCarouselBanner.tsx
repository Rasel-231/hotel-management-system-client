"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Slide = {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  price: string;
};

const slides: Slide[] = [
  {
    image:
      "https://images.unsplash.com/photo-1728051104503-e1a4a19d638c?q=80&w=1600&auto=format&fit=crop",
    eyebrow: "এক্সক্লুসিভ অফার",
    title: "আপনার স্বপ্নের ছুটি শুরু হোক আজই",
    subtitle:
      "দেশ-বিদেশের সেরা হোটেল ও রিসোর্ট, নিরাপদ পেমেন্ট এবং সর্বনিম্ন মূল্যের নিশ্চয়তাসহ বুক করুন মাত্র কয়েক ক্লিকে।",
    price: "৳ ২,৪৯৯",
  },
  {
    image:
      "https://images.unsplash.com/photo-1739304150315-26a8676d01ef?q=80&w=1600&auto=format&fit=crop",
    eyebrow: "পাহাড়ি রিসোর্ট",
    title: "পাহাড় ঘেরা প্রশান্তির ঠিকানা",
    subtitle:
      "নির্জন পরিবেশে বিলাসবহুল রিসোর্টে কাটান স্বস্তির কিছু দিন, পরিবার কিংবা প্রিয়জনের সাথে।",
    price: "৳ ৩,১৯৯",
  },
  {
    image:
      "https://images.unsplash.com/photo-1571984405176-5958bd9ac31d?q=80&w=1600&auto=format&fit=crop",
    eyebrow: "সি-ভিউ রিসোর্ট",
    title: "সমুদ্র সৈকতের পাশে বিলাসবহুল অবকাশ",
    subtitle:
      "নীল জলরাশির পাশে ছায়াঘেরা পুল আর খোলা আকাশের নিচে কাটান স্মরণীয় সময়।",
    price: "৳ ৩,৮৯৯",
  },
  {
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1600&auto=format&fit=crop",
    eyebrow: "সীমিত সময়ের ছাড়",
    title: "সূর্যাস্তের রঙে রাঙা সন্ধ্যা",
    subtitle:
      "আজই বুক করুন এবং পেয়ে যান বিশেষ ছাড়ে প্রিমিয়াম রুম আপগ্রেডের সুযোগ।",
    price: "৳ ২,৯৯৯",
  },
];

const AUTOPLAY_MS = 5500;

export default function HotelCarouselBanner({
  onBook,
}: {
  onBook?: (slide: Slide) => void;
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const paginate = useCallback((dir: 1 | -1) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + slides.length) % slides.length);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      setDirection(i > index ? 1 : -1);
      setIndex(i);
    },
    [index],
  );

  const restart = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => paginate(1), AUTOPLAY_MS);
  }, [paginate]);

  useEffect(() => {
    restart();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [restart]);

  const slide = slides[index];

  return (
    <div className="w-full flex items-center justify-center  ">
      <div className="relative w-full  aspect-[16/9] md:aspect-[16/7] min-h-[380px] md:min-h-[360px]  overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/5">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.0 }}
            transition={{ duration: 0.85, ease: [0.65, 0.05, 0.24, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(100deg, rgba(9,20,17,0.92) 0%, rgba(9,20,17,0.62) 32%, rgba(9,20,17,0.08) 58%, rgba(9,20,17,0.05) 100%), linear-gradient(0deg, rgba(6,14,12,0.55) 0%, rgba(6,14,12,0) 42%)",
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="absolute inset-0 flex flex-col justify-center max-w-[560px] px-6 md:px-14 py-10 text-[#f6f1e6]"
            >
              <div className="flex items-center gap-2.5 mb-4 text-sm font-semibold text-[#e8c581]">
                <span className="inline-block w-6 h-[1.5px] bg-[#e8c581]" />
                {slide.eyebrow}
              </div>

              <h1 className="font-bold leading-tight mb-3 text-[26px] md:text-[42px] drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]">
                {slide.title}
              </h1>

              <p className="text-sm md:text-base leading-relaxed text-[#f6f1e6]/85 max-w-md mb-7">
                {slide.subtitle}
              </p>

              <div className="flex items-center gap-4 flex-wrap">
                <Button
                  size="lg"
                  onClick={() => onBook?.(slide)}
                  className="bg-[#cf9a3d] hover:bg-[#e8c581] text-[#211404] font-bold rounded-full px-7 py-6 shadow-[0_10px_24px_-8px_rgba(207,154,61,0.55)] hover:shadow-[0_14px_30px_-8px_rgba(207,154,61,0.7)] transition-all"
                >
                  এখনই বুক করুন
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <div className="text-sm text-[#f6f1e6]/75">
                  শুরু{" "}
                  <b className="text-[#e8c581] text-base font-bold">
                    {slide.price}
                  </b>{" "}
                  / রাত থেকে
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="hidden md:flex absolute top-6 right-6 z-10 items-center gap-2 rounded-full border border-white/30 bg-[#09140f]/50 backdrop-blur-md px-4 py-2 text-xs text-[#f6f1e6]">
          <Star className="h-3.5 w-3.5 text-[#e8c581] fill-[#e8c581]" />
          ৪.৮ / ৫ — ১২,০০০+ রিভিউ
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                goTo(i);
                restart();
              }}
              className={cn(
                "h-2 rounded-full transition-all border border-transparent",
                i === index
                  ? "w-6 bg-[#cf9a3d]"
                  : "w-2 bg-white/40 hover:bg-white/60",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
