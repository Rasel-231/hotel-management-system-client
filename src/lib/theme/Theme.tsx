/** Admin dashboard tokens — premium SaaS (slate / indigo / emerald / amber). */
export const colors = {
  // ── Surfaces ──────────────────────────────────────────────
  ink: "#F8FAFC",        // page background (slate-50)
  panel: "#FFFFFF",      // card / panel
  raised: "#F1F5F9",     // hover / active surface (slate-100)
  sunken: "#F8FAFC",     // inset / input bg
  // ── Borders ───────────────────────────────────────────────
  hair: "#E2E8F0",       // hairline (slate-200)
  hairStrong: "#CBD5E1", // stronger border (slate-300)
  // ── Text ──────────────────────────────────────────────────
  ivory: "#0F172A",      // primary text (slate-900)
  body: "#334155",       // body text (slate-700)
  muted: "#64748B",      // secondary (slate-500)
  faint: "#94A3B8",      // tertiary / placeholders (slate-400)
  // ── Accents ───────────────────────────────────────────────
  brass: "#4F46E5",      // indigo-600 — primary CTA
  brassDim: "#4338CA",   // indigo-700
  brassLight: "#EEF2FF", // indigo-50
  teal: "#059669",       // emerald-600 — success / revenue
  tealLight: "#ECFDF5",  // emerald-50
  clay: "#DC2626",       // red-600 — urgent
  clayLight: "#FEF2F2",  // red-50
  gold: "#D97706",       // amber-600 — pending
  goldLight: "#FFFBEB",  // amber-50
  sky: "#0284C7",        // sky-600 — informational
  skyLight: "#F0F9FF",   // sky-50
};

/** Tailwind class map for status badges — use with cn() */
export const statusTailwind: Record<string, { bg: string; text: string; dot: string }> = {
  confirmed:     { bg: "bg-emerald-50",  text: "text-emerald-700", dot: "bg-emerald-500" },
  "checked-in":  { bg: "bg-indigo-50",   text: "text-indigo-700",  dot: "bg-indigo-500" },
  "checked-out": { bg: "bg-slate-100",   text: "text-slate-500",   dot: "bg-slate-400"  },
  pending:       { bg: "bg-amber-50",    text: "text-amber-700",   dot: "bg-amber-500"  },
  cancelled:     { bg: "bg-red-50",      text: "text-red-700",     dot: "bg-red-500"    },
  available:     { bg: "bg-emerald-50",  text: "text-emerald-700", dot: "bg-emerald-500"},
  occupied:      { bg: "bg-indigo-50",   text: "text-indigo-700",  dot: "bg-indigo-500" },
  reserved:      { bg: "bg-amber-50",    text: "text-amber-700",   dot: "bg-amber-500"  },
  maintenance:   { bg: "bg-red-50",      text: "text-red-700",     dot: "bg-red-500"    },
};

/** Hex colors kept for SVG / canvas usage */
export const statusColor: Record<string, string> = {
  confirmed:     colors.teal,
  "checked-in":  colors.brass,
  "checked-out": colors.faint,
  pending:       colors.gold,
  cancelled:     colors.clay,
  available:     colors.teal,
  occupied:      colors.brass,
  reserved:      colors.gold,
  maintenance:   colors.clay,
};

export const statusLabel: Record<string, string> = {
  confirmed:     "Confirmed",
  "checked-in":  "Checked in",
  "checked-out": "Checked out",
  pending:       "Pending",
  cancelled:     "Cancelled",
  available:     "Available",
  occupied:      "Occupied",
  reserved:      "Reserved",
  maintenance:   "Maintenance",
};
