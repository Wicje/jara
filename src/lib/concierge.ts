import { DERA_LISTINGS, type SeedListing } from "@/data/dera";

export interface ConciergeFilter {
  occasion?: string;
  maxBudgetNgn?: number;
  size?: string;
}

export function recommendListings(filter: ConciergeFilter): SeedListing[] {
  const occasion = filter.occasion?.trim().toLowerCase();
  const size = filter.size?.trim().toUpperCase();
  return DERA_LISTINGS.filter((listing) => {
    if (occasion && listing.occasion !== occasion) return false;
    if (filter.maxBudgetNgn !== undefined && listing.priceNgn > filter.maxBudgetNgn) return false;
    if (size && !listing.sizes.map((s) => s.toUpperCase()).includes(size)) return false;
    return true;
  }).slice(0, 3);
}

const OCCASION_WORDS: Array<[RegExp, string]> = [
  [/\baso[\s-]?ebi\b|\bowambe\b|\bparty\b|\owedding\b/i, "owambe"],
  [/\bchurch\b|\boffice\b|\bwork\b/i, "church"],
  [/\bstreet\b|\bcasual\b|\bday\b/i, "street"],
];

export function parseNaturalQuery(input: string): ConciergeFilter {
  const filter: ConciergeFilter = {};
  for (const [pattern, occasion] of OCCASION_WORDS) {
    if (pattern.test(input)) {
      filter.occasion = occasion;
      break;
    }
  }
  const kMatch = input.match(/₦?\s?([\d,]+)\s?k\b/i);
  const fullMatch = input.match(/([\d,]+)\s?(naira|ngn|₦)/i);
  const underMatch = input.match(/(?:under|below|max|up to|budget)\s+₦?\s?([\d,]+)/i);
  const raw = kMatch ? kMatch[1] : (fullMatch ? fullMatch[1] : underMatch?.[1]);
  if (raw !== undefined) {
    const value = Number(raw.replace(/,/g, "")) * (kMatch ? 1000 : 1);
    if (Number.isFinite(value) && value > 0) filter.maxBudgetNgn = value;
  }
  const sizeMatch =
    input.match(/\bsize\s+([a-z0-9]+)/i) ?? input.match(/\b(XXL|XL|XS|S|M|L)\b/i);
  if (sizeMatch) {
    const size = sizeMatch[1].toUpperCase();
    if (/^(XS|S|M|L|XL|XXL)$/.test(size) || (/^\d{1,2}$/.test(size) && Number(size) >= 6 && Number(size) <= 22)) {
      filter.size = size;
    }
  }
  return filter;
}

export function matchReasons(
  listing: { priceNgn: number; sizes: string[]; occasion: string },
  filter: ConciergeFilter,
): string[] {
  const reasons: string[] = [];
  if (filter.maxBudgetNgn !== undefined && listing.priceNgn <= filter.maxBudgetNgn) {
    reasons.push(`₦${listing.priceNgn.toLocaleString("en-NG")} — under your ₦${filter.maxBudgetNgn.toLocaleString("en-NG")} budget`);
  }
  const size = filter.size?.trim().toUpperCase();
  if (size && listing.sizes.map((s) => s.toUpperCase()).includes(size)) {
    reasons.push(`Size ${size} in stock`);
  }
  if (filter.occasion) {
    reasons.push(`Picked for ${filter.occasion}`);
  }
  return reasons.slice(0, 3);
}
