---
name: output-skill
description: "Vendor (on-demand): Overrides default LLM truncation behavior. Enforces complete code generation, bans placeholder patterns, and handles token-limit splits cleanly. Apply to any task requiring exhaustive, unabridged output. Use for: tasks needing exhaustive unabridged code output (anti-truncation)."
---

# output-skill (vendor skill, on-demand)

> Upstream install name: `full-output-enforcement` (https://github.com/Leonxlnx/taste-skill.git, pinned 5217fb4).
> Full reference is `FULL.md` in this folder — read it ONLY when the brief
> matches (tasks needing exhaustive unabridged code output (anti-truncation)). Otherwise ignore this skill entirely.

1. State a one-line design read first (page kind + audience + vibe).
2. Read `FULL.md` only on a match; apply its dials/rules to the task.
3. Never inject `FULL.md` into always-loaded context.

Update: `./factory.sh skills update output-skill && ./factory.sh skills sync <project>`.
