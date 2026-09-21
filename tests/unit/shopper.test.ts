import { describe, it, expect, beforeEach } from "vitest";
import {
  getBuyer,
  saveBuyer,
  getReceipts,
  saveReceipt,
  getWishlist,
  isWishlisted,
  toggleWishlist,
} from "@/lib/shopper";
import { buildShareText } from "@/lib/share";

beforeEach(() => {
  window.localStorage.clear();
});

describe("shopper memory", () => {
  it("remembers buyer details across sessions", () => {
    expect(getBuyer()).toEqual({ name: "", phone: "" });
    saveBuyer({ name: "Adaeze", phone: "08030000000" });
    expect(getBuyer()).toEqual({ name: "Adaeze", phone: "08030000000" });
  });

  it("keeps the newest receipts first and caps the list", () => {
    for (let i = 0; i < 12; i++) {
      saveReceipt({ groupId: `g${i}`, totalNgn: 1000 * i, itemCount: 1, items: [], createdAt: i });
    }
    const receipts = getReceipts();
    expect(receipts).toHaveLength(10);
    expect(receipts[0].groupId).toBe("g11");
  });

  it("toggles wishlist ids without duplicates", () => {
    expect(isWishlisted("a")).toBe(false);
    toggleWishlist("a");
    expect(isWishlisted("a")).toBe(true);
    toggleWishlist("a");
    expect(isWishlisted("a")).toBe(false);
    expect(getWishlist()).toEqual([]);
  });
});

describe("share", () => {
  it("builds a shareable line with naira price", () => {
    expect(buildShareText("Teressa Dress", 39900)).toBe("Teressa Dress — ₦39,900 on Jara");
  });
});
