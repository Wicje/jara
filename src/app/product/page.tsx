"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "convex/react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { DERA_VENDOR } from "@/data/dera";
import { isConvexConfigured } from "../providers";
import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChipGroup } from "@/components/filter-chips";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";

function formatNgn(value: number): string {
  return `₦${value.toLocaleString("en-NG")}`;
}

function ProductDetail() {
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get("id") ?? "";
  const { addItem } = useCart();
  const [size, setSize] = useState("");
  const [added, setAdded] = useState(false);

  const listing = useQuery(api.listings.get, id ? { listingId: id as Id<"listings"> } : "skip");
  const vendor = useQuery(api.vendors.list, {});

  if (listing === undefined) {
    return (
      <div className="mt-6 animate-pulse" aria-label="Loading product" aria-busy="true">
        <div className="aspect-[3/4] w-full rounded-xl bg-neutral-200 sm:max-w-md" />
        <div className="mt-4 h-6 w-2/3 rounded bg-neutral-200" />
        <div className="mt-2 h-6 w-1/3 rounded bg-neutral-200" />
      </div>
    );
  }
  if (listing === null) {
    return (
      <Card variant="subtle" className="mt-6">
        <CardHeader>
          <CardTitle>Piece not found</CardTitle>
          <CardDescription>It may have sold out. Browse the catalog for similar pieces.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const vendorName = vendor?.[0]?.name ?? DERA_VENDOR.name;
  const chosenSize = size === "" ? listing.sizes[0] : size;
  const whatsappText = `Hi Dera! I want the ${listing.title} (${chosenSize}) I saw on Jara.`;

  function addToCart() {
    addItem({
      listingId: listing!._id,
      title: listing!.title,
      priceNgn: listing!.priceNgn,
      photoUrl: listing!.photoUrl,
      size: chosenSize,
    });
    setAdded(true);
  }

  return (
    <div className="mt-6 grid gap-8 lg:grid-cols-2">
      <div>
        <Image
          src={listing.photoUrl}
          alt={listing.title}
          width={900}
          height={1200}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="aspect-[3/4] w-full rounded-xl object-cover"
          priority
        />
      </div>
      <div>
        <div className="flex flex-wrap gap-2">
          <Badge color="brand" key="occasion">
            <span className="capitalize">For {listing.occasion}</span>
          </Badge>
          <Badge color="success" key="stock">
            In stock
          </Badge>
        </div>
        <Text as="h1" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {listing.title}
        </Text>
        <Text as="p" tone="accent" className="mt-2 text-2xl font-bold">
          {formatNgn(listing.priceNgn)}
        </Text>
        <Text className="mt-2" tone="muted">
          {listing.fabric} · Same-day delivery in Lagos
        </Text>

        <div className="mt-6">
          <ChipGroup
            label="Size"
            options={listing.sizes.map((s) => ({ value: s, label: s }))}
            current={chosenSize}
            onSelect={(value) => {
              setSize(value);
              setAdded(false);
            }}
          />
          <details className="mt-3">
            <summary className="cursor-pointer text-sm text-neutral-600 underline">Size guide</summary>
            <Text className="mt-2 text-sm" tone="muted">
              S fits like a UK 8 to 10. M fits 10 to 12. L fits 12 to 14. XL fits 14 to 16. Between sizes? Size up for
              owambe looks, or ask Dera about the fit on WhatsApp.
            </Text>
          </details>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          {added ? (
            <Button className="w-full sm:w-auto" variant="secondary" onClick={() => router.push("/cart")}>
              Added. View cart
            </Button>
          ) : (
            <Button className="w-full sm:w-auto" onClick={addToCart}>
              Add to cart
            </Button>
          )}
          <a
            href={`${DERA_VENDOR.whatsappLink}?text=${encodeURIComponent(whatsappText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-neutral-300 px-4 text-sm font-medium transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800 sm:w-auto"
          >
            <WhatsappLogo size={16} weight="bold" aria-hidden="true" />
            Ask Dera on WhatsApp
          </a>
        </div>

        <Text className="mt-6">
          Sold by{" "}
          <Link href="/store" className="font-medium text-amber-800 underline">
            {vendorName}
          </Link>
          . {DERA_VENDOR.byline} in Lagos.
        </Text>
        {added && (
          <Text className="mt-2" tone="success" role="status">
            In your cart. Keep browsing or head to checkout.
          </Text>
        )}
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <main>
      <Container className="pb-4">
        <Text className="pt-6 text-sm" tone="muted">
          <Link href="/catalog" className="underline">
            Catalog
          </Link>{" "}
          / Piece
        </Text>
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
