"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart } from "@phosphor-icons/react";
import { formatNgn } from "./format";
import { isWishlisted, toggleWishlist } from "@/lib/shopper";
import { ShareButton } from "./share-button";
import { Badge } from "./ui/badge";

export interface ProductCardItem {
  id: string;
  title: string;
  priceNgn: number;
  compareAtNgn?: number;
  stock?: number;
  occasion: string;
  photoUrl: string;
}

export function ProductCardSkeleton() {
  return (
    <div>
      <div className="aspect-[3/4] w-full animate-pulse rounded-lg bg-mist" />
      <div className="mt-2.5 grid gap-1.5">
        <div className="h-3 w-1/4 animate-pulse rounded bg-mist" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-mist" />
        <div className="h-5 w-1/3 animate-pulse rounded bg-mist" />
      </div>
    </div>
  );
}

export function WishlistButton({ listingId, title }: { listingId: string; title: string }) {
  const [saved, setSaved] = useState(() => isWishlisted(listingId));
  return (
    <button
      type="button"
      onClick={() => setSaved(toggleWishlist(listingId).includes(listingId))}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${title} from wishlist` : `Save ${title} to wishlist`}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full text-smoke transition-colors hover:bg-mist hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
    >
      <Heart size={17} weight={saved ? "fill" : "regular"} aria-hidden="true" className={saved ? "text-violet" : undefined} />
    </button>
  );
}

export function ProductCard({ item }: { item: ProductCardItem }) {
  const href = `/product?id=${item.id}`;
  const soldOut = item.stock !== undefined && item.stock <= 0;
  const onSale = item.compareAtNgn !== undefined && item.compareAtNgn > item.priceNgn;
  return (
    <li className="list-none">
      <div className="relative">
        <Link
          href={href}
          aria-label={item.title}
          className="block overflow-hidden rounded-lg bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
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
        {soldOut && (
          <span className="absolute top-2 left-2 rounded-full bg-ink px-2.5 py-0.5 font-sans text-xs font-semibold text-white">
            Sold out
          </span>
        )}
        {onSale && !soldOut && (
          <span className="absolute top-2 left-2">
            <Badge color="blush">Save {formatNgn(item.compareAtNgn! - item.priceNgn)}</Badge>
          </span>
        )}
      </div>
      <div className="pt-2.5">
        <p className="font-sans text-[11px] font-bold tracking-[0.14em] text-smoke uppercase">{item.occasion}</p>
        <Link href={href} className="mt-0.5 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet">
          <h3 className="font-sans text-sm leading-snug font-semibold text-ink hover:underline sm:text-[15px]">
            {item.title}
          </h3>
        </Link>
        <p className="mt-1 font-display text-lg tracking-wide text-violet-deep tabular-nums">
          {formatNgn(item.priceNgn)}{" "}
          {onSale && (
            <span className="font-sans text-sm font-normal text-smoke line-through tabular-nums">
              {formatNgn(item.compareAtNgn!)}
            </span>
          )}
        </p>
        <div className="mt-0.5 flex items-center">
          <WishlistButton listingId={item.id} title={item.title} />
          <ShareButton title={item.title} priceNgn={item.priceNgn} listingId={item.id} />
        </div>
      </div>
    </li>
  );
}
