import { test, expect } from "@playwright/test";

test.use({ reducedMotion: "reduce" });

test("homepage matches baseline visual", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main")).toBeVisible();
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot("home.png", {
    animations: "disabled",
    mask: [
      page.locator("section[aria-label='Shop by occasion'] ul"),
      page.getByRole("list", { name: "Products" }),
      page.locator("section[aria-label='Find your fit'] div.grid"),
    ],
  });
});
