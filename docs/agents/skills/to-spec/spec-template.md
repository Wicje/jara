# Spec template — copy to docs/spec.md

> Durable across refactors: NO file paths, NO line numbers, NO code dumps.

## 1. Problem

What hurts, for whom, why now. 3-5 lines.

## 2. Solution

What we build, in plain language. Smallest working version first.

## 3. User stories

- As a [who], I can [what], so that [why]. Acceptance: [observable outcome].
- (One per vertical slice. Each slice demoable in one context window.)

## 4. Implementation decisions

- Seams (public interfaces): _e.g. `/` route renders hero+pricing; `NewsletterForm` props `{ onSubscribe(email): Promise<void> }`_
- Testing seams: _e.g. form validates via props contract; route smoke via e2e_
- Out-of-scope for v1: _explicit_

## 5. Testing decisions

- Unit at seams: _what behavior, through which interface_
- E2E: _which flows stay green_
- Visual: _baseline update only if intentional_

## 6. Out-of-scope

What this spec explicitly does NOT cover. Empty = rejected.

## 7. Readiness

- [ ] Seams agreed with human
- [ ] Tracer bullet identified (slice 01)
- [ ] Labelled `ready-for-tickets` in footprint
