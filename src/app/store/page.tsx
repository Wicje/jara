"use client";

import Image from "next/image";
import { useQuery } from "convex/react";
import { InstagramLogo, WhatsappLogo } from "@phosphor-icons/react";
import { api } from "../../../convex/_generated/api";
import { DERA_VENDOR } from "@/data/dera";
import { isConvexConfigured } from "../providers";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";

function Storefront() {
  const live = useQuery(api.listings.list, {});
  const items = (live ?? []).map((l) => ({
    id: l._id,
    title: l.title,
    priceNgn: l.priceNgn,
    compareAtNgn: l.compareAtNgn,
    stock: l.stock,
    occasion: l.occasion,
    photoUrl: l.photoUrl,
    photoUrls: l.photoUrls,
  }));

  return (
    <>
      <section aria-label="About the store" className="brand-glow overflow-hidden rounded-lg text-white">
        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-10">
          <Image
            src="/dera/dera-01.jpg"
            alt="Style in Lagos boutique"
            width={240}
            height={240}
            className="h-24 w-24 shrink-0 rounded-full object-cover ring-2 ring-blush sm:h-32 sm:w-32"
          />
          <div>
            <p className="font-sans text-xs font-bold tracking-[0.2em] text-blush uppercase">
              {DERA_VENDOR.byline} · {DERA_VENDOR.area}
            </p>
            <h1 className="mt-2 font-display text-4xl tracking-wide uppercase sm:text-6xl">{DERA_VENDOR.name}</h1>
            <p className="mt-3 max-w-xl font-sans text-base leading-7 text-white/80">
              New arrivals daily. Same-day delivery in Lagos, nationwide and international delivery on request. Every
              piece below is in stock now{live === undefined ? "" : `, all ${items.length} of them`}.
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <a
                href={DERA_VENDOR.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: "accent" })}
              >
                <WhatsappLogo size={16} weight="bold" aria-hidden="true" />
                WhatsApp {DERA_VENDOR.whatsapp}
              </a>
              <a
                href={DERA_VENDOR.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-[32px] px-5 font-sans text-sm font-semibold text-white ring-1 ring-white/40 ring-inset transition-all hover:bg-white/10 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush"
              >
                <InstagramLogo size={16} aria-hidden="true" />
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="All pieces" className="mt-12">
        <h2 className="font-display text-3xl tracking-wide text-ink uppercase sm:text-4xl">All pieces</h2>
        {live === undefined ? (
          <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 lg:grid-cols-3" aria-label="Loading pieces" aria-busy="true">
            {[0, 1, 2, 3, 4, 5].map((skeleton) => (
              <ProductCardSkeleton key={skeleton} />
            ))}
          </div>
        ) : (
          <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 lg:grid-cols-3" aria-label="Products">
            {items.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default function StorePage() {
  return (
    <main>
      <Container className="pt-4 pb-4 sm:pt-6">
        {isConvexConfigured() ? (
          <Storefront />
        ) : (
          <Text className="mt-6">Connect the Convex backend to view the store.</Text>
        )}
      </Container>
    </main>
  );
}
