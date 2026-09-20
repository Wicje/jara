# Convex wiring (Dera vendor #1)

Tables: vendors, listings, threads, orders, inboxEvents. See schema.ts.

## First run (you have an account — do this once)

```bash
npx convex dev
```

This creates `convex/_generated/` + sets `CONVEX_URL` in `.env.local`.
Then paste that URL into `.env.local` as `NEXT_PUBLIC_CONVEX_URL`.

## Seed path

Real catalog comes from Dera's IG: https://www.instagram.com/styleinlagosss
Until real photos land, UI uses Unsplash placeholders in `src/data/dera.ts`.
After `npx convex dev`, seed via Convex dashboard or the seed action (next ticket).
