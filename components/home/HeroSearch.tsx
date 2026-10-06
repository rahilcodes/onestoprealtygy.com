"use client";

import { useRouter } from "next/navigation";
import { useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { REGIONS } from "@/lib/site";

const TABS = ["Buy", "Rent", "Sell"] as const;
type Tab = (typeof TABS)[number];

export const SALE_TYPES = ["House", "Apartment", "Townhouse", "Commercial Building", "Residential Land", "Commercial Land"];
export const RENT_TYPES = ["Apartment", "House", "Townhouse", "Office Building", "Commercial Building"];

/** [label, "min-max"] price bands in USD. */
export const SALE_PRICES: Array<[string, string]> = [
  ["Any price", ""],
  ["Under US$100K", "0-100000"],
  ["US$100K – 250K", "100000-250000"],
  ["US$250K – 500K", "250000-500000"],
  ["US$500K+", "500000-"],
];
export const RENT_PRICES: Array<[string, string]> = [
  ["Any price", ""],
  ["Under US$2,000 / mo", "0-2000"],
  ["US$2,000 – 5,000 / mo", "2000-5000"],
  ["US$5,000 – 10,000 / mo", "5000-10000"],
  ["US$10,000+ / mo", "10000-"],
];
export const BEDS = ["Any beds", "1+", "2+", "3+", "4+"];

/**
 * Hero search. Buy / Rent route to /listings with purpose, region, type,
 * price and beds; Sell captures the property location and routes to /sell.
 */
export function HeroSearch() {
  const [tab, setTab] = useState<Tab>("Buy");
  const router = useRouter();
  const id = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const isSearch = tab !== "Sell";
  const purpose = tab === "Rent" ? "rent" : "sale";
  const types = tab === "Rent" ? RENT_TYPES : SALE_TYPES;
  const prices = tab === "Rent" ? RENT_PRICES : SALE_PRICES;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    if (isSearch) {
      params.set("purpose", purpose);
      const region = String(fd.get("region") ?? "");
      const type = String(fd.get("type") ?? "");
      const price = String(fd.get("price") ?? "");
      const beds = String(fd.get("beds") ?? "");
      if (region) params.set("region", region);
      if (type) params.set("type", type);
      if (price) {
        const [min, max] = price.split("-");
        if (min) params.set("minPrice", min);
        if (max) params.set("maxPrice", max);
      }
      if (beds) params.set("beds", beds);
      router.push(`/listings?${params.toString()}`);
    } else {
      const loc = String(fd.get("location") ?? "").trim();
      if (loc) params.set("location", loc);
      router.push(`/sell${params.size ? `?${params}` : ""}#inquiry`);
    }
  }

  // Roving tabindex + arrow keys for the tablist.
  function onTabKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : e.key === "Home" ? -i : e.key === "End" ? TABS.length - 1 - i : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + TABS.length) % TABS.length;
    setTab(TABS[next]);
    tabRefs.current[next]?.focus();
  }

  const selectCls = "select h-[50px] text-[14px] font-semibold";

  return (
    <form onSubmit={onSubmit} role="search" aria-label="Search properties" className="overflow-hidden rounded-[16px] bg-white shadow-panel">
      <div role="tablist" aria-label="I want to" className="flex border-b border-hairline px-2 pt-2">
        {TABS.map((t, i) => {
          const selected = t === tab;
          return (
            <button
              key={t}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(t)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={`focus-inset -mb-px min-h-11 cursor-pointer whitespace-nowrap border-0 border-b-2 bg-transparent px-4 text-[14px] font-bold transition-colors sm:px-5 ${
                selected ? "border-accent text-navy" : "border-transparent text-meta hover:text-navy"
              }`}
              style={{ borderRadius: "6px 6px 0 0" }}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${TABS.indexOf(tab)}`} className="p-3 sm:p-4">
        {isSearch ? (
          <div className="grid grid-cols-2 gap-2.5 nav:grid-cols-[1.2fr_1.2fr_1.2fr_0.9fr_auto]">
            <div className="col-span-2 nav:col-span-1">
              <label htmlFor={`${id}-region`} className="sr-only">
                Location
              </label>
              <select id={`${id}-region`} name="region" defaultValue="" className={selectCls}>
                <option value="">All locations</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`${id}-type`} className="sr-only">
                Property type
              </label>
              <select id={`${id}-type`} name="type" defaultValue="" className={selectCls}>
                <option value="">Any type</option>
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`${id}-price`} className="sr-only">
                Price
              </label>
              <select id={`${id}-price`} name="price" defaultValue="" className={selectCls}>
                {prices.map(([label, v]) => (
                  <option key={label} value={v}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`${id}-beds`} className="sr-only">
                Bedrooms
              </label>
              <select id={`${id}-beds`} name="beds" defaultValue="" className={selectCls}>
                {BEDS.map((b) => (
                  <option key={b} value={b === "Any beds" ? "" : b.replace("+", "")}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn-accent h-[50px] rounded-[10px] px-6 text-[14.5px]">
              Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2.5 nav:grid-cols-[1fr_auto]">
            <div>
              <label htmlFor={`${id}-location`} className="sr-only">
                Property location
              </label>
              <input
                id={`${id}-location`}
                name="location"
                type="text"
                placeholder="Where is your property? e.g. Diamond, East Bank Demerara"
                autoComplete="off"
                className="input h-[50px] text-[15px]"
              />
            </div>
            <button type="submit" className="btn-accent h-[50px] rounded-[10px] px-6 text-[14.5px]">
              Get a free consultation
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
