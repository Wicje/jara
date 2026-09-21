"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "convex/react";
import { CheckCircle, Copy, WhatsappLogo } from "@phosphor-icons/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { DERA_VENDOR } from "@/data/dera";
import { CONFIRMATION_SLA } from "@/data/delivery";
import { isConvexConfigured } from "../providers";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { formatNgn } from "@/components/format";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";

function ReceiptActions({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${text} ${window.location.href}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <button type="button" onClick={() => void copyLink()} className={buttonClasses({ variant: "secondary" })}>
        <Copy size={16} aria-hidden="true" />
        {copied ? "Link copied" : "Copy receipt link"}
      </button>
      <a
        href={`${DERA_VENDOR.whatsappLink}?text=${encodeURIComponent(`${text} ${typeof window !== "undefined" ? window.location.href : ""}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses({ variant: "secondary" })}
      >
        <WhatsappLogo size={16} weight="bold" aria-hidden="true" />
        Send receipt to my WhatsApp
      </a>
    </>
  );
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
      <Card variant="panel" className="mt-6">
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
      <section aria-label="Receipt" className="mt-6 overflow-hidden rounded-lg border border-line bg-white">
        <div className="flex items-start gap-3 p-5 sm:p-8">
          <CheckCircle size={36} weight="fill" className="shrink-0 text-violet" aria-hidden="true" />
          <div>
            <h1 className="font-display text-4xl tracking-wide text-ink uppercase sm:text-5xl">Order sent</h1>
            <p className="mt-2 max-w-md font-sans text-base leading-7 text-ink/70">
              Thanks {buyer}. {CONFIRMATION_SLA}
            </p>
            <p className="mt-3 font-display text-2xl tracking-wide text-violet-deep tabular-nums">
              {entries.length} {entries.length === 1 ? "piece" : "pieces"} · {formatNgn(total)}
            </p>
          </div>
        </div>
      </section>

      <section aria-label="What happens next" className="mt-8">
        <h2 className="font-display text-2xl tracking-wide text-ink uppercase sm:text-3xl">What happens next</h2>
        <ol className="mt-3 grid gap-2">
          {[
            "Dera confirms your sizes by WhatsApp.",
            `Transfer ${formatNgn(total)} to confirm, or pay on pickup.`,
            "Same-day delivery in Lagos. Nationwide on request.",
          ].map((step, index) => (
            <li key={step} className="flex items-center gap-3 rounded-md border border-line bg-white p-3 sm:p-4">
              <Badge color="violet" key={`step-${index}`}>
                {index + 1}
              </Badge>
              <span className="font-sans text-sm text-ink/90 sm:text-base">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-label="Live updates" className="mt-8">
        <h2 className="font-display text-2xl tracking-wide text-ink uppercase sm:text-3xl">Live updates</h2>
        <div className="mt-3 grid gap-2" aria-live="polite">
          {entries.map(({ order, listing, events }) => (
            <details key={order._id} className="rounded-md border border-line bg-white px-3 py-2 sm:px-4" open>
              <summary className="cursor-pointer font-sans text-sm font-semibold text-ink">
                {listing?.title ?? "Piece"} (Size {order.size}) · {order.status.replace(/_/g, " ")}
              </summary>
              <div className="mt-2 grid gap-1">
                {events.map((event) => (
                  <p key={event._id} className="font-sans text-sm leading-6 text-smoke">
                    {event.direction === "out" ? "To vendor" : "From vendor"}: {event.body}
                  </p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <a
          href={`${DERA_VENDOR.whatsappLink}?text=${encodeURIComponent(whatsappText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses({ variant: "primary" })}
        >
          <WhatsappLogo size={16} weight="bold" aria-hidden="true" />
          Follow up on WhatsApp
        </a>
        <Link
          href="/catalog"
          className={buttonClasses({ variant: "secondary" })}
        >
          Keep shopping
        </Link>
        <ReceiptActions
          text={`My Jara order: ${entries.length} ${entries.length === 1 ? "piece" : "pieces"}, ${formatNgn(total)}`}
        />
      </div>
    </>
  );
}

export default function OrderPage() {
  return (
    <main>
      <Container className="pt-8 pb-4 sm:pt-10">
        {isConvexConfigured() ? (
          <Suspense fallback={<Text className="mt-6">Loading your receipt…</Text>}>
            <Confirmation />
          </Suspense>
        ) : (
          <Text className="mt-6">Connect the Convex backend to view orders.</Text>
        )}
      </Container>
    </main>
  );
}
