"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { isConvexConfigured } from "../providers";
import { getWishlist } from "@/lib/shopper";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";

function Wishlist() {
  const [ids] = useState<string[]>(() => getWishlist());
  const live = useQuery(api.listings.list, {});

  if (live === undefined) {
    return (
      <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 lg:grid-cols-3" aria-label="Loading wishlist" aria-busy="true">
        {[0, 1, 2, 3, 4, 5].map((skeleton) => (
          <ProductCardSkeleton key={skeleton} />
        ))}
      </div>
    );
  }
  const items = live
    .filter((l) => ids.includes(l._id))
    .map((l) => ({
      id: l._id,
      title: l.title,
      priceNgn: l.priceNgn,
      compareAtNgn: l.compareAtNgn,
      stock: l.stock,
      occasion: l.occasion,
      photoUrl: l.photoUrl,
    }));

  if (items.length === 0) {
    return (
      <Card variant="panel" className="mt-6">
        <CardHeader>
          <CardTitle>No saves yet</CardTitle>
          <CardDescription>Tap the heart on any piece to keep it here for later.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href="/catalog" className="font-sans text-sm font-semibold text-violet-deep underline">
            Browse the catalog
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 lg:grid-cols-3" aria-label="Wishlist">
      {items.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </ul>
  );
}

export default function WishlistPage() {
  return (
    <main>
      <Container className="pt-8 pb-4 sm:pt-10">
        <p className="font-sans text-xs font-bold tracking-[0.2em] text-violet uppercase">Saved pieces</p>
        <h1 className="mt-2 font-display text-4xl tracking-wide text-ink uppercase sm:text-5xl">Wishlist</h1>
        {isConvexConfigured() ? (
          <Suspense fallback={<Text className="mt-6">Loading your wishlist…</Text>}>
            <Wishlist />
          </Suspense>
        ) : (
          <Text className="mt-6">Connect the Convex backend to view your wishlist.</Text>
        )}
        <div className="mt-6">
          <Button variant="secondary" onClick={() => window.history.back()}>
            Back
          </Button>
        </div>
      </Container>
    </main>
  );
}
