/**
 * Data layer for One Stop Realty Investment Inc.
 *
 * Every accessor is async so a live source (property feed, CRM, database)
 * can replace this module without touching the pages.
 *
 * Rental listings and photos below were reconstructed from the client's
 * archived website (July 2023) and should be refreshed with the current
 * portfolio. Entries marked `sample` are layout placeholders with no
 * photography; replace them with real stock before launch.
 */
import type {
  BadgeKind,
  Category,
  Currency,
  Furnished,
  Listing,
  ListingDetail,
  ListingPhoto,
  ListingSort,
  ListingStatus,
  Post,
  PostCategory,
  PropertyType,
  Purpose,
  TeamMember,
} from "@/types/listing";
import type { Region } from "@/lib/site";
import { formatPrice, num } from "@/lib/format";
import { sortListings } from "@/lib/sort";

export { sortListings };

interface Seed {
  id: string;
  ref: string;
  title: string;
  purpose: Purpose;
  category: Category;
  type: PropertyType;
  price: number;
  currency?: Currency;
  region: Region;
  area: string;
  beds?: number;
  baths?: number;
  floorArea?: number;
  lotArea?: number;
  furnished?: Furnished;
  photo: string;
  photoSrc?: string;
  photos?: ListingPhoto[];
  listedAt: string;
  status?: ListingStatus;
  featured?: boolean;
  summary: string;
  description?: string;
  features?: string[];
  sample?: boolean;
}

const BADGE: Record<ListingStatus | Purpose, [string, BadgeKind]> = {
  sale: ["For sale", "sale"],
  rent: ["For rent", "rent"],
  Available: ["Available", "new"],
  "Under Offer": ["Under offer", "offer"],
  Rented: ["Rented", "closed"],
  Sold: ["Sold", "closed"],
};

function specsOf(s: Seed): string {
  const parts: string[] = [];
  if (s.category === "land") {
    if (s.lotArea) parts.push(`${num(s.lotArea)} sq ft lot`);
    parts.push(s.type);
    return parts.join(" · ");
  }
  if (s.beds) parts.push(`${s.beds} bed`);
  if (s.baths) parts.push(`${s.baths} bath`);
  if (s.floorArea) parts.push(`${num(s.floorArea)} sq ft`);
  if (s.furnished && s.purpose === "rent") parts.push(s.furnished);
  return parts.join(" · ");
}

function build(s: Seed): Listing {
  const status = s.status ?? "Available";
  const currency = s.currency ?? "USD";
  const [badge, badgeKind] = status === "Available" ? BADGE[s.purpose] : BADGE[status];
  return {
    id: s.id,
    ref: s.ref,
    title: s.title,
    purpose: s.purpose,
    category: s.category,
    type: s.type,
    status,
    price: s.price,
    currency,
    priceFmt: formatPrice(s.price, currency, s.purpose),
    region: s.region,
    area: s.area,
    locationFmt: `${s.area}, ${s.region}`,
    beds: s.beds,
    baths: s.baths,
    floorArea: s.floorArea,
    lotArea: s.lotArea,
    furnished: s.furnished,
    specs: specsOf(s),
    photo: s.photo,
    photoSrc: s.photoSrc,
    badge,
    badgeKind,
    listedAt: s.listedAt,
    featured: s.featured,
    summary: s.summary,
  };
}

