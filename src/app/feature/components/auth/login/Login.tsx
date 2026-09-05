"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1920&q=80"
        alt="Sea-view hotel pool at sunset"
        fill
        priority
        className="object-cover"
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F2438]/85 via-[#0F2438]/60 to-[#0F2438]/85" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Brand */}
        <Link href="/" className="flex justify-center mb-8">
          <span className="text-3xl font-black tracking-tight text-white">
            Nest<span className="text-[#C89B3C]">Stay</span>
          </span>
        </Link>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
          <h1 className="text-2xl font-bold text-white text-center">
            Welcome back
          </h1>
          <p className="text-sm text-[#DCE3EA] text-center mt-1.5">
            Sign in to manage your bookings and saved stays
          </p>

          <form className="mt-8 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-[#DCE3EA] mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8FA0B5]"
                />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-sm text-white placeholder:text-[#8FA0B5] focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-[#DCE3EA]">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#C89B3C] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8FA0B5]"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/10 border border-white/20 text-sm text-white placeholder:text-[#8FA0B5] focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8FA0B5] hover:text-white transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs text-[#DCE3EA] mt-1">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-white/30 bg-white/10 accent-[#C89B3C]"
              />
              Keep me signed in
            </label>

            <button
              type="submit"
              className="mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#C89B3C] text-[#0F2438] text-sm font-semibold hover:bg-[#DCAE4E] transition-colors"
            >
              Sign in
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/15" />
            <span className="text-xs text-[#8FA0B5]">or continue with</span>
            <div className="flex-1 h-px bg-white/15" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="py-2.5 rounded-xl bg-white/10 border border-white/20 text-sm font-medium text-white hover:bg-white/15 transition-colors">
              Google
            </button>
            <button className="py-2.5 rounded-xl bg-white/10 border border-white/20 text-sm font-medium text-white hover:bg-white/15 transition-colors">
              Facebook
            </button>
          </div>

          <p className="text-center text-sm text-[#DCE3EA] mt-7">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[#C89B3C] font-semibold hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
