import type { Page } from "@playwright/test";

/**
 * Collects page console errors, ignoring environmental noise:
 * remote CDN load failures and transient connectivity blips.
 * Real JS errors still fail the test.
 */
export function trackConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    const text = message.text();
    if (text.startsWith("Failed to load resource")) return;
    if (text.includes("net::ERR_") || text.startsWith("WebSocket connection")) return;
    errors.push(text);
  });
  return errors;
}
