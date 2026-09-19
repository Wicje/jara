# tests.md — tdd reference (load on demand)

## What is a good test?

Verifies behavior through public interfaces (seams), not internals.
Good: "Button renders accessible name, disables while loading, defaults
`type=button`". Bad: "internal state variable equals 3".

## Seams in factory projects

- Component props contract (`Button props { variant, size, loading }`)
- Route behavior (`/` renders `<main>`, no console errors)
- Server action / handler input->output
- Form validation via props callback, not DOM internals

## Mocking

Mock at the adapter edge (fetch, DB, auth), never the module under test.
Prefer real rendering (`@testing-library/react`) over shallow mocks.
One mock per seam; if you need three mocks the seam is wrong — re-agree it.

## Sizing

- Unit (vitest, jsdom, ~5s): component behavior in isolation.
- E2E smoke (playwright, ~10s): route loads, `<main>` visible, no errors.
- Visual (playwright): baseline compare; update snapshots only when
  the design change is intentional.
