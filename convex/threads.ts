import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createThread = mutation({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("threads", {
      query: args.query,
      recommendedIds: [],
      messages: [],
    });
  },
});

export const getThread = query({
  args: { threadId: v.id("threads") },
  handler: async (ctx, args) => {
    const thread = await ctx.db.get("threads", args.threadId);
    if (thread === null) return null;
    return {
      _id: thread._id,
      query: thread.query,
      recommendedIds: thread.recommendedIds,
      messages: thread.messages ?? [],
    };
  },
});

export const appendMessage = mutation({
  args: {
    threadId: v.id("threads"),
    role: v.string(),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const thread = await ctx.db.get("threads", args.threadId);
    if (thread === null) throw new Error("Thread not found");
    const messages = [
      ...(thread.messages ?? []),
      { role: args.role, text: args.text, createdAt: Date.now() },
    ].slice(-30);
    await ctx.db.patch(args.threadId, { messages });
    return { count: messages.length };
  },
});

export const saveRecommendations = mutation({
  args: {
    threadId: v.id("threads"),
    recommendedIds: v.array(v.id("listings")),
    occasion: v.optional(v.string()),
    budgetNgn: v.optional(v.number()),
    size: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const thread = await ctx.db.get("threads", args.threadId);
    if (thread === null) throw new Error("Thread not found");
    await ctx.db.patch(args.threadId, {
      recommendedIds: args.recommendedIds,
      occasion: args.occasion,
      budgetNgn: args.budgetNgn,
      size: args.size,
    });
    return { saved: args.recommendedIds.length };
  },
});
