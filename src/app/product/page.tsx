"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { Clock, Globe, Package, ShoppingBag, Star, Truck, Wallet, WhatsappLogo } from "@phosphor-icons/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { DERA_VENDOR } from "@/data/dera";
import { isConvexConfigured } from "../providers";
import { useCart } from "@/components/cart-provider";
import { formatNgn } from "@/components/format";
import { summarizeRatings } from "@/lib/ratings";
import { Button, buttonClasses } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShareButton } from "@/components/share-button";
import { WishlistButton } from "@/components/product-card";
import { ProductCard } from "@/components/product-card";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";

function useCountdownToCutoff(): string | null {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const cutoff = new Date();
  cutoff.setHours(14, 0, 0, 0);
  const diff = cutoff.getTime() - now;
  if (diff <= 0) return null;
  const hours = Math.floor(diff / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function Stars({ value, size = 14 }: { value: number; size?: number }) {
  const full = Math.round(value);
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          weight="fill"
          aria-hidden="true"
          className={star <= full ? "text-star" : "text-line"}
        />
      ))}
    </span>
  );
}

function Reviews({ listingId }: { listingId: Id<"listings"> }) {
  const reviews = useQuery(api.reviews.forListing, { listingId });
  const addReview = useMutation(api.reviews.addReview);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);

  async function submit() {
    setNote("");
    setSending(true);
    try {
      await addReview({ listingId, name: name.trim(), rating, text: text.trim() });
      setName("");
      setText("");
      setRating(5);
      setNote("Thanks! Your review is live.");
    } catch (err) {
      setNote(err instanceof Error ? err.message : "Could not save your review.");
    } finally {
      setSending(false);
    }
  }

  const summary = summarizeRatings((reviews ?? []).map((r) => r.rating));

  return (
    <section aria-label="Rating and reviews" className="mt-12">
      <h2 className="font-sans text-xl font-bold text-ink sm:text-2xl">Rating &amp; Reviews</h2>
      {reviews === undefined ? (
        <div className="mt-4 animate-pulse" aria-label="Loading reviews" aria-busy="true">
          <div className="h-20 w-48 rounded bg-mist" />
        </div>
      ) : summary.count === 0 ? (
        <Card variant="panel" className="mt-4">
          <CardHeader>
            <CardTitle>No reviews yet</CardTitle>
            <CardDescription>Be the first to review this piece — shoppers read these.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="flex items-start gap-4">
            <div>
              <p className="font-sans text-6xl font-bold tracking-tight text-ink tabular-nums sm:text-7xl">
                {summary.average.toFixed(1).replace(".", ",")}
                <span className="text-2xl font-semibold text-smoke"> /5</span>
              </p>
              <p className="mt-1 font-sans text-sm text-smoke">({summary.count} Reviews)</p>
            </div>
            <ul className="grid flex-1 gap-1.5" aria-label="Rating breakdown">
              {summary.bars.map((barCount, index) => {
                const stars = 5 - index;
                const width = summary.count === 0 ? 0 : Math.round((barCount / summary.count) * 100);
                return (
                  <li key={stars} className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-smoke">
                      <Star size={12} weight="fill" aria-hidden="true" className="text-star" />
                      {stars}
                    </span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-mist" aria-hidden="true">
                      <span className="block h-full rounded-full bg-ink" style={{ width: `${width}%` }} />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2" aria-label="Customer reviews">
            {reviews.slice(0, 4).map((review) => (
              <li key={review._id} className="rounded-lg border border-line bg-white p-4">
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blush-soft font-display text-lg text-violet-deep"
                  >
                    {review.name.charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-sans text-sm font-semibold text-ink">{review.name}</p>
                    <Stars value={review.rating} size={12} />
                  </div>
                  <span className="shrink-0 font-sans text-xs text-smoke">
                    {new Date(review._creationTime).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className="mt-2.5 font-sans text-sm leading-6 text-ink/80">{review.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-6 rounded-lg border border-line bg-white p-4 sm:p-5">
        <h3 className="font-sans text-base font-bold text-ink">Write a review</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="reviewName">Your name</Label>
            <Input id="reviewName" value={name} onChange={(e) => setName(e.target.value)} placeholder="Adaeze" autoComplete="name" />
          </div>
          <div className="grid gap-1.5">
            <span id="reviewRatingLabel" className="font-sans text-sm font-semibold text-ink">Rating</span>
            <div className="flex items-center gap-1" role="radiogroup" aria-labelledby="reviewRatingLabel">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  role="radio"
                  aria-checked={rating === star}
                  aria-label={`${star} star${star > 1 ? "s" : ""}`}
                  onClick={() => setRating(star)}
                  className="rounded-full p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
                >
                  <Star size={22} weight="fill" aria-hidden="true" className={star <= rating ? "text-star" : "text-line"} />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3 grid gap-1.5">
          <Label htmlFor="reviewText">Review</Label>
          <textarea
            id="reviewText"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="How did it fit? How was delivery?"
            rows={3}
            className="w-full rounded-md border border-ink/20 bg-white px-4 py-3 font-sans text-sm text-ink placeholder:text-smoke/70 focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/40"
          />
        </div>
        {note !== "" && (
          <p className="mt-2 font-sans text-sm text-smoke" role="status">
            {note}
          </p>
        )}
        <Button className="mt-3" variant="black" loading={sending} onClick={() => void submit()}>
          Post review
        </Button>
      </div>
    </section>
  );
}

function ProductDetail() {
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get("id") ?? "";
  const { addItem } = useCart();
  const [size, setSize] = useState("");
  const [added, setAdded] = useState(false);
  const [thumb, setThumb] = useState(0);
  const countdown = useCountdownToCutoff();

  const listing = useQuery(api.listings.get, id ? { listingId: id as Id<"listings"> } : "skip");
  const vendors = useQuery(api.vendors.list, {});
  const allListings = useQuery(api.listings.list, {});
  const listingId = id ? (id as Id<"listings">) : null;

  if (listing === undefined) {
    return (
      <div className="mt-6 animate-pulse" aria-label="Loading product" aria-busy="true">
        <div className="aspect-[4/3] w-full rounded-xl bg-mist" />
        <div className="mt-4 h-6 w-2/3 rounded bg-mist" />
        <div className="mt-2 h-6 w-1/3 rounded bg-mist" />
      </div>
    );
  }
  if (listing === null) {
    return (
      <Card variant="panel" className="mt-6">
        <CardHeader>
          <CardTitle>Piece not found</CardTitle>
          <CardDescription>It may have sold out. Browse the catalog for similar pieces.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const currentListing = listing;
  const vendorName = vendors?.[0]?.name ?? DERA_VENDOR.name;
  const chosenSize = size === "" ? currentListing.sizes[0] : size;
  const whatsappText = `Hi Dera! I want the ${currentListing.title} (${chosenSize}) I saw on Jara.`;
  const stock = currentListing.stock;
  const soldOut = stock !== undefined && stock <= 0;
  const lowStock = stock !== undefined && stock > 0 && stock <= 3;
  const onSale = currentListing.compareAtNgn !== undefined && currentListing.compareAtNgn > currentListing.priceNgn;
  const related = (allListings ?? [])
    .filter((l) => l._id !== currentListing._id && l.occasion === currentListing.occasion)
    .slice(0, 4)
    .map((l) => ({
      id: l._id,
      title: l.title,
      priceNgn: l.priceNgn,
      compareAtNgn: l.compareAtNgn,
      stock: l.stock,
      occasion: l.occasion,
      photoUrl: l.photoUrl,
    }));

  function addToCart() {
    if (soldOut) return;
    addItem({
      listingId: currentListing._id,
      title: currentListing.title,
      priceNgn: currentListing.priceNgn,
      photoUrl: currentListing.photoUrl,
      size: chosenSize,
    });
    setAdded(true);
  }

  return (
    <>
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-xl bg-mist">
            <Image
              src={currentListing.photoUrl}
              alt={currentListing.title}
              width={900}
              height={675}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/3] w-full object-cover object-top"
              priority
            />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3" role="group" aria-label="Product photos">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                type="button"
                onClick={() => setThumb(index)}
                aria-pressed={thumb === index}
                aria-label={`View photo ${index + 1}`}
                className={`overflow-hidden rounded-lg bg-mist outline-none transition-all focus-visible:ring-2 focus-visible:ring-violet ${
                  thumb === index ? "ring-2 ring-ink" : "opacity-80 hover:opacity-100"
                }`}
              >
                <Image
                  src={currentListing.photoUrl}
                  alt=""
                  width={300}
                  height={225}
                  className="aspect-[4/3] w-full object-cover object-top"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="pb-24 lg:pb-0">
          <p className="font-sans text-xs font-semibold tracking-[0.08em] text-smoke uppercase">
            <span className="capitalize">{currentListing.occasion}</span> · Ready-made
          </p>
          <div className="mt-1 flex items-start justify-between gap-3">
            <h1 className="font-sans text-2xl leading-tight font-bold text-ink sm:text-3xl">
              {currentListing.title}
            </h1>
            <span className="flex shrink-0 items-center">
              <WishlistButton listingId={currentListing._id} title={currentListing.title} />
              <ShareButton title={currentListing.title} priceNgn={currentListing.priceNgn} listingId={currentListing._id} />
            </span>
          </div>
          <p className="mt-2 font-sans text-3xl font-bold tracking-tight text-ink tabular-nums">
            {formatNgn(currentListing.priceNgn)}{" "}
            {onSale && (
              <span className="text-lg font-semibold text-smoke line-through tabular-nums">
                {formatNgn(currentListing.compareAtNgn!)}
              </span>
            )}
          </p>
          {onSale && (
            <p className="mt-1 font-sans text-sm font-bold text-crimson">
              Save {formatNgn(currentListing.compareAtNgn! - currentListing.priceNgn)}
            </p>
          )}
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5 font-sans text-xs font-medium text-ink/80">
            <Clock size={14} aria-hidden="true" />
            {countdown
              ? `Order in ${countdown} to get same-day delivery`
              : "Order now for next-day delivery"}
          </p>
          <p className="mt-2 font-sans text-sm text-smoke" role="status">
            {soldOut ? "Sold out" : lowStock ? `Only ${stock} left in stock` : "In stock"} · {currentListing.fabric}
          </p>

          <div className="mt-6">
            <p id="pdp-size-label" className="font-sans text-sm font-semibold text-ink">
              Select Size <span className="font-normal text-smoke">({chosenSize})</span>
            </p>
            <div className="mt-2 flex flex-wrap gap-2" role="group" aria-labelledby="pdp-size-label">
              {currentListing.sizes.map((option) => {
                const selected = option === chosenSize;
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      setSize(option);
                      setAdded(false);
                    }}
                    className={`min-h-[42px] min-w-[52px] rounded-full px-4 font-sans text-sm font-semibold transition-all active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet ${
                      selected ? "bg-black text-white" : "bg-mist text-ink hover:bg-line"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 hidden gap-2 sm:flex">
            {soldOut ? (
              <Button variant="secondary" disabled className="flex-1">
                Sold out
              </Button>
            ) : added ? (
              <Button variant="secondary" onClick={() => router.push("/cart")} className="flex-1">
                Added. View cart
              </Button>
            ) : (
              <Button variant="black" onClick={addToCart} className="flex-1">
                <ShoppingBag size={17} weight="bold" aria-hidden="true" />
                Add to Cart
              </Button>
            )}
            <a
              href={`${DERA_VENDOR.whatsappLink}?text=${encodeURIComponent(whatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses({ variant: "secondary" })}
            >
              <WhatsappLogo size={16} weight="bold" aria-hidden="true" />
              Ask Dera
            </a>
          </div>

          <p className="mt-4 font-sans text-sm leading-6 text-ink/70">
            Sold by{" "}
            <Link href="/store" className="font-semibold text-violet-deep underline">
              {vendorName}
            </Link>
            . {DERA_VENDOR.byline} in Lagos.
          </p>
          {added && (
            <p className="mt-2 font-sans text-sm font-semibold text-green-800" role="status">
              In your cart. Keep browsing or head to checkout.
            </p>
          )}

          <div className="mt-6 grid gap-3">
            <details className="rounded-lg border border-line bg-white px-4 py-3" open>
              <summary className="cursor-pointer font-sans text-sm font-bold text-ink">
                Description &amp; Fit
              </summary>
              <p className="mt-2 font-sans text-sm leading-6 text-ink/70">
                {currentListing.title} in {currentListing.fabric}, made ready-to-wear for{" "}
                {currentListing.occasion} occasions. S fits like a UK 8 to 10. M fits 10 to 12. L
                fits 12 to 14. XL fits 14 to 16. Between sizes? Size up for owambe looks.
              </p>
            </details>
            <details className="rounded-lg border border-line bg-white px-4 py-3">
              <summary className="cursor-pointer font-sans text-sm font-bold text-ink">
                Shipping
              </summary>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {[
                  { Icon: Truck, title: "Same-day Lagos", detail: "Order by 2pm, Mon–Sat" },
                  { Icon: Wallet, title: "Transfer on confirm", detail: "Or pay on pickup" },
                  { Icon: Package, title: "Pickup · Free", detail: "Boutique pickup in Lagos" },
                  { Icon: Globe, title: "Nationwide 2–4 days", detail: "From ₦4,500" },
                ].map(({ Icon, title, detail }) => (
                  <li key={title} className="flex items-start gap-2 rounded-md bg-mist p-2.5">
                    <Icon size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-ink" />
                    <span>
                      <span className="block font-sans text-xs font-bold text-ink">{title}</span>
                      <span className="block font-sans text-xs text-smoke">{detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
          {soldOut ? (
            <Button className="w-full" size="lg" variant="secondary" disabled>
              Sold out
            </Button>
          ) : added ? (
            <Button className="w-full" size="lg" variant="secondary" onClick={() => router.push("/cart")}>
              Added. View cart
            </Button>
          ) : (
            <Button className="w-full" size="lg" variant="black" onClick={addToCart}>
              <ShoppingBag size={17} weight="bold" aria-hidden="true" />
              Add to Cart · {formatNgn(currentListing.priceNgn)}
            </Button>
          )}
        </div>
      </div>

      {listingId && <Reviews listingId={listingId} />}

      {related.length > 0 && (
        <section aria-label="You might also like" className="mt-12">
          <h2 className="text-center font-sans text-2xl font-bold text-ink sm:text-3xl">
            You might also like
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 lg:grid-cols-4" aria-label="Related pieces">
            {related.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export default function ProductPage() {
  return (
    <main>
      <Container className="pt-6 pb-4">
        <nav aria-label="Breadcrumb" className="font-sans text-sm text-smoke">
          <Link href="/" className="underline">
            Home
          </Link>{" "}
          / Product details
        </nav>
        {isConvexConfigured() ? (
          <Suspense fallback={<Text className="mt-6">Loading piece…</Text>}>
            <ProductDetail />
          </Suspense>
        ) : (
          <Text className="mt-6">Connect the Convex backend to view this piece.</Text>
        )}
      </Container>
    </main>
  );
}
