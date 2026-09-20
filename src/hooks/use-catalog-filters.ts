"use client";

import { useMemo, useState } from "react";
import { activeFilter, parseNaturalQuery } from "@/lib/concierge";

export const DEFAULT_FILTER = { occasion: "owambe", budget: "100000", size: "M" };

export function useCatalogFilters() {
  const [occasion, setOccasion] = useState(DEFAULT_FILTER.occasion);
  const [budget, setBudget] = useState(DEFAULT_FILTER.budget);
  const [size, setSize] = useState(DEFAULT_FILTER.size);
  const [query, setQuery] = useState("");

  function askJara() {
    const parsed = parseNaturalQuery(query);
    if (parsed.occasion !== undefined) setOccasion(parsed.occasion);
    if (parsed.maxBudgetNgn !== undefined) setBudget(String(parsed.maxBudgetNgn));
    if (parsed.size !== undefined) setSize(parsed.size);
  }

  function resetAll() {
    setQuery("");
    setOccasion(DEFAULT_FILTER.occasion);
    setBudget(DEFAULT_FILTER.budget);
    setSize(DEFAULT_FILTER.size);
  }

  const filter = useMemo(() => activeFilter(occasion, budget, size), [occasion, budget, size]);

  return {
    occasion,
    budget,
    size,
    query,
    filter,
    setOccasion,
    setBudget,
    setSize,
    setQuery,
    askJara,
    resetAll,
  };
}
