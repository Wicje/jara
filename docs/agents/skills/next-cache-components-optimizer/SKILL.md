---
name: next-cache-components-optimizer
description: "Vendor (on-demand): Drive a Next.js route to instant navigation by setting up an agentic loop, under Cache Components / PPR, on initial load (hard navigation) and client-side navigation (soft navigation). Encode the goal as a failing @next/playwright instant() e2e and work it to green, one verified route at a time; the shipped test then guards against regression. Use when asked to make a route's navigation instant (its static shell commits immediately), fix a route whose static shell isn't prerendered/served/prefetched, grow a route's static shell or fix its slow first paint, diagnose which Suspense boundary keep Use for: making a route's navigation instant under Cache Components / PPR."
---

# next-cache-components-optimizer (vendor skill, on-demand)

> Upstream install name: `next-cache-components-optimizer` (https://github.com/vercel/next.js.git, pinned 34433fd).
> Full reference is `FULL.md` in this folder — read it ONLY when the brief
> matches (making a route's navigation instant under Cache Components / PPR). Otherwise ignore this skill entirely.

1. State a one-line design read first (page kind + audience + vibe).
2. Read `FULL.md` only on a match; apply its dials/rules to the task.
3. Never inject `FULL.md` into always-loaded context.

Update: `./factory.sh skills update next-cache-components-optimizer && ./factory.sh skills sync <project>`.
