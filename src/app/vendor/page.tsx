"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery } from "convex/react";
import { WarningCircle } from "@phosphor-icons/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { isConvexConfigured } from "../providers";
import { ImporterCard } from "@/components/importer-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";

function VendorAlerts() {
  const vendors = useQuery(api.vendors.list, {});
  const vendor = vendors?.[0];
  if (vendor === undefined) return null;
  if (vendor.email) return null;
  return (
    <div className="mt-6 flex items-start gap-3 rounded-lg border border-red-800/30 bg-red-50 p-4" role="alert">
      <WarningCircle size={22} weight="fill" className="shrink-0 text-red-800" aria-hidden="true" />
      <div>
        <p className="font-sans text-sm font-bold text-ink">Orders are queuing, not sending</p>
        <p className="mt-1 font-sans text-sm leading-6 text-ink/70">
          {vendor.name} has no email on file, so order emails pile up as queued timeline events. Add the vendor email to
          the vendor record to send for real.
        </p>
      </div>
    </div>
  );
}

function VendorOrders() {
  const vendors = useQuery(api.vendors.list, {});
  const vendorId = vendors?.[0]?._id;
  const [pin, setPin] = useState("");
  const [attemptedPin, setAttemptedPin] = useState<string | null>(null);
  const pinCheck = useQuery(api.orders.checkPin, attemptedPin !== null ? { pin: attemptedPin } : "skip");
  const unlockedPin = pinCheck === true ? attemptedPin : null;
  const pinError = pinCheck === false ? "Wrong PIN. Try again." : "";
  const orders = useQuery(
    api.orders.listByVendor,
    vendorId && unlockedPin !== null ? { vendorId: vendorId as Id<"vendors">, pin: unlockedPin } : "skip",
  );

  function unlock() {
    setAttemptedPin(pin);
  }

  return (
    <section aria-label="Vendor orders" className="mt-10">
      <h2 className="font-display text-3xl tracking-wide text-ink uppercase sm:text-4xl">Orders</h2>
      {unlockedPin === null ? (
        <Card className="mt-4 max-w-md">
          <CardHeader>
            <CardTitle>Vendor sign-in</CardTitle>
            <CardDescription>Enter your vendor PIN to see orders. Ask the Jara team for your PIN.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Label htmlFor="vendorPin">Vendor PIN</Label>
              <Input
                id="vendorPin"
                name="vendorPin"
                type="password"
                autoComplete="current-password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
              />
              {pinError !== "" && (
                <Text tone="error" role="alert">
                  {pinError}
                </Text>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={unlock} disabled={pin === ""} loading={attemptedPin !== null && pinCheck === undefined}>
              View orders
            </Button>
          </CardFooter>
        </Card>
      ) : orders === undefined ? (
        <Text className="mt-4">Loading orders…</Text>
      ) : orders.length === 0 ? (
        <Text className="mt-4">No orders yet. Share your store link to get the first one.</Text>
      ) : (
        <ul className="mt-4 grid gap-2" aria-label="Order list">
          {orders.map((order) => (
            <li key={order._id} className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-line bg-white p-3 sm:p-4">
              <span className="font-sans text-sm font-semibold text-ink">{order.buyerName}</span>
              <span className="font-sans text-sm text-smoke">{order.buyerPhone}</span>
              <span className="font-sans text-sm text-smoke">Size {order.size}</span>
              <Badge color={order.status === "flagged" ? "blush" : order.status === "confirmed" ? "success" : "ink"}>
                {order.status.replace(/_/g, " ")}
              </Badge>
              <span className="ml-auto font-sans text-xs text-smoke">
                {new Date(order._creationTime).toLocaleString("en-NG")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function VendorPage() {
  return (
    <main>
      <Container className="pt-8 pb-4 sm:pt-10">
        <p className="font-sans text-xs font-bold tracking-[0.2em] text-violet uppercase">For sellers</p>
        <h1 className="mt-2 font-display text-4xl tracking-wide text-ink uppercase sm:text-5xl">Sell on Jara</h1>
        <Text className="mt-3 max-w-xl">
          Paste your store link and Firecrawl turns it into draft listings. Approve them and shoppers can order by email.
        </Text>
        {isConvexConfigured() ? (
          <>
            <VendorAlerts />
            <VendorOrders />
          </>
        ) : null}
        <ImporterCard />
        <Text className="mt-6">
          <Link href="/" className="underline">Back to the market</Link>
        </Text>
      </Container>
    </main>
  );
}
