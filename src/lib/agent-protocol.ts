export const AGENT_MODEL = "gpt-4o-mini";
export const AGENT_MAX_TOOL_ROUNDS = 3;
export const AGENT_MAX_TOKENS = 500;

export const AGENT_SYSTEM_PROMPT = `You are Jara, the shopping concierge for Style in Lagos, a Lagos boutique selling women's ready-made fashion. You speak warmly, briefly, with a touch of Nigerian flavour. Prices are always in naira (₦).

Rules you must never break:
- Only ever mention listings, prices, and sizes that came back from your tools. Never invent a piece, a price, or stock.
- You never place orders. When the shopper is ready, tell them to tap "Send order" at checkout or open the piece I link.
- Keep replies under 60 words. Name at most 3 pieces per reply.
- Sizes run S to XL. Same-day delivery in Lagos; nationwide on request.`;

export interface AgentToolDefinition {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  };
}

export const AGENT_TOOLS: AgentToolDefinition[] = [
  {
    type: "function",
    function: {
      name: "search_listings",
      description: "Search the live boutique catalog by occasion, max budget in naira, and size.",
      parameters: {
        type: "object",
        properties: {
          occasion: { type: "string", enum: ["owambe", "church", "street"] },
          maxBudgetNgn: { type: "number" },
          size: { type: "string", enum: ["S", "M", "L", "XL"] },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_details",
      description: "Get full details (fabric, sizes, stock, price) for one listing by its id.",
      parameters: {
        type: "object",
        properties: { listingId: { type: "string" } },
        required: ["listingId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "check_order_status",
      description: "Look up the status of the shopper's order by its receipt group id.",
      parameters: {
        type: "object",
        properties: { groupId: { type: "string" } },
        required: ["groupId"],
      },
    },
  },
];

export interface AgentHistoryMessage {
  role: "user" | "assistant";
  text: string;
}

export interface ChatCompletionsMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string | null;
  tool_calls?: Array<{
    id: string;
    type: "function";
    function: { name: string; arguments: string };
  }>;
  tool_call_id?: string;
}

export function buildAgentMessages(history: AgentHistoryMessage[], text: string): ChatCompletionsMessage[] {
  const messages: ChatCompletionsMessage[] = [
    { role: "system", content: AGENT_SYSTEM_PROMPT },
  ];
  for (const message of history.slice(-10)) {
    messages.push({ role: message.role, content: message.text });
  }
  messages.push({ role: "user", content: text });
  return messages;
}

export interface ParsedToolCall {
  id: string;
  name: string;
  args: Record<string, unknown>;
}

/** Extracts tool calls from a chat-completions response choice. Never throws. */
export function parseToolCalls(choice: {
  message?: { tool_calls?: Array<{ id: string; function?: { name?: string; arguments?: string } }> | null };
}): ParsedToolCall[] {
  const calls = choice.message?.tool_calls ?? [];
  const parsed: ParsedToolCall[] = [];
  for (const call of calls) {
    if (!call.function?.name) continue;
    let args: Record<string, unknown> = {};
    try {
      args = JSON.parse(call.function.arguments ?? "{}") as Record<string, unknown>;
    } catch {
      args = {};
    }
    parsed.push({ id: call.id, name: call.function.name, args });
  }
  return parsed;
}