const seeds: Seed[] = [
  // --- Rentals reconstructed from the archived site --------------------------
  {
    id: "atlantic-towers-two-bedroom",
    ref: "OSR-1004",
    title: "Atlantic Towers – Two Bedroom Apartment",
    purpose: "rent",
    category: "residential",
    type: "Apartment",
    price: 3500,
    region: "Georgetown",
    area: "Atlantic Towers",
    beds: 2,
    baths: 2,
    furnished: "Furnished",
    photo: "open-plan living room with grey sectional and blue kitchen cabinetry",
    photoSrc: "/images/listings/atlantic-towers.webp",
    listedAt: "2023-02-20",
    featured: true,
    summary: "Fully furnished two-bedroom apartment in a secure Georgetown tower with open-plan living, modern kitchen and private balcony.",
    description:
      "A bright, fully furnished two-bedroom apartment in Atlantic Towers, Georgetown. The open-plan living and dining area is finished with tiled floors, a full kitchen with blue shaker cabinetry, and sliding doors onto a private balcony. Both bedrooms are air-conditioned with built-in wardrobes; the master has an en-suite bathroom. Ideal for professionals and expatriates looking for a move-in-ready home close to the city's business district.",
    features: ["Fully furnished", "Air-conditioned throughout", "Private balcony", "Secure building with parking", "Modern kitchen with appliances", "Master en-suite"],
  },
  {
    id: "la-parfaite-harmonie-two-bedroom",
    ref: "OSR-1001",
    title: "La Parfaite Harmonie – Two Bedroom Apartment",
    purpose: "rent",
    category: "residential",
    type: "Apartment",
    price: 2500,
    region: "West Bank Demerara",
    area: "La Parfaite Harmonie",
    beds: 2,
    baths: 2,
    furnished: "Furnished",
    photo: "three-storey orange apartment building with white balconies",
    photoSrc: "/images/listings/la-parfaite-harmonie-2br.jpg",
    listedAt: "2023-02-18",
    featured: true,
    summary: "Two-bedroom, two-bathroom apartment in a modern three-storey building at La Parfaite Harmonie, minutes from the Demerara Harbour Bridge.",
    description:
      "Spacious two-bedroom apartment on the West Bank, set in a well-maintained three-storey building at La Parfaite Harmonie. The unit offers two full bathrooms, a fitted kitchen, and a covered balcony. Fenced compound with secure parking. A short drive to the Demerara Harbour Bridge, schools and shopping on the West Bank.",
    features: ["Two full bathrooms", "Fitted kitchen", "Covered balcony", "Fenced compound with parking", "Close to the Harbour Bridge"],
  },
  {
    id: "la-parfaite-harmonie-two-bedroom-unit-2",
    ref: "OSR-1002",
    title: "La Parfaite Harmonie – Two Bedroom, One Bath",
    purpose: "rent",
    category: "residential",
    type: "Apartment",
    price: 2500,
    region: "West Bank Demerara",
    area: "La Parfaite Harmonie",
    beds: 2,
    baths: 1,
    furnished: "Furnished",
    photo: "apartment building exterior at La Parfaite Harmonie",
    photoSrc: "/images/listings/la-parfaite-harmonie-2br-b.webp",
    listedAt: "2023-02-18",
    summary: "Second two-bedroom unit in the same La Parfaite Harmonie building, with one bathroom and shared secure parking.",
    features: ["Fitted kitchen", "Fenced compound with parking", "Close to schools and shopping"],
  },
  {
    id: "la-parfaite-harmonie-one-bedroom",
    ref: "OSR-1003",
    title: "La Parfaite Harmonie – One Bedroom Apartment",
    purpose: "rent",
    category: "residential",
    type: "Apartment",
    price: 1500,
    region: "West Bank Demerara",
    area: "La Parfaite Harmonie",
    beds: 1,
    baths: 1,
    furnished: "Furnished",
    photo: "one-bedroom apartment exterior at La Parfaite Harmonie",
    photoSrc: "/images/listings/la-parfaite-harmonie-1br.webp",
    listedAt: "2023-02-18",
    summary: "Compact one-bedroom apartment on the West Bank, suited to a single professional or couple.",
    features: ["Fitted kitchen", "Fenced compound with parking", "Close to the Harbour Bridge"],
  },
  {
    id: "garnett-street-studio-rooms",
    ref: "OSR-1005",
    title: "Garnett Street – Studio Rooms Building",
    purpose: "rent",
    category: "commercial",
    type: "Commercial Building",
    price: 20000,
    region: "Georgetown",
    area: "Garnett Street, Campbellville",
    beds: 22,
    baths: 22,
    photo: "multi-storey studio building on Garnett Street",
    photoSrc: "/images/listings/garnett-street.webp",
    listedAt: "2023-02-15",
    featured: true,
    summary: "Purpose-built block of 22 self-contained studio rooms in Campbellville, offered as a single rental for hospitality or staff housing.",
    description:
      "A multi-storey building of 22 self-contained studio rooms, each with its own bathroom, on Garnett Street in Campbellville, Georgetown. Offered as a single lease, the property suits guest-house operators, corporate staff housing or long-stay accommodation. Central location close to the Guyana National Stadium road, Sheriff Street and the city's main commercial strip.",
    features: ["22 self-contained studios", "Private bathroom in every room", "Central Campbellville location", "Suitable for hospitality or staff housing"],
  },
  {
    id: "brickdam-office-building",
    ref: "OSR-1006",
    title: "Brickdam Office Building",
    purpose: "rent",
    category: "commercial",
    type: "Office Building",
    price: 12000,
    region: "Georgetown",
    area: "Brickdam",
    baths: 3,
    floorArea: 3900,
    photo: "office building interior on Brickdam",
    photoSrc: "/images/listings/brickdam-office.webp",
    listedAt: "2023-02-15",
    featured: true,
    summary: "3,900 sq ft of office space on Brickdam, in the heart of Georgetown's government and professional district.",
    description:
      "Approximately 3,900 sq ft of office space on Brickdam, one of Georgetown's principal avenues and home to ministries, courts and professional firms. The building offers open work areas, three bathrooms and on-site parking. Well suited to law practices, consultancies, NGOs and regional offices.",
    features: ["3,900 sq ft", "Three bathrooms", "On-site parking", "Prime Brickdam address"],
  },
  {
    id: "happy-acres-house",
    ref: "OSR-1007",
    title: "Happy Acres – Four Bedroom House",
    purpose: "rent",
    category: "residential",
    type: "House",
    price: 9000,
    region: "East Coast Demerara",
    area: "Happy Acres",
    beds: 4,
    baths: 3.5,
    photo: "modern two-storey house with covered entrance and carport in Happy Acres",
    photoSrc: "/images/listings/happy-acres.jpg",
    listedAt: "2023-02-12",
    summary: "Four-bedroom executive home in the sought-after Happy Acres scheme on the East Coast.",
    features: ["Four bedrooms, 3.5 bathrooms", "Executive residential scheme", "Fenced yard with parking"],
  },
  {
    id: "windsor-estate-single-family",
    ref: "OSR-1008",
    title: "Windsor Estate – Single Family Home",
    purpose: "rent",
    category: "residential",
    type: "House",
    price: 4500,
    region: "East Bank Demerara",
    area: "Windsor Estate",
    beds: 3,
    baths: 2.5,
    photo: "furnished living room of the Windsor Estate single-family home",
    photoSrc: "/images/listings/windsor-estate-single-family.jpg",
    listedAt: "2023-02-12",
    summary: "Three-bedroom single-family home in a gated East Bank estate with 24-hour security.",
    features: ["Gated community", "24-hour security", "Three bedrooms, 2.5 bathrooms"],
  },
  {
    id: "windsor-estate-townhouse",
    ref: "OSR-1009",
    title: "Windsor Estate – Townhouse",
    purpose: "rent",
    category: "residential",
    type: "Townhouse",
    price: 3500,
    region: "East Bank Demerara",
    area: "Windsor Estate",
    beds: 3,
    baths: 3,
    photo: "living room of the Windsor Estate townhouse",
    photoSrc: "/images/listings/windsor-estate-townhouse.jpg",
    listedAt: "2023-02-12",
    summary: "Three-bedroom, three-bathroom townhouse in Windsor Estate, East Bank Demerara.",
    features: ["Gated community", "Three bedrooms, three bathrooms"],
  },
  {
    id: "republic-park-townhouse",
    ref: "OSR-1010",
    title: "Republic Park – Townhouse",
    purpose: "rent",
    category: "residential",
    type: "Townhouse",
    price: 2000,
    region: "East Bank Demerara",
    area: "Republic Park",
    beds: 2,
    baths: 2.5,
    photo: "living and dining area of the Republic Park townhouse",
    photoSrc: "/images/listings/republic-park-townhouse.jpg",
    listedAt: "2023-02-10",
    summary: "Two-bedroom townhouse in Republic Park, a short drive from Georgetown and the airport road.",
    features: ["Two bedrooms, 2.5 bathrooms", "Established residential area"],
  },

  // --- Sale placeholders (layout samples; replace with the current portfolio) --
  {
    id: "sample-residential-lot-diamond",
    ref: "OSR-2001",
    title: "Residential House Lot – Diamond",
    purpose: "sale",
    category: "land",
    type: "Residential Land",
    price: 45000,
    region: "East Bank Demerara",
    area: "Diamond",
    lotArea: 5400,
    photo: "cleared residential house lot",
    listedAt: "2026-09-01",
    featured: true,
    sample: true,
    summary: "Sample listing: a house lot in an established East Bank scheme, ready for construction.",
    features: ["Titled land", "Access to water and electricity", "Established scheme"],
  },
  {
    id: "sample-family-home-georgetown",
    ref: "OSR-2002",
    title: "Three Bedroom Family Home – Georgetown",
    purpose: "sale",
    category: "residential",
    type: "House",
    price: 185000,
    region: "Georgetown",
    area: "Subryanville",
    beds: 3,
    baths: 2,
    floorArea: 1800,
    lotArea: 4800,
    photo: "two-storey concrete family home",
    listedAt: "2026-08-20",
    featured: true,
    sample: true,
    summary: "Sample listing: a two-storey family home in a quiet Georgetown neighbourhood.",
    features: ["Three bedrooms, two bathrooms", "Fenced yard with parking", "Established neighbourhood"],
  },
  {
    id: "sample-commercial-building-east-coast",
    ref: "OSR-2003",
    title: "Commercial Building – East Coast Public Road",
    purpose: "sale",
    category: "commercial",
    type: "Commercial Building",
    price: 350000,
    region: "East Coast Demerara",
    area: "Public Road",
    floorArea: 6000,
    lotArea: 8000,
    photo: "roadside commercial building",
    listedAt: "2026-08-10",
    sample: true,
    summary: "Sample listing: a roadside commercial building with ground-floor retail and upper-floor offices.",
    features: ["Public road frontage", "Ground-floor retail, upper-floor offices", "Ample parking"],
  },
  {
    id: "sample-commercial-land-west-bank",
    ref: "OSR-2004",
    title: "Commercial Land – West Bank Demerara",
    purpose: "sale",
    category: "land",
    type: "Commercial Land",
    price: 120000,
    region: "West Bank Demerara",
    area: "La Grange",
    lotArea: 21000,
    photo: "commercial land parcel near the public road",
    listedAt: "2026-07-30",
    sample: true,
    summary: "Sample listing: roughly half an acre of commercial land close to the West Bank public road.",
    features: ["Approximately half an acre", "Near the public road", "Suitable for warehousing or retail"],
  },
];

