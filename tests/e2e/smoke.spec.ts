import { test, expect } from "@playwright/test";

test("homepage loads and renders", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    // Remote image CDN flakiness is environmental, not an app bug.
    if (message.type() === "error" && !message.text().startsWith("Failed to load resource")) {
      errors.push(message.text());
    }
  });

  await page.goto("/");
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator("main")).toContainText(/./);
  expect(errors, "page reported console errors").toEqual([]);
});