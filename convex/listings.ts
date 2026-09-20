import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    occasion: v.optional(v.string()),
    vendorId: v.optional(v.id("vendors")),
  },
  handler: async (ctx, args) => {
    // Only active listings are ever shown. Drafts from the importer stay
    // hidden until a vendor approves them.
    const active = await ctx.db
      .query("listings")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .order("desc")
      .take(200);
    return active.filter((listing) => {
      if (args.vendorId !== undefined && listing.vendorId !== args.vendorId) return false;
      if (args.occasion !== undefined && listing.occasion !== args.occasion) return false;
      return true;
    });
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