const listings: Listing[] = seeds.map(build);

const detailsById = new Map(seeds.map((s) => [s.id, s]));

function detailOf(l: Listing): Omit<ListingDetail, keyof Listing> {
  const s = detailsById.get(l.id)!;
  const facts: Array<[string, string]> = [
    ["Reference", l.ref],
    ["Purpose", l.purpose === "rent" ? "For rent" : "For sale"],
    ["Property type", l.type],
    ["Location", l.locationFmt],
  ];
  if (l.beds) facts.push(["Bedrooms", String(l.beds)]);
  if (l.baths) facts.push(["Bathrooms", String(l.baths)]);
  if (l.floorArea) facts.push(["Floor area", `${num(l.floorArea)} sq ft`]);
  if (l.lotArea) facts.push(["Lot size", `${num(l.lotArea)} sq ft`]);
  if (l.furnished) facts.push(["Furnishing", l.furnished]);
  facts.push(["Status", l.status]);

  // Only real photographs are listed; the page shows a single hero image until more are supplied.
  const photos: ListingPhoto[] = s.photos ?? [{ label: l.photo, src: l.photoSrc }];

  return {
    description:
      s.description ??
      `${l.summary} Full details, photographs and viewing times are available on request. Contact One Stop Realty Investment Inc. to arrange a visit.`,
    features: s.features ?? [],
    facts: facts.map(([k, v]) => ({ k, v })),
    photos,
  };
}

