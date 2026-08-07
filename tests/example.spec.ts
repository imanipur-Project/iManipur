import { test, expect } from "@chromatic-com/playwright";

test("has title", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveTitle(/iManipur — Independent Initiative for Manipur/);
});

test("has heading", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByText(/Knowledge begins with identity/i)).toBeVisible();
});
