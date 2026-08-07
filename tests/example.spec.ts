import { test, expect } from '@chromatic-com/playwright';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Acme/);
});

test('can log in', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Click the get started link.
  await page.getByRole('button', { name: 'Log in' }).click();

  // Expects page to have a heading with the name of Logged In.
  await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
});
