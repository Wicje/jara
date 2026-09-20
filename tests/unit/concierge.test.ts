import { describe, expect, it } from "vitest";
import { filterListings, matchReasons, parseNaturalQuery, recommendListings } from "@/lib/concierge";

describe("recommendListings", () => {
  it("filters by occasion and budget", () => {
    const results = recommendListings({ occasion: "street", maxBudgetNgn: 50000 });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((r) => r.occasion === "street" && r.priceNgn <= 50000)).toBe(true);
  });

  it("returns at most three matches", () => {
    const results = recommendListings({});
    expect(results.length).toBeLessThanOrEqual(3);
  });
});

describe("parseNaturalQuery", () => {
  it("parses occasion, k-budget, and size", () => {
    expect(parseNaturalQuery("owambe dress under 70k size M")).toEqual({
      occasion: "owambe",
      maxBudgetNgn: 70000,
      size: "M",
    });
  });

  it("parses full naira amounts and occasion synonyms", () => {
    expect(parseNaturalQuery("church outfit 80,000 naira")).toEqual({
      occasion: "church",
      maxBudgetNgn: 80000,
    });
  });

  it("ignores non-sizes and returns partial filters", () => {
    expect(parseNaturalQuery("something nice")).toEqual({});
  });

  it("maps wedding to owambe and swim to street", () => {
    expect(parseNaturalQuery("wedding guest dress").occasion).toBe("owambe");
    expect(parseNaturalQuery("swim party").occasion).toBe("owambe");
    expect(parseNaturalQuery("beach day").occasion).toBe("street");
  });
});

describe("filterListings", () => {
  const catalog = [
    { occasion: "owambe", priceNgn: 40000, sizes: ["S", "M"] },
    { occasion: "street", priceNgn: 90000, sizes: ["L"] },
  ];

  it("shares one predicate across callers", () => {
    expect(filterListings(catalog, {})).toHaveLength(2);
    expect(filterListings(catalog, { occasion: "owambe", maxBudgetNgn: 50000, size: "m" })).toHaveLength(1);
  });
});

describe("matchReasons", () => {
  it("explains budget, size, and occasion matches", () => {
    const reasons = matchReasons(
      { priceNgn: 40000, sizes: ["S", "M"], occasion: "street" },
      { occasion: "street", maxBudgetNgn: 50000, size: "m" },
    );
    expect(reasons).toHaveLength(3);
    expect(reasons.join(" ")).toMatch(/budget|Size M|street/);
  });
});
