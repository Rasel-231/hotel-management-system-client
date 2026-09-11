"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1920&q=80"
        alt="Sea-view hotel pool at sunset"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-forest-deep/90 via-forest-deep/70 to-forest-deep/90" />
      <div className="relative z-10 w-full max-w-md mx-4">
        <Link href="/" className="flex justify-center mb-8">
          <span className="text-3xl font-black tracking-tight text-cream">
            <span className="text-gold-soft">NextStay</span>
          </span>
        </Link>
        <div className="bg-cream/10 backdrop-blur-xl border border-gold/20 rounded-2xl shadow-2xl p-8">
          <h1 className="text-2xl font-bold text-cream text-center">
            Welcome back
          </h1>
          <p className="text-sm text-cream/70 text-center mt-1.5">
            Sign in to manage your bookings and saved stays
          </p>

          <form className="mt-8 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-cream/70 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/50 transition-colors duration-300"
                />
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-sm text-cream placeholder:text-cream/40 transition-[border-color,box-shadow] duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-cream/70">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-gold-soft hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/50 transition-colors duration-300"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
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
            </div>

            <label className="flex items-center gap-2 text-xs text-cream/70 mt-1">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gold/30 bg-white/10 accent-gold"
              />
              Keep me signed in
            </label>

            <button
              type="submit"
              className="mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gold/60 bg-transparent text-gold-soft text-sm font-semibold transition-all duration-300 hover:bg-gold hover:text-forest-deep hover:shadow-[0_12px_24px_-10px_rgba(201,162,39,0.5)]"
            >
              Sign in
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/15" />
            <span className="text-xs text-cream/50">or continue with</span>
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
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-gold-soft font-semibold hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
