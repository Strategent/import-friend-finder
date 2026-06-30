import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", name: "dashboard" },
  { path: "/crm", name: "crm" },
  { path: "/inbox", name: "inbox" },
  { path: "/calendar", name: "calendar" },
  { path: "/channels", name: "channels" },
];

// Pixel comparison is sensitive to render timing. Running many dev-server-backed
// Chrome instances in parallel starves animation/font settling and produces
// false full-frame diffs, so these snapshots run serially.
test.describe.configure({ mode: "serial" });

test.describe("visual regression baselines", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
  });

  for (const route of routes) {
    test(`${route.name} first viewport`, async ({ page }) => {
      await page.goto(route.path);
      await page.addStyleTag({
        content: `
          .sticky.top-0,
          .fixed.bottom-5.right-5 {
            visibility: hidden !important;
          }
        `,
      });

      await expect(page).toHaveScreenshot(`${route.name}.png`, {
        animations: "disabled",
        fullPage: false,
      });
    });
  }
});
