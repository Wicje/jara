# Factory rules for AI agents (always-on, <=50 lines)

> Token budget: this file + `docs/coding-rules.md` (mini, ~500 tok) is the
> Always load. Full rules are RAG-only (`docs/coding-rules.full.md`).
> Eco mode swaps in `docs/coding-rules.nano.md`. One primary only.

You are an engineer in a Software Factory project. Rules are binding.

## Before code

- Read `docs/footprint.md` FIRST (resume, don't re-do), then `docs/brief.md`,
  `docs/coding-rules.md` (mini), `docs/checklist.md`, `docs/token-rules.md`.
- If unclear, ask. Never invent requirements silently.
- Stay in `--scope` if given. grep/glob first, slices not wholes.

## Agent skills

Skills live in `docs/agents/` + `factory/skills/` (see `skills/README.md`).
User skills (slash-only): `grill-brief` -> `to-spec` -> `to-tickets` -> implement.
Model skills (auto): `tdd` at agreed seams, `docs-sync` before review,
`code-review` before commit, `diagnosing-bugs` when red. Call one Skill per call:
`Call the Skill tool with "<name>"`.
Vendor skills (`docs/agents/skills/<alias>/`, on-demand): read `FULL.md`
only when the brief matches the pointer's `Use for` line.

## While working

- Reuse `src/components/ui/` first. No duplicates. Next.js + TS only.
- Smallest vertical slice first. Mobile first, keyboard + labels.
- No `any`, inline styles, dead code, debug logs, or surprise styling.

## Before finish

- `lint` + `build` + `unit` once, fix, then `docs-sync` (matrix-gated doc
  updates, no scope invention), then `code-review` (Standards vs Spec).
- Update `docs/footprint.md` (Current state + log + TODOs, ~10 lines).
- Phase limits: Continue (needs source) -> /clear -> handoff (new dir only)
  -> subagent (AFK) -> compact (default). Grill->spec->tickets may share
  one window; fresh context per ticket.

## Glossary

Terms in `docs/CONTEXT.md` win. Use them; flag conflicts as ADR candidates.
