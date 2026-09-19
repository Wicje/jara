---
name: grill-brief
description: "Grill a vague idea into a sharp brief before any code is written."
version: 1
disable-model-invocation: true
---

# grill-brief — interview before brief

Use when `docs/brief.md` is empty, vague, or the human says "I have an idea".
Goal: a brief so sharp the builder needs zero follow-up questions.

## Rounds

Run frontier rounds: `Q1 ... Qn -> recommendation`. One round = 2-4 questions
on the current frontier (unknowns that change the build). Facts the agent can
find itself (stack, existing components) MUST NOT be questions — go read them.

- Cover: who it's for, pages/sections, real content available, design
  direction, must-work states (loading/empty/error), explicit out-of-scope.
- Challenge vague words ("modern", "fast", "nice") — force concrete picks.
- End each round with a recommendation; human decides, agent records.
- Done when frontier is empty: no remaining decision changes the build.

## Enforcement

- MUST read `docs/footprint.md` + `docs/brief.md` first.
- MUST NOT write code, run builds, or create specs. Output is an updated
  `docs/brief.md` only (plus footprint Current state line).
- MUST fill `Out of scope` — empty out-of-scope rejects the brief.
- If the human answers "you decide", record it as a Decision in footprint
  with why, and continue. Never invent silently without logging.
