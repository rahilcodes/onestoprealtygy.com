import type { Listing, ListingSort } from "@/types/listing";

/** Client-safe sort used by both the data layer and the results grid. */
export function sortListings(list: Listing[], sort: ListingSort = "new"): Listing[] {
  const out = [...list];
  if (sort === "asc") out.sort((a, b) => a.price - b.price);
  else if (sort === "desc") out.sort((a, b) => b.price - a.price);
  else if (sort === "size") out.sort((a, b) => (b.floorArea ?? b.lotArea ?? 0) - (a.floorArea ?? a.lotArea ?? 0));
  else out.sort((a, b) => (a.listedAt < b.listedAt ? 1 : a.listedAt > b.listedAt ? -1 : 0));
  return out;
}
