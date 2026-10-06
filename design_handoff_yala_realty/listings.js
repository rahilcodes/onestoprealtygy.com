// Placeholder MLS-shaped data. Phase 2 replaces this module with the IDX/RETS feed adapter.
const money = n => '$' + n.toLocaleString('en-US');
const num = n => n.toLocaleString('en-US');
const BADGE = {
  new: ['#C9A961', '#0B1F3A'], open: ['#0B1F3A', '#FFFFFF'], pending: ['#374151', '#FFFFFF'],
  soon: ['#EAD9B0', '#0B1F3A'], drop: ['#2E9E6B', '#FFFFFF'], sold: ['#6B7280', '#FFFFFF'], days: ['#FFFFFF', '#0B1F3A']
};
const L = (id, mls, price, address, city, zip, beds, baths, sqft, lot, type, neighborhood, dom, badge, kind, photo, extra = {}) => {
  const [badgeBg, badgeFg] = BADGE[kind];
  return {
    id, mls, price, priceFmt: money(price), address, city, zip, beds, baths, sqft, sqftFmt: num(sqft), lot, lotFmt: num(lot),
    type, neighborhood, dom, domLabel: dom === 0 ? 'Listed today' : dom + (dom === 1 ? ' day' : ' days') + ' on market',
    badge, badgeBg, badgeFg, photo, status: kind === 'sold' ? 'Sold' : kind === 'pending' ? 'Pending' : kind === 'soon' ? 'Coming Soon' : 'Active',
    specs: `${beds} bd · ${baths} ba · ${num(sqft)} sqft`, fullAddress: `${address}, ${city}, CA ${zip}`,
    ppsf: money(Math.round(price / sqft)) + '/sqft', listedBy: 'YALA Realty & Associates', ...extra
  };
};

export const listings = [
  L(1, 'OC24188214', 1295000, '78 Winding Way', 'Irvine', '92602', 4, 3, 2410, 5200, 'Single Family', 'Northwood Pointe', 0, 'New · 2 hrs', 'new', 'two-story exterior, dusk', { year: 1998, hoa: 120, garage: 2, pool: 'Community' }),
  L(2, 'OC24187902', 1850000, '24 Shadowbrook', 'Irvine', '92604', 5, 4, 3120, 6800, 'Single Family', 'Woodbridge', 1, 'New · Today', 'new', 'lakefront exterior', { year: 1986, hoa: 155, garage: 3, pool: 'Private' }),
  L(3, 'NP24186331', 4395000, '1207 Bayside Dr', 'Newport Beach', '92625', 4, 4.5, 3480, 7100, 'Single Family', 'Corona del Mar', 4, 'Open Sat 1–4', 'open', 'ocean-view terrace', { year: 2016, hoa: 0, garage: 2, pool: 'None' }),
  L(4, 'PW24185540', 1449000, '15 Corte Vista', 'Tustin', '92782', 4, 3, 2650, 5900, 'Single Family', 'Tustin Ranch', 18, 'Price ↓ $26K', 'drop', 'front elevation, palms', { year: 1994, hoa: 98, garage: 2, pool: 'Community' }),
  L(5, 'OC24188101', 989000, '3 Cordoba', 'Irvine', '92614', 3, 2.5, 1680, 0, 'Condo', 'Westpark', 1, 'New · 1 day', 'new', 'courtyard entry', { year: 1989, hoa: 310, garage: 2, pool: 'Community' }),
  L(6, 'OC24188420', 2150000, '28481 Rancho Grande', 'Laguna Niguel', '92677', 5, 4, 3560, 9400, 'Single Family', 'Rancho Niguel', 0, 'Coming Soon', 'soon', 'hillside backyard', { year: 1990, hoa: 85, garage: 3, pool: 'Private' }),
  L(7, 'OC24187750', 2480000, '108 Chorus', 'Irvine', '92618', 4, 4, 2990, 4300, 'Single Family', 'Great Park · Rise', 3, 'New · 3 days', 'new', 'modern farmhouse exterior', { year: 2021, hoa: 235, garage: 2, pool: 'Community' }),
  L(8, 'NP24186007', 1125000, '2211 Elden Ave #B', 'Costa Mesa', '92627', 3, 2.5, 1740, 0, 'Townhouse', 'Eastside Costa Mesa', 6, '6 days', 'days', 'rooftop deck', { year: 2019, hoa: 260, garage: 2, pool: 'None' }),
  L(9, 'NP24185122', 7900000, '22 Pelican Point Dr', 'Newport Coast', '92657', 5, 6, 5410, 12800, 'Single Family', 'Pelican Point', 2, 'Just Listed', 'new', 'coastal estate, pool', { year: 2004, hoa: 780, garage: 4, pool: 'Private' }),
  L(10, 'OC24184880', 1675000, '26 Bell Chime', 'Irvine', '92618', 4, 3, 2380, 4100, 'Single Family', 'Portola Springs', 12, 'Pending', 'pending', 'great room, open plan', { year: 2015, hoa: 190, garage: 2, pool: 'Community' }),
  L(11, 'OC24185961', 1299000, '25181 Rivendell Dr', 'Lake Forest', '92630', 4, 3, 2210, 6000, 'Single Family', 'Lake Forest Keys', 9, '9 days', 'days', 'backyard, lake access', { year: 1979, hoa: 140, garage: 2, pool: 'Community' }),
  L(12, 'OC24185300', 1725000, '27 Via Cancion', 'San Clemente', '92673', 4, 3, 2760, 6500, 'Single Family', 'Talega', 14, '14 days', 'days', 'spanish exterior, canyon view', { year: 2003, hoa: 265, garage: 3, pool: 'Community' }),
];

