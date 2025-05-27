import { expect, test } from './fixtures/auth';

test.describe('Dashboard (Authenticated)', () => {
  test('should display dashboard correctly when authenticated', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.goto('/dashboard');

    await expect(
      authenticatedPage.getByRole('heading', { name: /Dashboard/i })
    ).toBeVisible();
    await expect(authenticatedPage.getByText(/Total Users/i)).toBeVisible();
    await expect(authenticatedPage.getByText(/Revenue/i)).toBeVisible();
  });

  test('should logout successfully', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/dashboard');

    // Click logout button (adjust selector based on your implementation)
    await authenticatedPage.getByRole('button', { name: /Logout/i }).click();

    // Should redirect to home or login
    await expect(authenticatedPage).toHaveURL('/');
  });
});
