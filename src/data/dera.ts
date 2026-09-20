export interface SeedListing {
  id: string;
  title: string;
  priceNgn: number;
  sizes: string[];
  fabric: string;
  occasion: string;
  photoUrl: string;
  sourceUrl?: string;
}

export const DERA_VENDOR = {
  name: "Style in Lagos",
  byline: "Dera's boutique",
  area: "Lagos",
  instagramUrl: "https://www.instagram.com/styleinlagosss",
  website: "https://www.styleinlagos.ng/",
  whatsapp: "08091003832",
  whatsappLink: "https://wa.me/2348091003832",
};

// Real catalog data crawled from styleinlagos.ng via Firecrawl (2026-09-20).
// Fabric/occasion/sizes are heuristics — vendor to confirm.
export const DERA_LISTINGS: SeedListing[] = [
  { id: "dera-01", title: "Amina Blue 3pc Skirt Set", priceNgn: 96000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "street", photoUrl: "/dera/dera-01.jpg", sourceUrl: "https://www.styleinlagos.ng/product/amina-blue-3pc-skirt-set/" },
  { id: "dera-02", title: "Penelope White Dress", priceNgn: 78000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_3607.jpg", sourceUrl: "https://www.styleinlagos.ng/product/penelope-white-dress/" },
  { id: "dera-03", title: "Hailey Yellow Shorts Set", priceNgn: 65000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "street", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/07/IMG_2445.png", sourceUrl: "https://www.styleinlagos.ng/product/hailey-yellow-shorts-set/" },
  { id: "dera-04", title: "Ada Dress", priceNgn: 153000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_5310.jpg", sourceUrl: "https://www.styleinlagos.ng/product/ada-dress/" },
  { id: "dera-05", title: "Eni Blue Striped Dress Set", priceNgn: 85000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "/dera/dera-02.jpg", sourceUrl: "https://www.styleinlagos.ng/product/eni-blue-striped-dress-set/" },
  { id: "dera-06", title: "Amayah Burgundy Dress", priceNgn: 76000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_5230.jpg", sourceUrl: "https://www.styleinlagos.ng/product/amayah-burgundy-dress/" },
  { id: "dera-07", title: "Hailey White Skirt Set", priceNgn: 43000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "street", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_5131.jpg", sourceUrl: "https://www.styleinlagos.ng/product/hailey-white-skirt-set/" },
  { id: "dera-08", title: "Ella Polkadot Dress", priceNgn: 56500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_5127.jpg", sourceUrl: "https://www.styleinlagos.ng/product/ella-polkadot-dress/" },
  { id: "dera-09", title: "Amanda Green Dress", priceNgn: 75000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_5130.png", sourceUrl: "https://www.styleinlagos.ng/product/amanda-green-dress/" },
  { id: "dera-10", title: "Isabella Wine Frill Dress", priceNgn: 76000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_5006.png", sourceUrl: "https://www.styleinlagos.ng/product/isabella-wine-frill-dress/" },
  { id: "dera-11", title: "Tyla Burnt Orange Dress", priceNgn: 69500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_4924.png", sourceUrl: "https://www.styleinlagos.ng/product/tyla-burnt-orange-dress/" },
  { id: "dera-12", title: "Maya Brown Dress", priceNgn: 65000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_4922.png", sourceUrl: "https://www.styleinlagos.ng/product/maya-brown-dress/" },
  { id: "dera-13", title: "Mabel Black Dress", priceNgn: 75000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_4867.jpg", sourceUrl: "https://www.styleinlagos.ng/product/mabel-black-dress/" },
  { id: "dera-14", title: "Zoey Short Set", priceNgn: 49500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "street", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_4645.jpg", sourceUrl: "https://www.styleinlagos.ng/product/zoey-short-set/" },
  { id: "dera-15", title: "Sasha Gold Sequin Dress", priceNgn: 62000, sizes: ["S", "M", "L", "XL"], fabric: "sequin", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_4643.png", sourceUrl: "https://www.styleinlagos.ng/product/sasha-gold-sequin-dress/" },
  { id: "dera-16", title: "Ife Red Top", priceNgn: 36500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_4641.jpg", sourceUrl: "https://www.styleinlagos.ng/product/ife-red-top/" },
  { id: "dera-17", title: "Florence White Dress", priceNgn: 69800, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_4467.jpg", sourceUrl: "https://www.styleinlagos.ng/product/florence-white-dress/" },
  { id: "dera-18", title: "Loreen Jumpsuit", priceNgn: 40000, sizes: ["S", "M", "L", "XL"], fabric: "crepe", occasion: "street", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_4463.jpg", sourceUrl: "https://www.styleinlagos.ng/product/loreen-jumpsuit-2/" },
  { id: "dera-19", title: "Louisa Floral Dress", priceNgn: 59500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_4465-1.jpg", sourceUrl: "https://www.styleinlagos.ng/product/louisa-floral-dress/" },
];
