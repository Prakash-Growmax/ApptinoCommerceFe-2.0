// src/features/settings/hook/tests/useUserPreferences.test.ts
import { renderHook, waitFor } from "@testing-library/react";
import { server } from "@/test/mocks/server";
import { TestQueryClientProvider } from "@/test/utils/test-providers";
import { useUserPreferences } from "../useUserPreferences"; // Fix: Import the actual hook, not the test file

// Import MSW functions based on your version
// For MSW v1:
import { rest } from "msw";
// For MSW v2 (comment out the line above and uncomment below):
// import { http, HttpResponse } from "msw";

describe('useUserPreferences', () => {
  beforeEach(() => {
    // Only reset handlers if server is defined
    if (server) {
      server.resetHandlers();
    }
  });

  it('should fetch user preferences successfully', async () => {
    // Set up successful response handler
    server.use(
      // MSW v1 syntax:
      rest.get('*/user/preferences', (req, res, ctx) => {
        return res(ctx.json({
          theme: 'light',
          language: 'en',
          notifications: true,
        }));
      })
      
      // MSW v2 syntax (replace the above with this if using v2):
      // http.get('*/user/preferences', () => {
      //   return HttpResponse.json({
      //     theme: 'light',
      //     language: 'en',
      //     notifications: true,
      //   });
      // })
    );

    const { result } = renderHook(() => useUserPreferences(), {
      wrapper: TestQueryClientProvider,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    }, { timeout: 3000 });

    expect(result.current.data).toEqual({
      theme: 'light',
      language: 'en',
      notifications: true,
    });
  });

  it('should handle error when fetching preferences fails', async () => {
    // Override the default handler to return an error
    server.use(
      // MSW v1 syntax:
      rest.get('*/user/preferences', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ error: 'Failed to fetch preferences' })
        );
      })

      // MSW v2 syntax (replace the above with this if using v2):
      // http.get('*/user/preferences', () => {
      //   return HttpResponse.json(
      //     { error: 'Failed to fetch preferences' },
      //     { status: 500 }
      //   );
      // })
    );

    const { result } = renderHook(() => useUserPreferences(), {
      wrapper: TestQueryClientProvider,
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    }, { timeout: 3000 });

    expect(result.current.error).toBeDefined();
  });

  it('should update preferences successfully', async () => {
    // Mock the update endpoint
    server.use(
      // MSW v1 syntax:
      rest.put('*/user/preferences', (req, res, ctx) => {
        return res(ctx.json({
          success: true,
          message: 'Preferences updated successfully',
        }));
      })

      // MSW v2 syntax (replace the above with this if using v2):
      // http.put('*/user/preferences', () => {
      //   return HttpResponse.json({
      //     success: true,
      //     message: 'Preferences updated successfully',
      //   });
      // })
    );

    const { result } = renderHook(() => useUserPreferences(), {
      wrapper: TestQueryClientProvider,
    });

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    }, { timeout: 3000 });

    // Test the mutation (if your hook has one)
    if (result.current.updatePreferences) {
      result.current.updatePreferences({
        theme: 'dark',
        language: 'es',
        notifications: false,
      });

      await waitFor(() => {
        expect(result.current.isUpdating).toBe(false);
      }, { timeout: 3000 });
    }
  });
});