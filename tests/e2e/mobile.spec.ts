import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 375, height: 667 } });

test("mobile store fits 375px: header, hero, occasions, product links", async ({ page }) => {
  // Cold dev servers + live backend can be very slow in shared environments.
  test.setTimeout(120000);
  const errors: string[] = [];
  page.on("console", (message) => {
    // Remote image CDN flakiness is environmental, not an app bug.
    if (message.type() === "error" && !message.text().startsWith("Failed to load resource")) {
      errors.push(message.text());
    }
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
  // Wait for the live catalog to settle: skeletons gone, fonts ready.
  // (Aspect-ratio boxes keep layout stable while photos stream in, and
  // remote photos can be very slow here, so never gate on image bytes.)
  await expect(page.getByLabel("Loading catalog")).toHaveCount(0);
  await page.evaluate(() => document.fonts.ready);
  const firstProduct = products.getByRole("link").first();
  await firstProduct.scrollIntoViewIfNeeded();
  // Click exactly once: on a cold server the PDP route takes a long time to
  // compile, and re-clicking cancels the in-flight navigation.
  await firstProduct.click();
  await expect(page).toHaveURL(/\/product\?id=/, { timeout: 60000 });
  await expect(page.getByRole("button", { name: /add to cart/i })).toBeVisible({ timeout: 20000 });

  expect(errors, "page reported console errors").toEqual([]);
});
