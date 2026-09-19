import { test, expect } from "@playwright/test";

test("homepage matches baseline visual", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main")).toBeVisible();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveScreenshot("home.png", { animations: "disabled" });
});