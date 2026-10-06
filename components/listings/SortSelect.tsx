"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useId } from "react";
import type { ListingSort } from "@/types/listing";

const SORT_OPTIONS: Array<[ListingSort, string]> = [
  ["new", "Newest"],
  ["asc", "Price: low to high"],
  ["desc", "Price: high to low"],
  ["size", "Largest first"],
];

/** Sort control that rewrites the `sort` search param so results stay server-rendered. */
export function SortSelect({ sort }: { sort: ListingSort }) {
  const id = useId();
  const router = useRouter();
  const params = useSearchParams();
  function onChange(next: string) {
    const p = new URLSearchParams(params.toString());
    if (next === "new") p.delete("sort");
    else p.set("sort", next);
    router.push(`/listings${p.size ? `?${p}` : ""}`);
  }
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="text-[13px] font-semibold text-meta">
        Sort
      </label>
      <select id={id} value={sort} onChange={(e) => onChange(e.target.value)} className="select h-11 w-auto rounded-lg text-[13.5px] font-semibold">
        {SORT_OPTIONS.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </div>
  );
}
