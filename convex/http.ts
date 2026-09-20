import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { components } from "./_generated/api";
import { registerStaticRoutes } from "@convex-dev/static-hosting";
import { Id } from "./_generated/dataModel";

const http = httpRouter();

http.route({
  path: "/agentmail/webhook",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const secret = process.env.AGENTMAIL_WEBHOOK_SECRET;
    if (secret !== undefined && secret !== "") {
      const provided = req.headers.get("x-agentmail-secret");
      if (provided !== secret) return new Response("unauthorized", { status: 401 });
    }
    const raw: unknown = await req.json();
    if (typeof raw !== "object" || raw === null) {
      return new Response("invalid body", { status: 400 });
    }
    const body = raw as Record<string, unknown>;
    if (typeof body.orderId !== "string" || typeof body.text !== "string") {
      return new Response("orderId and text required", { status: 400 });
    }
    const status = typeof body.status === "string" ? body.status : undefined;
    const subject = typeof body.subject === "string" ? body.subject : undefined;
    await ctx.runMutation(internal.inbox.record, {
      orderId: body.orderId as Id<"orders">,
      direction: "in",
      subject,
      body: body.text,
      status,
    });
    return new Response("ok", { status: 200 });
  }),
});

http.route({
  path: "/health",
  method: "GET",
  handler: httpAction(async () => {
    return new Response("jara ok", { status: 200 });
  }),
});

registerStaticRoutes(http, components.staticHosting);

export default http;
