---
name: taste-frontend
description: "Vendor (on-demand): Anti-slop frontend skill for landing pages, portfolios, and redesigns. The agent reads the brief, infers the right design direction, and ships interfaces that do not look templated. Real design systems when applicable, audit-first on redesigns, strict pre-flight check. Use for: landing pages, portfolios, redesigns (not dashboards, data tables, multi-step product UI)."
---

# taste-frontend (vendor skill, on-demand)

> Upstream install name: `design-taste-frontend` (https://github.com/Leonxlnx/taste-skill.git, pinned 5217fb4).
> Full reference is `FULL.md` in this folder — read it ONLY when the brief
> matches (landing pages, portfolios, redesigns (not dashboards, data tables, multi-step product UI)). Otherwise ignore this skill entirely.

1. State a one-line design read first (page kind + audience + vibe).
2. Read `FULL.md` only on a match; apply its dials/rules to the task.
3. Never inject `FULL.md` into always-loaded context.

Update: `./factory.sh skills update taste-frontend && ./factory.sh skills sync <project>`.
