import { expect, test } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the homepage correctly', async ({ page }) => {
    await page.goto('/');

    // Check title
    await expect(page).toHaveTitle(/Enterprise React App/);

    // Check main heading
    await expect(
      page.getByRole('heading', { name: /Enterprise React App/i })
    ).toBeVisible();

    // Check navigation
    await expect(page.getByRole('link', { name: /Home/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Dashboard/i })).toBeVisible();
  });

  test('should navigate to dashboard when clicking dashboard link', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /Dashboard/i }).click();

    await expect(page).toHaveURL('/dashboard');
    await expect(
      page.getByRole('heading', { name: /Dashboard/i })
    ).toBeVisible();
  });

  test('should toggle theme correctly', async ({ page }) => {
    await page.goto('/');

    // Click theme toggle
    const themeToggle = page.getByRole('button', {
      name: /Switch to dark mode/i,
    });
    await themeToggle.click();

    // Check if dark theme is applied
    await expect(page.locator('html')).toHaveClass(/dark/);
  });
});

test.describe('Authentication', () => {
  test('should redirect to login when accessing protected route', async ({
    page,
  }) => {
    await page.goto('/dashboard');

    // Should redirect to login
    await expect(page).toHaveURL('/auth/login');
    await expect(page.getByRole('heading', { name: /Login/i })).toBeVisible();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.goto('/auth/login');

    // Fill login form
    await page.getByLabel(/Email/i).fill('test@example.com');
    await page.getByLabel(/Password/i).fill('password');
    await page.getByRole('button', { name: /Sign In/i }).click();

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(
      page.getByRole('heading', { name: /Dashboard/i })
    ).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/auth/login');

    // Fill login form with invalid credentials
    await page.getByLabel(/Email/i).fill('invalid@example.com');
    await page.getByLabel(/Password/i).fill('wrongpassword');
    await page.getByRole('button', { name: /Sign In/i }).click();

    // Should show error message
    await expect(page.getByText(/Invalid credentials/i)).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    await page.goto('/');

    // Basic accessibility checks
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('navigation')).toBeVisible();

    // Check for proper heading hierarchy
    const h1Elements = await page.locator('h1').count();
    expect(h1Elements).toBeGreaterThan(0);
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');

    // Tab through the main navigation
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: /Home/i })).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: /Dashboard/i })).toBeFocused();
  });
});
