# Footprint — project memory (no-context recovery)

> This file is the project's long-term memory. An agent with ZERO prior
> context must be able to read ONLY this file + `docs/brief.md` and
> continue work safely. Keep it short, factual, current.
> Rule: read it first, update it last — every task.

## 1. Snapshot (stable — update only when it changes)
- **Project:** jara
- **What it is (1 line):** _e.g. Landing page for a fashion photographer_
- **Stack:** Next.js + TypeScript + Tailwind (factory default)
- **Template:** none (landing | portfolio | dashboard | none)
- **Key routes/files:**
  - `src/app/page.tsx` — main page
  - `src/components/ui/` — shared components (do not duplicate)
- **Accounts:** github: no | vercel: no | supabase: no
- **Env / secrets needed:** _e.g. none, or SENTRY_DSN in .env.local_

## 2. Current state (update every task — 3 lines max)
- **Last known good:** _e.g. 2026-09-19 — lint+build pass, hero + pricing done_
- **Now working on:** _e.g. newsletter signup validation_
- **Blocked / needs human:** _e.g. none — or: waiting for real copy for pricing_

## 3. Decisions (why, not what — append, never rewrite)
| Date | Decision | Why |
|------|----------|-----|
| _2026-09-19_ | _Use mailto for contact, no backend yet_ | _Keep v1 shippable, no DB needed_ |

## 4. Change log (append-only — newest at bottom, 5 lines per entry max)
### Format for each entry (copy/paste):
```md
## YYYY-MM-DD HH:MM — short title
- Changed: what files / sections changed
- Reason: why (brief ref, bug, request)
- Checks: lint pass/fail, build pass/fail, tests pass/fail
- Notes: anything the next agent must know
```

### Log starts here:
## 2026-09-19 — project created
- Changed: scaffolded from factory template none
- Reason: initial creation via `./factory.sh new jara`
- Checks: not-run yet
- Notes: fill in Snapshot + Brief before first agent run

<!-- APPEND NEW ENTRIES BELOW THIS LINE — do not edit old entries -->

## 5. Open TODOs / Next steps
- [ ] _e.g. Add real images to gallery_
- [ ] _e.g. Wire contact form to backend_

## 6. Resume prompt (for a fresh agent with no memory)
> Read `docs/footprint.md`, `docs/brief.md`, `docs/coding-rules.md`, `AGENTS.md`.
> Then run `git log --oneline -10` and `git status --short`.
> Continue from "Now working on" + "Open TODOs" above. Do not re-do done work.

---
**Maintenance rules (token budget):**
1. Update Sections 2 + 4 + 5 at the END of every agent task. No exceptions.
2. One entry per task. Max ~10 lines. Facts only, no play-by-play.
3. Never rewrite history — append only. Fix mistakes with a new entry.
4. If log exceeds ~200 lines, archive oldest entries to `docs/footprint-archive-YYYY-MM.md` and keep a 1-line summary pointer here.
5. `factory.sh` helpers: `./factory.sh footprint <project> "message"` appends a timestamped entry with git state. `./factory.sh footprint <project> --show` prints Current state + last 5 entries.
