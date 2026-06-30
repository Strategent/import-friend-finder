import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/crm", "/inbox", "/calendar", "/channels"];

test.describe("axe accessibility checks", () => {
  for (const route of routes) {
    test(`${route} has no automatically detectable violations`, async ({ page }) => {
      await page.goto(route);

      const results = await new AxeBuilder({ page }).analyze();

      expect(results.violations).toEqual([]);
    });
  }
});
