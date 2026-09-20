import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    occasion: v.optional(v.string()),
    vendorId: v.optional(v.id("vendors")),
  },
  handler: async (ctx, args) => {
    if (args.vendorId !== undefined) {
      return await ctx.db
        .query("listings")
        .withIndex("by_vendor", (q) => q.eq("vendorId", args.vendorId as NonNullable<typeof args.vendorId>))
        .order("desc")
        .take(50);
    }
    if (args.occasion !== undefined) {
      return await ctx.db
        .query("listings")
        .withIndex("by_occasion", (q) => q.eq("occasion", args.occasion as string))
        .order("desc")
        .take(50);
    }
    return await ctx.db.query("listings").order("desc").take(50);
  },
});

export const get = query({
  args: { listingId: v.id("listings") },
  handler: async (ctx, args) => {
    return await ctx.db.get("listings", args.listingId);
  },
});

export const create = mutation({
  args: {
    vendorId: v.id("vendors"),
    title: v.string(),
    priceNgn: v.number(),
    sizes: v.array(v.string()),
    fabric: v.string(),
    occasion: v.string(),
    photoUrl: v.string(),
    sourceUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("listings", { ...args, status: "active" });
  },
});
