"use client";

import { create } from "zustand";
import type { HotelRole, SessionUser } from "@/types/types";

// ─────────────────────────────────────────────────────────────────────────────
// Current admin session.
//
// Reads the token + user that the login flow persists (localStorage keys set in
// feature/components/auth/login/Login.tsx). Until the backend exposes hotel
// roles, a demo user is injected so the role-aware shell can be explored.
// Keep the same contract when wiring the real auth slice with Redux Toolkit.
// ─────────────────────────────────────────────────────────────────────────────

const DEMO_USER: SessionUser = {
  id: "U-DEMO",
  name: "Salma Akter",
  email: "gm@nextstay.hotel",
  role: "ADMIN",
  hotelId: "H-001",
  hotelName: "Provah Grand",
};

/** Local override for exploring other roles: e.g. localStorage.sessionRole = "FRONT_DESK" */
function resolveRole(): HotelRole {
  const override = typeof localStorage !== "undefined" ? localStorage.getItem("sessionRole") : null;
  if (override && (["SUPER_ADMIN", "ADMIN", "OWNER", "MANAGER", "FRONT_DESK", "HOUSEKEEPING"] as HotelRole[]).includes(override as HotelRole)) {
    return override as HotelRole;
  }
  return "ADMIN";
}

function readStoredUser(): SessionUser {
  if (typeof localStorage === "undefined") return DEMO_USER;
  try {
    const raw = localStorage.getItem("user");
    if (raw) {
      const parsed = JSON.parse(raw) as {
        name?: string;
        email?: string;
        id?: string;
        role?: string;
      };
      const role = parsed.role;
      if (role && (["ADMIN", "OWNER", "MANAGER", "FRONT_DESK", "HOUSEKEEPING"] as HotelRole[]).includes(role as HotelRole)) {
        return {
          id: parsed.id ?? "U-1",
          name: parsed.name ?? "Staff",
          email: parsed.email ?? "",
          role: role as HotelRole,
          hotelName: DEMO_USER.hotelName,
        };
      }
    }
  } catch {
    // fall through to demo user
  }
  return { ...DEMO_USER, role: resolveRole() };
}

interface SessionState {
  user: SessionUser;
  signIn: (user: SessionUser) => void;
  signOut: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  user: readStoredUser(),
  signIn: (user) => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("sessionUser", JSON.stringify(user));
    }
    set({ user });
  },
  signOut: () => {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("sessionUser");
    }
    set({ user: DEMO_USER });
  },
}));