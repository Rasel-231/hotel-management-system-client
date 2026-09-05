"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  User,
  MapPin,
  ChevronDown,
  Heart,
  CalendarCheck,
} from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Hotels", href: "/hotels" },
  { label: "Destinations", href: "/destinations" },
  { label: "Deals", href: "/deals" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const wishlistCount = useWishlistStore((s) => s.ids.length);

  // Only overlay (transparent) the hero on the home page, before scrolling.
  const overlay = pathname === "/" && !scrolled && !isOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        overlay
          ? "bg-transparent"
          : "bg-cream/95 backdrop-blur-md shadow-[0_10px_30px_-18px_rgba(13,43,36,0.35)]"
      }`}
    >
      {/* Top strip */}
      <div
        className={`hidden md:flex items-center justify-between px-8 py-1.5 text-xs border-b border-white/10 ${
          overlay ? "text-cream/80" : "text-caption"
        }`}
      >
        <div className="flex items-center gap-1.5">
          <MapPin size={13} className="text-gold" />
          <span
            className={overlay ? "text-cream/80" : "text-caption"}
          >
            Curated stays across 120+ countries
          </span>
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="/support"
            className={`hover:text-gold transition-colors ${
              overlay ? "text-cream/80" : "text-caption"
            }`}
          >
            Support
          </Link>
          <Link
            href="/partner"
            className={`hover:text-gold transition-colors ${
              overlay ? "text-cream/80" : "text-caption"
            }`}
          >
            List your property
          </Link>
          <button
            className={`flex items-center gap-1 hover:text-gold transition-colors ${
              overlay ? "text-cream/80" : "text-caption"
            }`}
          >
            EN <ChevronDown size={12} />
          </button>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`flex items-center justify-between px-5 md:px-8 h-16 md:h-[72px] ${
          overlay ? "" : "border-b border-line/70"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 shrink-0"
        >
          <span
            className={`font-serif text-2xl font-bold tracking-tight ${
              overlay ? "text-cream" : "text-forest"
            }`}
          >
            Nest<span className="italic text-gold">Stay</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-[15px] font-medium transition-colors relative group ${
                    active
                      ? "text-gold"
                      : overlay
                        ? "text-cream hover:text-gold"
                        : "text-ink-soft hover:text-forest"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-full ${
                      active ? "w-full" : ""
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right actions */}
        <div
          className={`hidden lg:flex items-center gap-3 ${
            overlay ? "text-cream" : "text-forest"
          }`}
        >
          <Link
            href="/hotels"
            aria-label="Search hotels"
            className={`p-2.5 rounded-full transition-colors ${
              overlay ? "hover:bg-white/10" : "hover:bg-sand"
            }`}
          >
            <Search size={19} />
          </Link>
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className={`relative p-2.5 rounded-full transition-colors ${
              overlay ? "hover:bg-white/10" : "hover:bg-sand"
            }`}
          >
            <Heart size={19} />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[11px] font-bold text-forest-deep">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            href="/login"
            className={`px-4 py-2 text-[15px] font-medium transition-colors ${
              overlay ? "text-cream hover:text-gold" : "text-forest hover:text-gold"
            }`}
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gold text-forest-deep text-[15px] font-semibold shadow-[0_8px_20px_-8px_rgba(201,162,39,0.7)] hover:bg-gold-soft transition-colors"
          >
            <User size={16} />
            Register
          </Link>
        </div>

        {/* Mobile actions + toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            href="/hotels"
            onClick={() => setIsOpen(false)}
            aria-label="Search hotels"
            className={`p-2 rounded-full ${
              overlay ? "text-cream" : "text-forest"
            }`}
          >
            <Search size={20} />
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setIsOpen((v) => !v)}
            className={`p-2 ${overlay ? "text-cream" : "text-forest"}`}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out bg-cream ${
          isOpen ? "max-h-[480px]" : "max-h-0"
        }`}
      >
        <div className="px-5 pb-5 pt-1 flex flex-col gap-1 border-t border-line">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="py-3 text-[15px] font-medium text-forest border-b border-line/60"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 mt-4">
            <Link
              href="/wishlist"
              onClick={() => setIsOpen(false)}
              className="relative flex-1 text-center py-2.5 rounded-full border border-line text-forest text-sm font-medium"
            >
              <span className="inline-flex items-center gap-2">
                <CalendarCheck size={15} />
                Wishlist
                {wishlistCount > 0 && (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gold px-1 text-xs font-bold text-forest-deep">
                    {wishlistCount}
                  </span>
                )}
              </span>
            </Link>
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="flex-1 text-center py-2.5 rounded-full bg-forest text-cream text-sm font-semibold"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}