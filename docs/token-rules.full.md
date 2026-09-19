# OBEY Token Rules — full (canonical reference)

> Canonical source. Default always-on is `token-rules.md` (= mini).
> Eco mode is `token-rules.nano.md`. Token estimate: ~4 chars = 1 token.

## When to use

Every agent task. Tokens are budget: every read, tool call, and re-run costs.

## Primary bias to correct

Agents over-read ("just in case" scans) and over-verify (lint loop per file).
Correct toward: read less, change less, verify once at the end.

## Decision rules

- **D1** MUST read `docs/footprint.md`, `docs/brief.md`,
  `docs/coding-rules.md`, `AGENTS.md` first, then stop scanning.
- **D2** MUST prefer `glob`/`grep` over `cat`. MUST use offset/limit slices
  for files >200 lines. Search first, read matching region only.
- **D3** When `--scope` is given, MUST stay inside it unless blocked.
- **D4** MUST NEVER read `node_modules`, `.next`, `package-lock.json`,
  `test-results/`, `playwright-report/`, or binaries.
- **D5** MUST NEVER print a full file back. Summarize or diff.
- **D6** Smallest diff that satisfies the brief. No gold plating, no
  drive-by refactors, no new deps unless asked.
- **D7** SHOULD batch independent tool calls in one block.
- **D8** Terse output: one short summary at end (files + checks + review
  needs). MUST NOT re-explain diff-readable code.
- **D9** Default verify order, once: write -> `lint` -> `build` -> `unit`.
  MUST NOT loop per file. Only re-run what failed.
- **D10** `--plan`: NO writes, NO builds, NO tests. Numbered plan, max
  ~30 lines (files + edits + risks). Ask before implementing.
- **D11** `--eco`: skip `e2e`/`visual` unless layout touched. Summary <15 lines.
- **D12** Phase boundaries: grill -> spec -> tickets in one window is fine;
  fresh context per ticket. At limits: Continue (needs primary source) ->
  `/clear` (disposable) -> `handoff` (new harness/dir only) ->
  subagent (AFK-able) -> `compact` (default).

## Trigger rules

- **T1** Task is explore / "what if" -> `--plan` (~10x cheaper).
- **T2** Task is small fix / copy change -> `--eco --scope <paths>`.
- **T3** Task is normal feature -> `--eco`.
- **T4** Task needs full quality -> default (lint + build + unit).
- **T5** Before launching -> `tokens <project> [--scope]` to pick scope.

## Token budgets (observed)

| Tier | Size | Tokens |
|---|---|---|
| nano always-on | 1.2-2.8 KB | ~300-700 |
| mini always-on | 4-7 KB | ~950-2000 |
| full reference | 13-18 KB | ~3-15k |

Gate: `Always` (AGENTS.md + mini) MUST stay <= ~2 KB + mini. Fail scaffold
if larger. Scoped rules per dir are preferred over global stacking.

## Final checklist

- [ ] Read only what the task needs?
- [ ] Smallest diff, batched calls, terse summary?
- [ ] Verified once at end, correct tier used?
