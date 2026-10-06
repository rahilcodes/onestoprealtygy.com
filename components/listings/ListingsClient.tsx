"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { Listing } from "@/types/listing";
import { FilterBar } from "@/components/listings/FilterBar";
import { ListingsResults } from "@/components/listings/ListingsResults";
import { describeFilters, parseFilters, toQuery } from "@/lib/query";
import { sortListings } from "@/lib/sort";

interface Props {
  initialListings: Listing[];
  types: string[];
}

export function ListingsClient({ initialListings, types }: Props) {
  const searchParams = useSearchParams();

  const { filters, hasFilters, filteredListings } = useMemo(() => {
    const sp: Record<string, string | string[] | undefined> = {};
    searchParams.forEach((value, key) => {
      sp[key] = value;
    });

    const parsed = parseFilters(sp);
    const q = toQuery(parsed);
    const hasActiveFilters = Object.entries(parsed).some(([k, v]) => k !== "sort" && v !== undefined);

    let out = initialListings;
    if (q.purpose) out = out.filter((l) => l.purpose === q.purpose);
    if (q.category) out = out.filter((l) => l.category === q.category);
    if (q.type) out = out.filter((l) => l.type === q.type);
    if (q.region) out = out.filter((l) => l.region === q.region);
    if (q.minPrice) out = out.filter((l) => l.price >= q.minPrice!);
    if (q.maxPrice) out = out.filter((l) => l.price <= q.maxPrice!);
    if (q.beds) out = out.filter((l) => (l.beds ?? 0) >= q.beds!);
    if (q.baths) out = out.filter((l) => (l.baths ?? 0) >= q.baths!);
    if (q.featured) out = out.filter((l) => l.featured);
    if (q.q) {
      const needle = q.q.toLowerCase();
      out = out.filter((l) => [l.title, l.area, l.region, l.type, l.ref].some((v) => v.toLowerCase().includes(needle)));
    }
    out = sortListings(out, q.sort);

    return {
      filters: parsed,
      hasFilters: hasActiveFilters,
      filteredListings: out,
    };
  }, [searchParams, initialListings]);

  return (
    <>
      <FilterBar filters={filters} types={types} />
      <ListingsResults
        listings={filteredListings}
        sort={filters.sort}
        heading={describeFilters(filters)}
        hasFilters={hasFilters}
      />
    </>
  );
}
