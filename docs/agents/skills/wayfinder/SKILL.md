---
name: wayfinder
description: "Map a foggy multi-session effort into decision tickets. Use when too big for one session."
version: 1
disable-model-invocation: true
---

# wayfinder — plan, don't do

Use when the effort spans sessions and the shape is foggy. Output is
decisions, not deliverables: a map + one decision ticket per session.

## Enforcement

- MUST produce `.scratch/<slug>/map.md` (index: goal, fog list
  `Not yet specified`, ticket links, out-of-scope) + `decision-*.md`
  tickets (one question each, `Blocked by` edges, merge-back note).
- MUST claim by assign (one owner per ticket), native blocking, fog vs
  ticket vs out-of-scope discipline. Never build straight from the map —
  merge back via `to-spec`, then `to-tickets` -> implement.
- One ticket per session. Fresh context per ticket.
