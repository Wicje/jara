"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash } from "@phosphor-icons/react";
import { useCart } from "@/components/cart-provider";
import { formatNgn } from "@/components/format";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export default function CartPage() {
  const { items, totalNgn, removeItem } = useCart();
  const router = useRouter();

  return (
    <main>
      <Container className="pt-8 pb-4 sm:pt-10">
        <p className="font-sans text-xs font-bold tracking-[0.2em] text-violet uppercase">Your bag</p>
        <h1 className="mt-2 font-display text-4xl tracking-wide text-ink uppercase sm:text-5xl">
          Cart{items.length > 0 ? ` (${items.length})` : ""}
        </h1>
        {items.length === 0 ? (
          <Card variant="panel" className="mt-6">
            <CardHeader>
              <CardTitle>Cart is empty</CardTitle>
              <CardDescription>Beautiful pieces are waiting. Start with this week&apos;s arrivals.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => router.push("/catalog")}>Browse catalog</Button>
            </CardFooter>
          </Card>
        ) : (
          <>
            <ul className="mt-6 grid gap-3">
              {items.map((item) => (
                <li key={`${item.listingId}-${item.size}`} className="flex gap-4 rounded-md border border-line bg-white p-3">
                  <Link
                    href={`/product?id=${item.listingId}`}
                    aria-label={item.title}
                    className="shrink-0 overflow-hidden rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
                  >
                    <Image
                      src={item.photoUrl}
                      alt=""
                      width={160}
                      height={213}
                      className="h-24 w-[4.5rem] object-cover sm:h-28 sm:w-[5.25rem]"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link href={`/product?id=${item.listingId}`} className="hover:underline">
                      <h2 className="truncate font-sans text-[15px] font-semibold text-ink">{item.title}</h2>
                    </Link>
                    <p className="mt-0.5 font-sans text-sm text-smoke">Size {item.size}</p>
                    <p className="mt-1 font-display text-lg tracking-wide text-violet-deep tabular-nums">
                      {formatNgn(item.priceNgn)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.listingId, item.size)}
                    aria-label={`Remove ${item.title} size ${item.size}`}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center self-start rounded-full text-smoke transition-colors hover:bg-mist hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
                  >
                    <Trash size={17} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="sticky bottom-4 mt-6 flex flex-col gap-3 rounded-lg border border-line bg-ink p-4 text-paper sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <p className="font-display text-2xl tracking-wide tabular-nums">
                Total {formatNgn(totalNgn)}
              </p>
              <Button size="lg" variant="accent" className="w-full sm:w-auto" onClick={() => router.push("/checkout")}>
                Checkout
              </Button>
            </div>
          </>
        )}
      </Container>
    </main>
  );
}
