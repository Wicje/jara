import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addReview = mutation({
  args: {
    listingId: v.id("listings"),
    name: v.string(),
    rating: v.number(),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const listing = await ctx.db.get("listings", args.listingId);
    if (listing === null) throw new Error("Listing not found");
    const name = args.name.trim().slice(0, 60);
    const text = args.text.trim().slice(0, 500);
    if (name === "") throw new Error("Add your name with the review");
    if (text === "") throw new Error("Write a few words about the piece");
    if (!Number.isInteger(args.rating) || args.rating < 1 || args.rating > 5) {
      throw new Error("Pick a rating from 1 to 5 stars");
    }
    return await ctx.db.insert("reviews", {
      listingId: args.listingId,
      name,
      rating: args.rating,
      text,
    });
  },
});

export const forListing = query({
  args: { listingId: v.id("listings") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("reviews")
      .withIndex("by_listing", (q) => q.eq("listingId", args.listingId))
      .order("desc")
      .take(50);
  },
});
