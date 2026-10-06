/**
 * Company constants for One Stop Realty Investment Inc.
 *
 * Contact details and copy come from the client's previous website
 * (onestoprealtygy.com, archived July 2023). Update here and every page,
 * the footer, structured data and metadata follow.
 */
export const SITE = {
  name: "One Stop Realty Investment Inc.",
  shortName: "One Stop Realty",
  tagline: "You Deserve It!",
  url: "https://onestoprealtygy.com",
  description:
    "One Stop Realty Investment Inc. is a Georgetown, Guyana real estate firm helping clients buy, sell, rent and invest in residential and commercial property across Demerara.",
  founded: "2021",
  founder: "Steven Persaud",
  address: {
    street: "262 Earl's & Fifth Avenue",
    area: "Subryanville",
    city: "Georgetown",
    country: "Guyana",
    mapsUrl: "https://maps.app.goo.gl/ohfrY8QozzD63xVW7",
  },
  phones: [
    { label: "592-505-6807", href: "tel:+5925056807" },
    { label: "592-629-0114", href: "tel:+5926290114" },
  ],
  email: "steven@onestoprealtygy.com",
  social: [{ label: "Facebook", href: "https://www.facebook.com/people/One-Stop-Realty-Investment/100077828242649/" }],
} as const;

export const PRIMARY_PHONE = SITE.phones[0];

export const ADDRESS_LINE = `${SITE.address.street}, ${SITE.address.area}, ${SITE.address.city}`;

/** Service areas used by the search and listing filters (from the archived search form). */
export const REGIONS = ["Georgetown", "East Bank Demerara", "East Coast Demerara", "West Bank Demerara"] as const;
export type Region = (typeof REGIONS)[number];

/** Service lines offered by the firm (from the archived contact form and team page). */
export const SERVICES = [
  {
    slug: "buy",
    title: "Buy a Home",
    short: "Residential and commercial property, house lots and land for sale across Demerara.",
    href: "/buy",
  },
  {
    slug: "rent",
    title: "Rent a Home",
    short: "Furnished and unfurnished apartments, houses and commercial space for rent.",
    href: "/rent",
  },
  {
    slug: "sell",
    title: "Sell a Home",
    short: "Pricing guidance, marketing and buyer screening for property owners ready to sell or let.",
    href: "/sell",
  },
  {
    slug: "property-management",
    title: "Property Management",
    short: "Tenant sourcing, rent collection and upkeep for owners at home or overseas.",
    href: "/services#property-management",
  },
  {
    slug: "investment",
    title: "Real Estate Investment",
    short: "Guidance on income property, land banking and development opportunities in Guyana.",
    href: "/services#investment",
  },
  {
    slug: "consultancy",
    title: "Consultancy",
    short: "Mortgage and financing advice drawn from 17 years in banking, plus a network of attorneys, appraisers and contractors.",
    href: "/services#consultancy",
  },
  {
    slug: "architectural",
    title: "Architectural Services",
    short: "Plans and drawings for new builds, extensions and renovations through our partner architects.",
    href: "/services#design",
  },
  {
    slug: "interior",
    title: "Interior Designing",
    short: "Interior design support to prepare a property for sale, rent or move-in.",
    href: "/services#design",
  },
] as const;

/** Subjects for the contact form (mirrors the archived site's form). */
export const CONTACT_SUBJECTS = [
  "Sale of Properties",
  "Rental of Properties",
  "Property Management",
  "Real Estate Investment",
  "Consultancy",
  "Architectural Services",
  "Interior Designing",
  "Other",
] as const;

/** Property categories used for navigation and the listings filter. */
export const CATEGORIES = [
  { slug: "residential", label: "Residential Properties", purpose: "sale", blurb: "Houses, townhouses and apartments for sale." },
  { slug: "commercial", label: "Commercial Properties", purpose: "sale", blurb: "Office buildings, retail and mixed-use for sale." },
  { slug: "residential-land", label: "Residential Land", purpose: "sale", blurb: "House lots in established and new schemes." },
  { slug: "commercial-land", label: "Commercial Land", purpose: "sale", blurb: "Land zoned for business, warehousing and development." },
  { slug: "residential-rent", label: "Residential Rentals", purpose: "rent", blurb: "Apartments and houses to rent, furnished or unfurnished." },
  { slug: "commercial-rent", label: "Commercial Rentals", purpose: "rent", blurb: "Offices, shops and warehouse space to let." },
] as const;
