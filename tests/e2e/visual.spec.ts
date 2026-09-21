import { test, expect } from "@playwright/test";

test.use({ reducedMotion: "reduce" });

test("homepage matches baseline visual", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main")).toBeVisible();
  // Settle first: the Convex websocket keeps network perpetually busy, so
  // networkidle never fires. Wait for content + fonts instead.
  await expect(page.getByLabel("Loading new arrivals")).toHaveCount(0);
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot("home.png", {
    animations: "disabled",
    mask: [
      page.locator("section[aria-label='Shop by occasion'] ul"),
      page.getByRole("list", { name: "Products" }),
      page.getByRole("list", { name: "Budget picks" }),
      page.getByRole("list", { name: "Past orders" }),
      page.getByLabel("Banner photo"),
    ],
  });
});
