import { expect, test } from "@playwright/test";

test.describe("CRM table and filter interactions", () => {
  test("search, stage filter, and row selection update the visible table", async ({ page }) => {
    await page.goto("/crm");
    await page.waitForLoadState("networkidle");

    const clientSearch = page.getByPlaceholder("Search clients, companies, email...");

    await clientSearch.click();
    await page.keyboard.type("denis");
    await expect(page).toHaveURL(/q=denis/);
    await expect(page.getByText("Denis Marlow")).toBeVisible();
    await expect(page.getByText("Eleanor Hartley")).toBeHidden();

    await page.getByRole("radio", { name: "Proposal" }).click();
    await expect(page).toHaveURL(/stage=Proposal/);
    await expect(page.getByRole("radio", { name: "Proposal" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    await expect(page.getByText("Denis Marlow")).toBeVisible();

    await page.getByRole("checkbox", { name: "Select Denis Marlow" }).check();
    await expect(page.getByText("1 selected")).toBeVisible();

    await page.getByRole("button", { name: "Clear search" }).click();
    await expect(clientSearch).toHaveValue("");
    await expect(page.getByText("Raphael Castellanos")).toBeVisible();
    await expect(page.getByText("Owen Fitzgerald")).toBeVisible();
  });
});
