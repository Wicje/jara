"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash } from "@phosphor-icons/react";
import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";

function formatNgn(value: number): string {
  return `₦${value.toLocaleString("en-NG")}`;
}

export default function CartPage() {
  const { items, totalNgn, removeItem } = useCart();
  const router = useRouter();

  return (
    <main>
      <Container className="pb-4">
        <Text as="h1" className="pt-10 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Your cart
        </Text>
        {items.length === 0 ? (
          <Card variant="subtle" className="mt-6">
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
                <li key={`${item.listingId}-${item.size}`}>
                  <Card className="p-3 sm:p-4">
                    <div className="flex gap-4">
                      <Link
                        href={`/product?id=${item.listingId}`}
                        aria-label={item.title}
                        className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800"
                      >
                        <Image
                          src={item.photoUrl}
                          alt=""
                          width={160}
                          height={213}
                          className="h-24 w-18 rounded-lg object-cover sm:h-28 sm:w-21"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link href={`/product?id=${item.listingId}`} className="hover:underline">
                          <Text as="h3" className="truncate text-base">
                            {item.title}
                          </Text>
                        </Link>
                        <Text className="mt-0.5 text-sm" tone="muted">
                          Size {item.size}
                        </Text>
                        <Text as="p" tone="accent" className="mt-1 font-bold">
                          {formatNgn(item.priceNgn)}
                        </Text>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        ariaLabel={`Remove ${item.title} size ${item.size}`}
                        onClick={() => removeItem(item.listingId, item.size)}
                      >
                        <Trash size={16} aria-hidden="true" />
                        Remove
                      </Button>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <Text as="p" className="text-lg font-bold">
                Total {formatNgn(totalNgn)}
              </Text>
              <Button size="lg" className="w-full sm:w-auto" onClick={() => router.push("/checkout")}>
                Checkout
              </Button>
            </div>
          </>
        )}
      </Container>
    </main>
  );
}
