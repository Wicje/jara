"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { DERA_LISTINGS, DERA_VENDOR } from "@/data/dera";
import { matchReasons, parseNaturalQuery, recommendListings, type ConciergeFilter } from "@/lib/concierge";
import { isConvexConfigured } from "./providers";
import { Button } from "@/components/ui/button";
import { ChipGroup, BUDGET_OPTIONS, OCCASION_OPTIONS, SIZE_OPTIONS } from "@/components/filter-chips";
import { StickyOrderBar } from "@/components/sticky-order-bar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardMedia, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";

function formatNgn(value: number): string {
  return `₦${value.toLocaleString("en-NG")}`;
}

interface CatalogItem {
  key: string;
  listingId?: Id<"listings">;
  title: string;
  priceNgn: number;
  sizes: string[];
  fabric: string;
  occasion: string;
  photoUrl: string;
  sourceUrl?: string;
}

function activeFilter(occasion: string, budget: string, size: string): ConciergeFilter {
  const maxBudgetNgn = budget.trim() === "" ? undefined : Number(budget);
  return {
    occasion: occasion.trim() === "" ? undefined : occasion.trim().toLowerCase(),
    maxBudgetNgn: maxBudgetNgn !== undefined && Number.isFinite(maxBudgetNgn) ? maxBudgetNgn : undefined,
    size: size.trim() === "" ? undefined : size,
  };
}

function matchesFilter(
  listing: { occasion: string; priceNgn: number; sizes: string[] },
  filter: ConciergeFilter,
): boolean {
  if (filter.occasion && listing.occasion !== filter.occasion) return false;
  if (filter.maxBudgetNgn !== undefined && listing.priceNgn > filter.maxBudgetNgn) return false;
  const size = filter.size?.trim().toUpperCase();
  if (size && !listing.sizes.map((s) => s.toUpperCase()).includes(size)) return false;
  return true;
}

const STATUS_STYLES: Record<string, string> = {
  placed: "bg-amber-100 text-amber-900",
  sent_to_vendor: "bg-blue-100 text-blue-900",
  confirmed: "bg-green-100 text-green-900",
  ready: "bg-green-100 text-green-900",
};

