import { action, query } from "./_generated/server";
import type { ActionCtx } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import {
  AGENT_MAX_TOKENS,
  AGENT_MAX_TOOL_ROUNDS,
  AGENT_MODEL,
  AGENT_SYSTEM_PROMPT,
  AGENT_TOOLS,
  parseToolCalls,
  type ChatCompletionsMessage,
} from "../src/lib/agent-protocol";

export const status = query({
  args: {},
  handler: async (): Promise<{ configured: boolean }> => {
    return { configured: !!process.env.OPENAI_API_KEY };
  },
});

interface SearchArgs {
  occasion?: string;
  maxBudgetNgn?: number;
  size?: string;
}

interface OpenAiChoice {
  message?: {
    content?: string | null;
    tool_calls?: Array<{
      id: string;
      function?: { name?: string; arguments?: string };
    }> | null;
  };
}

interface OpenAiResponse {
  choices?: OpenAiChoice[];
}

async function callModel(apiKey: string, messages: ChatCompletionsMessage[]): Promise<OpenAiChoice> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: AGENT_MODEL,
      temperature: 0.3,
      max_tokens: AGENT_MAX_TOKENS,
      messages,
      tools: AGENT_TOOLS,
    }),
  });
  if (!res.ok) throw new Error(`Model request failed: ${res.status}`);
  const data = (await res.json()) as OpenAiResponse;
  const choice = data.choices?.[0];
  if (!choice) throw new Error("Model returned no choices");
  return choice;
}

async function runTool(
  ctx: ActionCtx,
  name: string,
  args: Record<string, unknown>,
): Promise<unknown> {
  if (name === "search_listings") {
    const filter = args as SearchArgs;
    const listings = await ctx.runQuery(api.listings.list, {});
    return listings
      .filter(
        (l) =>
          (!filter.occasion || l.occasion === filter.occasion) &&
          (filter.maxBudgetNgn === undefined || l.priceNgn <= filter.maxBudgetNgn) &&
          (!filter.size || l.sizes.includes(filter.size)),
      )
      .slice(0, 8)
      .map((l) => ({
        id: l._id,
        title: l.title,
        priceNgn: l.priceNgn,
        occasion: l.occasion,
        sizes: l.sizes,
        stock: l.stock,
      }));
  }
  if (name === "get_details") {
    if (typeof args.listingId !== "string") return { error: "listingId is required" };
    const listing = await ctx.runQuery(api.listings.get, {
      listingId: args.listingId as Id<"listings">,
    });
    return listing ?? { error: "listing not found" };
  }
  if (name === "check_order_status") {
    if (typeof args.groupId !== "string") return { error: "groupId is required" };
    const entries = await ctx.runQuery(api.orders.byGroup, { groupId: args.groupId });
    return entries.map(({ order, listing }) => ({
      title: listing?.title ?? "Piece",
      size: order.size,
      status: order.status,
    }));
  }
  return { error: `unknown tool: ${name}` };
}

export const reply = action({
  args: { threadId: v.id("threads"), text: v.string() },
  handler: async (
    ctx,
    args,
  ): Promise<{ mode: string; text: string; recommendedIds: string[] }> => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return { mode: "fallback", text: "", recommendedIds: [] };

    const thread = await ctx.runQuery(api.threads.getThread, { threadId: args.threadId });
    const history: ChatCompletionsMessage[] = (thread?.messages ?? []).slice(-10).map((m) => ({
      role: m.role === "user" ? ("user" as const) : ("assistant" as const),
      content: m.text,
    }));
    const messages: ChatCompletionsMessage[] = [
      { role: "system", content: AGENT_SYSTEM_PROMPT },
      ...history,
      { role: "user", content: args.text },
    ];

    let recommendedIds: string[] = [];
    let finalText = "";
    for (let round = 0; round < AGENT_MAX_TOOL_ROUNDS; round++) {
      const choice = await callModel(apiKey, messages);
      const calls = parseToolCalls(choice);
      const content = choice.message?.content ?? "";
      if (calls.length === 0) {
        finalText = content;
        break;
      }
      messages.push({
        role: "assistant",
        content,
        tool_calls: calls.map((call) => ({
          id: call.id,
          type: "function" as const,
          function: { name: call.name, arguments: JSON.stringify(call.args) },
        })),
      });
      for (const call of calls) {
        const result = await runTool(ctx, call.name, call.args);
        if (call.name === "search_listings" && Array.isArray(result)) {
          recommendedIds = result.slice(0, 3).map((r: { id: string }) => r.id);
        }
        messages.push({
          role: "tool",
          content: JSON.stringify(result).slice(0, 4000),
          tool_call_id: call.id,
        });
      }
      finalText = content;
    }
    if (finalText.trim() === "") {
      finalText = "Here is what I found in the boutique:";
    }

    await ctx.runMutation(api.threads.appendMessage, {
      threadId: args.threadId,
      role: "user",
      text: args.text,
    });
    await ctx.runMutation(api.threads.appendMessage, {
      threadId: args.threadId,
      role: "assistant",
      text: finalText,
    });
    if (recommendedIds.length > 0) {
      await ctx.runMutation(api.threads.saveRecommendations, {
        threadId: args.threadId,
        recommendedIds: recommendedIds as Id<"listings">[],
      });
    }
    return { mode: "ai", text: finalText, recommendedIds };
  },
});
