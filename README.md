# Jara — AI fashion market for Lagos

Jara means extra value. Chat the occasion, budget, and size. Jara matches
you with real pieces from Lagos boutiques. Order in one tap. The vendor
confirms by email, and the order timeline updates live.

- **Live site:** https://usable-bee-860.convex.site
- **Vendor:** https://usable-bee-860.convex.site/vendor
- **Repo:** https://github.com/Wicje/jara (public)

## Stack

- **Backend:** Convex (database, functions, realtime sync, file storage, static hosting)
- **Frontend:** Next.js + TypeScript + Tailwind, Untitled UI primitives
- **AI:** OpenAI via server actions (BYO key; AI Gateway is paid-only)
- **Catalog:** Firecrawl scrapes the vendor WooCommerce store into listings
- **Inbox:** AgentMail order threads (outbound to vendor, inbound reply via webhook)

## Run locally

```bash
npm install
npx convex dev        # creates convex/_generated + sets CONVEX_URL in .env.local
npm run dev
```

Seed the catalog (dev):

```bash
npx convex run seed:seedDera '{}'        # first seed
npx convex run seed:replaceCatalog '{}'  # replace with Firecrawl-fed data
```

## Environment variables

Set on the Convex deployment (`npx convex env set KEY value`, add `--prod`
for production). Never commit keys.

| Variable | Required | Purpose |
|---|---|---|
| `CONVEX_DEPLOYMENT` | dev only | selects the dev deployment (set by `npx convex dev`) |
| `NEXT_PUBLIC_CONVEX_URL` | yes | frontend Convex endpoint (`.env.local`) |
| `OPENAI_API_KEY` | for AI concierge | server-action model access |
| `AGENTMAIL_API_KEY` | for real order emails | AgentMail send API |
| `AGENTMAIL_INBOX_ID` | for real order emails | sending inbox |
| `AGENTMAIL_WEBHOOK_SECRET` | recommended | verifies inbound vendor replies |
| `FIRECRAWL_API_KEY` | for real crawls | vendor importer |

Without `AGENTMAIL_*` keys, order emails are recorded as queued timeline
events so the demo still runs. Without `FIRECRAWL_API_KEY`, the importer
dry-runs honestly. Vendor email must be on the vendor record or sends queue.

## Checks

```bash
npm run lint && npm run build
npm run test:unit
npx playwright test
```

## Deploy

```bash
npm run deploy   # backend to prod + static frontend to convex.site
```
