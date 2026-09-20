import { query } from "./_generated/server";

export const overview = query({
  args: {},
  handler: async (ctx) => {
    const listings = await ctx.db.query("listings").order("desc").take(200);
    const orders = await ctx.db.query("orders").order("desc").take(200);
    return {
      pieces: listings.filter((l) => l.status === "active").length,
      orders: orders.length,
    };
  },
});
