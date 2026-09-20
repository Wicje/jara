import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";

export const place = mutation({
  args: {
    listingId: v.id("listings"),
    size: v.string(),
    buyerName: v.string(),
    buyerPhone: v.string(),
    groupId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const listing = await ctx.db.get("listings", args.listingId);
    if (listing === null) throw new Error("Listing not found");
    const sizeOk = listing.sizes.some((s) => s.toUpperCase() === args.size.trim().toUpperCase());
    if (!sizeOk) throw new Error("Size not available");
    if (args.buyerName.trim() === "" || args.buyerPhone.trim() === "") {
      throw new Error("Name and phone are required");
    }
    const orderId = await ctx.db.insert("orders", {
      listingId: args.listingId,
      vendorId: listing.vendorId,
      size: args.size.trim(),
      buyerName: args.buyerName.trim(),
      buyerPhone: args.buyerPhone.trim(),
      status: "placed",
      groupId: args.groupId,
    });
    await ctx.db.insert("inboxEvents", {
      orderId,
      direction: "out",
      subject: `New Jara order: ${listing.title} (${args.size.trim()})`,
      body: `${args.buyerName.trim()} (${args.buyerPhone.trim()}) ordered ${listing.title} size ${args.size.trim()} for ₦${listing.priceNgn.toLocaleString("en-NG")}.`,
      status: "placed",
    });
    // Vendor notification is part of placing the order, not a separate step
    // the UI can forget. It records its own timeline event on success or failure.
    await ctx.scheduler.runAfter(0, api.email.notifyVendor, { orderId });
    return orderId;
  },
});

export const get = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const order = await ctx.db.get("orders", args.orderId);
    if (order === null) return null;
    const listing = await ctx.db.get("listings", order.listingId);
    const events = await ctx.db
      .query("inboxEvents")
      .withIndex("by_order", (q) => q.eq("orderId", args.orderId))
      .order("asc")
      .take(50);
    return { order, listing, events };
  },
});

export const listByVendor = query({
  args: { vendorId: v.id("vendors") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_vendor", (q) => q.eq("vendorId", args.vendorId))
      .order("desc")
      .take(50);
  },
});

export const byGroup = query({
  args: { groupId: v.string() },
  handler: async (ctx, args) => {
    const orders = await ctx.db
      .query("orders")
      .withIndex("by_group", (q) => q.eq("groupId", args.groupId))
      .order("asc")
      .take(50);
    return await Promise.all(
      orders.map(async (order) => {
        const listing = await ctx.db.get("listings", order.listingId);
        const events = await ctx.db
          .query("inboxEvents")
          .withIndex("by_order", (q) => q.eq("orderId", order._id))
          .order("asc")
          .take(50);
        return { order, listing, events };
      }),
    );
  },
});
