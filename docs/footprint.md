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
- **Last known good:** 2026-09-21 — purple-primary refinement green: lint, build, unit 36, e2e 4
- **Now working on:** Submission assets (demo video, social post, vibeapps)
- **Blocked / needs human:** Dera's EMAIL address; Dera to confirm sizes/fabrics; AGENTMAIL_INBOX_ID still missing (sends queue without it)

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
## 2026-09-20 — Untitled UI primitives adopted
- Changed: CLI-installed button/badges/input + amber brand theme tokens, ui/* adapters keep call-site API, Badge status pills, phosphor stays for content icons
- Reason: polished accessible primitives (aria, loading, focus) instead of hand-rolled kit
- Checks: lint 0 errors (vendored dirs ignored), build pass, unit 9 pass, e2e 3 pass, site 200, pushed
- Notes: brand-600 deepened to amber-700 for white-text contrast; no backend change
## 2026-09-20 — Audit fixes: email routing, atomic orders, active catalog
- Changed: notifyVendor sends to vendor.email (was buyerPhone), place schedules notify, list active-only take 200, importer S-XL, wedding regex, swim reclassified (9), Any chip, shared filter hook, README, OG image
- Reason: core order loop was broken for real sends; drafts leaked into catalog
- Checks: lint 0 errors, build pass, unit 11 pass, atomic order verified live (place to queued event)
- Notes: need Dera EMAIL to activate real sends
## 2026-09-20 — Full store IA shipped
- Changed: header/footer, landing hero + occasions + new-in, /catalog with sort/count, /product PDP, /cart, /checkout with groupId, /order receipt + live tracking, /store storefront, cart context + localStorage
- Reason: single page felt like filter demo, not a store
- Checks: lint 0 errors, build 8 routes, unit 11 pass, e2e 3 pass, all routes 200 live, pushed
- Notes: query-param detail URLs (static hosting); PDP gallery is single photo (only data we have)

## 5. Open TODOs / Next steps
- [ ] Get Dera's EMAIL address so order emails send for real (currently queued honestly)
- [ ] Dera to confirm sizes/fabrics (names/prices/photos real from her site)
- [ ] Full-access AGENTMAIL_API_KEY, then demo video, social post, vibeapps submit
- [ ] Decide whether to commit/push the large uncommitted frontend restyle and cleanup
- [ ] Redeploy convex.site so the vendor-styleguide redesign is live (site still shows old UI)

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

## 2026-09-20 22:37 — repo-describe: GitHub description 'Created with Software Factory' -> 'AI-powered Nigerian fashion market: chat your style, AI finds it in real stores' (verified via gh repo view)
- Changed: (edit this line — files/sections touched)
- Reason: repo-describe: GitHub description 'Created with Software Factory' -> 'AI-powered Nigerian fashion market: chat your style, AI finds it in real stores' (verified via gh repo view)
- Checks: not-run (update after ./factory.sh check jara)
- Git log:
  dfbd57f Update footprint and hackathon log: audit fixes and store IA
  3e238ae Full store IA: header/footer, landing, catalog, PDP, cart, checkout, order tracking, storefront
  9ffc324 Update footprint and hackathon log: Untitled UI adoption
- Notes: (anything the next agent must know)
## 2026-09-21 — Frontend polish and cleanup
- Changed: shared button/price/skeleton helpers, removed unused UI deps, ignored generated Convex files, sharpened hero/occasion layout
- Reason: make storefront bolder while removing dead/duplicated frontend code
- Checks: lint clean, build pass, unit 11 pass, e2e 3 pass
- Notes: large frontend restyle remains uncommitted; hydration warning observed in dev browser log but no console-error test failure
## 2026-09-21 — Redesign from vendor styleguide (designmd.supply)
- Changed: styleguide+brand API for styleinlagos.ng → violet/blush/ink tokens, Roboto Condensed + Open Sans, 32px pills, flat 8px cards, light hero/store/receipt
- Reason: UI needed a real identity; vendor's own design language instead of invented theme
- Checks: lint clean, build pass, unit 11 pass, e2e 3 pass, baseline regenerated
- Notes: 8-persona critique delivered; fixes not yet built; redesign not yet redeployed
## 2026-09-21 — Persona fixes (all but billionaire)
- Changed: OTP verify flow, rate limits, bot traps, flagged orders, stock/sale fields, wishlist, buy-again, share buttons, budget shelf, gram strip, delivery fees, vendor PIN orders + alerts
- Reason: 8-persona critique (heavy/one-time/introvert/creep/extrovert/thrifty/entrepreneur)
- Checks: lint clean, build pass, unit 15 pass, e2e 3 pass
- Notes: e2e hardened for cold servers (single click + long waits, no networkidle — Convex socket never idles); OTP email needs AGENTMAIL keys; needs redeploy
## 2026-09-21 — Secrets activated (values never committed)
- Changed: VENDOR_PIN + AGENTMAIL_API_KEY set on dev and prod env; backend pushed to dev; PIN gate verified true/false live
- Reason: activate vendor orders view + real sends/OTP delivery
- Checks: checkPin true on correct PIN, false on wrong PIN
- Notes: AGENTMAIL_INBOX_ID still missing so sends still queue; prod code deploy still pending
## 2026-09-21 — Pushed + deployed to prod
- Changed: committed b93c3e7, pushed to GitHub; backend via `convex deploy --yes`; frontend via static-hosting --skip-convex
- Reason: ship redesign + persona batch to the live business URL
- Checks: live site verified at runtime — 57 owambe + 26 church + 15 street = 98 listings, new UI serving
- Notes: non-interactive deploy needs --yes flag; static HTML shows 0 counts pre-hydration (normal); INBOX_ID still missing
## 2026-09-21 — Otto-pattern footer adapted
- Changed: footer rebuilt as white rounded card (violet glow, shop/vendor columns, social buttons, giant JARA watermark) under kept dark CTA panel
- Reason: adapt Otto reference to Jara brand/tokens/routes
- Checks: lint clean, build pass, unit 22 pass, e2e 3 pass, baseline unchanged
- Notes: no framer/lucide/cn/tooltip deps added; tooltips are native title+aria; uncommitted
## 2026-09-21 — Hero art, chat UI, vendor table
- Changed: concierge-hero (browser mock + draggable card, real data); /chat with composer + deterministic brain + threads; vendor orders table with status menu; serial e2e workers
- Reason: integrate Finlayer/composer/table patterns for hero, chat, vendor flows
- Checks: lint clean, build pass, unit 29 pass, e2e 4 pass
- Notes: no framer/lucide/cn deps; LLM agent still needs OPENAI_API_KEY; uncommitted
## 2026-09-21 — Reference-look homepage + PDP
- Changed: MADNESS homepage (banner, giant JARA, editorial grid, tiles, red CTA); Nextgen PDP (gallery, countdown, accordions, shipping); real reviews table + UI; related pieces; black button variant; crimson/cloud/star tokens
- Reason: pixel-faithful build from hero.jpg + product-page reference, Jara content only
- Checks: lint clean, build pass, unit 36 pass, e2e 4 pass, baseline regenerated
- Notes: reviews are real (empty until shoppers write); thumbs share the single vendor photo; mobile tiles match reference rhythm; uncommitted
## 2026-09-21 — LLM concierge channel (key-gated)
- Changed: agent-protocol lib + tests; agent.reply action with 3-tool loop + status query; chat prefers LLM, falls back honestly with on-screen indicator
- Reason: Phase 0 agentic commerce — model reasons over tools, guardrails in system prompt
- Checks: lint clean, build pass, unit 33 pass, e2e 4 pass (deterministic path; LLM path needs key)
- Notes: send OPENAI_API_KEY to verify the live loop; uncommitted
## 2026-09-21 — Purple leads the brand
- Changed: violet promoted to primary (buttons, chips, steps, cart, ticker, giant word, tiles, CTA panel); accent redefined as blush; crimson kept for sale only; violet selection + glow accents
- Reason: brand is purple + white — purple was wrongly secondary
- Checks: lint clean, build pass, unit 36 pass, e2e 4 pass, baseline regenerated, screenshots verified
- Notes: uncommitted
## 2026-09-21 — Glass buttons, photo galleries, motion fixes
- Changed: violet glass hover on solid buttons; photoUrls schema + importer galleries; card hover swap; PDP thumbnail gallery; fixed motion.button drag-type clash + chat JSX break
- Reason: hover button-to-glass; second photo on hover; full gallery on PDP
- Checks: lint clean, build pass, unit 36 pass, e2e 4 pass
- Notes: uncommitted
