import { mutation } from "./_generated/server";

const SEED: Array<{
  title: string;
  priceNgn: number;
  sizes: string[];
  fabric: string;
  occasion: string;
  photoUrl: string;
  sourceUrl: string;
}> = [
  { title: "Amina Blue 3pc Skirt Set", priceNgn: 96000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "street", photoUrl: "/dera/dera-01.jpg", sourceUrl: "https://www.styleinlagos.ng/product/amina-blue-3pc-skirt-set/" },
  { title: "Penelope White Dress", priceNgn: 78000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_3607.jpg", sourceUrl: "https://www.styleinlagos.ng/product/penelope-white-dress/" },
  { title: "Hailey Yellow Shorts Set", priceNgn: 65000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "street", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/07/IMG_2445.png", sourceUrl: "https://www.styleinlagos.ng/product/hailey-yellow-shorts-set/" },
  { title: "Ada Dress", priceNgn: 153000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_5310.jpg", sourceUrl: "https://www.styleinlagos.ng/product/ada-dress/" },
  { title: "Eni Blue Striped Dress Set", priceNgn: 85000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "/dera/dera-02.jpg", sourceUrl: "https://www.styleinlagos.ng/product/eni-blue-striped-dress-set/" },
  { title: "Amayah Burgundy Dress", priceNgn: 76000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_5230.jpg", sourceUrl: "https://www.styleinlagos.ng/product/amayah-burgundy-dress/" },
  { title: "Hailey White Skirt Set", priceNgn: 43000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "street", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_5131.jpg", sourceUrl: "https://www.styleinlagos.ng/product/hailey-white-skirt-set/" },
  { title: "Ella Polkadot Dress", priceNgn: 56500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_5127.jpg", sourceUrl: "https://www.styleinlagos.ng/product/ella-polkadot-dress/" },
  { title: "Amanda Green Dress", priceNgn: 75000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_5130.png", sourceUrl: "https://www.styleinlagos.ng/product/amanda-green-dress/" },
  { title: "Isabella Wine Frill Dress", priceNgn: 76000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_5006.png", sourceUrl: "https://www.styleinlagos.ng/product/isabella-wine-frill-dress/" },
  { title: "Tyla Burnt Orange Dress", priceNgn: 69500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_4924.png", sourceUrl: "https://www.styleinlagos.ng/product/tyla-burnt-orange-dress/" },
  { title: "Maya Brown Dress", priceNgn: 65000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_4922.png", sourceUrl: "https://www.styleinlagos.ng/product/maya-brown-dress/" },
  { title: "Mabel Black Dress", priceNgn: 75000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_4867.jpg", sourceUrl: "https://www.styleinlagos.ng/product/mabel-black-dress/" },
  { title: "Zoey Short Set", priceNgn: 49500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "street", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_4645.jpg", sourceUrl: "https://www.styleinlagos.ng/product/zoey-short-set/" },
  { title: "Sasha Gold Sequin Dress", priceNgn: 62000, sizes: ["S", "M", "L", "XL"], fabric: "sequin", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_4643.png", sourceUrl: "https://www.styleinlagos.ng/product/sasha-gold-sequin-dress/" },
  { title: "Ife Red Top", priceNgn: 36500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_4641.jpg", sourceUrl: "https://www.styleinlagos.ng/product/ife-red-top/" },
  { title: "Florence White Dress", priceNgn: 69800, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_4467.jpg", sourceUrl: "https://www.styleinlagos.ng/product/florence-white-dress/" },
  { title: "Loreen Jumpsuit", priceNgn: 40000, sizes: ["S", "M", "L", "XL"], fabric: "crepe", occasion: "street", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_4463.jpg", sourceUrl: "https://www.styleinlagos.ng/product/loreen-jumpsuit-2/" },
  { title: "Louisa Floral Dress", priceNgn: 59500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_4465-1.jpg", sourceUrl: "https://www.styleinlagos.ng/product/louisa-floral-dress/" },
];

export const seedDera = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("vendors").order("desc").take(1);
    let vendorId = existing[0]?._id;
    if (vendorId === undefined) {
      vendorId = await ctx.db.insert("vendors", {
        name: "Dera's Store",
        area: "Lagos",
        instagramUrl: "https://www.instagram.com/styleinlagosss",
      });
    }
    const current = await ctx.db
      .query("listings")
      .withIndex("by_vendor", (q) => q.eq("vendorId", vendorId as NonNullable<typeof vendorId>))
      .take(1);
    if (current.length > 0) return { vendorId, seeded: 0 };
    for (const item of SEED) {
      await ctx.db.insert("listings", { vendorId, ...item, status: "active" });
    }
    return { vendorId, seeded: SEED.length };
  },
});

// Replaces the whole vendor catalog with Firecrawl-fed SEED data.
// Clears listings + orders + inboxEvents so no stale best-guess rows remain.
export const replaceCatalog = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("vendors").order("desc").take(1);
    const vendor = existing[0];
    if (vendor === undefined) throw new Error("No vendor — run seedDera first");
    const vendorId = vendor._id;
    const orders = await ctx.db
      .query("orders")
      .withIndex("by_vendor", (q) => q.eq("vendorId", vendorId))
      .take(200);
    for (const order of orders) {
      const events = await ctx.db
        .query("inboxEvents")
        .withIndex("by_order", (q) => q.eq("orderId", order._id))
        .take(100);
      for (const event of events) await ctx.db.delete("inboxEvents", event._id);
      await ctx.db.delete("orders", order._id);
    }
    const listings = await ctx.db
      .query("listings")
      .withIndex("by_vendor", (q) => q.eq("vendorId", vendorId))
      .take(200);
    for (const listing of listings) await ctx.db.delete("listings", listing._id);
    for (const item of SEED) {
      await ctx.db.insert("listings", { vendorId, ...item, status: "active" });
    }
    await ctx.db.patch("vendors", vendorId, { whatsapp: "08091003832" });
    return { inserted: SEED.length };
  },
});
