import { render } from '@/test/utils/render';
import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { server } from '@/test/mocks/server';
import UserPreferences from '../UserPreferences';

// Add MSW setup
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserPreferences', () => {
  beforeEach(() => {
    // Mock successful preferences update
    server.use(
      http.put('/api/user/preferences', () => {
        return HttpResponse.json({
          success: true,
          message: 'Preferences updated successfully',
          data: {
            theme: 'dark',
            language: 'en',
            notifications: true,
            dateFormat: 'MM/DD/YYYY'
          }
        });
      }),
      
      http.get('/api/user/preferences', () => {
        return HttpResponse.json({
          success: true,
          data: {
            theme: 'light',
            language: 'en',
            notifications: true,
            dateFormat: 'MM/DD/YYYY'
          }
        });
      })
    );
  });

  it('should render all preference options', async () => {
    render(<UserPreferences />);
    
    // Look for the actual text that's rendered
    expect(await screen.findByText('Theme Preferences')).toBeInTheDocument();
    expect(await screen.findByText('Language & Region')).toBeInTheDocument();
    expect(await screen.findByText('Notifications')).toBeInTheDocument();
    expect(await screen.findByText('Date Format')).toBeInTheDocument();
  });

  it('should toggle theme preference', async () => {
    const { user } = render(<UserPreferences />);
    
    const themeToggle = await screen.findByRole('switch', { name: /dark mode/i });
    expect(themeToggle).toHaveAttribute('aria-checked', 'false');

    await user.click(themeToggle);
    expect(themeToggle).toHaveAttribute('aria-checked', 'true');
  });

  it('should change language preference', async () => {
    const { user } = render(<UserPreferences />);

    // Look for the language select trigger button
    const languageSelect = await screen.findByRole('button', { name: /select language/i });
    await user.click(languageSelect);

    // Wait for the dropdown to appear and select Spanish
    const spanishOption = await screen.findByText('Spanish');
    await user.click(spanishOption);

    // Verify the selection
    expect(await screen.findByText('Spanish')).toBeInTheDocument();
  });

  it('should save preferences when form is submitted', async () => {
    const { user } = render(<UserPreferences />);

    const saveButton = await screen.findByRole('button', { name: /save preferences/i });
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('Preferences updated successfully')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should handle save errors gracefully', async () => {
    // Mock a failed save
    server.use(
      http.put('/api/user/preferences', () => {
        return HttpResponse.json({
          success: false,
          message: 'Failed to update preferences'
        }, { status: 400 });
      })
    );

    const { user } = render(<UserPreferences />);

    const saveButton = await screen.findByRole('button', { name: /save preferences/i });
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('Failed to update preferences')).toBeInTheDocument();
    });
  });

  it('should show loading state when saving', async () => {
    // Mock a delayed response
    server.use(
      http.put('/api/user/preferences', async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return HttpResponse.json({
          success: true,
          message: 'Preferences updated successfully'
        });
      })
    );

    const { user } = render(<UserPreferences />);

    const saveButton = await screen.findByRole('button', { name: /save preferences/i });
    await user.click(saveButton);

    // Check for loading state
    expect(screen.getByText('Saving...')).toBeInTheDocument();
  });
});