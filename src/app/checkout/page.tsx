"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { DERA_VENDOR } from "@/data/dera";
import { isConvexConfigured } from "../providers";
import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";

function formatNgn(value: number): string {
  return `₦${value.toLocaleString("en-NG")}`;
}

function Checkout() {
  const { items, totalNgn, clear } = useCart();
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [orderError, setOrderError] = useState("");
  const [placing, setPlacing] = useState(false);
  const place = useMutation(api.orders.place);
  const router = useRouter();

  async function submitCheckout() {
    setOrderError("");
    setPlacing(true);
    try {
      const groupId = crypto.randomUUID();
      for (const item of items) {
        await place({
          listingId: item.listingId as Id<"listings">,
          size: item.size,
          buyerName: buyerName.trim(),
          buyerPhone: buyerPhone.trim(),
          groupId,
        });
      }
      clear();
      router.push(`/order?group=${groupId}`);
    } catch (err) {
      setOrderError(err instanceof Error ? err.message : "Checkout failed. Nothing was charged.");
    } finally {
      setPlacing(false);
    }
  }

  if (items.length === 0) {
    return (
      <Card variant="subtle" className="mt-6">
        <CardHeader>
          <CardTitle>Nothing to check out</CardTitle>
          <CardDescription>Your cart is empty. Add a piece first.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => router.push("/catalog")}>Browse catalog</Button>
        </CardFooter>
      </Card>
    );
  }

  const ready = buyerName.trim() !== "" && buyerPhone.trim() !== "";

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Order summary</CardTitle>
          <CardDescription>
            {items.length} {items.length === 1 ? "piece" : "pieces"} from {DERA_VENDOR.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2">
            {items.map((item) => (
              <li key={`${item.listingId}-${item.size}`} className="flex items-baseline justify-between gap-3 text-sm">
                <span className="min-w-0 truncate text-neutral-800">
                  {item.title} <span className="text-neutral-500">(Size {item.size})</span>
                </span>
                <span className="shrink-0 font-semibold text-neutral-900">{formatNgn(item.priceNgn)}</span>
              </li>
            ))}
          </ul>
          <Text as="p" className="mt-4 border-t border-neutral-200 pt-3 text-lg font-bold">
            Total {formatNgn(totalNgn)}
          </Text>
          <Text className="mt-2 text-sm" tone="muted">
            Pay on confirmation. Dera confirms by WhatsApp, then you transfer or pay on pickup.
          </Text>
        </CardContent>
      </Card>

      <Card variant="subtle">
        <CardHeader>
          <CardTitle>Your details</CardTitle>
          <CardDescription>Dera uses this to confirm your order and arrange delivery.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label htmlFor="buyerName">Your name</Label>
              <Input id="buyerName" name="buyerName" autoComplete="name" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} placeholder="Adaeze" />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="buyerPhone">Phone / WhatsApp</Label>
              <Input id="buyerPhone" name="buyerPhone" autoComplete="tel" value={buyerPhone} onChange={(e) => setBuyerPhone(e.target.value)} placeholder="0803..." />
            </div>
            <Text className="text-sm" tone="muted">
              Same-day delivery in Lagos. Nationwide and international delivery available.
            </Text>
            {orderError !== "" && (
              <Text tone="error" role="alert">
                {orderError}
              </Text>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button size="lg" className="w-full" disabled={!ready} loading={placing} onClick={() => void submitCheckout()}>
            Send order to Dera
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <main>
      <Container className="pb-4">
        <Text as="h1" className="pt-10 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Checkout
        </Text>
        {isConvexConfigured() ? (
          <Checkout />
        ) : (
          <Text className="mt-6">Connect the Convex backend to check out.</Text>
        )}
      </Container>
    </main>
  );
}
