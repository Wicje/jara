export interface RatingSummary {
  count: number;
  average: number;
  /** Counts for 5, 4, 3, 2, 1 stars in order. */
  bars: [number, number, number, number, number];
}

export function summarizeRatings(ratings: number[]): RatingSummary {
  const bars: [number, number, number, number, number] = [0, 0, 0, 0, 0];
  for (const rating of ratings) {
    if (rating >= 1 && rating <= 5) bars[5 - rating] += 1;
  }
  const count = ratings.length;
  const average = count === 0 ? 0 : ratings.reduce((sum, r) => sum + r, 0) / count;
  return { count, average, bars };
}

export function formatAverage(average: number): string {
  return average.toFixed(1).replace(".", ",");
}
