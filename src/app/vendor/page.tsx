"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { ArrowClockwise, Check, DotsThreeVertical, Flag, WarningCircle } from "@phosphor-icons/react";
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

type VendorOrder = {
  _id: string;
  buyerName: string;
  buyerPhone: string;
  size: string;
  status: string;
  _creationTime: number;
};

const NEXT_STATUS: Record<string, string> = {
  placed: "confirmed",
  confirmed: "flagged",
  flagged: "placed",
};

function OrderRowMenu({
  order,
  pin,
  open,
  onOpen,
  onClose,
}: {
  order: VendorOrder;
  pin: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const setStatus = useMutation(api.orders.setStatus);
  const [error, setError] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) onClose();
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  async function change(status: string) {
    setError("");
    try {
      await setStatus({ orderId: order._id as Id<"orders">, status, pin });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update status.");
    }
  }

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        aria-label={`Actions for order by ${order.buyerName}`}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => (open ? onClose() : onOpen())}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-smoke transition-colors hover:bg-mist hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
      >
        <DotsThreeVertical size={18} weight="bold" aria-hidden="true" />
      </button>
      {open ? (
        <div
          role="menu"
          aria-label="Change order status"
          className="absolute right-0 z-30 w-52 origin-top-right animate-menu-pop rounded-[20px] border border-line bg-white p-1.5 shadow-[0_24px_48px_rgba(15,23,42,0.12)]"
        >
          <ul className="grid gap-0.5">
            {[
              { status: "confirmed", label: "Confirm order", Icon: Check },
              { status: "placed", label: "Back to placed", Icon: ArrowClockwise },
              { status: "flagged", label: "Flag for review", Icon: Flag },
            ].map(({ status, label, Icon }) => (
              <li key={status}>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => void change(status)}
                  className="flex h-10 w-full cursor-pointer items-center gap-2.5 rounded-[12px] px-2.5 text-left font-sans text-[13.5px] font-medium text-ink transition-colors outline-none hover:bg-mist focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-inset"
                >
                  <Icon size={16} aria-hidden="true" className="shrink-0 text-smoke" />
                  {label}
                  {order.status === status && (
                    <Check size={15} aria-hidden="true" className="ml-auto shrink-0 text-ink" />
                  )}
                </button>
              </li>
            ))}
          </ul>
          {error !== "" && (
            <p className="px-2.5 py-1 font-sans text-xs text-red-800" role="alert">
              {error}
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}

function OrderTable({ orders, pin }: { orders: VendorOrder[]; pin: string }) {
  const setStatus = useMutation(api.orders.setStatus);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  async function cycle(order: VendorOrder) {
    const next = NEXT_STATUS[order.status] ?? "placed";
    try {
      await setStatus({ orderId: order._id as Id<"orders">, status: next, pin });
    } catch {
      // Menu actions surface errors; the pill stays a fast path.
    }
  }

  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-line bg-white">
      <div className="hidden grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-3 border-b border-line bg-mist px-4 py-2.5 sm:grid" aria-hidden="true">
        {["Buyer", "Details", "Placed", "Status", ""].map((heading) => (
          <span key={heading} className="font-sans text-xs font-bold tracking-[0.14em] text-smoke uppercase">
            {heading}
          </span>
        ))}
      </div>
      <ul aria-label="Order list" className="divide-y divide-line">
        {orders.map((order) => (
          <li
            key={order._id}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 py-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_auto] sm:px-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span
                aria-hidden="true"
                className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-blush-soft font-display text-lg text-violet-deep"
              >
                {order.buyerName.charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="truncate font-sans text-sm font-semibold text-ink">{order.buyerName}</p>
                <p className="truncate font-sans text-xs text-smoke">{order.buyerPhone}</p>
              </div>
            </div>
            <div className="hidden min-w-0 sm:block">
              <p className="truncate font-sans text-sm text-ink">Size {order.size}</p>
            </div>
            <p className="hidden font-sans text-xs text-smoke sm:block">
              {new Date(order._creationTime).toLocaleString("en-NG", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <div className="hidden sm:block">
              <Badge color={order.status === "flagged" ? "blush" : order.status === "confirmed" ? "success" : "ink"}>
                {order.status.replace(/_/g, " ")}
              </Badge>
            </div>
            <div className="flex items-center gap-1 justify-self-end">
              <button
                type="button"
                onClick={() => void cycle(order)}
                title="Advance status"
                aria-label={`Advance status of order by ${order.buyerName}, currently ${order.status}`}
                className="inline-flex h-11 items-center rounded-full bg-mist px-3 font-sans text-xs font-semibold text-ink transition-all hover:bg-line active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet sm:hidden"
              >
                {order.status.replace(/_/g, " ")}
              </button>
              <OrderRowMenu
                order={order}
                pin={pin}
                open={openMenu === order._id}
                onOpen={() => setOpenMenu(order._id)}
                onClose={() => setOpenMenu(null)}
              />
            </div>
            <p className="col-span-2 font-sans text-xs text-smoke sm:hidden">
              Size {order.size} · {new Date(order._creationTime).toLocaleString("en-NG", { day: "numeric", month: "short" })}
            </p>
          </li>
        ))}
      </ul>
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
        <OrderTable orders={orders} pin={unlockedPin} />
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
