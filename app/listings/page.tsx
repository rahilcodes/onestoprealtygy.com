import type { Metadata } from "next";
import { ListingsResults } from "@/components/listings/ListingsResults";
import { FilterBar } from "@/components/listings/FilterBar";
import { getListings, getPropertyTypes } from "@/lib/data";
import { describeFilters, parseFilters, toQuery } from "@/lib/query";

export const metadata: Metadata = {
  title: "Properties for sale and rent in Georgetown & Demerara",
  description:
    "Browse houses, apartments, commercial buildings and land for sale or rent across Georgetown, East Bank, East Coast and West Bank Demerara with One Stop Realty Investment Inc.",
  alternates: { canonical: "/listings" },
};

export default async function ListingsPage({ searchParams }: PageProps<"/listings">) {
  const sp = await searchParams;
  const filters = parseFilters(sp);
  const query = toQuery(filters);
  const [listings, types] = await Promise.all([getListings(query), getPropertyTypes(query.purpose)]);
  const hasFilters = Object.entries(filters).some(([k, v]) => k !== "sort" && v !== undefined);

  return (
    <>
      <FilterBar filters={filters} types={types} />
      <ListingsResults listings={listings} sort={filters.sort} heading={describeFilters(filters)} hasFilters={hasFilters} />
    </>
  );
}