const wait = () => Promise.resolve();

export interface ListingsQuery {
  purpose?: Purpose;
  category?: Category;
  type?: PropertyType;
  region?: Region;
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  sort?: ListingSort;
  featured?: boolean;
  limit?: number;
}

export async function getListings(q: ListingsQuery = {}): Promise<Listing[]> {
  await wait();
  let out = listings;
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
  return q.limit ? out.slice(0, q.limit) : out;
}

export async function getListing(id: string): Promise<ListingDetail | null> {
  await wait();
  const l = listings.find((x) => x.id.toLowerCase() === id.toLowerCase());
  if (!l) return null;
  return { ...l, ...detailOf(l) };
}

export async function getSimilarListings(id: string, limit = 3): Promise<Listing[]> {
  await wait();
  const l = listings.find((x) => x.id === id);
  if (!l) return [];
  const same = listings.filter((x) => x.id !== id && x.purpose === l.purpose);
  const ranked = [
    ...same.filter((x) => x.category === l.category && x.region === l.region),
    ...same.filter((x) => x.category === l.category && x.region !== l.region),
    ...same.filter((x) => x.category !== l.category),
  ];
  return Array.from(new Set(ranked)).slice(0, limit);
}

export async function getListingIds(): Promise<string[]> {
  await wait();
  return listings.map((l) => l.id);
}

/** Distinct property types present in the data, for filter menus. */
export async function getPropertyTypes(purpose?: Purpose): Promise<PropertyType[]> {
  await wait();
  const src = purpose ? listings.filter((l) => l.purpose === purpose) : listings;
  return Array.from(new Set(src.map((l) => l.type)));
}

