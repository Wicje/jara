import { test, expect } from "@playwright/test";
import { trackConsoleErrors } from "./console-track";

test("homepage loads and renders", async ({ page }) => {
  const errors = trackConsoleErrors(page);

  await page.goto("/");
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator("main")).toContainText(/./);
  // The concierge launcher floats on every page except chat itself.
  const launcher = page.getByRole("link", { name: "Chat with Jara, the shopping concierge" });
  await expect(launcher).toBeVisible();
  await launcher.click();
  await expect(page).toHaveURL(/\/chat/, { timeout: 20000 });
  await expect(page.getByRole("link", { name: "Chat with Jara, the shopping concierge" })).toHaveCount(0);
  expect(errors, "page reported console errors").toEqual([]);
});