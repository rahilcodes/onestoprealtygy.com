import { Suspense } from "react";
import type { Metadata } from "next";
import { ListingsClient } from "@/components/listings/ListingsClient";
import { getListings, getPropertyTypes } from "@/lib/data";

export const metadata: Metadata = {
  title: "Properties for sale and rent in Georgetown & Demerara",
  description:
    "Browse houses, apartments, commercial buildings and land for sale or rent across Georgetown, East Bank, East Coast and West Bank Demerara with One Stop Realty Investment Inc.",
  alternates: { canonical: "/listings" },
};

export default async function ListingsPage() {
  const [listings, types] = await Promise.all([getListings(), getPropertyTypes()]);

  return (
    <Suspense fallback={<div className="container-1400 py-12 text-center text-meta">Loading properties...</div>}>
      <ListingsClient initialListings={listings} types={types} />
    </Suspense>
  );
}
