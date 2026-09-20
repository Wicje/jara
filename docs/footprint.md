# Footprint — project memory (no-context recovery)

> This file is the project's long-term memory. An agent with ZERO prior
> context must be able to read ONLY this file + `docs/brief.md` and
> continue work safely. Keep it short, factual, current.
> Rule: read it first, update it last — every task.

## 1. Snapshot (stable — update only when it changes)
- **Project:** jara
- **What it is (1 line):** Jara — AI concierge market for Nigerian ready-made fashion
- **Stack:** Next.js + TypeScript + Tailwind + Convex (planned) + OpenAI + Firecrawl + AgentMail
- **Template:** none
- **Key routes/files:**
  - `src/app/page.tsx` — concierge home (planned)
  - `src/components/ui/` — shared components (do not duplicate)
- **Accounts:** github: unknown | vercel: no (must ship convex.site) | supabase: no
- **Env / secrets needed:** OPENAI_API_KEY (BYO, server actions only), FIRECRAWL_API_KEY, AGENTMAIL_API_KEY, CONVEX_URL

## 2. Current state (update every task — 3 lines max)
- **Last known good:** 2026-09-20 — repo PUBLIC, 98 live listings, taste pass shipped, all checks green
- **Now working on:** API keys + demo video + social post + vibeapps submit
- **Blocked / needs human:** full-access AGENTMAIL key; Dera to confirm sizes/fabrics

## 3. Decisions (why, not what — append, never rewrite)
| Date | Decision | Why |
|------|----------|-----|
| 2026-09-19 | Name Jara, no AI suffix | Short pidgin extra-value, fashion sound, clean brand |
| 2026-09-19 | Vendor #1 Dera's Store ready-made + concierge marketplace first | Fastest real catalog, strongest sponsor story for demo |
| 2026-09-19 | BYO OpenAI key in server actions, skip AI Gateway + Auth v2 for demo | Gateway paid-only, Auth v2 alpha, auth not required |

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
## 2026-09-19 — Jara brainstorm locked with Dera vendor
- Changed: brief/spec/context/snapshot set to concierge marketplace, Vendor/Listing/Thread/Order/InboxEvent terms
- Reason: Dera's Store ready-made confirmed as vendor #1, hackathon sponsor mapping needs real catalog
- Checks: lint/build/unit not-run (docs-only)
- Notes: need Dera IG URL + 10 items + Convex account next
## 2026-09-20 — Concierge catalog slice + Convex schema scaffolded
- Changed: convex/schema, seed dera.ts (Unsplash), concierge filter + test, catalog home UI
- Reason: tracer bullet — chat filter → 3 matches → order button, unblocked without real photos
- Checks: lint pass, build pass, unit 5 pass
- Notes: run npx convex dev next; REMINDER pending Dera real photos
## 2026-09-20 — Live Convex catalog + orders working
- Changed: vendors/listings/orders/seed functions, seeded 10 Dera listings live, UI reads live query + places orders with timeline
- Reason: tracer now end-to-end on real backend (filter → order → inboxEvents)
- Checks: lint 0 errors, build pass, unit 5 pass
- Notes: AgentMail send + Firecrawl import next; REMINDER Dera real photos pending
## 2026-09-20 — AgentMail loop + Firecrawl importer live (key-gated)
- Changed: email.notifyVendor, inbox.record/timeline, http webhook + health, importer.importStore, UI notify + importer card
- Reason: sponsor stack does real work; dry-run without keys so demo never breaks
- Checks: lint 0 errors, build pass, unit 5 pass, live e2e place→queue→webhook→confirmed
- Notes: need AGENTMAIL_API_KEY/INBOX_ID + FIRECRAWL_API_KEY for real send/crawl; REMINDER Dera photos
## 2026-09-20 — Real photos in, deployed to convex.site
- Changed: 19 Dera photos to public/dera, catalog rebuilt, syncDera upsert, static export + static-hosting component, prod seeded
- Reason: judges need live URL with real vendor photos, not placeholders
- Checks: lint 0 errors, build pass, unit 5 pass, site 200, prod 19 listings all local photos
- Notes: names/prices best-guess need Dera confirm; repo not yet pushed public
## 2026-09-20 — Real vendor catalog via Firecrawl, redeployed
- Changed: scraped styleinlagos.ng (98 parsed, 243 listed), replaceCatalog swapped 19 live rows, sizes default S-XL, site redeployed
- Reason: catalog is now genuine vendor data, not placeholders
- Checks: lint 0 errors, build pass, unit 5 pass, prod 19 rows (17 remote + 2 local photos), site 200
- Notes: AgentMail keys restricted, need full-access key; repo still not public
## 2026-09-20 — Six-hat critique fixes shipped
- Changed: NL ask box + parser, match reasons, empty state, order wiring scroll, WhatsApp fallback, timeline pills, /vendor route, stats, CardMedia, Text tones, favicon/OG, error boundary, main landmarks
- Reason: demo readiness — golden path, brand story, trust signals, accessible semantics
- Checks: lint 0 errors, build pass, unit 9 pass, e2e pass, prod redeployed (site + vendor 200)
- Notes: kept StaticCatalog fallback (static-export build safety); full-access AgentMail key still pending
## 2026-09-20 — Mobile refinement pass
- Changed: occasion/size/budget chips (min-h-11, aria-pressed), 2-up compact grid, sticky order bar with safe-area, full-width order CTAs, mobile e2e spec at 375px
- Reason: thumb-first discovery, no typing or long scrolls to order
- Checks: lint 0 errors, build pass, unit 9 pass, e2e 2 pass (incl. no-overflow + sticky bar), prod re-uploaded, site 200
- Notes: transient http2 blip on first upload, clean re-upload confirmed with prod URL baked in
## 2026-09-20 — Public repo, 98 products, taste pass
- Changed: repo Wicje/jara now PUBLIC + pushed, 98 listings live dev+prod, taste audit applied (see hackathon.md)
- Reason: submission requires public repo; catalog depth + anti-slop UI for judges
- Checks: lint 0 errors, build pass, unit 9 pass, e2e 3 pass, site 200, pushed 1231010
- Notes: session Firecrawl key used for crawls only, never stored in deployment env

## 5. Open TODOs / Next steps
- [ ] Dera to confirm sizes/fabrics (names/prices/photos now real from her site)
- [ ] Full-access AGENTMAIL_API_KEY for real order emails (current keys restricted)
- [ ] Record <3min demo video, social post tagging sponsors, submit vibeapps.dev (repo already public)

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
