import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 375, height: 667 } });

test("mobile catalog fits 375px with tappable filters", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("/");
  await expect(page.getByRole("group", { name: "Occasion" })).toBeVisible();
  await expect(page.getByRole("group", { name: "Size" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Ask Jara" })).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow, "horizontal overflow at 375px").toBeLessThanOrEqual(1);

  const firstOrder = page.getByRole("button", { name: "Order this piece" }).first();
  await firstOrder.scrollIntoViewIfNeeded();
  await firstOrder.click();
  await expect(page.getByRole("button", { name: "Continue" })).toBeVisible();

  expect(errors, "page reported console errors").toEqual([]);
});
