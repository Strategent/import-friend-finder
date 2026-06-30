import { expect, test } from "@playwright/test";

test.describe("URL-backed route state", () => {
  test("CRM reflects query and stage params", async ({ page }) => {
    await page.goto("/crm?q=denis&stage=Proposal");

    await expect(page.getByRole("searchbox", { name: /search clients/i })).toHaveValue("denis");
    await expect(page.getByRole("radio", { name: "Proposal" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    await expect(page.getByText("Denis Marlow")).toBeVisible();
    await expect(page.getByText("Eleanor Hartley")).toBeHidden();
  });

  test("Inbox reflects folder, thread, and query params", async ({ page }) => {
    await page.goto("/inbox?folder=VIPs&thread=2&q=marcus");

    await expect(page.getByRole("button", { name: "Mailboxes" })).toContainText("VIPs");
    await expect(page.getByRole("textbox", { name: "Search mail" })).toHaveValue("marcus");
    await expect(page.getByText("Marcus Reed").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Onboarding questions" })).toBeVisible();
  });

  test("Calendar reflects date and mode params", async ({ page }) => {
    await page.goto("/calendar?date=2026-01-16&mode=agenda");

    await expect(page.getByRole("radio", { name: "Agenda" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    await expect(page.getByText("4 booked")).toBeVisible();
    await expect(page.getByText("Hartley Family Trust")).toBeVisible();
  });
});
