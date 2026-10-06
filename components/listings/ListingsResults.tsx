import type { Listing, ListingSort } from "@/types/listing";
import { ListingCard } from "@/components/ListingCard";
import { SortSelect } from "@/components/listings/SortSelect";
import { RequestCard } from "@/components/listings/RequestCard";
import Link from "next/link";
import { Suspense } from "react";

interface Props {
  listings: Listing[];
  sort: ListingSort;
  heading: string;
  hasFilters: boolean;
}

/** Results grid with a sort control and an inline "request a property" lead card. */
export function ListingsResults({ listings, sort, heading, hasFilters }: Props) {
  const count = listings.length;
  return (
    <div className="container-1400 pb-[80px] pt-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="eyebrow">Listings</div>
          <h1 className="h2-sm mt-2">{heading}</h1>
          <div className="mt-1.5 text-[13.5px] font-medium text-meta" aria-live="polite">
            {count} {count === 1 ? "property" : "properties"}
            {hasFilters ? " match your filters" : " available"}
          </div>
        </div>
        <Suspense fallback={null}>
          <SortSelect sort={sort} />
        </Suspense>
      </div>

      {count === 0 ? (
        <div className="rounded-[16px] border border-dashed border-border-input px-6 py-14 text-center">
          <div className="font-serif text-[24px] font-medium text-navy">No properties match those filters yet.</div>
          <p className="mx-auto mt-2 max-w-[460px] text-[15px] leading-[1.6] text-slate-2">
            Our portfolio changes often. Clear the filters, or tell us what you are looking for and we will search on your behalf.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/listings" className="btn-outline">
              Clear filters
            </Link>
            <Link href="/contact?subject=Sale%20of%20Properties" className="btn-primary">
              Request a property
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,290px),1fr))] gap-5">
          {listings.slice(0, 3).map((item, i) => (
            <ListingCard key={item.id} item={item} priority={i < 2} />
          ))}
          <RequestCard />
          {listings.slice(3).map((item) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      )}

      <p className="mb-0 mt-8 text-[12.5px] leading-[1.6] text-meta">
        Prices are quoted in US dollars unless stated otherwise; Guyanese dollar equivalents are available on request. Availability and
        details are subject to change and should be confirmed with our office before viewing.
      </p>
    </div>
  );
}
