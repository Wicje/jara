import { describe, it, expect } from "vitest";
import { conciergeReply, type BrainListing } from "@/lib/concierge-chat";

const LISTINGS: BrainListing[] = [
  { _id: "a", title: "Owambe Gown", priceNgn: 80000, occasion: "owambe", photoUrl: "x", sizes: ["S", "M"] },
  { _id: "b", title: "Church Dress", priceNgn: 45000, occasion: "church", photoUrl: "y", sizes: ["M", "L"] },
  { _id: "c", title: "Street Set", priceNgn: 30000, occasion: "street", photoUrl: "z", sizes: ["S", "M", "L", "XL"] },
  { _id: "d", title: "Aso Ebi Deluxe", priceNgn: 200000, occasion: "owambe", photoUrl: "w", sizes: ["M"] },
];

describe("conciergeReply", () => {
  it("searches by occasion, budget, and size", () => {
    const reply = conciergeReply("owambe dress under 100k size M", "search", LISTINGS, []);
    expect(reply.items.map((i) => i.id)).toEqual(["a"]);
    expect(reply.text).toContain("1 piece");
    expect(reply.actions[0].href).toBe("/catalog?occasion=owambe&budget=100000&size=M");
  });

  it("answers empty results with loosening chips", () => {
    const reply = conciergeReply("owambe under 10000", "search", LISTINGS, []);
    expect(reply.items).toEqual([]);
    expect(reply.chips.length).toBeGreaterThan(0);
  });

  it("asks for a budget when the budget tool has none", () => {
    const reply = conciergeReply("hello", "budget", LISTINGS, []);
    expect(reply.items).toEqual([]);
    expect(reply.chips.map((c) => c.label)).toContain("Under ₦50k");
  });

  it("asks for a size when the size tool has none", () => {
    const reply = conciergeReply("hello", "size", LISTINGS, []);
    expect(reply.chips.map((c) => c.label)).toContain("M");
  });

  it("summarises the latest receipt for tracking", () => {
    const reply = conciergeReply("where is my order", "track", LISTINGS, [
      {
        groupId: "g1",
        totalNgn: 80000,
        itemCount: 1,
        items: [{ listingId: "a", title: "Owambe Gown", priceNgn: 80000, photoUrl: "x", size: "M" }],
        createdAt: 1,
      },
    ]);
    expect(reply.text).toContain("₦80,000");
    expect(reply.actions[0].href).toBe("/order?group=g1");
  });

  it("handles no receipts honestly", () => {
    const reply = conciergeReply("where is my order", "track", LISTINGS, []);
    expect(reply.text).toContain("No orders");
  });

  it("links straight to WhatsApp for the dera tool", () => {
    const reply = conciergeReply("talk to a human", "dera", LISTINGS, []);
    expect(reply.actions[0].href).toContain("wa.me");
  });
});
