import { test, expect } from "@playwright/test";
import { trackConsoleErrors } from "./console-track";

test("homepage loads and renders", async ({ page }) => {
  const errors = trackConsoleErrors(page);

  await page.goto("/");
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator("main")).toContainText(/./);
  expect(errors, "page reported console errors").toEqual([]);
});