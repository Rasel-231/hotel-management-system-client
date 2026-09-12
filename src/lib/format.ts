/** Small formatting helpers for admin display (BDT currency, ISO dates). */

export function formatCurrency(
  amount: number,
  currency = "BDT",
): string {
  if (currency === "BDT") {
    if (amount >= 1000000) return `৳ ${(amount / 1000000).toFixed(1)}L`;
    if (amount >= 1000) return `৳ ${amount.toLocaleString("en-IN")}`;
    return `৳ ${amount}`;
  }
  return `${amount.toLocaleString("en-US")} ${currency}`;
}

/** "yyyy-mm-dd" key from a Date or ISO string (local time). */
export function toDateKey(value: Date | string): string {
  const date = typeof value === "string" ? new Date(`${value}T00:00:00`) : value;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function todayKey(): string {
  return toDateKey(new Date());
}

/** "Sat, 12 Sep" from an ISO date key. */
export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function formatDateLong(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** "Today" / "Tomorrow" / "Yesterday" when relevant, else a formatted date. */
export function formatRelativeDay(iso: string): string {
  const today = todayKey();
  if (iso === today) return "Today";
  const tomorrow = new Date(`${today}T00:00:00`);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (iso === toDateKey(tomorrow)) return "Tomorrow";
  const yesterday = new Date(`${today}T00:00:00`);
  yesterday.setDate(yesterday.getDate() - 1);
  if (iso === toDateKey(yesterday)) return "Yesterday";
  return formatDate(iso);
}

export function formatNights(nights: number): string {
  return `${nights} night${nights === 1 ? "" : "s"}`;
}