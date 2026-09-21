"use client";

import Image from "next/image";
import Link from "next/link";
import { formatNgn } from "./format";

export interface ProductCardItem {
  id: string;
  title: string;
  priceNgn: number;
  occasion: string;
  photoUrl: string;
}

export function ProductCardSkeleton() {
  return (
    <div>
      <div className="aspect-[3/4] w-full animate-pulse rounded-md bg-cream" />
      <div className="mt-2.5 grid gap-1.5">
        <div className="h-3 w-1/4 animate-pulse rounded bg-cream" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-cream" />
        <div className="h-5 w-1/3 animate-pulse rounded bg-cream" />
      </div>
    </div>
  );
}

export function ProductCard({ item }: { item: ProductCardItem }) {
  const href = `/product?id=${item.id}`;
  return (
    <li className="list-none">
      <Link
        href={href}
        aria-label={item.title}
        className="block overflow-hidden rounded-md bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <Image
          src={item.photoUrl}
          alt=""
          width={600}
          height={800}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
          className="aspect-[3/4] w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
          loading="lazy"
        />
      </Link>
      <div className="pt-2.5">
        <p className="font-sans text-[11px] font-bold tracking-[0.14em] text-smoke uppercase">{item.occasion}</p>
        <Link href={href} className="mt-0.5 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
          <h3 className="font-sans text-sm leading-snug font-semibold text-ink hover:underline sm:text-[15px]">
            {item.title}
          </h3>
        </Link>
        <p className="mt-1 font-display text-lg tracking-wide text-palm tabular-nums">{formatNgn(item.priceNgn)}</p>
      </div>
    </li>
  );
}
