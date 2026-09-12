/**
 * Admin dashboard theme tokens — NextStay brand (forest / gold / cream).
 * Everything the dashboard renders derives from the tokens in `globals.css`
 * (--color-forest, --color-gold, --color-cream, --color-sand, --color-ink…).
 * New semantic colors (danger, warning) are derived to sit alongside the
 * forest/gold family rather than clash with it.
 */

export const colors = {
  // ── Surfaces ──────────────────────────────────────────────
  ink: "#241c10",        // primary text
  inkSoft: "#4a4335",    // body text
  caption: "#8a7a5c",    // secondary text
  faint: "#b3a37e",      // tertiary / placeholders
  cream: "#faf7ef",      // page background
  sand: "#f7f3ea",       // inset / input bg
  panel: "#FFFFFF",      // card / panel
  line: "#e7ddc9",       // hairline
  // ── Brand accents ─────────────────────────────────────────
  forest: "#1f4d4d",     // primary CTA / confirmed
  forestLight: "#e8efec",
  forestDeep: "#0d2b24",
  olive: "#4a6b3f",
  gold: "#c9a227",       // pending / highlight
  goldDeep: "#8a6b18",
  goldLight: "#f6ecd0",
  // ── Semantic ──────────────────────────────────────────────
  danger: "#c2492e",     // cancelled / urgent (terracotta, brand-adjacent)
  blush: "#e8d4d4",
};

/**
 * Tailwind class map for status badges — use with cn().
 * Distinct, confident treatment for every status, consistent across the app.
 * 7 booking statuses + room statuses (available/occupied/reserved/maintenance).
 */
export const statusTailwind: Record<
  string,
  { bg: string; text: string; dot: string }
> = {
  confirmed:   { bg: "bg-forest-100", text: "text-forest",    dot: "bg-forest"     },
  "checked-in": { bg: "bg-olive/15",  text: "text-olive",     dot: "bg-olive"      },
  "checked-out": { bg: "bg-sand",     text: "text-caption",   dot: "bg-caption"    },
  pending:     { bg: "bg-gold-100",   text: "text-gold-800",  dot: "bg-gold"       },
  cancelled:   { bg: "bg-danger/10",  text: "text-danger",    dot: "bg-danger"     },
  "no-show":   { bg: "bg-blush/50",   text: "text-danger",    dot: "bg-blush"      },
  completed:   { bg: "bg-forest",     text: "text-cream",     dot: "bg-cream/80"   },
  available:   { bg: "bg-forest-100", text: "text-forest",    dot: "bg-forest"     },
  occupied:    { bg: "bg-olive/15",   text: "text-olive",     dot: "bg-olive"      },
  reserved:    { bg: "bg-gold-100",   text: "text-gold-800",  dot: "bg-gold"       },
  maintenance: { bg: "bg-danger/10",  text: "text-danger",    dot: "bg-danger"     },
};

/** Hex colors kept for SVG / canvas / inline-style usage */
export const statusColor: Record<string, string> = {
  confirmed:   colors.forest,
  "checked-in": colors.olive,
  "checked-out": colors.caption,
  pending:     colors.goldDeep,
  cancelled:   colors.danger,
  "no-show":   colors.danger,
  completed:   colors.forestDeep,
  available:   colors.forest,
  occupied:    colors.olive,
  reserved:    colors.goldDeep,
  maintenance: colors.danger,
};

export const statusLabel: Record<string, string> = {
  confirmed:   "Confirmed",
  "checked-in": "Checked in",
  "checked-out": "Checked out",
  pending:     "Pending",
  cancelled:   "Cancelled",
  "no-show":   "No show",
  completed:   "Completed",
  available:   "Available",
  occupied:    "Occupied",
  reserved:    "Reserved",
  maintenance: "Maintenance",
};

/** Order used for booking-status filter chips / legend. */
export const BOOKING_STATUS_ORDER: string[] = [
  "pending",
  "confirmed",
  "checked-in",
  "checked-out",
  "completed",
  "no-show",
  "cancelled",
];