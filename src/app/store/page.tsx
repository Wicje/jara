"use client";

import Image from "next/image";
import { useQuery } from "convex/react";
import { InstagramLogo, WhatsappLogo } from "@phosphor-icons/react";
import { api } from "../../../convex/_generated/api";
import { DERA_VENDOR } from "@/data/dera";
import { isConvexConfigured } from "../providers";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";
import { ProductCard } from "@/components/product-card";

function Storefront() {
  const live = useQuery(api.listings.list, {});
  const items = (live ?? []).map((l) => ({
    id: l._id,
    title: l.title,
    priceNgn: l.priceNgn,
    occasion: l.occasion,
    photoUrl: l.photoUrl,
  }));

  return (
    <>
      <section aria-label="About the store" className="pt-10">
        <div className="flex items-center gap-4">
          <Image
            src="/dera/dera-01.jpg"
            alt="Style in Lagos boutique"
            width={160}
            height={160}
            className="h-20 w-20 rounded-full object-cover"
          />
          <div>
            <Text as="h1" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              {DERA_VENDOR.name}
            </Text>
            <Text tone="muted">
              {DERA_VENDOR.byline} · {DERA_VENDOR.area} · {live === undefined ? "" : `${items.length} pieces`}
            </Text>
          </div>
        </div>
        <Text className="mt-4 max-w-xl">
          New arrivals daily. Same-day delivery in Lagos, nationwide and international delivery on request. Every piece
          below is in stock now.
        </Text>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <a
            href={DERA_VENDOR.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-amber-800 px-4 text-sm font-medium text-white transition-colors hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800 sm:w-auto"
          >
            <WhatsappLogo size={16} weight="bold" aria-hidden="true" />
            WhatsApp {DERA_VENDOR.whatsapp}
          </a>
          <a
            href={DERA_VENDOR.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-neutral-300 px-4 text-sm font-medium transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 sm:w-auto"
          >
            <InstagramLogo size={16} aria-hidden="true" />
            Instagram
          </a>
        </div>
      </section>

      <section aria-label="All pieces" className="mt-10">
        <Text as="h2">All pieces</Text>
        {live === undefined ? (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3" aria-label="Loading pieces" aria-busy="true">
            {[0, 1, 2, 3, 4, 5].map((skeleton) => (
              <div key={skeleton} className="rounded-xl border border-neutral-200 bg-white p-3 sm:p-6">
                <div className="aspect-[3/4] w-full animate-pulse rounded-lg bg-neutral-200" />
                <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-neutral-200" />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3" role="list" aria-label="Products">
            {items.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default function StorePage() {
  return (
    <main>
      <Container className="pb-4">
        {isConvexConfigured() ? (
          <Storefront />
        ) : (
          <Text className="mt-6">Connect the Convex backend to view the store.</Text>
        )}
      </Container>
    </main>
  );
}
