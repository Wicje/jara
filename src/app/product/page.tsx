"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "convex/react";
import { ShoppingBag, WhatsappLogo } from "@phosphor-icons/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { DERA_VENDOR } from "@/data/dera";
import { isConvexConfigured } from "../providers";
import { useCart } from "@/components/cart-provider";
import { formatNgn } from "@/components/format";
import { Button, buttonClasses } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChipGroup } from "@/components/filter-chips";
import { ShareButton } from "@/components/share-button";
import { WishlistButton } from "@/components/product-card";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";

function ProductDetail() {
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get("id") ?? "";
  const { addItem } = useCart();
  const [size, setSize] = useState("");
  const [added, setAdded] = useState(false);

  const listing = useQuery(api.listings.get, id ? { listingId: id as Id<"listings"> } : "skip");
  const vendors = useQuery(api.vendors.list, {});

  if (listing === undefined) {
    return (
      <div className="mt-6 animate-pulse" aria-label="Loading product" aria-busy="true">
        <div className="aspect-[3/4] w-full rounded-md bg-mist sm:max-w-md" />
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

  function addToCart() {
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
    <div className="mt-6 grid gap-8 lg:grid-cols-2">
      <div className="overflow-hidden rounded-lg bg-blush-soft">
        <Image
          src={currentListing.photoUrl}
          alt={currentListing.title}
          width={900}
          height={1200}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="aspect-[3/4] w-full object-cover"
          priority
        />
      </div>
      <div className="pb-24 lg:pb-0">
        <div className="flex flex-wrap items-center gap-2">
          <Badge color="violet">
            <span className="capitalize">For {currentListing.occasion}</span>
          </Badge>
          {soldOut ? (
            <Badge color="ink">Sold out</Badge>
          ) : lowStock ? (
            <Badge color="blush">Only {stock} left</Badge>
          ) : (
            <Badge color="success">In stock</Badge>
          )}
          {onSale && <Badge color="blush">Save {formatNgn(currentListing.compareAtNgn! - currentListing.priceNgn)}</Badge>}
          <span className="ml-auto flex items-center">
            <WishlistButton listingId={currentListing._id} title={currentListing.title} />
            <ShareButton title={currentListing.title} priceNgn={currentListing.priceNgn} listingId={currentListing._id} />
          </span>
        </div>
        <h1 className="mt-3 font-sans text-2xl leading-tight font-bold text-ink sm:text-3xl">{currentListing.title}</h1>
        <p className="mt-2 font-display text-4xl tracking-wide text-violet-deep tabular-nums">
          {formatNgn(currentListing.priceNgn)}{" "}
          {onSale && (
            <span className="font-sans text-xl font-normal text-smoke line-through tabular-nums">
              {formatNgn(currentListing.compareAtNgn!)}
            </span>
          )}
        </p>
        <p className="mt-2 font-sans text-sm text-smoke">
          {currentListing.fabric} · Same-day delivery in Lagos
        </p>

        <div className="mt-6">
          <ChipGroup
            label="Size"
            options={currentListing.sizes.map((s) => ({ value: s, label: s }))}
            current={chosenSize}
            onSelect={(value) => {
              setSize(value);
              setAdded(false);
            }}
          />
          <details className="mt-3">
            <summary className="cursor-pointer font-sans text-sm text-ink underline">Size guide</summary>
            <p className="mt-2 font-sans text-sm leading-6 text-smoke">
              S fits like a UK 8 to 10. M fits 10 to 12. L fits 12 to 14. XL fits 14 to 16. Between sizes? Size up for
              owambe looks, or ask Dera about the fit on WhatsApp.
            </p>
          </details>
        </div>

        <div className="mt-6 hidden flex-col gap-2 sm:flex-row lg:flex">
          {soldOut ? (
            <Button variant="secondary" disabled>
              Sold out
            </Button>
          ) : added ? (
            <Button variant="secondary" onClick={() => router.push("/cart")}>
              Added. View cart
            </Button>
          ) : (
            <Button onClick={addToCart}>
              <ShoppingBag size={17} weight="bold" aria-hidden="true" />
              Add to cart
            </Button>
          )}
          <a
            href={`${DERA_VENDOR.whatsappLink}?text=${encodeURIComponent(whatsappText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ variant: "secondary" })}
          >
            <WhatsappLogo size={16} weight="bold" aria-hidden="true" />
            Ask Dera on WhatsApp
          </a>
        </div>

        <p className="mt-6 font-sans text-sm leading-6 text-ink/80">
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
          <Button className="w-full" size="lg" onClick={addToCart}>
            <ShoppingBag size={17} weight="bold" aria-hidden="true" />
            Add to cart · {formatNgn(currentListing.priceNgn)}
          </Button>
        )}
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <main>
      <Container className="pt-6 pb-4">
        <nav aria-label="Breadcrumb" className="font-sans text-sm text-smoke">
          <Link href="/catalog" className="underline">
            Catalog
          </Link>{" "}
          / Piece
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
