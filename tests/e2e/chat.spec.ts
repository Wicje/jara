import { test, expect } from "@playwright/test";
import { trackConsoleErrors } from "./console-track";

test("concierge chat answers with real recommendations", async ({ page }) => {
  test.setTimeout(120000);
  const errors = trackConsoleErrors(page);

  await page.goto("/chat?q=owambe%20dress%20under%20100000%20size%20M");
  await expect(page.getByRole("heading", { name: "Ask Jara" })).toBeVisible();
  // The concierge answers with picks from the live catalog.
  await expect(page.getByText(/found \d+ pieces?/i)).toBeVisible({ timeout: 60000 });
  const reply = page.getByLabel("Conversation");
  await expect(reply.getByRole("link").first()).toBeVisible();
  // Follow-up chips keep the conversation going (size + budget known, so occasions).
  await expect(page.getByRole("button", { name: "Church" })).toBeVisible();

  expect(errors, "page reported console errors").toEqual([]);
});