export const sold = [
  L(101, 'OC24170211', 2410000, '41 Cezanne', 'Irvine', '92603', 4, 4, 3050, 7200, 'Single Family', 'Turtle Rock', 8, 'Sold · 8 days', 'sold', 'hillside exterior', { listPrice: money(2295000), over: '+5.0% over list' }),
  L(102, 'OC24168903', 1180000, '19 Lakepines', 'Irvine', '92620', 3, 2.5, 1620, 0, 'Condo', 'Woodbridge', 6, 'Sold · 6 days', 'sold', 'lake view balcony', { listPrice: money(1099000), over: '+7.4% over list' }),
  L(103, 'NP24165578', 3650000, '1521 Santiago Dr', 'Newport Beach', '92660', 4, 3.5, 3210, 8900, 'Single Family', 'Dover Shores', 21, 'Sold · 21 days', 'sold', 'bay-view living room', { listPrice: money(3695000), over: '98.8% of list' }),
];

export const market = [
  { label: 'Median sale price', value: '$1.34M', delta: '+3.8% YoY', up: true },
  { label: 'Median days on market', value: '24', delta: '−3 days YoY', up: true },
  { label: 'Active inventory', value: '3,912', delta: '+11% YoY', up: false },
  { label: 'Sale-to-list ratio', value: '99.6%', delta: '+0.4 pts YoY', up: true },
];

export const testimonials = [
  { quote: 'Butchi found us a Woodbridge home before it hit the portals, then negotiated $40K under asking in a week when everything else was going over. He picked up every single call.', name: 'Priya & Arjun M.', meta: 'Bought in Woodbridge, Irvine · 2026' },
  { quote: 'We interviewed four agents. YALA was the only one who walked in with a pricing model and a marketing calendar. Eleven offers, sold in eight days.', name: 'The Henderson family', meta: 'Sold in Tustin Ranch · 2025' },
  { quote: 'Relocating from Seattle, I needed someone who knew school boundaries, HOA quirks, and Mello-Roos cold. Butchi did, and he never once rushed us.', name: 'Daniel K.', meta: 'Relocated to Great Park, Irvine · 2025' },
];

export const posts = [
  { title: "Irvine's fall 2026 market: what buyers should expect", cat: 'Market Update', date: 'Sep 3, 2026', read: '6 min', photo: 'irvine skyline, golden hour', excerpt: 'Inventory is up 11% year over year, but well-priced homes in Northwood and Woodbridge are still going in under two weeks. Here is how to position an offer.' },
  { title: 'How the Great Park build-out is reshaping north Irvine prices', cat: 'Neighborhoods', date: 'Aug 27, 2026', read: '8 min', photo: 'great park aerial', excerpt: 'New phases in Solis Park and Rise are pulling median prices north of $2.3M. We break down HOA, Mello-Roos, and resale trends by village.' },
  { title: 'Mello-Roos, explained for first-time Irvine buyers', cat: 'Buying', date: 'Aug 19, 2026', read: '5 min', photo: 'tax bill close-up', excerpt: 'What the special tax actually funds, how long it lasts, and how to compare two homes with very different bills.' },
  { title: 'Pricing your Orange County home in a 24-day market', cat: 'Selling', date: 'Aug 12, 2026', read: '7 min', photo: 'staged living room', excerpt: 'Why the first ten days decide everything, and the three pricing bands we model before any listing goes live.' },
  { title: 'Newport Beach vs. Corona del Mar: a side-by-side for luxury buyers', cat: 'Neighborhoods', date: 'Aug 5, 2026', read: '9 min', photo: 'corona del mar coastline', excerpt: 'Lot sizes, walkability, view premiums, and what $4M buys on each side of PCH.' },
  { title: "Rate buydowns and seller credits: what's actually negotiable in 2026", cat: 'Financing', date: 'Jul 29, 2026', read: '6 min', photo: 'closing table', excerpt: 'Seller-paid 2-1 buydowns are back. When they beat a price cut, and how to structure one so the appraisal holds.' },
];

export const neighborhoods = [
  { name: 'Irvine', median: '$1.48M', dom: '18 days', note: 'Master-planned villages, top-ranked schools, strong HOA standards.', photo: 'irvine village street' },
  { name: 'Newport Beach', median: '$3.60M', dom: '41 days', note: 'Harbor, coastal bluffs, and the Corona del Mar village.', photo: 'newport harbor' },
  { name: 'Tustin Ranch', median: '$1.42M', dom: '21 days', note: 'Golf-course community with quick access to the 5 and 261.', photo: 'tustin ranch golf' },
  { name: 'Laguna Niguel', median: '$1.55M', dom: '27 days', note: 'Hillside lots, larger yards, ten minutes to Dana Point.', photo: 'laguna niguel hills' },
];
