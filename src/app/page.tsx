"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { DERA_LISTINGS, DERA_VENDOR } from "@/data/dera";
import { isConvexConfigured } from "./providers";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { ProductCardSkeleton, type ProductCardItem } from "@/components/product-card";
import { formatNgn } from "@/components/format";

function toCardItem(l: {
  _id: string;
  title: string;
  priceNgn: number;
  compareAtNgn?: number;
  stock?: number;
  occasion: string;
  photoUrl: string;
}): ProductCardItem {
  return {
    id: l._id,
    title: l.title,
    priceNgn: l.priceNgn,
    compareAtNgn: l.compareAtNgn,
    stock: l.stock,
    occasion: l.occasion,
    photoUrl: l.photoUrl,
  };
}

function AskStrip() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function askJara() {
    const text = query.trim();
    router.push(text === "" ? "/chat" : `/chat?q=${encodeURIComponent(text)}`);
  }

  return (
    <section aria-label="Ask Jara" className="border-b border-line bg-cloud">
      <Container className="py-4">
        <form
          className="flex flex-col gap-2 sm:flex-row sm:items-center"
          aria-label="Ask Jara"
          onSubmit={(e) => {
            e.preventDefault();
            askJara();
          }}
        >
          <p className="shrink-0 font-sans text-sm font-semibold text-ink">
            Describe your look. Jara finds it.
          </p>
          <div className="flex flex-1 flex-col gap-2 sm:flex-row">
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
            <Button type="submit" variant="black" className="shrink-0">
              <MagnifyingGlass size={18} weight="bold" aria-hidden="true" />
              Ask Jara
            </Button>
          </div>
        </form>
      </Container>
    </section>
  );
}

