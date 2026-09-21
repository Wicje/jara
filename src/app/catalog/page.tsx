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
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";

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
      compareAtNgn: l.compareAtNgn,
      stock: l.stock,
      occasion: l.occasion,
      photoUrl: l.photoUrl,
      photoUrls: l.photoUrls,
    }));
  }, [live, filter, sort]);

  const occasionLabel = occasion === "" ? "All" : occasion;
  const countText =
    live === undefined
      ? "Loading catalog…"
      : items.length === 1
        ? `1 ${occasionLabel} piece in stock`
        : `${items.length} ${occasionLabel} pieces in stock`;

  return (
    <>
      <div className="mt-6 rounded-lg bg-mist p-4 sm:p-5">
        <div className="grid gap-4">
          <ChipGroup label="Occasion" options={OCCASION_OPTIONS} current={occasion} onSelect={setOccasion} />
          <div className="grid gap-4 sm:grid-cols-3">
            <ChipGroup label="Size" options={SIZE_OPTIONS} current={size} onSelect={setSize} />
            <ChipGroup label="Budget" options={BUDGET_OPTIONS} current={budget} onSelect={setBudget} />
            <div className="grid content-start gap-1.5">
              <Label htmlFor="sort">Sort</Label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="h-11 rounded-md border border-ink/20 bg-white px-3 font-sans text-sm text-ink focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/40"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price low to high</option>
                <option value="price-desc">Price high to low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 font-sans text-sm font-semibold text-ink/70" role="status">
        {countText}
      </p>

      {live === undefined ? (
        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 lg:grid-cols-3" aria-label="Loading catalog" aria-busy="true">
          {[0, 1, 2, 3, 4, 5].map((skeleton) => (
            <ProductCardSkeleton key={skeleton} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <Card variant="panel" className="mt-4">
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
        <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 lg:grid-cols-3" aria-label="Products">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </ul>
      )}
    </>
  );
}

export default function CatalogPage() {
  return (
    <main>
      <Container className="pt-8 pb-4 sm:pt-10">
        <p className="font-sans text-xs font-bold tracking-[0.2em] text-violet uppercase">The market</p>
        <h1 className="mt-2 font-display text-4xl tracking-wide text-ink uppercase sm:text-5xl">
          Browse everything
        </h1>
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
