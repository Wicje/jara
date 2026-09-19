# OBEY Factory Coding Rules — mini (default always-on)

> Default for all agent tasks (~1k tokens). Full is `coding-rules.full.md`
> (RAG-only). Nano is `coding-rules.nano.md` (eco mode).

## When to use

Every code task. If unclear, ask — never invent requirements.

## Primary bias

Prefer smallest working slice, reuse first, verify once at the end.

## Decision rules

- **M1** MUST reuse `src/components/ui/` first. MUST NOT duplicate it.
- **M2** One file, one job. Delete dead code, unused imports, debug logs.
- **M3** MUST NOT use `any` (use `unknown` + narrow). Clear names only.
- **M4** Mobile first (375px -> up). Every interaction keyboard-accessible
  with a visible name. No inline styles — classes only.
- **M5** MUST stay on Next.js + TypeScript. No new frameworks/deps unless asked.
- **M6** Match the design. No surprise styling, fonts, or colors.
- **M7** Smallest working version first (one vertical demoable slice).
- **M8** Test only at pre-agreed seams (props/route/action/handler).
  MUST NOT couple tests to internals.
- **M9** Specs/tickets MUST NOT contain file paths or line numbers.
- **M10** Shared vocabulary: module (one job), seam (testable interface),
  adapter (thin glue), depth (small API, real behavior), locality (one
  change, one module).
- **M11** MUST run `lint` + `build` + `unit` once at the end and fix.
  MUST update `docs/footprint.md` (Current state + log + TODOs).
- **M12** MUST re-read diff; remove experiments; behavioral commit message.

## Trigger rules

- **M13** Duplication >2x, feature envy, or shotgun surgery (1 req -> 3+
  modules) -> extract shared helper or deepen the module.
- **M14** Mixed levels, boolean flags, hidden side effects, or command+query
  in one function -> split into two explicit units.

## Final checklist

- [ ] Mobile + keyboard + labels pass
- [ ] lint + build + unit green (e2e if layout touched)
- [ ] No `any`, inline styles, dead code, or `console.log`
- [ ] Diff clean; footprint updated
