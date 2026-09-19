# OBEY Factory Coding Rules — full (canonical reference)

> Canonical source. Do NOT inject whole file into every prompt.
> Default always-on is `coding-rules.mini.md`. Eco mode is `coding-rules.nano.md`.
> This full file is RAG-only / `reference.md` for review and dispute resolution.
> Token budget: full ~3-4k tokens, mini ~1k, nano ~300.

## When to use

Use on every task that writes, edits, or reviews code in a factory project
(Next.js + TypeScript + Tailwind). If the task is plan-only, the mini tier
is enough; consult this file only when mini/nano conflict or a review fails.

## Primary bias to correct

Agents default to gold-plating, duplicating existing UI, and inventing
requirements. Correct toward: smallest working slice, reuse first, ask when
unclear, verify once at the end.

## Decision rules

- **D1 — Reuse first.** You MUST reuse `src/components/ui/` (Button, Card,
  Container, Input, Label, Text) before writing anything new. You MUST NOT
  create a duplicate component with the same job.
- **D2 — One file, one job.** Each file SHOULD do one thing. A Button file
  makes buttons. Nothing else.
- **D3 — Contribute back.** If you build a genuinely shared component inside
  a project, you SHOULD propose it for `factory/components/ui/` so future
  projects benefit.
- **D4 — No dead code.** You MUST delete unused code, imports, debug logs,
  and experiments before finishing. No commented-out blocks.
- **D5 — Clear names.** You MUST name things after what they are (`users`,
  not `d`). Avoid mysterious names, data clumps, and primitive obsession
  (prefer a small type/interface over 3+ loose primitives).
- **D6 — Type everything.** You MUST NOT use `any` unless no type exists.
  Prefer `unknown` + narrowing, explicit props interfaces, and inferred
  return types only where trivial.
- **D7 — Mobile first.** You MUST make it work at 375px first, then scale
  up (768/1280/1920). Responsive via Tailwind classes, not JS breakpoints.
- **D8 — Keyboard + labels.** Every interaction MUST be keyboard-accessible
  and have an accessible name. Tab order MUST be visible at all times.
- **D9 — No inline styles.** You MUST use classes. Reuse existing styles
  first. No `style={{...}}` except dynamic values with no class equivalent.
- **D10 — Minimal comments.** You MUST NOT add comments that restate code.
  Comment only the surprising why, behind a hard-to-reverse decision.
- **D11 — Existing stack only.** You MUST use Next.js + TypeScript as
  scaffolded. You MUST NOT add frameworks, CSS-in-JS, or new deps unless
  the brief explicitly asks.
- **D12 — Match the design.** You MUST NOT introduce surprise styling,
  fonts, or colors. If the brief is silent, use clean factory defaults.
- **D13 — Small scope first.** You SHOULD build the smallest working version
  (tracer bullet: one vertical slice through all layers, demoable) before
  extending. No horizontal slicing (all UI, no logic).
- **D14 — Seams.** You MUST test only at pre-agreed seams (public
  interfaces: page route, component props, server action, API handler).
  You MUST NOT couple tests to internals. Agree the seam with the human
  (or spec) before writing tests.
- **D15 — Specs are durable.** Specs/tickets MUST NOT contain file paths or
  line numbers. Describe behavior, seams, and acceptance criteria so the
  spec survives refactors.

## Seam vocabulary (shared language)

- **module** — a folder/file with one job and a narrow public interface.
- **interface** — the props/params/returns others may use. Keep narrow.
- **seam** — a place where behavior can be changed or tested without
  touching internals (e.g. component props, route, server action).
- **adapter** — glue between a seam and an external system (DB, API, auth).
  Keep thin; push logic into the module.
- **depth** — how much real behavior a module hides behind a small
  interface. Prefer deep modules over shallow pass-throughs.
- **leverage** — how many call sites benefit from one fix. Prefer fixes
  with high leverage (shared component) over local patches.
- **locality** — related code lives together. A change SHOULD touch one
  module, not scatter across five (shotgun surgery).

## Trigger rules

- **T1 — Duplication smell.** When you copy-paste >2x or see feature envy
  (a function reaching into another module's data), extract a shared
  component/helper or move the logic to the data owner.
- **T2 — Mixed levels.** When a function mixes abstraction levels (fetch +
  format + render in one body) or both mutates and answers, split
  command from query.
- **T3 — Boolean flags / hidden sides.** When a prop/param is a boolean
  flag changing behavior, or a function hides a side effect, split into
  two explicit functions/components.
- **T4 — Shotgun surgery.** When one requirement forces edits in 3+
  modules, consolidate: the seam is wrong, deepen the module.
- **T5 — Unclear requirement.** When the brief/spec/checklist is ambiguous,
  you MUST ask. You MUST NOT invent requirements silently.
- **T6 — Scope creep in review.** When a diff contains behavior outside the
  brief/spec, flag it as scope creep; suggest a follow-up ticket.

## Smell baseline (review against these)

Mysterious Name, Duplicated Code, Feature Envy, Data Clumps, Primitive
Obsession, Repeated Switches, Shotgun Surgery, Divergent Change,
Speculative Generality, Message Chains, Middle Man, Refused Bequest.
Repo standards override; every hit is a judgement call, not an auto-fail.

## Final checklist

- [ ] Mobile + desktop work; keyboard + labels pass
- [ ] `lint` + `build` + `unit` green; e2e green if layout touched
- [ ] No `any`, no inline styles, no dead code, no `console.log`
- [ ] Diff re-read; experiments removed; commit message is behavioral
- [ ] `docs/footprint.md` updated (Current state + Change log + TODOs)

## Output expectations

Smallest diff that satisfies the brief. Batch independent reads. Terse
summary at end: files changed + checks run + what needs human review.
Never print full files back; summarize or diff.
