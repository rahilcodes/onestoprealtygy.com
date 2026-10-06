import type { ListingsQuery } from "@/lib/data";
import { REGIONS, type Region } from "@/lib/site";
import type { Category, ListingSort, PropertyType, Purpose } from "@/types/listing";

export type SearchParams = Record<string, string | string[] | undefined>;

export const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

const SORTS: ListingSort[] = ["new", "asc", "desc", "size"];
const CATEGORY_MAP: Record<string, { category: Category; purpose?: Purpose; types?: PropertyType[] }> = {
  residential: { category: "residential", purpose: "sale" },
  commercial: { category: "commercial", purpose: "sale" },
  "residential-land": { category: "land", purpose: "sale", types: ["Residential Land"] },
  "commercial-land": { category: "land", purpose: "sale", types: ["Commercial Land"] },
  "residential-rent": { category: "residential", purpose: "rent" },
  "commercial-rent": { category: "commercial", purpose: "rent" },
  land: { category: "land", purpose: "sale" },
};

/** Parsed, validated filter state shared by the page, the filter bar and the results header. */
export interface ListingFilters {
  purpose?: Purpose;
  categorySlug?: string;
  type?: PropertyType;
  region?: Region;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  sort: ListingSort;
  q?: string;
}

export function parseFilters(sp: SearchParams): ListingFilters {
  const purposeRaw = first(sp.purpose);
  const sortRaw = first(sp.sort) as ListingSort;
  const region = first(sp.region);
  const n = (v: string) => {
    const x = Number(v);
    return Number.isFinite(x) && x > 0 ? x : undefined;
  };
  const categorySlug = first(sp.category);
  return {
    purpose: purposeRaw === "rent" || purposeRaw === "sale" ? purposeRaw : undefined,
    categorySlug: categorySlug in CATEGORY_MAP ? categorySlug : undefined,
    type: (first(sp.type) as PropertyType) || undefined,
    region: (REGIONS as readonly string[]).includes(region) ? (region as Region) : undefined,
    minPrice: n(first(sp.minPrice)),
    maxPrice: n(first(sp.maxPrice)),
    beds: n(first(sp.beds)),
    baths: n(first(sp.baths)),
    sort: SORTS.includes(sortRaw) ? sortRaw : "new",
    q: first(sp.q).trim() || undefined,
  };
}

/** Translate UI filters into a data-layer query. */
export function toQuery(f: ListingFilters): ListingsQuery {
  const cat = f.categorySlug ? CATEGORY_MAP[f.categorySlug] : undefined;
  return {
    purpose: f.purpose ?? cat?.purpose,
    category: cat?.category,
    type: f.type ?? cat?.types?.[0],
    region: f.region,
    minPrice: f.minPrice,
    maxPrice: f.maxPrice,
    beds: f.beds,
    baths: f.baths,
    sort: f.sort,
    q: f.q,
  };
}

export function filtersToParams(f: Partial<ListingFilters>): URLSearchParams {
  const p = new URLSearchParams();
  if (f.purpose) p.set("purpose", f.purpose);
  if (f.categorySlug) p.set("category", f.categorySlug);
  if (f.type) p.set("type", f.type);
  if (f.region) p.set("region", f.region);
  if (f.minPrice) p.set("minPrice", String(f.minPrice));
  if (f.maxPrice) p.set("maxPrice", String(f.maxPrice));
  if (f.beds) p.set("beds", String(f.beds));
  if (f.baths) p.set("baths", String(f.baths));
  if (f.sort && f.sort !== "new") p.set("sort", f.sort);
  if (f.q) p.set("q", f.q);
  return p;
}

/** Human heading for the results, e.g. "Apartments for rent in Georgetown". */
export function describeFilters(f: ListingFilters): string {
  const cat = f.categorySlug ? CATEGORY_MAP[f.categorySlug] : undefined;
  const purpose = f.purpose ?? cat?.purpose;
  let what = "Properties";
  if (f.type) what = f.type.endsWith("s") ? f.type : `${f.type}s`;
  else if (cat?.types?.[0]) what = cat.types[0];
  else if (cat?.category === "land") what = "Land";
  else if (cat?.category === "commercial") what = "Commercial properties";
  else if (cat?.category === "residential") what = "Residential properties";
  const forWhat = purpose === "rent" ? " for rent" : purpose === "sale" ? " for sale" : "";
  const where = f.region ? ` in ${f.region}` : "";
  return `${what}${forWhat}${where}`;
}
