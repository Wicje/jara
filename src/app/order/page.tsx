"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "convex/react";
import { CheckCircle } from "@phosphor-icons/react";
import { api } from "../../../convex/_generated/api";
import { DERA_VENDOR } from "@/data/dera";
import { isConvexConfigured } from "../providers";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";

function formatNgn(value: number): string {
  return `₦${value.toLocaleString("en-NG")}`;
}

function Confirmation() {
  const params = useSearchParams();
  const group = params.get("group") ?? "";
  const entries = useQuery(api.orders.byGroup, group ? { groupId: group } : "skip");

  if (entries === undefined) {
    return <Text className="mt-6">Loading your receipt…</Text>;
  }
  if (entries.length === 0) {
    return (
      <Card variant="subtle" className="mt-6">
        <CardHeader>
          <CardTitle>Order not found</CardTitle>
          <CardDescription>Check the link, or browse the catalog for something else.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const total = entries.reduce((sum, entry) => sum + (entry.listing?.priceNgn ?? 0), 0);
  const buyer = entries[0].order.buyerName;
  const whatsappText = `Hi Dera! I just ordered on Jara (${entries.length} pieces, ${formatNgn(total)}). My name is ${buyer}.`;

  return (
    <>
      <div className="mt-6 flex items-start gap-3">
        <CheckCircle size={32} weight="fill" className="shrink-0 text-green-700" aria-hidden="true" />
        <div>
          <Text as="h1" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Order sent
          </Text>
          <Text className="mt-2">
            Thanks {buyer}. Dera has your order and confirms by WhatsApp, usually within 2 hours.
          </Text>
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>
            {entries.length} {entries.length === 1 ? "piece" : "pieces"} · {formatNgn(total)}
          </CardTitle>
          <CardDescription>Keep this page. It updates live as Dera confirms.</CardDescription>
        </CardHeader>
      </Card>

      <section aria-label="What happens next" className="mt-6">
        <Text as="h2" className="text-xl">
          What happens next
        </Text>
        <ol className="mt-3 grid gap-2">
          {[
            "Dera confirms your sizes by WhatsApp.",
            `Transfer ${formatNgn(total)} to confirm, or pay on pickup.`,
            "Same-day delivery in Lagos. Nationwide on request.",
          ].map((step, index) => (
            <li key={step} className="flex gap-3 rounded-xl border border-neutral-200 bg-white p-3 sm:p-4">
              <Badge color="brand" key={`step-${index}`}>
                {index + 1}
              </Badge>
              <Text className="text-sm sm:text-base">{step}</Text>
            </li>
          ))}
        </ol>
      </section>

      <section aria-label="Live updates" className="mt-6">
        <Text as="h2" className="text-xl">
          Live updates
        </Text>
        <div className="mt-3 grid gap-2" aria-live="polite">
          {entries.map(({ order, listing, events }) => (
            <details key={order._id} className="rounded-xl border border-neutral-200 bg-white px-3 py-2 sm:px-4" open>
              <summary className="cursor-pointer text-sm font-medium">
                {listing?.title ?? "Piece"} (Size {order.size}) · {order.status.replace(/_/g, " ")}
              </summary>
              <div className="mt-2 grid gap-1">
                {events.map((event) => (
                  <Text as="span" key={event._id} className="block text-sm" tone="muted">
                    {event.direction === "out" ? "To vendor" : "From vendor"}: {event.body}
                  </Text>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <a
          href={`${DERA_VENDOR.whatsappLink}?text=${encodeURIComponent(whatsappText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-amber-800 px-4 text-sm font-medium text-white transition-colors hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800 sm:w-auto"
        >
          Follow up on WhatsApp
        </a>
        <Link
          href="/catalog"
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-neutral-300 px-4 text-sm font-medium transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 sm:w-auto"
        >
          Keep shopping
        </Link>
      </div>
    </>
  );
}

export default function OrderPage() {
  return (
    <main>
      <Container className="pb-4">
        {isConvexConfigured() ? (
          <Suspense fallback={<Text className="mt-6 pt-10">Loading your receipt…</Text>}>
            <Confirmation />
          </Suspense>
        ) : (
          <Text className="mt-6">Connect the Convex backend to view orders.</Text>
        )}
      </Container>
    </main>
  );
}
