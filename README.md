# One Stop Realty Investment Inc. — website

Next.js (App Router) + TypeScript + Tailwind v4 site for One Stop Realty Investment Inc., a
Georgetown, Guyana real estate firm (`https://onestoprealtygy.com`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

## Routes

| Route | Notes |
| --- | --- |
| `/` | Hero with Buy / Rent / Sell search, new listings, services, why One Stop, property categories, CTA |
| `/listings` | Server-filtered results. Params: `purpose`, `category`, `region`, `type`, `minPrice`, `maxPrice`, `beds`, `baths`, `q`, `sort` |
| `/listings/[id]` | Property page: gallery, price, specs, description, features, details, viewing / question form, similar properties |
| `/buy` | Buyer guide, sale listings, categories, buyer enquiry form (`#enquire`) |
| `/rent` | Renter guide, rental listings, rental enquiry form (`#enquire`) |
| `/sell` | Owner consultation form (`#inquiry`, pre-fills `?location=` and `?intent=rent`), why list, process, landlords |
| `/services` | Sales, rentals, property management, investment, consultancy, architectural & interior services |
| `/about` | Company story, vision, core values, services, team preview |
| `/team` | Team bios |
| `/blog` | Category filter, featured article, newsletter |
| `/mortgage-calculator` | USD / GYD payment estimate; `?price=` pre-fills from a listing |
| `/contact` | Contact form (subjects mirror the original site), office details, map |
| `POST /api/leads` | Lead intake stub. Every form posts here with `source` and the originating `page`. |

`sitemap.xml` and `robots.txt` are generated from `app/sitemap.ts` / `app/robots.ts`.

## Structure

- `lib/site.ts` — company constants: name, slogan, address, phones, email, social, service areas, services, contact subjects, property categories. Change contact details here.
- `types/listing.ts` — `Listing`, `ListingDetail`, `TeamMember`, `Post`. Field names map onto common feed / CRM shapes (`ref` → ListingId, `price` → ListPrice, …).
- `lib/data.ts` — async data layer: `getListings(query)`, `getListing`, `getSimilarListings`, `getListingIds`, `getPropertyTypes`, `getTeam`, `getPosts`. Replace the bodies with a live feed / CRM adapter; pages do not change. Rental listings were reconstructed from the archived site; entries flagged `sample` are layout placeholders.
- `lib/query.ts` — parses and describes `/listings` search params.
- `lib/leads.ts` — `submitLead(source, data)` and the `useLeadForm` hook used by every form.
- `lib/saved.ts` — saved-listing hearts (localStorage-backed).
- `components/` — `SiteNav` (sticky, full-screen menu below 1000px), `SiteFooter`, `Logo` (emblem + wordmark), `ListingCard`, `Photo` (next/image over a neutral fill until real media exists), `PageHero`, `LeadForm` (configurable enquiry form), `MortgageCalculator`, per-page forms.
- `app/globals.css` — design tokens as Tailwind `@theme` (navy, navy-deep, accent orange, ivory, cloud…), fonts via `next/font` (Plus Jakarta Sans, Fraunces), component classes (`btn-*`, `input`, `select`, `seg`, `tile`, `pill`, `badge-*`, `surface-navy`), scroll-driven `.reveal` entrances, and the global 3px accent focus ring.

## Brand assets

- `public/brand/logo.png` — original client logo (trimmed). `public/brand/emblem.png` — circular emblem used in the header, footer and inquiry card. `app/icon.png` / `app/apple-icon.png` — favicons.
- `public/images/listings/` — the client's own listing photos from the previous site.
- `public/images/stock/` — neutral placeholder photography for heroes and cards; replace with the client's photography when available.

## Accessibility notes

- Every input has a label (visible or `sr-only`); toggles use `aria-pressed`, the hero tabs use `role="tablist"` / `aria-selected` with arrow-key navigation.
- Minimum 44px tap targets; visible 3px accent focus ring (navy ring on orange surfaces, white on navy).
- Small orange text on white uses `accent-deep` (`#B4560A`, ≥ 4.5:1). Orange buttons use navy-deep text.
- Grids use `repeat(auto-fit, minmax(min(100%, Npx), 1fr))` so pages reflow from 360px to 1440px+; the only breakpoint is the 1000px nav switch.
- Animations respect `prefers-reduced-motion`.

## Connecting real data

- Pass `src` to `<Photo>` (or set `photoSrc` on a listing) to replace a placeholder; layouts don't change.
- Replace `lib/data.ts` internals with the feed / CRM adapter; keep the field names.
- `app/api/leads/route.ts` currently logs leads server-side; forward to email / CRM there.
