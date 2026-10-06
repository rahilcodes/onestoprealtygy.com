/**
 * Listing data model for One Stop Realty Investment Inc.
 *
 * Kept deliberately close to common feed / CRM shapes so a live source can
 * replace `lib/data.ts` later without touching the pages:
 *   ref → ListingId · price → ListPrice · beds → BedroomsTotal · baths → BathroomsTotal
 *   floorArea → LivingArea · lotArea → LotSizeArea · type → PropertySubType · status → StandardStatus
 */

import type { Region } from "@/lib/site";

export type Purpose = "sale" | "rent";

export type Category = "residential" | "commercial" | "land";

export type PropertyType =
  | "House"
  | "Apartment"
  | "Townhouse"
  | "Duplex"
  | "Studio"
  | "Office Building"
  | "Commercial Building"
  | "Residential Land"
  | "Commercial Land";

export type ListingStatus = "Available" | "Under Offer" | "Rented" | "Sold";

export type Currency = "USD" | "GYD";

export type BadgeKind = "rent" | "sale" | "new" | "offer" | "closed";

export type Furnished = "Furnished" | "Semi-furnished" | "Unfurnished";

export interface Listing {
  /** URL slug, also the stable id. */
  id: string;
  /** Internal reference shown on cards and detail pages. */
  ref: string;
  title: string;
  purpose: Purpose;
  category: Category;
  type: PropertyType;
  status: ListingStatus;
  price: number;
  currency: Currency;
  /** Formatted price, e.g. "US$2,500 / month". */
  priceFmt: string;
  region: Region;
  /** Neighbourhood, village or scheme, e.g. "Subryanville". */
  area: string;
  /** "Area, Region" for cards and metadata. */
  locationFmt: string;
  beds?: number;
  baths?: number;
  /** Floor area in sq ft. */
  floorArea?: number;
  /** Lot / land area in sq ft. */
  lotArea?: number;
  furnished?: Furnished;
  /** Short spec line for cards, e.g. "2 bed · 2 bath · Furnished". */
  specs: string;
  /** Photo description; alt text and placeholder label until real media exists. */
  photo: string;
  photoSrc?: string;
  badge: string;
  badgeKind: BadgeKind;
  /** ISO date the listing went live. */
  listedAt: string;
  featured?: boolean;
  summary: string;
}

export interface PropertyFact {
  k: string;
  v: string;
}

export interface ListingPhoto {
  label: string;
  src?: string;
}

/** Extra detail fields available on the property page. */
export interface ListingDetail extends Listing {
  description: string;
  features: string[];
  facts: PropertyFact[];
  photos: ListingPhoto[];
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio: string[];
  photoSrc?: string;
}

export type PostCategory = "Buying" | "Renting" | "Selling" | "Investing" | "Company News";

export interface Post {
  slug: string;
  title: string;
  cat: PostCategory;
  date: string;
  read: string;
  photo: string;
  photoSrc?: string;
  excerpt: string;
}

export type ListingSort = "new" | "asc" | "desc" | "size";
