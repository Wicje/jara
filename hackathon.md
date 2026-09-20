# Jara — hackathon build log

> Judges read this. Keep current: what built, stack, live URL, demo link.

## What
Jara — AI-powered Nigerian fashion market. Chat occasion + budget NGN + size → AI matches live ready-made catalog → order → vendor emailed → live timeline. Vendor #1: Dera's Store (ready-made, Instagram-first).

## Stack
- Backend: Convex (database, functions, realtime sync, file storage) — to be wired
- Frontend: Next.js + TypeScript, to be hosted on convex.site (required)
- AI: OpenAI via server actions (BYO key; AI Gateway is paid-only)
- Crawl: Firecrawl vendor importer (IG/store URL → draft Listings)
- Inbox: AgentMail order threads (outbound to vendor, inbound reply → timeline)

## Live URL
- https://usable-bee-860.convex.site (Convex static hosting, prod backend usable-bee-860)

## Demo
- TODO: <3min video link (clickthrough: chat → match → order → vendor reply → timeline)

## Log
- 2026-09-19: Jara named, Dera's Store locked as vendor #1, spec seams agreed (search/order/inbox/import), tracer defined. Need: Dera IG URL + 10-15 items, Convex project.
- 2026-09-20: Vendor source captured (https://www.instagram.com/styleinlagosss), Convex account ready. Scaffolded schema (vendors/listings/threads/orders/inboxEvents) + concierge catalog slice with Unsplash placeholders. REMINDER: replace placeholders with Dera's real photos. Next: run `npx convex dev`, seed, order + inbox loop.
- 2026-09-20: Convex dev live, seeded 10 Dera listings, UI on live query with order placement + timeline (inboxEvents). Next: AgentMail send/reply, Firecrawl importer, convex.site deploy.
- 2026-09-20: AgentMail loop live (notifyVendor sends or queues honestly, /agentmail/webhook → timeline + status flip, verified placed→confirmed), Firecrawl importer live (dry-run without key). Next: API keys, convex.site deploy, video.
- 2026-09-20: Dera's 19 real photos in (public/dera, local fallback + live DB via syncDera). Deployed: frontend + backend on https://usable-bee-860.convex.site, prod seeded with 19 listings. Next: API keys, demo video, social post, submit.
- 2026-09-20: Firecrawl fed real catalog — scraped styleinlagos.ng (243 items found), replaced all best-guess rows via replaceCatalog: 19 real names/prices/photos live on dev + prod, site redeployed. Sizes/fabrics heuristic, vendor to confirm.
- 2026-09-20: UX overhaul live — Ask-Jara NL box, match reasons, empty states, order scroll wiring, WhatsApp fallback, /vendor importer route, live stats, brand story, favicon/OG. lint/build/unit(9)/e2e green, redeployed.
- 2026-09-20: Repo public (github.com/Wicje/jara), catalog at 98 real listings, taste-skill audit applied: zero em-dashes, 1-dot-per-line meta, sans display H1, 20-word hero, skeleton loaders, Phosphor icons, tactile states, locked radius system. All checks green, redeployed.
- 2026-09-20: Untitled UI primitives adopted (button/badges/input via CLI, amber brand tokens, ui adapters). Badge status pills, aria-correct controls, loading spinners. All checks green, redeployed.
- 2026-09-20: Fixed order loop (vendor.email routing, atomic place+notify, active-only catalog, swim tags, Any chip) and shipped full store: header/footer, landing, catalog with sort, PDP, cart, checkout, live order receipts, Dera storefront. 8 routes live, all checks green.
