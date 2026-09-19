---
name: research
description: "Fill a knowledge gap with primary sources. Use when the answer is unknown, not when guessing is fine."
version: 1
---

# research — background agent, cited notes

Use when a technical choice needs evidence (API shape, pricing, limits).

## Enforcement

- MUST run as background/single-pass agent (or time-boxed manual pass).
- Primary sources only (official docs, repo, spec). No blog summaries as basis.
- Output: one cited MD (e.g. `.scratch/research/<slug>.md`) with links +
  verdict + what was NOT found. File is a primary source for spec/tickets.
- MUST NOT write code. Research plans, it never builds.
