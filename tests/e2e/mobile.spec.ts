import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 375, height: 667 } });

test("mobile store fits 375px: header, hero, occasions, product links", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("/");
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("link", { name: /jara home/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /cart, \d+ items/i })).toBeVisible();
  await expect(page.getByRole("button", { name: "Ask Jara" })).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow, "horizontal overflow at 375px").toBeLessThanOrEqual(1);

  await page.getByRole("link", { name: /owambe/i }).first().click();
  await expect(page).toHaveURL(/\/catalog\?occasion=owambe/);

  const products = page.getByRole("list", { name: "Products" });
  await expect(products.getByRole("link").first()).toBeVisible();
  const firstProduct = products.getByRole("link").first();
  await firstProduct.scrollIntoViewIfNeeded();
  await firstProduct.click();
  await expect(page).toHaveURL(/\/product\?id=/);
  await expect(page.getByRole("button", { name: /add to cart/i })).toBeVisible();

  expect(errors, "page reported console errors").toEqual([]);
});
