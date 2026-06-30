import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", title: /Dashboard/, text: "Welcome back, John." },
  { path: "/crm", title: /CRM/, text: "Every relationship in one place" },
  { path: "/inbox", title: /Inbox/, text: "Inbox" },
  { path: "/calendar", title: /Calendar/, text: "Book a meeting" },
  { path: "/channels", title: /Channels/, text: "sales-pipeline" },
  { path: "/syra", title: /Syra/, text: "Draft, analyze, automate" },
  { path: "/connectors", title: /Connectors/, text: "Request connector" },
  { path: "/support", title: /Support/, text: "Strategent Support" },
  { path: "/design-system", title: /Design System/, text: "Design System" },
];

test.describe("route smoke coverage", () => {
  for (const route of routes) {
    test(`${route.path} renders`, async ({ page }) => {
      await page.goto(route.path);

      await expect(page).toHaveTitle(route.title);
      await expect(page.getByText(route.text).first()).toBeVisible();
    });
  }
});
