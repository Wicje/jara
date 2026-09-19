# Before-ship checklist

Run through this before calling anything done.
Copy into every project's `docs/` so it travels with the code.

## Functionality
- [ ] Works on mobile (test at 375px, 768px, 1280px, 1920px)
- [ ] Works on the oldest browser you support
- [ ] All links go where they say they go
- [ ] No console errors in the browser
- [ ] Loading / empty / error states all handled

## Accessibility
- [ ] Tab through the whole page — you can see where you are at all times
- [ ] Every button/input has an accessible name
- [ ] Contrast passes on all text (use axe or a contrast checker)
- [ ] Images have alt text or are marked decorative

## Quality
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] `npm run test:unit` passes
- [ ] `npm run test:e2e` passes
- [ ] Visual baseline updated ONLY when the change is intentional
- [ ] No leftover console.log / console.log debugging
- [ ] No unused imports or dead code
- [ ] Spelling and copy checked

## Release
- [ ] Committed with a clear message
- [ ] Pushed to GitHub (CI runs automatically)
- [ ] Reviewed on a preview URL before going live