---
name: grill-me
description: "Vendor (on-demand): Help developers using coding agents retain solution knowledge by quizzing them on the current codebase one question at a time, grading each response against the implementation, and explaining incorrect answers. Use when a user asks "Do I know this codebase?", "quiz me on this codebase", "grill me", wants to verify or refresh their mental model of a repository, or wants to catch knowledge drift after delegating implementation work to coding agents. Use for: human wants a codebase quiz ('quiz me', 'grill me on this code', knowledge check after agent-built code)."
---

# grill-me (vendor skill, on-demand)

> Upstream install name: `grill-me` (https://github.com/joshuawheelock/grill-me.git, pinned 2d0c1c4).
> Full reference is `FULL.md` in this folder — read it ONLY when the brief
> matches (human wants a codebase quiz ('quiz me', 'grill me on this code', knowledge check after agent-built code)). Otherwise ignore this skill entirely.

1. State a one-line design read first (page kind + audience + vibe).
2. Read `FULL.md` only on a match; apply its dials/rules to the task.
3. Never inject `FULL.md` into always-loaded context.

Update: `./factory.sh skills update grill-me && ./factory.sh skills sync <project>`.
