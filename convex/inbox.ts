import { internalMutation, query } from "./_generated/server";
import { v } from "convex/values";

export const record = internalMutation({
  args: {
    orderId: v.id("orders"),
    direction: v.string(),
    subject: v.optional(v.string()),
    body: v.string(),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("inboxEvents", args);
    if (args.status !== undefined) {
      await ctx.db.patch("orders", args.orderId, { status: args.status });
    }
    return null;
  },
});

export const timeline = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("inboxEvents")
      .withIndex("by_order", (q) => q.eq("orderId", args.orderId))
      .order("asc")
      .take(50);
  },
});
