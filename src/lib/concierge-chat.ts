import { filterListings, parseNaturalQuery } from "./concierge";
import type { Receipt } from "./shopper";
import { DERA_VENDOR } from "@/data/dera";
import type { ProductCardItem } from "@/components/product-card";

export type ChatToolId = "search" | "budget" | "size" | "track" | "dera";

export interface ChatChip {
  label: string;
  query: string;
}

export interface ChatAction {
  label: string;
  href: string;
}

export interface ChatReply {
  text: string;
  items: ProductCardItem[];
  chips: ChatChip[];
  actions: ChatAction[];
}

export interface BrainListing {
  _id: string;
  title: string;
  priceNgn: number;
  compareAtNgn?: number;
  stock?: number;
  occasion: string;
  photoUrl: string;
  sizes: string[];
}

function toCardItem(l: BrainListing): ProductCardItem {
  return {
    id: l._id,
    title: l.title,
    priceNgn: l.priceNgn,
    compareAtNgn: l.compareAtNgn,
    stock: l.stock,
    occasion: l.occasion,
    photoUrl: l.photoUrl,
  };
}

function catalogHref(filter: { occasion?: string; maxBudgetNgn?: number; size?: string }): string {
  const params = new URLSearchParams();
  if (filter.occasion) params.set("occasion", filter.occasion);
  if (filter.maxBudgetNgn !== undefined) params.set("budget", String(filter.maxBudgetNgn));
  if (filter.size) params.set("size", filter.size);
  return `/catalog${params.size > 0 ? `?${params.toString()}` : ""}`;
}

const SIZE_CHIPS: ChatChip[] = [
  { label: "S", query: "size S" },
  { label: "M", query: "size M" },
  { label: "L", query: "size L" },
  { label: "XL", query: "size XL" },
];

const BUDGET_CHIPS: ChatChip[] = [
  { label: "Under ₦50k", query: "under 50000" },
  { label: "Under ₦100k", query: "under 100000" },
  { label: "Under ₦150k", query: "under 150000" },
];

const OCCASION_CHIPS: ChatChip[] = [
  { label: "Owambe", query: "owambe" },
  { label: "Church", query: "church" },
  { label: "Street", query: "street" },
];

function searchReply(
  text: string,
  listings: BrainListing[],
  scoped?: string,
): ChatReply {
  const filter = parseNaturalQuery(text);
  const matched = filterListings(listings, filter);
  const items = matched.slice(0, 3).map(toCardItem);
  const bits: string[] = [];
  if (filter.occasion) bits.push(`for ${filter.occasion}`);
  if (filter.maxBudgetNgn !== undefined) {
    bits.push(`under ₦${filter.maxBudgetNgn.toLocaleString("en-NG")}`);
  }
  if (filter.size) bits.push(`in size ${filter.size}`);
  const scope = bits.length > 0 ? ` ${bits.join(" ")}` : "";
  const prefix = scoped ? `${scoped} ` : "";
  const followUps = !filter.size ? SIZE_CHIPS : !filter.maxBudgetNgn ? BUDGET_CHIPS : OCCASION_CHIPS;
  if (matched.length === 0) {
    return {
      text: `${prefix}Nothing matches${scope} right now. Try loosening the budget or clearing the size — or ask Dera on WhatsApp and she will hunt it down.`,
      items: [],
      chips: OCCASION_CHIPS,
      actions: [{ label: "Browse everything", href: "/catalog" }],
    };
  }
  return {
    text: `${prefix}Found ${matched.length} ${matched.length === 1 ? "piece" : "pieces"}${scope}. These are my top picks:`,
    items,
    chips: followUps,
    actions: [
      {
        label: `View all ${matched.length} in catalog`,
        href: catalogHref(filter),
      },
    ],
  };
}

/** Deterministic concierge brain: parses intent, filters real listings, never invents. */
export function conciergeReply(
  text: string,
  tool: ChatToolId,
  listings: BrainListing[],
  receipts: Receipt[],
): ChatReply {
  if (tool === "track") {
    const latest = receipts[0];
    if (!latest || latest.items.length === 0) {
      return {
        text: "No orders on this device yet. When you check out, I will keep your receipt here so you can track it.",
        items: [],
        chips: [],
        actions: [{ label: "Browse the catalog", href: "/catalog" }],
      };
    }
    return {
      text: `Your latest order: ${latest.itemCount} ${latest.itemCount === 1 ? "piece" : "pieces"} for ₦${latest.totalNgn.toLocaleString("en-NG")}. Dera confirms on WhatsApp, usually within 2 hours, Mon–Sat.`,
      items: [],
      chips: [],
      actions: [{ label: "Open your receipt", href: `/order?group=${latest.groupId}` }],
    };
  }
  if (tool === "dera") {
    return {
      text: `Dera runs ${DERA_VENDOR.name} herself. Message her any question — sizes, fabrics, delivery — and she replies on WhatsApp, Mon–Sat.`,
      items: [],
      chips: [],
      actions: [{ label: `WhatsApp ${DERA_VENDOR.whatsapp}`, href: DERA_VENDOR.whatsappLink }],
    };
  }
  if (tool === "budget") {
    const filter = parseNaturalQuery(text);
    if (filter.maxBudgetNgn === undefined) {
      return {
        text: "What is the most you want to spend? Pick a ceiling and I will stay under it.",
        items: [],
        chips: BUDGET_CHIPS,
        actions: [],
      };
    }
    return searchReply(text, listings, "On it.");
  }
  if (tool === "size") {
    const filter = parseNaturalQuery(text);
    if (!filter.size) {
      return {
        text: "Which size should I filter to? Pieces run S to XL.",
        items: [],
        chips: SIZE_CHIPS,
        actions: [],
      };
    }
    return searchReply(text, listings, "On it.");
  }
  return searchReply(text, listings);
}
