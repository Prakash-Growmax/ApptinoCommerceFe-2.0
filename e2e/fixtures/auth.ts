import { test as base } from '@playwright/test';

// Extend basic test by providing a "authenticatedPage" fixture
export const test = base.extend<{ authenticatedPage: any }>({
  authenticatedPage: async ({ page }, use) => {
    // Perform authentication
    await page.goto('/auth/login');
    await page.getByLabel(/Email/i).fill('test@example.com');
    await page.getByLabel(/Password/i).fill('password');
    await page.getByRole('button', { name: /Sign In/i }).click();

    // Wait for redirect
    await page.waitForURL('/dashboard');

    await use(page);
  },
});

export { expect } from '@playwright/test';