function StatusPill({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? "bg-neutral-100 text-neutral-800";
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${style}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

function resetFilter(): { occasion: string; budget: string; size: string } {
  return { occasion: "owambe", budget: "100000", size: "M" };
}

function StaticCatalog() {
  const defaults = resetFilter();
  const [occasion, setOccasion] = useState(defaults.occasion);
  const [budget, setBudget] = useState(defaults.budget);
  const [size, setSize] = useState(defaults.size);
  const [query, setQuery] = useState("");
  const filter = activeFilter(occasion, budget, size);
  const results = recommendListings(filter);
  const items: CatalogItem[] = (results.length > 0 ? results : DERA_LISTINGS.slice(0, 3)).map((l) => ({
    key: l.id,
    title: l.title,
    priceNgn: l.priceNgn,
    sizes: l.sizes,
    fabric: l.fabric,
    occasion: l.occasion,
    photoUrl: l.photoUrl,
    sourceUrl: l.sourceUrl,
  }));
  return (
    <CatalogView
      query={query}
      occasion={occasion}
      budget={budget}
      size={size}
      onQuery={setQuery}
      onOccasion={setOccasion}
      onBudget={setBudget}
      onSize={setSize}
      items={items}
      filter={filter}
    />
  );
}

function LiveCatalog() {
  const defaults = resetFilter();
  const [occasion, setOccasion] = useState(defaults.occasion);
  const [budget, setBudget] = useState(defaults.budget);
  const [size, setSize] = useState(defaults.size);
  const [query, setQuery] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [activeId, setActiveId] = useState<Id<"listings"> | null>(null);
  const [placedId, setPlacedId] = useState<Id<"orders"> | null>(null);
  const [orderError, setOrderError] = useState("");
  const [notifyNote, setNotifyNote] = useState("");
  const orderRef = useRef<HTMLDivElement>(null);

  const live = useQuery(api.listings.list, {});
  const stats = useQuery(api.stats.overview);
  const place = useMutation(api.orders.place);
  const notify = useAction(api.email.notifyVendor);
  const placed = useQuery(api.orders.get, placedId ? { orderId: placedId } : "skip");

  const filter = activeFilter(occasion, budget, size);
  const items = useMemo<CatalogItem[]>(() => {
    const source = live ?? [];
    return source
      .filter((l) => matchesFilter(l, filter))
      .slice(0, 6)
      .map((l) => ({
        key: l._id,
        listingId: l._id,
        title: l.title,
        priceNgn: l.priceNgn,
        sizes: l.sizes,
        fabric: l.fabric,
        occasion: l.occasion,
        photoUrl: l.photoUrl,
        sourceUrl: l.sourceUrl,
      }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live, occasion, budget, size]);

  const activeItem = items.find((i) => i.listingId === activeId) ?? null;

  function chooseItem(item: CatalogItem) {
    setActiveId(item.listingId ?? null);
    orderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function submitOrder() {
    if (!activeItem?.listingId) return;
    setOrderError("");
    setNotifyNote("");
    try {
      const orderId = await place({
        listingId: activeItem.listingId,
        size: size.trim() === "" ? activeItem.sizes[0] : size.trim(),
        buyerName: buyerName.trim(),
        buyerPhone: buyerPhone.trim(),
      });
      setPlacedId(orderId);
      const result = await notify({ orderId });
      setNotifyNote(result.note);
    } catch (err) {
      setOrderError(err instanceof Error ? err.message : "Order failed");
    }
  }

  const whatsappText = activeItem
    ? `Hi Dera! I want the ${activeItem.title} (${size.trim() === "" ? activeItem.sizes[0] : size.trim()}) I saw on Jara.`
    : "Hi Dera! I found you through Jara.";

  return (
    <>
      <CatalogView
        query={query}
        occasion={occasion}
        budget={budget}
        size={size}
        onQuery={setQuery}
        onOccasion={setOccasion}
        onBudget={setBudget}
        onSize={setSize}
        items={live === undefined ? [] : items}
        filter={filter}
        loading={live === undefined}
        onOrder={chooseItem}
      />
      <div ref={orderRef} className="scroll-mt-6">
        <Card variant="subtle" className="mt-6">
          <CardHeader>
            <CardTitle>{activeItem ? `Order: ${activeItem.title}` : "Place an order"}</CardTitle>
            <CardDescription>
              {activeItem
                ? `${formatNgn(activeItem.priceNgn)} · pick your size below, Dera confirms by email.`
                : "Pick a piece above, add your name + phone. Dera confirms by email — you get a live timeline."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1">
                <Label htmlFor="buyerName">Your name</Label>
                <Input id="buyerName" name="buyerName" autoComplete="name" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} placeholder="Adaeze" />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="buyerPhone">Phone / WhatsApp</Label>
                <Input id="buyerPhone" name="buyerPhone" autoComplete="tel" value={buyerPhone} onChange={(e) => setBuyerPhone(e.target.value)} placeholder="0803..." />
              </div>
            </div>
            {orderError !== "" && (
              <Text className="mt-3" tone="error" role="alert">
                {orderError}
              </Text>
            )}
            {notifyNote !== "" && (
              <Text className="mt-3" tone="success" role="status">
                Vendor email: {notifyNote}
              </Text>
            )}
            {placed !== undefined && placed !== null && (
              <div className="mt-4 grid gap-2" aria-live="polite">
                <div className="flex items-center gap-2">
                  <Text as="h4">Order timeline</Text>
                  <StatusPill status={placed.order.status} />
                </div>
                {placed.events.map((event) => (
                  <details key={event._id} className="rounded-lg border border-neutral-200 bg-white px-3 py-2">
                    <summary className="cursor-pointer text-sm font-medium">
                      {event.direction === "out" ? "→ To vendor" : "← From vendor"}
                      {event.subject ? ` — ${event.subject}` : ""}
                    </summary>
                    <Text as="span" className="mt-1 block">{event.body}</Text>
                  </details>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex-col items-stretch sm:flex-row sm:items-center">
            <Button
              className="w-full sm:w-auto"
              disabled={activeItem === null || buyerName.trim() === "" || buyerPhone.trim() === ""}
              onClick={() => void submitOrder()}
            >
              Confirm order{activeItem ? ` — ${formatNgn(activeItem.priceNgn)}` : ""}
            </Button>
            <a
              href={`${DERA_VENDOR.whatsappLink}?text=${encodeURIComponent(whatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-neutral-300 px-4 text-sm font-medium transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 sm:w-auto"
            >
              Chat Dera on WhatsApp
            </a>
          </CardFooter>
        </Card>
      </div>
      <Text className="mt-6" tone="muted">
        {stats ? `${stats.pieces} pieces live · ${stats.orders} orders placed · ` : ""}Same-day delivery in Lagos ·{" "}
        <Link href="/vendor" className="underline">
          Sell on Jara
        </Link>
      </Text>
      {activeItem && (
        <>
          <div className="h-20" aria-hidden="true" />
          <StickyOrderBar
            title={activeItem.title}
            priceNgn={activeItem.priceNgn}
            onContinue={() => orderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
          />
        </>
      )}
    </>
  );
}

function CatalogView(props: {
  query: string;
  occasion: string;
  budget: string;
  size: string;
  onQuery: (v: string) => void;
  onOccasion: (v: string) => void;
  onBudget: (v: string) => void;
  onSize: (v: string) => void;
  items: CatalogItem[];
  filter: ConciergeFilter;
  live?: boolean;
  loading?: boolean;
  onOrder?: (item: CatalogItem) => void;
}) {
  function askJara() {
    const parsed = parseNaturalQuery(props.query);
    if (parsed.occasion !== undefined) props.onOccasion(parsed.occasion);
    if (parsed.maxBudgetNgn !== undefined) props.onBudget(String(parsed.maxBudgetNgn));
    if (parsed.size !== undefined) props.onSize(parsed.size);
  }

  function resetAll() {
    const defaults = resetFilter();
    props.onQuery("");
    props.onOccasion(defaults.occasion);
    props.onBudget(defaults.budget);
    props.onSize(defaults.size);
  }

  return (
    <>
      <div className="mt-6 grid gap-3">
        <ChipGroup label="Occasion" options={OCCASION_OPTIONS} current={props.occasion} onSelect={props.onOccasion} />
        <div className="grid grid-cols-2 gap-3">
          <ChipGroup label="Size" options={SIZE_OPTIONS} current={props.size} onSelect={props.onSize} />
          <ChipGroup label="Budget" options={BUDGET_OPTIONS} current={props.budget} onSelect={props.onBudget} />
        </div>
      </div>
      <form
        className="mt-4 flex flex-col gap-2 sm:flex-row"
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
          value={props.query}
          onChange={(e) => props.onQuery(e.target.value)}
          placeholder="Try: owambe dress under 100k, size M"
          aria-label="Describe what you're looking for"
          className="h-12 text-base"
        />
        <Button type="submit" size="lg" className="bg-amber-800 hover:bg-amber-700 focus-visible:ring-amber-800">
          Ask Jara
        </Button>
      </form>

      <details className="mt-3">
        <summary className="cursor-pointer text-sm text-neutral-600 underline">Fine-tune filters</summary>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          <div className="grid gap-1">
            <Label htmlFor="occasion">Occasion</Label>
            <Input id="occasion" name="occasion" value={props.occasion} onChange={(e) => props.onOccasion(e.target.value)} placeholder="owambe" />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="budget">Max budget NGN</Label>
            <Input id="budget" name="budget" inputMode="numeric" value={props.budget} onChange={(e) => props.onBudget(e.target.value)} placeholder="100000" />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="size">Size</Label>
            <Input id="size" name="size" value={props.size} onChange={(e) => props.onSize(e.target.value)} placeholder="M" />
          </div>
        </div>
      </details>

      {props.loading ? (
        <Text className="mt-8">Loading live catalog…</Text>
      ) : props.items.length === 0 ? (
        <Card variant="subtle" className="mt-8">
          <CardHeader>
            <CardTitle>Nothing matches — yet</CardTitle>
            <CardDescription>No pieces fit that combination. Loosen the budget or clear the size to see more.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" onClick={resetAll}>
              Reset to owambe · 100k · M
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3" role="list">
          {props.items.map((listing) => {
            const reasons = matchReasons(listing, props.filter);
            return (
              <Card key={listing.key} role="listitem" className="flex flex-col p-3 sm:p-6">
                <CardMedia>
                  <Image
                    src={listing.photoUrl}
                    alt={listing.title}
                    width={600}
                    height={800}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    className="aspect-[3/4] w-full object-cover"
                  />
                </CardMedia>
                <CardHeader className="mb-2">
                  <CardTitle className="text-base sm:text-lg">{listing.title}</CardTitle>
                  <Text as="p" tone="accent" className="mt-1 text-base font-bold sm:text-lg">
                    {formatNgn(listing.priceNgn)}
                  </Text>
                  <CardDescription className="hidden sm:block">
                    Sizes {listing.sizes.join(", ")} · In stock · {listing.occasion}
                  </CardDescription>
                  <CardDescription className="sm:hidden">In stock</CardDescription>
                </CardHeader>
                <CardContent className="hidden flex-1 sm:block">
                  {reasons.length > 0 && (
                    <ul className="grid gap-1">
                      {reasons.map((reason) => (
                        <li key={reason} className="text-sm text-neutral-600">
                          ✓ {reason}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
                <CardFooter>
                  {props.onOrder ? (
                    <Button className="w-full bg-amber-800 hover:bg-amber-700 focus-visible:ring-amber-800" onClick={() => props.onOrder?.(listing)}>
                      Order this piece
                    </Button>
                  ) : (
                    <Text as="span" tone="muted">
                      From {DERA_VENDOR.name} · {DERA_VENDOR.area}
                    </Text>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}

export default function Home() {
  return (
    <main>
      <Container className="py-10">
      <Text as="h1" className="font-serif text-5xl sm:text-6xl">
        Jara
      </Text>
      <Text className="mt-3 max-w-xl text-lg">
        Jara means extra value. Tell us the occasion, your budget, and your size — we match you with real pieces
        from {DERA_VENDOR.name}, {DERA_VENDOR.byline} in Lagos.
      </Text>
      {isConvexConfigured() ? <LiveCatalog /> : <StaticCatalog />}
      <Text className="mt-6" tone="muted">
        Live catalog from styleinlagos.ng via Firecrawl. Sizes and fabrics to be confirmed by vendor.
      </Text>
      </Container>
    </main>
  );
}
