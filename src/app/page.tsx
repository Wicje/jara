"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { DERA_LISTINGS, DERA_VENDOR } from "@/data/dera";
import { parseNaturalQuery } from "@/lib/concierge";
import { isConvexConfigured } from "./providers";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";

const OCCASIONS = ["owambe", "church", "street"] as const;

function Hero({ photos }: { photos: string[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function askJara() {
    const parsed = parseNaturalQuery(query);
    const params = new URLSearchParams();
    if (parsed.occasion) params.set("occasion", parsed.occasion);
    if (parsed.maxBudgetNgn !== undefined) params.set("budget", String(parsed.maxBudgetNgn));
    if (parsed.size) params.set("size", parsed.size);
    router.push(`/catalog${params.size > 0 ? `?${params.toString()}` : ""}`);
  }

  return (
    <section aria-label="Find your fit" className="relative overflow-hidden rounded-xl bg-palm-deep text-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(34rem_24rem_at_88%_8%,rgba(245,230,200,0.16),transparent_62%),radial-gradient(30rem_26rem_at_8%_92%,rgba(0,0,0,0.28),transparent_68%)]"
      />
      <div className="relative grid gap-6 p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-sans text-xs font-bold tracking-[0.2em] text-gold-soft uppercase">
            Lagos · Same-day delivery
          </p>
          <h1 className="mt-3 font-display text-5xl leading-[0.95] tracking-wide uppercase sm:text-7xl">
            Dress like the party is yours
          </h1>
          <p className="mt-4 max-w-md font-sans text-base leading-7 text-paper/80">
            Jara means extra value. Describe the occasion and budget. Real pieces from {DERA_VENDOR.name}.
          </p>
          <form
            className="mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
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
              placeholder="Owambe dress under 100k, size M"
              aria-label="Describe what you're looking for"
              className="border-transparent"
            />
            <Button type="submit" size="lg" variant="accent" className="shrink-0">
              <MagnifyingGlass size={18} weight="bold" aria-hidden="true" />
              Ask Jara
            </Button>
          </form>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3" aria-hidden="true">
          {photos.slice(0, 3).map((photo, index) => (
            <div key={photo} className={`overflow-hidden rounded-md ${index === 1 ? "mt-6" : ""}`}>
              <Image
                src={photo}
                alt=""
                width={400}
                height={533}
                sizes="(max-width: 1024px) 30vw, 20vw"
                className="aspect-[3/4] w-full object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OccasionRows({ photos, counts }: { photos: Record<string, string>; counts: Record<string, number> }) {
  return (
    <section aria-label="Shop by occasion" className="mt-12">
      <h2 className="font-display text-3xl tracking-wide text-ink uppercase sm:text-4xl">Shop the occasion</h2>
      <ul className="mt-4 divide-y divide-line border-y border-line">
        {OCCASIONS.map((occasion, index) => (
          <li key={occasion}>
            <Link
              href={`/catalog?occasion=${occasion}`}
              className="group flex items-center gap-4 py-3 transition-colors hover:bg-cream/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <span aria-hidden="true" className="w-8 shrink-0 font-display text-sm tracking-wide text-smoke tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              {photos[occasion] && (
                <Image
                  src={photos[occasion]}
                  alt=""
                  width={160}
                  height={160}
                  className="h-14 w-14 shrink-0 rounded-md object-cover sm:h-16 sm:w-16"
                  loading="lazy"
                />
              )}
              <span className="flex-1">
                <span className="block font-display text-2xl tracking-wide text-ink uppercase group-hover:underline sm:text-3xl">
                  {occasion}
                </span>
                <span className="font-sans text-sm text-smoke">
                  {counts[occasion] ?? 0} pieces in stock
                </span>
              </span>
              <ArrowRight size={22} weight="bold" aria-hidden="true" className="shrink-0 text-palm transition-transform group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Landing() {
  const live = useQuery(api.listings.list, {});
  const listings = live ?? [];
  const photos: Record<string, string> = {};
  const counts: Record<string, number> = {};
  const heroPhotos: string[] = [];
  for (const listing of listings) {
    counts[listing.occasion] = (counts[listing.occasion] ?? 0) + 1;
    if (!photos[listing.occasion]) photos[listing.occasion] = listing.photoUrl;
    if (heroPhotos.length < 3) heroPhotos.push(listing.photoUrl);
  }
  const fresh = listings.slice(0, 6).map((l) => ({
    id: l._id,
    title: l.title,
    priceNgn: l.priceNgn,
    occasion: l.occasion,
    photoUrl: l.photoUrl,
  }));

  return (
    <>
      <Hero photos={heroPhotos} />
      <OccasionRows photos={photos} counts={counts} />
      <section aria-label="New this week" className="mt-12">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-3xl tracking-wide text-ink uppercase sm:text-4xl">New this week</h2>
          <Link href="/catalog" className="font-sans text-sm font-semibold text-palm underline">
            Browse all
          </Link>
        </div>
        {live === undefined ? (
          <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 lg:grid-cols-3" aria-label="Loading new arrivals" aria-busy="true">
            {[0, 1, 2, 3, 4, 5].map((skeleton) => (
              <ProductCardSkeleton key={skeleton} />
            ))}
          </div>
        ) : (
          <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 lg:grid-cols-3" aria-label="Products">
            {fresh.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

function StaticLanding() {
  return (
    <>
      <Hero photos={DERA_LISTINGS.slice(0, 3).map((l) => l.photoUrl)} />
      <section aria-label="New this week" className="mt-12">
        <h2 className="font-display text-3xl tracking-wide text-ink uppercase sm:text-4xl">New this week</h2>
        <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 lg:grid-cols-3" aria-label="Products">
          {DERA_LISTINGS.slice(0, 6).map((l) => (
            <ProductCard
              key={l.id}
              item={{ id: l.id, title: l.title, priceNgn: l.priceNgn, occasion: l.occasion, photoUrl: l.photoUrl }}
            />
          ))}
        </ul>
      </section>
    </>
  );
}

export default function Home() {
  return (
    <main>
      <Container className="pt-4 pb-4 sm:pt-6">
        {isConvexConfigured() ? <Landing /> : <StaticLanding />}
        <Text className="mt-10" tone="muted">
          Live catalog from {DERA_VENDOR.name} ({DERA_VENDOR.byline}) via Firecrawl. Sizes and fabrics to be confirmed by vendor.
        </Text>
      </Container>
    </main>
  );
}
