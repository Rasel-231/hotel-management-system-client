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
  Diamond,
} from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useUserProfileQuery } from "@/store/api/userApi/userApi";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Hotels", href: "/hotels" },
  { label: "Destinations", href: "/destinations" },
  { label: "Deals", href: "/deals" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const wishlistCount = useWishlistStore((s) => s.ids.length);
  const { data: userProfileResponse, isLoading: loading } =
    useUserProfileQuery();
  const userProfile = userProfileResponse?.data ?? null;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-forest-deep text-cream">
        Loading...
      </div>
    );
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-2xl border-b transition-all duration-500 ease-out ${
        scrolled
          ? "bg-forest-deep/95 border-gold/20 shadow-[0_10px_30px_-10px_rgba(5,20,16,0.5)]"
          : "bg-forest-deep/70 border-white/10 shadow-none"
      } ${visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
    >
      {/* Top rich notification strip */}
      <div className="hidden md:flex items-center justify-between px-10 py-2.5 text-[13px] tracking-wide border-b border-white/10 bg-[#071814]/80 text-cream/80">
        <div className="flex items-center gap-2.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(201,162,39,0.8)] animate-pulse" />
          <MapPin size={13} className="text-gold" />
          <span className="font-medium tracking-wide">
            Curated ultra-luxury stays across 120+ countries
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/support"
            className="relative font-medium text-cream/70 transition-all duration-300 hover:text-gold after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
          >
            Support
          </Link>
          <Link
            href="/partner"
            className="relative font-medium text-cream/70 transition-all duration-300 hover:text-gold after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
          >
            List your property
          </Link>
          <span className="w-px h-3 bg-white/20" />
          <button className="flex items-center gap-1.5 font-medium text-cream/70 transition-all duration-300 hover:text-gold">
            EN <ChevronDown size={11} className="opacity-60" />
          </button>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="flex items-center justify-between px-5 md:px-10 h-16 md:h-[72px]">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2.5 shrink-0 group"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-gold/30 via-gold/10 to-transparent border border-gold/30 shadow-[0_0_20px_-4px_rgba(201,162,39,0.4)] transition-all duration-300 group-hover:scale-105 group-hover:border-gold/60">
            <Diamond
              size={18}
              className="text-gold transition-transform duration-300 group-hover:rotate-12"
              fill="currentColor"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-[22px] font-bold tracking-tight leading-none text-cream group-hover:text-gold transition-colors duration-300">
              Nest<span className="text-gold">Stay</span>
            </span>
            <span className="text-[9px] font-semibold tracking-[0.25em] uppercase leading-none mt-1 text-gold/70">
              Luxury Collection
            </span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-1.5 bg-black/20 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative px-5 py-2 text-[14px] font-medium transition-all duration-300 rounded-full ${
                    active
                      ? "text-forest-deep bg-gradient-to-r from-gold via-gold-soft to-gold font-semibold shadow-[0_2px_12px_rgba(201,162,39,0.4)]"
                      : "text-cream/80 hover:text-gold hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-2 text-cream">
          {/* Search */}
          <Link
            href="/hotels"
            aria-label="Search hotels"
            className="relative p-2.5 rounded-full text-cream/80 hover:bg-white/10 hover:text-gold transition-all duration-300 border border-transparent hover:border-white/10"
          >
            <Search size={18} strokeWidth={2.2} />
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative p-2.5 rounded-full text-cream/80 hover:bg-white/10 hover:text-gold transition-all duration-300 border border-transparent hover:border-white/10"
          >
            <Heart size={18} strokeWidth={2.2} />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold text-[10px] font-bold text-forest-deep shadow-[0_2px_8px_-2px_rgba(201,162,39,0.8)] animate-[pulse_2s_ease-in-out_infinite]">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Divider */}
          <span className="w-px h-5 mx-1 bg-white/20" />

          {/* Conditional Auth / Profile Section */}
          {userProfile ? (
            <Link
              href="/profile"
              className="group relative flex items-center gap-2.5 px-4 py-2 rounded-full text-[14px] font-semibold tracking-wide text-forest-deep bg-gradient-to-r from-gold via-gold-soft to-gold shadow-[0_4px_20px_-4px_rgba(201,162,39,0.6)] hover:shadow-[0_6px_28px_-4px_rgba(201,162,39,0.9)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-deep text-gold text-xs font-bold">
                {userProfile.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="truncate max-w-[120px]">{userProfile.name}</span>
            </Link>
          ) : (
            <>
              {/* Sign in */}
              <Link
                href="/login"
                className="px-4 py-2 text-[14px] font-semibold tracking-wide text-cream/90 hover:text-gold hover:bg-white/10 transition-all duration-300 rounded-full"
              >
                Sign in
              </Link>

              {/* Register CTA */}
              <Link
                href="/register"
                className="group relative flex items-center gap-2 px-6 py-2.5 rounded-full text-[14px] font-bold tracking-wide text-forest-deep bg-gradient-to-r from-gold via-gold-soft to-gold shadow-[0_4px_20px_-4px_rgba(201,162,39,0.6)] hover:shadow-[0_6px_28px_-4px_rgba(201,162,39,0.9)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-soft/0 via-white/40 to-gold-soft/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <User
                  size={15}
                  strokeWidth={2.5}
                  className="relative z-10 text-forest-deep"
                />
                <span className="relative z-10">Register</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile actions + toggle */}
        <div className="lg:hidden flex items-center gap-1.5">
          <Link
            href="/hotels"
            onClick={() => setIsOpen(false)}
            aria-label="Search hotels"
            className="p-2.5 rounded-full text-cream/90 hover:bg-white/10 hover:text-gold transition-all duration-300"
          >
            <Search size={20} strokeWidth={2.2} />
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setIsOpen((v) => !v)}
            className="p-2.5 rounded-full text-cream/90 hover:bg-white/10 hover:text-gold transition-all duration-300 border border-white/10 bg-white/5"
          >
            <div className="relative w-6 h-6">
              <Menu
                size={24}
                strokeWidth={2}
                className={`absolute inset-0 transition-all duration-300 ${
                  isOpen
                    ? "rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }`}
              />
              <X
                size={24}
                strokeWidth={2}
                className={`absolute inset-0 transition-all duration-300 ${
                  isOpen
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-0 opacity-0"
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-6 pt-3 flex flex-col gap-1 border-t border-white/10 bg-[#071814]/95 backdrop-blur-2xl shadow-2xl">
          {/* Mobile nav links */}
          {NAV_LINKS.map((link, i) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3.5 py-3 px-4 text-[15px] font-medium rounded-xl transition-all duration-300 ${
                  active
                    ? "text-forest-deep bg-gradient-to-r from-gold via-gold-soft to-gold font-bold shadow-md"
                    : "text-cream/90 hover:text-gold hover:bg-white/10"
                }`}
                style={{
                  transitionDelay: isOpen ? `${i * 50}ms` : "0ms",
                }}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    active ? "bg-forest-deep scale-100" : "bg-gold/60 scale-75"
                  }`}
                />
                {link.label}
              </Link>
            );
          })}

          {/* Mobile divider */}
          <div className="my-2 h-px bg-white/10" />

          {/* Mobile action buttons */}
          <div className="flex flex-col gap-2.5 mt-1">
            <Link
              href="/wishlist"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-semibold border border-white/20 text-cream hover:bg-white/10 transition-all duration-300"
            >
              <Heart size={16} strokeWidth={2.2} className="text-gold" />
              Wishlist
              {wishlistCount > 0 && (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gold px-1.5 text-[11px] font-bold text-forest-deep shadow-[0_2px_8px_-2px_rgba(201,162,39,0.5)]">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {userProfile ? (
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-gold via-gold-soft to-gold text-forest-deep text-sm font-bold shadow-[0_4px_16px_-4px_rgba(201,162,39,0.5)] active:scale-[0.98] transition-all duration-300"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-forest-deep text-gold text-xs font-bold">
                  {userProfile.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <span>{userProfile.name}</span>
              </Link>
            ) : (
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-gold via-gold-soft to-gold text-forest-deep text-sm font-bold shadow-[0_4px_16px_-4px_rgba(201,162,39,0.5)] active:scale-[0.98] transition-all duration-300"
              >
                <User size={16} strokeWidth={2.5} />
                Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