// ---------------------------------------------------------------------------
// Team (from the archived Team page)
// ---------------------------------------------------------------------------
const team: TeamMember[] = [
  {
    slug: "steven-persaud",
    photoSrc: "/images/team/steven-persaud.jpg",
    name: "Steven Persaud",
    role: "Founder & Lead Real Estate Broker",
    bio: [
      "Steven Persaud is a seasoned and devoted real estate professional, driven by his enthusiasm for helping individuals achieve their dream of homeownership. With 17 years of experience as a mortgage officer at a top-tier banking institution, Steven possesses an in-depth knowledge of the real estate market and the financial intricacies of property ownership. His passion for assisting others led him to establish One Stop Realty Investment Inc. in 2021.",
      "Embodying his dedication to helping clients attain their property ownership goals, the company motto is “You deserve it.” Leveraging his extensive connections with industry experts such as attorneys, appraisers, architects, insurance agents, contractors and building material suppliers, Steven provides a one-stop service, fully equipped to give comprehensive and informed guidance to his clientele.",
      "Known for delivering personalised and attentive service, he ensures the process of buying or selling a property is as smooth and stress-free as possible.",
    ],
  },
  {
    slug: "monalisa-sammy-persaud",
    photoSrc: "/images/team/monalisa-sammy-persaud.jpg",
    name: "Monalisa Sammy-Persaud",
    role: "Office Manager",
    bio: [
      "Monalisa Sammy-Persaud is a skilled real estate office manager with over 8 years of experience in business administration and 8 years in marketing and sales. She earned her Associate Degree in Public Management from the University of Guyana and has since developed expertise in office management, customer service and sales operations.",
      "Monalisa is known for her attention to detail, exceptional organisational skills and her ability to multitask effectively. She has a passion for building and nurturing relationships with clients, colleagues and stakeholders, and is committed to delivering exceptional customer service.",
      "As office manager she oversees the day-to-day operations of the office, ensuring administrative tasks are completed efficiently and accurately, and supports the sales team in meeting their targets.",
    ],
  },
  {
    slug: "suraj-singh",
    photoSrc: "/images/team/suraj-singh.jpg",
    name: "Suraj Singh",
    role: "Business Development Manager",
    bio: [
      "Suraj Singh is an experienced real estate business development manager with over 10 years of experience in the industry. He has a proven track record of developing successful strategies to grow businesses and increase revenue, and is known for his strong leadership, strategic thinking and excellent communication.",
      "Suraj has built and managed strong relationships with clients, partners and stakeholders throughout his career. He is adept at identifying new business opportunities, negotiating deals and delivering results that exceed expectations.",
      "Suraj holds a bachelor’s degree in Business Administration and has completed additional training and certifications in real estate and business development.",
    ],
  },
];

export async function getTeam(): Promise<TeamMember[]> {
  await wait();
  return team;
}

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const P = (title: string, cat: PostCategory, date: string, read: string, photo: string, excerpt: string, photoSrc?: string): Post => ({
  slug: slugify(title),
  title,
  cat,
  date,
  read,
  photo,
  photoSrc,
  excerpt,
});

/**
 * Placeholder articles so the blog architecture is ready. Titles cover the
 * practical questions clients ask most; replace with published posts.
 */
const posts: Post[] = [
  P("What to check before buying land in Guyana", "Buying", "Sep 2026", "6 min", "surveyor's plan and transport documents on a desk", "Transport or title, survey plans, encumbrances and the questions to ask before you pay a deposit on a house lot."),
  P("How a mortgage application works at a Guyanese bank", "Buying", "Aug 2026", "7 min", "bank meeting room", "What lenders look for, the documents to prepare, and how to strengthen your application, drawn from 17 years in mortgage financing."),
  P("A landlord's checklist for renting to expatriate tenants", "Renting", "Aug 2026", "5 min", "furnished apartment living room", "Furnishing standards, lease terms, currency and deposits: how to make your property attractive to corporate tenants."),
  P("Preparing your home for sale: what actually moves the price", "Selling", "Jul 2026", "5 min", "freshly painted house exterior", "Small repairs, presentation and paperwork that help a property sell faster and closer to asking price."),
  P("Residential vs. commercial: where investors are looking on the East Bank", "Investing", "Jul 2026", "8 min", "east bank demerara road at dusk", "How new housing schemes, the airport corridor and commercial demand are shaping investment choices along the East Bank."),
  P("Meet the One Stop Realty team", "Company News", "Jun 2026", "3 min", "office reception area", "Who we are, how the firm started, and what “You Deserve It” means for the way we work with clients."),
];

export const POST_CATEGORIES: Array<"All" | PostCategory> = ["All", "Buying", "Renting", "Selling", "Investing", "Company News"];

export async function getPosts(cat?: PostCategory | "All"): Promise<Post[]> {
  await wait();
  return !cat || cat === "All" ? posts : posts.filter((p) => p.cat === cat);
}
