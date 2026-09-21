import { describe, it, expect } from "vitest";
import { formatAverage, summarizeRatings } from "@/lib/ratings";

describe("summarizeRatings", () => {
  it("aggregates counts, average, and bars", () => {
    expect(summarizeRatings([5, 5, 4, 3, 1])).toEqual({
      count: 5,
      average: 3.6,
      bars: [2, 1, 1, 0, 1],
    });
  });

  it("handles no ratings", () => {
    expect(summarizeRatings([])).toEqual({ count: 0, average: 0, bars: [0, 0, 0, 0, 0] });
  });

  it("formats the average with a comma decimal", () => {
    expect(formatAverage(4.5)).toBe("4,5");
  });
});
