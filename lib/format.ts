import type { Currency, Purpose } from "@/types/listing";

export const num = (n: number) => n.toLocaleString("en-US");

const SYMBOL: Record<Currency, string> = { USD: "US$", GYD: "G$" };

/** "US$2,500" / "G$45,000,000". */
export const money = (n: number, currency: Currency = "USD") => SYMBOL[currency] + num(n);

/** Listing price with the rental period appended: "US$2,500 / month". */
export function formatPrice(price: number, currency: Currency, purpose: Purpose): string {
  const base = money(price, currency);
  return purpose === "rent" ? `${base} / month` : base;
}

/** Short price used on compact chips: US$1.2M, US$950K. */
export function shortPrice(price: number, currency: Currency = "USD"): string {
  const sym = SYMBOL[currency];
  if (price >= 1e6) {
    const m = price / 1e6;
    const s = m.toFixed(m % 1 ? 2 : 0).replace(/0$/, "").replace(/\.$/, "");
    return sym + s + "M";
  }
  if (price >= 1e4) return sym + Math.round(price / 1e3) + "K";
  return sym + num(price);
}

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export interface DayOption {
  iso: string;
  dow: string;
  num: number;
  month: string;
}

/** Upcoming days starting the day after `fromISO`, optionally skipping Sundays. */
export function upcomingDays(fromISO: string, count: number, skipSunday = false): DayOption[] {
  const out: DayOption[] = [];
  const d = new Date(fromISO + "T12:00:00");
  while (out.length < count) {
    d.setDate(d.getDate() + 1);
    if (skipSunday && d.getDay() === 0) continue;
    out.push({
      iso: d.toISOString().slice(0, 10),
      dow: DOW[d.getDay()],
      num: d.getDate(),
      month: MON[d.getMonth()],
    });
  }
  return out;
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

/** "12 Mar 2026" from an ISO date. */
export function formatDate(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return `${d.getDate()} ${MON[d.getMonth()]} ${d.getFullYear()}`;
}
