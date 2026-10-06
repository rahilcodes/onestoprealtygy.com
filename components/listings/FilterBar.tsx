"use client";

import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { CATEGORIES, REGIONS } from "@/lib/site";
import type { ListingFilters } from "@/lib/query";
import { RENT_PRICES, SALE_PRICES } from "@/components/home/HeroSearch";

interface Props {
  filters: ListingFilters;
  types: string[];
}

const BEDS = ["Any beds", "1+", "2+", "3+", "4+"];
const BATHS = ["Any baths", "1+", "2+", "3+"];

/** Sticky filter bar under the nav. Every change re-queries /listings on the server. */
export function FilterBar({ filters, types }: Props) {
  const id = useId();
  const router = useRouter();
  const [purpose, setPurpose] = useState<"" | "sale" | "rent">(filters.purpose ?? "");
  const prices = purpose === "rent" ? RENT_PRICES : SALE_PRICES;
  const priceValue = filters.minPrice || filters.maxPrice ? `${filters.minPrice ?? 0}-${filters.maxPrice ?? ""}` : "";

  function apply(form: HTMLFormElement) {
    const fd = new FormData(form);
    const params = new URLSearchParams();
    for (const key of ["purpose", "category", "region", "type", "beds", "baths", "q"]) {
      const v = String(fd.get(key) ?? "").trim();
      if (v) params.set(key, v);
    }
    const price = String(fd.get("price") ?? "");
    if (price) {
      const [min, max] = price.split("-");
      if (min && min !== "0") params.set("minPrice", min);
      if (max) params.set("maxPrice", max);
    }
    if (filters.sort !== "new") params.set("sort", filters.sort);
    router.push(`/listings${params.size ? `?${params}` : ""}`);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    apply(e.currentTarget);
  }

  const sel = "select h-[46px] w-auto min-w-0 text-[14px] font-semibold";
  const active = [filters.purpose, filters.categorySlug, filters.region, filters.type, filters.minPrice, filters.maxPrice, filters.beds, filters.baths, filters.q].filter(Boolean).length;

  return (
    <div className="sticky top-[72px] z-40 border-b border-line bg-white/[0.96] backdrop-blur-[10px]">
      <form
        onSubmit={onSubmit}
        onChange={(e) => apply(e.currentTarget)}
        role="search"
        aria-label="Filter listings"
        className="container-1400 rail flex items-center gap-2 overflow-x-auto py-3 nav:flex-wrap nav:overflow-visible"
      >
        <label htmlFor={`${id}-purpose`} className="sr-only">
          Purpose
        </label>
        <select
          id={`${id}-purpose`}
          name="purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value as "" | "sale" | "rent")}
          className={`${sel} flex-none border-navy bg-navy text-white`}
          style={{ backgroundImage: "none" }}
        >
          <option value="">Buy or rent</option>
          <option value="sale">For sale</option>
          <option value="rent">For rent</option>
        </select>

        <label htmlFor={`${id}-category`} className="sr-only">
          Category
        </label>
        <select id={`${id}-category`} name="category" defaultValue={filters.categorySlug ?? ""} className={`${sel} flex-none`}>
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>

        <label htmlFor={`${id}-region`} className="sr-only">
          Location
        </label>
        <select id={`${id}-region`} name="region" defaultValue={filters.region ?? ""} className={`${sel} flex-none`}>
          <option value="">All locations</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <label htmlFor={`${id}-type`} className="sr-only">
          Property type
        </label>
        <select id={`${id}-type`} name="type" defaultValue={filters.type ?? ""} className={`${sel} flex-none`}>
          <option value="">Any type</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <label htmlFor={`${id}-price`} className="sr-only">
          Price
        </label>
        <select id={`${id}-price`} name="price" defaultValue={priceValue} className={`${sel} flex-none`}>
          {prices.map(([label, v]) => (
            <option key={label} value={v}>
              {label}
            </option>
          ))}
        </select>

        <label htmlFor={`${id}-beds`} className="sr-only">
          Bedrooms
        </label>
        <select id={`${id}-beds`} name="beds" defaultValue={filters.beds ? String(filters.beds) : ""} className={`${sel} flex-none`}>
          {BEDS.map((b) => (
            <option key={b} value={b === "Any beds" ? "" : b.replace("+", "")}>
              {b}
            </option>
          ))}
        </select>

        <label htmlFor={`${id}-baths`} className="sr-only">
          Bathrooms
        </label>
        <select id={`${id}-baths`} name="baths" defaultValue={filters.baths ? String(filters.baths) : ""} className={`${sel} flex-none`}>
          {BATHS.map((b) => (
            <option key={b} value={b === "Any baths" ? "" : b.replace("+", "")}>
              {b}
            </option>
          ))}
        </select>

        <label htmlFor={`${id}-q`} className="sr-only">
          Search by name, area or reference
        </label>
        <input
          id={`${id}-q`}
          name="q"
          type="search"
          defaultValue={filters.q ?? ""}
          placeholder="Area, name or ref…"
          className="input h-[46px] w-[170px] flex-none text-[14px] nav:ml-auto nav:w-[220px]"
        />
        <button type="submit" className="btn-primary h-[46px] flex-none rounded-[10px] px-4">
          Apply
        </button>
        {active > 0 && (
          <button type="button" onClick={() => router.push("/listings")} className="btn h-[46px] flex-none rounded-[10px] bg-transparent px-3 text-[13.5px] font-semibold text-slate hover:text-navy">
            Clear ({active})
          </button>
        )}
      </form>
    </div>
  );
}
