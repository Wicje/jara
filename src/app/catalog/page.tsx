"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { ConciergeFilter } from "@/lib/concierge";
import { filterListings } from "@/lib/concierge";
import { isConvexConfigured } from "../providers";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChipGroup, BUDGET_OPTIONS, OCCASION_OPTIONS, SIZE_OPTIONS } from "@/components/filter-chips";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { ProductCard } from "@/components/product-card";

type Sort = "newest" | "price-asc" | "price-desc";

function Catalog() {
  const params = useSearchParams();
  const [occasion, setOccasion] = useState(() => params.get("occasion") ?? "");
  const [budget, setBudget] = useState(() => params.get("budget") ?? "");
  const [size, setSize] = useState(() => params.get("size") ?? "");
  const [sort, setSort] = useState<Sort>("newest");

  const live = useQuery(api.listings.list, {});
  const filter: ConciergeFilter = useMemo(() => {
    const maxBudgetNgn = budget.trim() === "" ? undefined : Number(budget);
    return {
      occasion: occasion.trim() === "" ? undefined : occasion.trim().toLowerCase(),
      maxBudgetNgn: maxBudgetNgn !== undefined && Number.isFinite(maxBudgetNgn) ? maxBudgetNgn : undefined,
      size: size.trim() === "" ? undefined : size,
    };
  }, [occasion, budget, size]);

  const items = useMemo(() => {
    const matched = filterListings(live ?? [], filter);
    const sorted = [...matched];
    if (sort === "price-asc") sorted.sort((a, b) => a.priceNgn - b.priceNgn);
    if (sort === "price-desc") sorted.sort((a, b) => b.priceNgn - a.priceNgn);
    return sorted.map((l) => ({
      id: l._id,
      title: l.title,
      priceNgn: l.priceNgn,
      occasion: l.occasion,
      photoUrl: l.photoUrl,
    }));
  }, [live, filter, sort]);

  const occasionLabel = occasion === "" ? "All" : occasion;
  const countText =
    live === undefined
      ? "Loading catalog…"
      : items.length === 1
        ? `1 ${occasionLabel} piece`
        : `${items.length} ${occasionLabel} pieces`;

  return (
    <>
      <div className="mt-6 grid gap-3">
        <ChipGroup label="Occasion" options={OCCASION_OPTIONS} current={occasion} onSelect={setOccasion} />
        <div className="grid grid-cols-2 gap-3">
          <ChipGroup label="Size" options={SIZE_OPTIONS} current={size} onSelect={setSize} />
          <ChipGroup label="Budget" options={BUDGET_OPTIONS} current={budget} onSelect={setBudget} />
        </div>
        <div className="grid max-w-55 gap-1.5">
          <Label htmlFor="sort">Sort</Label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-11 rounded-md border border-neutral-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price low to high</option>
            <option value="price-desc">Price high to low</option>
          </select>
        </div>
      </div>

      <Text className="mt-6" role="status">
        {countText}
      </Text>

      {live === undefined ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3" aria-label="Loading catalog" aria-busy="true">
          {[0, 1, 2, 3, 4, 5].map((skeleton) => (
            <div key={skeleton} className="rounded-xl border border-neutral-200 bg-white p-3 sm:p-6">
              <div className="aspect-[3/4] w-full animate-pulse rounded-lg bg-neutral-200" />
              <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-neutral-200" />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <Card variant="subtle" className="mt-4">
          <CardHeader>
            <CardTitle>Nothing matches yet</CardTitle>
            <CardDescription>No pieces fit that combination. Loosen the budget or clear the size to see more.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              variant="outline"
              onClick={() => {
                setOccasion("");
                setBudget("");
                setSize("");
              }}
            >
              Reset filters
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3" role="list" aria-label="Products">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}

export default function CatalogPage() {
  return (
    <main>
      <Container className="pb-4">
        <Text as="h1" className="pt-10 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Browse the market
        </Text>
        {isConvexConfigured() ? (
          <Suspense fallback={<Text className="mt-6">Loading catalog…</Text>}>
            <Catalog />
          </Suspense>
        ) : (
          <Text className="mt-6">Connect the Convex backend to browse the live catalog.</Text>
        )}
      </Container>
    </main>
  );
}
