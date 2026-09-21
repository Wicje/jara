import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";

const HOURLY_ORDER_LIMIT = 5;
const DAILY_FLAG_THRESHOLD = 3;

function normalizePhone(phone: string): string {
  return phone.replace(/[\s()-]/g, "");
}

export const place = mutation({
  args: {
    listingId: v.id("listings"),
    size: v.string(),
    buyerName: v.string(),
    buyerPhone: v.string(),
    groupId: v.optional(v.string()),
    checkoutStartedAt: v.optional(v.number()),
    website: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Bot traps: honeypot must stay empty, humans take more than 3 seconds.
    if ((args.website ?? "") !== "") throw new Error("Checkout failed. Try again.");
    if (args.checkoutStartedAt !== undefined && Date.now() - args.checkoutStartedAt < 3000) {
      throw new Error("Checkout failed. Try again.");
    }
    const listing = await ctx.db.get("listings", args.listingId);
    if (listing === null) throw new Error("Listing not found");
    const sizeOk = listing.sizes.some((s) => s.toUpperCase() === args.size.trim().toUpperCase());
    if (!sizeOk) throw new Error("Size not available");
    if (args.buyerName.trim() === "" || args.buyerPhone.trim() === "") {
      throw new Error("Name and phone are required");
    }
    const phone = normalizePhone(args.buyerPhone);
    if (listing.stock !== undefined && listing.stock <= 0) {
      throw new Error("Just sold out. Pick another piece.");
    }

    // Anti-spam: cap orders per phone per hour unless the number is verified.
    const hourAgo = Date.now() - 60 * 60 * 1000;
    const recent = await ctx.db
      .query("orders")
      .withIndex("by_phone", (q) => q.eq("buyerPhone", phone))
      .order("desc")
      .take(HOURLY_ORDER_LIMIT + 1);
    const thisHour = recent.filter((o) => o._creationTime > hourAgo);
    if (thisHour.length >= HOURLY_ORDER_LIMIT) {
      const verification = await ctx.db
        .query("verifications")
        .withIndex("by_phone", (q) => q.eq("phone", phone))
        .first();
      if (verification?.verifiedAt === undefined) throw new Error("NEEDS_VERIFICATION");
    }
    const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const status = recent.filter((o) => o._creationTime > dayAgo).length >= DAILY_FLAG_THRESHOLD - 1 ? "flagged" : "placed";

    const orderId = await ctx.db.insert("orders", {
      listingId: args.listingId,
      vendorId: listing.vendorId,
      size: args.size.trim(),
      buyerName: args.buyerName.trim(),
      buyerPhone: phone,
      status,
      groupId: args.groupId,
    });
    if (listing.stock !== undefined) {
      await ctx.db.patch(args.listingId, { stock: listing.stock - 1 });
    }
    await ctx.db.insert("inboxEvents", {
      orderId,
      direction: "out",
      subject: `New Jara order: ${listing.title} (${args.size.trim()})`,
      body: `${args.buyerName.trim()} ordered ${listing.title} size ${args.size.trim()} for ₦${listing.priceNgn.toLocaleString("en-NG")}.`,
      status,
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

export const checkPin = query({
  args: { pin: v.string() },
  handler: async (ctx, args): Promise<boolean> => {
    const expected = process.env.VENDOR_PIN;
    if (!expected) return false;
    return args.pin === expected;
  },
});

export const listByVendor = query({
  args: { vendorId: v.id("vendors"), pin: v.string() },
  handler: async (ctx, args) => {
    const expected = process.env.VENDOR_PIN;
    if (!expected) throw new Error("Vendor PIN is not configured. Set VENDOR_PIN on the deployment.");
    if (args.pin !== expected) throw new Error("Wrong PIN");
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