function Banner({ photos }: { photos: string[] }) {
  const [left, right] = photos;
  return (
    <section aria-label="New collection" className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-ink">
      <div className="grid sm:grid-cols-2">
        <div aria-label="Banner photo" className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-[520px]">
          {left && (
            <Image
              src={left}
              alt="New collection look"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          )}
        </div>
        <div aria-label="Banner photo" className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-[520px]">
          {right && (
            <Image
              src={right}
              alt="New collection detail"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-8">
            <p className="max-w-[12ch] font-sans text-2xl leading-tight font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] sm:text-4xl">
              Be Brighter, Bolder, Louder!
            </p>
            <Link
              href="/catalog"
              className="inline-flex min-h-[42px] shrink-0 items-center bg-white px-5 font-sans text-sm font-semibold text-ink transition-all hover:bg-blush-soft active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Shop All
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function GiantWord() {
  return (
    <section aria-label="Jara" className="overflow-hidden border-b border-crimson">
      <h1 className="font-display text-[clamp(4.5rem,19vw,17rem)] leading-[0.9] tracking-tight whitespace-nowrap text-crimson uppercase text-center">
        Jara
      </h1>
      <div className="border-t border-crimson">
        <Container className="flex items-center justify-between py-2">
          <span className="font-sans text-xs font-semibold tracking-[0.14em] text-ink/70 uppercase">
            New Collection
          </span>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1 font-sans text-xs font-semibold tracking-[0.14em] text-ink uppercase hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
          >
            Shop
            <ArrowRight size={13} weight="bold" aria-hidden="true" />
          </Link>
        </Container>
      </div>
    </section>
  );
}

function EditorialCard({ item, large = false }: { item: ProductCardItem; large?: boolean }) {
  return (
    <Link
      href={`/product?id=${item.id}`}
      aria-label={item.title}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
    >
      <div className={`overflow-hidden bg-cloud ${large ? "aspect-[3/4]" : "aspect-[3/4]"}`}>
        <Image
          src={item.photoUrl}
          alt=""
          width={large ? 800 : 600}
          height={large ? 1067 : 800}
          sizes={large ? "(max-width: 1024px) 100vw, 40vw" : "(max-width: 640px) 50vw, 25vw"}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <p className="mt-2 truncate font-sans text-sm font-semibold text-ink">{item.title}</p>
      <p className="font-sans text-sm text-smoke tabular-nums">{formatNgn(item.priceNgn)}</p>
    </Link>
  );
}

function EditorialGrid({ items }: { items: ProductCardItem[] }) {
  const [lead, ...rest] = items;
  if (!lead) return null;
  return (
    <Container className="pt-8 sm:pt-12">
      <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 lg:grid-cols-3">
        <div className="col-span-2 lg:col-span-1 lg:row-span-2">
          <EditorialCard item={lead} large />
        </div>
        {rest.slice(0, 4).map((item) => (
          <EditorialCard key={item.id} item={item} />
        ))}
      </div>
    </Container>
  );
}

interface Tile {
  label: string;
  href: string;
  photo?: string;
  tone: "light" | "photo";
}

function Tiles({ tiles }: { tiles: Tile[] }) {
  return (
    <section aria-label="Shop by collection" className="mt-10 sm:mt-14">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => (
          <Link
            key={tile.label}
            href={tile.href}
            className={`group relative flex aspect-square flex-col items-center justify-center gap-2 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-inset ${
              tile.tone === "light" ? "bg-cloud" : "bg-ink"
            }`}
          >
            {tile.tone === "photo" && tile.photo && (
              <Image
                src={tile.photo}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
            )}
            <span
              className={`font-display text-3xl tracking-wide uppercase sm:text-4xl ${
                tile.tone === "light" ? "text-crimson" : "text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
              }`}
            >
              {tile.label}
            </span>
            <span
              className={`font-sans text-xs font-medium ${
                tile.tone === "light" ? "text-ink/60" : "text-white/80"
              }`}
            >
              Discover More
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BottomCta() {
  return (
    <section aria-label="Start shopping" className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-crimson">
      <Container className="flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:py-14">
        <p className="max-w-xl font-display text-3xl leading-tight tracking-wide text-white uppercase sm:text-4xl">
          Conquer the streets in style — start your shopping now!
        </p>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Link
            href="/catalog"
            className="inline-flex min-h-[42px] items-center justify-center bg-white px-6 font-sans text-sm font-semibold text-ink transition-all hover:bg-blush-soft active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Start shopping
          </Link>
          <Link
            href="/chat"
            className="inline-flex min-h-[42px] items-center justify-center px-6 font-sans text-sm font-semibold text-white ring-1 ring-white/50 ring-inset transition-all hover:bg-white/10 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Chat concierge
          </Link>
        </div>
      </Container>
    </section>
  );
}

function Landing() {
  const live = useQuery(api.listings.list, {});
  const listings = live ?? [];
  const bannerPhotos = listings.slice(0, 2).map((l) => l.photoUrl);
  const gridItems = listings.slice(0, 5).map(toCardItem);
  const photoFor = (occasion: string) => listings.find((l) => l.occasion === occasion)?.photoUrl;
  const tiles: Tile[] = [
    { label: "New arrivals", href: "/catalog", tone: "light" },
    { label: "Owambe", href: "/catalog?occasion=owambe", photo: photoFor("owambe"), tone: "photo" },
    { label: "Church", href: "/catalog?occasion=church", tone: "light" },
    { label: "Street", href: "/catalog?occasion=street", photo: photoFor("street"), tone: "photo" },
    { label: "Under ₦50k", href: "/catalog?budget=50000", tone: "light" },
    { label: "Dera's store", href: "/store", photo: "/dera/dera-01.jpg", tone: "photo" },
  ];

  return (
    <>
      <Banner photos={bannerPhotos} />
      <AskStrip />
      <GiantWord />
      {live === undefined ? (
        <Container className="pt-8">
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 lg:grid-cols-3" aria-label="Loading new arrivals" aria-busy="true">
            {[0, 1, 2, 3, 4, 5].map((skeleton) => (
              <ProductCardSkeleton key={skeleton} />
            ))}
          </div>
        </Container>
      ) : (
        <EditorialGrid items={gridItems} />
      )}
      <Tiles tiles={tiles} />
      <div className="mt-10 sm:mt-14">
        <BottomCta />
      </div>
    </>
  );
}

function StaticLanding() {
  const bannerPhotos = DERA_LISTINGS.slice(0, 2).map((l) => l.photoUrl);
  const gridItems = DERA_LISTINGS.slice(0, 5).map((l) => ({
    id: l.id,
    title: l.title,
    priceNgn: l.priceNgn,
    occasion: l.occasion,
    photoUrl: l.photoUrl,
  }));
  const photoFor = (occasion: string) => DERA_LISTINGS.find((l) => l.occasion === occasion)?.photoUrl;
  const tiles: Tile[] = [
    { label: "New arrivals", href: "/catalog", tone: "light" },
    { label: "Owambe", href: "/catalog?occasion=owambe", photo: photoFor("owambe"), tone: "photo" },
    { label: "Church", href: "/catalog?occasion=church", tone: "light" },
    { label: "Street", href: "/catalog?occasion=street", photo: photoFor("street"), tone: "photo" },
    { label: "Under ₦50k", href: "/catalog?budget=50000", tone: "light" },
    { label: "Dera's store", href: "/store", photo: "/dera/dera-01.jpg", tone: "photo" },
  ];
  return (
    <>
      <Banner photos={bannerPhotos} />
      <AskStrip />
      <GiantWord />
      <EditorialGrid items={gridItems} />
      <Tiles tiles={tiles} />
      <div className="mt-10 sm:mt-14">
        <BottomCta />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <main className="overflow-x-clip">
      {isConvexConfigured() ? <Landing /> : <StaticLanding />}
      <Container className="pb-4">
        <Text className="mt-10" tone="muted">
          Live catalog from {DERA_VENDOR.name} ({DERA_VENDOR.byline}) via Firecrawl. Sizes and fabrics to be confirmed by vendor.
        </Text>
      </Container>
    </main>
  );
}
