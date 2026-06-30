import { expect, test } from "@playwright/test";

test("design system catalog exposes core app primitives", async ({ page }) => {
  await page.goto("/design-system");

  await expect(page).toHaveTitle(/Design System/);
  await expect(page.getByRole("heading", { name: "Design System" })).toBeVisible();
  await expect(page.getByText("SearchField")).toBeVisible();
  await expect(page.getByText("StatusBadge")).toBeVisible();
  await expect(page.getByText("DataTable")).toBeVisible();
});
