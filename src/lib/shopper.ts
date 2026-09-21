export interface BuyerDetails {
  name: string;
  phone: string;
}

export interface ReceiptItem {
  listingId: string;
  title: string;
  priceNgn: number;
  photoUrl: string;
  size: string;
}

export interface Receipt {
  groupId: string;
  totalNgn: number;
  itemCount: number;
  items: ReceiptItem[];
  createdAt: number;
}

const BUYER_KEY = "jara-buyer-v1";
const RECEIPTS_KEY = "jara-receipts-v1";
const WISHLIST_KEY = "jara-wishlist-v1";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable. Session-only behavior continues.
  }
}

export function getBuyer(): BuyerDetails {
  const buyer = read<Partial<BuyerDetails>>(BUYER_KEY, {});
  return {
    name: typeof buyer.name === "string" ? buyer.name : "",
    phone: typeof buyer.phone === "string" ? buyer.phone : "",
  };
}

export function saveBuyer(buyer: BuyerDetails): void {
  write(BUYER_KEY, buyer);
}

export function getReceipts(): Receipt[] {
  const receipts = read<Receipt[]>(RECEIPTS_KEY, []);
  return Array.isArray(receipts) ? receipts : [];
}

export function saveReceipt(receipt: Receipt): void {
  const receipts = getReceipts().filter((r) => r.groupId !== receipt.groupId);
  write(RECEIPTS_KEY, [receipt, ...receipts].slice(0, 10));
}

export function getWishlist(): string[] {
  const ids = read<string[]>(WISHLIST_KEY, []);
  return Array.isArray(ids) ? ids.filter((id) => typeof id === "string") : [];
}

export function isWishlisted(listingId: string): boolean {
  return getWishlist().includes(listingId);
}

export function toggleWishlist(listingId: string): string[] {
  const ids = getWishlist();
  const next = ids.includes(listingId) ? ids.filter((id) => id !== listingId) : [...ids, listingId];
  write(WISHLIST_KEY, next);
  return next;
}
