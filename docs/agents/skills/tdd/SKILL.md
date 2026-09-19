---
name: tdd
description: "Build test-first at pre-agreed seams. Use when implementing a ticket or fixing a bug with a known seam."
version: 1
---

# tdd — red-green-refactor at seams

Use when building a ticket slice or fixing a bug where the seam exists.
Detail in `tests.md` (read only when writing the first test of the task).

## Loop

1. Agree the seam first: "What's the public interface?" (props, route,
   server action, handler). Ask if more than one candidate.
2. Red: one failing test verifying behavior through the seam. One slice only.
3. Green: smallest code to pass. No refactor inside the loop.
4. Refactor belongs to `code-review`, not this loop. Full suite once at end.
5. Typecheck often (`tsc --noEmit` or `lint`); single-file tests often.

## Enforcement

- MUST test only at the agreed seam. MUST NOT couple to internals.
- MUST write the failing test before the fix (red-before-green).
- MUST keep slices vertical (one demoable unit per loop).
- Anti-patterns (reject): implementation-coupled tests, tautologies
  (`expect(add(a,b)).toBe(a+b)`), horizontal slicing.
- If the correct seam does not exist (bug fix), write the regression test
  at the nearest seam first, then fix.
