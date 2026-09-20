"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { DERA_LISTINGS, DERA_VENDOR } from "@/data/dera";
import { parseNaturalQuery } from "@/lib/concierge";
import { isConvexConfigured } from "./providers";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { ProductCard } from "@/components/product-card";

const OCCASIONS = ["owambe", "church", "street"] as const;

function OccasionRow({ photos }: { photos: Record<string, string> }) {
  return (
    <section aria-label="Shop by occasion" className="mt-10">
      <Text as="h2">Shop by occasion</Text>
      <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-4">
        {OCCASIONS.map((occasion) => (
          <Link
            key={occasion}
            href={`/catalog?occasion=${occasion}`}
            className="group overflow-hidden rounded-xl border border-neutral-200 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 sm:aspect-[4/3]">
              {photos[occasion] && (
                <Image
                  src={photos[occasion]}
                  alt={`${occasion} styles`}
                  fill
                  sizes="(max-width: 640px) 33vw, 33vw"
                  className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              )}
            </div>
            <p className="p-2 text-center text-sm font-semibold capitalize text-neutral-900 sm:p-3 sm:text-base">
              {occasion}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function NewIn() {
  const live = useQuery(api.listings.list, {});
  const items = (live ?? [])
    .slice(0, 6)
    .map((l) => ({ id: l._id, title: l.title, priceNgn: l.priceNgn, occasion: l.occasion, photoUrl: l.photoUrl }));
  if (live === undefined) {
    return (
      <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3" aria-label="Loading new arrivals" aria-busy="true">
        {[0, 1, 2, 3, 4, 5].map((skeleton) => (
          <div key={skeleton} className="rounded-xl border border-neutral-200 bg-white p-3 sm:p-6">
            <div className="aspect-[3/4] w-full animate-pulse rounded-lg bg-neutral-200" />
            <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-neutral-200" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3" role="list" aria-label="Products">
      {items.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function Landing() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const live = useQuery(api.listings.list, {});
  const photos: Record<string, string> = {};
  for (const listing of live ?? []) {
    if (!photos[listing.occasion]) photos[listing.occasion] = listing.photoUrl;
  }

  function askJara() {
    const parsed = parseNaturalQuery(query);
    const params = new URLSearchParams();
    if (parsed.occasion) params.set("occasion", parsed.occasion);
    if (parsed.maxBudgetNgn !== undefined) params.set("budget", String(parsed.maxBudgetNgn));
    if (parsed.size) params.set("size", parsed.size);
    router.push(`/catalog${params.size > 0 ? `?${params.toString()}` : ""}`);
  }

  return (
    <>
      <section aria-label="Find your fit" className="pt-10 sm:pt-14">
        <Text as="h1" className="max-w-xl text-4xl font-extrabold tracking-tight sm:text-6xl">
          Chat your style. Own the owambe.
        </Text>
        <Text className="mt-3 max-w-xl text-lg">
          Jara means extra value. Tell us the occasion, budget, and size. Real pieces from {DERA_VENDOR.name}.
        </Text>
        <form
          className="mt-6 flex max-w-xl flex-col gap-2 sm:flex-row"
          aria-label="Ask Jara"
          onSubmit={(e) => {
            e.preventDefault();
            askJara();
          }}
        >
          <Input
            id="jara-query"
            name="jara-query"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: owambe dress under 100k, size M"
            aria-label="Describe what you're looking for"
            className="h-12 text-base"
          />
          <Button type="submit" size="lg">
            <MagnifyingGlass size={18} weight="bold" aria-hidden="true" />
            Ask Jara
          </Button>
        </form>
      </section>

      <OccasionRow photos={photos} />

      <section aria-label="New this week" className="mt-10">
        <div className="flex items-baseline justify-between">
          <Text as="h2">New this week</Text>
          <Link href="/catalog" className="text-sm font-medium text-amber-800 underline">
            Browse all
          </Link>
        </div>
        <NewIn />
      </section>
    </>
  );
}

function StaticLanding() {
  return (
    <>
      <section aria-label="Find your fit" className="pt-10">
        <Text as="h1" className="max-w-xl text-4xl font-extrabold tracking-tight sm:text-6xl">
          Chat your style. Own the owambe.
        </Text>
        <Text className="mt-3 max-w-xl text-lg">
          Jara means extra value. Real pieces from {DERA_VENDOR.name}, {DERA_VENDOR.byline} in Lagos.
        </Text>
      </section>
      <section aria-label="New this week" className="mt-10">
        <Text as="h2">New this week</Text>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3" role="list" aria-label="Products">
          {DERA_LISTINGS.slice(0, 6).map((l) => (
            <ProductCard
              key={l.id}
              item={{ id: l.id, title: l.title, priceNgn: l.priceNgn, occasion: l.occasion, photoUrl: l.photoUrl }}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default function Home() {
  return (
    <main>
      <Container className="pb-4">
        {isConvexConfigured() ? <Landing /> : <StaticLanding />}
        <Text className="mt-8" tone="muted">
          Live catalog from {DERA_VENDOR.name} ({DERA_VENDOR.byline}) via Firecrawl. Sizes and fabrics to be confirmed by vendor.
        </Text>
      </Container>
    </main>
  );
}
