"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-10">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1516815231560-8f41ec531527?auto=format&fit=crop&w=1920&q=80"
        alt="Wooden pier over turquoise sea near a beach resort"
        fill
        priority
        className="object-cover"
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-deep/90 via-forest-deep/70 to-forest-deep/90" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Brand */}
        <Link href="/" className="flex justify-center mb-8">
          <span className="text-3xl font-black tracking-tight text-cream">
            Nest<span className="text-gold-soft">Stay</span>
          </span>
        </Link>

        {/* Card */}
        <div className="bg-cream/10 backdrop-blur-xl border border-gold/20 rounded-2xl shadow-2xl p-8">
          <h1 className="text-2xl font-bold text-cream text-center">
            Create your account
          </h1>
          <p className="text-sm text-cream/70 text-center mt-1.5">
            Join Hotel NextStay for exclusive rates and faster checkout
          </p>

          <form className="mt-8 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-cream/70 mb-1.5">
                Full name
              </label>
              <div className="relative">
                <User
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/50"
                />
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-sm text-cream placeholder:text-cream/40 transition-[border-color,box-shadow] duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-cream/70 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/50"
                />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-sm text-cream placeholder:text-cream/40 transition-[border-color,box-shadow] duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-cream/70 mb-1.5">
                Phone number
              </label>
              <div className="relative">
                <Phone
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/50"
                />
                <input
                  type="tel"
                  placeholder="+880 1XXX-XXXXXX"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-sm text-cream placeholder:text-cream/40 transition-[border-color,box-shadow] duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-cream/70 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/50"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/10 border border-white/20 text-sm text-cream placeholder:text-cream/40 transition-[border-color,box-shadow] duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-cream/50 hover:text-cream transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              <p className="text-[11px] text-cream/50 mt-1.5">
                Use at least 8 characters with a number and a symbol
              </p>
            </div>

            <label className="flex items-start gap-2 text-xs text-cream/70 mt-1">
              <input
                type="checkbox"
                className="w-4 h-4 mt-0.5 rounded border-gold/30 bg-white/10 accent-gold"
              />
              <span>
                I agree to the{" "}
                <Link href="/terms" className="text-gold-soft hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-gold-soft hover:underline"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>

            <button
              type="submit"
              className="mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gold/60 bg-transparent text-gold-soft text-sm font-semibold transition-all duration-300 hover:bg-gold hover:text-forest-deep hover:shadow-[0_12px_24px_-10px_rgba(201,162,39,0.5)]"
            >
              Create account
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/15" />
            <span className="text-xs text-cream/50">or sign up with</span>
            <div className="flex-1 h-px bg-white/15" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="py-2.5 rounded-xl bg-white/10 border border-white/20 text-sm font-medium text-cream hover:bg-white/15 hover:border-gold/40 transition-colors">
              Google
            </button>
            <button className="py-2.5 rounded-xl bg-white/10 border border-white/20 text-sm font-medium text-cream hover:bg-white/15 hover:border-gold/40 transition-colors">
              Facebook
            </button>
          </div>

          <p className="text-center text-sm text-cream/70 mt-7">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-gold-soft font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
