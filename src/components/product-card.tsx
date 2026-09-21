"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { formatNgn } from "./format";
import { isWishlisted, toggleWishlist } from "@/lib/shopper";
import { Badge } from "./ui/badge";

export interface ProductCardItem {
  id: string;
  title: string;
  priceNgn: number;
  compareAtNgn?: number;
  stock?: number;
  occasion: string;
  photoUrl: string;
  photoUrls?: string[];
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
      <motion.span
        key={String(saved)}
        initial={{ scale: 0.4 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
        className="inline-flex"
      >
        <Heart size={17} weight={saved ? "fill" : "regular"} aria-hidden="true" className={saved ? "text-violet" : undefined} />
      </motion.span>
    </button>
  );
}

export function ProductCard({ item }: { item: ProductCardItem }) {
  const href = `/product?id=${item.id}`;
  const soldOut = item.stock !== undefined && item.stock <= 0;
  const onSale = item.compareAtNgn !== undefined && item.compareAtNgn > item.priceNgn;
  const hoverPhoto = item.photoUrls?.find((url) => url !== item.photoUrl);
  return (
    <li className="list-none">
      <div className="relative">
        <Link
          href={href}
          aria-label={item.title}
          className="group block overflow-hidden rounded-lg bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
        >
          <Image
            src={item.photoUrl}
            alt=""
            width={600}
            height={800}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
            className={`aspect-[3/4] w-full object-cover transition-all duration-300 group-hover:scale-[1.03] ${
              hoverPhoto ? "group-hover:opacity-0" : ""
            }`}
            loading="lazy"
          />
          {hoverPhoto && (
            <Image
              src={hoverPhoto}
              alt=""
              aria-hidden="true"
              width={600}
              height={800}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              className="absolute inset-0 aspect-[3/4] w-full scale-[1.03] object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
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
      </div>
    </li>
  );
}
