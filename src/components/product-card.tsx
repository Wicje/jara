"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardMedia, CardTitle } from "./ui/card";
import { Text } from "./ui/text";

export interface ProductCardItem {
  id: string;
  title: string;
  priceNgn: number;
  occasion: string;
  photoUrl: string;
}

function formatNgn(value: number): string {
  return `₦${value.toLocaleString("en-NG")}`;
}

export function ProductCard({ item }: { item: ProductCardItem }) {
  return (
    <Card role="listitem" className="flex h-full flex-col p-3 sm:p-6">
      <Link href={`/product?id=${item.id}`} aria-label={item.title} className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800">
        <CardMedia>
          <Image
            src={item.photoUrl}
            alt={item.title}
            width={600}
            height={800}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
            className="aspect-[3/4] w-full object-cover transition-transform duration-200 hover:scale-[1.02]"
            loading="lazy"
          />
        </CardMedia>
      </Link>
      <CardHeader className="mb-0 flex-1">
        <Link href={`/product?id=${item.id}`} className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800">
          <CardTitle className="text-base sm:text-lg">{item.title}</CardTitle>
        </Link>
        <Text as="p" tone="accent" className="mt-1 text-base font-bold sm:text-lg">
          {formatNgn(item.priceNgn)}
        </Text>
        <CardDescription className="capitalize">For {item.occasion}</CardDescription>
      </CardHeader>
    </Card>
  );
}
