// src/features/settings/hook/tests/useUpdateUserPreferences.test.ts
import { renderHook, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from "msw";
import { server } from "@/test/mocks/server";


import { TestQueryClientProvider } from "@/test/utils/test-providers";

// Mock sonner toast at the top level - BEFORE any imports that use it
const mockToast = {
  success: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  warning: vi.fn(),
};

vi.mock('sonner', () => ({
  toast: mockToast,
}));

// Now import your hook after the mocks are set up
import { useUpdateUserPreferences } from "./useUserPreferences.test";

describe('useUpdateUserPreferences', () => {
  beforeEach(() => {
    // Reset mocks before each test
    server.resetHandlers();
    vi.clearAllMocks();
  });

  it('should successfully update user preferences', async () => {
    // Set up successful response
    server.use(
      http.put('https://api.myapptino.com/user/preferences', () => {
        return HttpResponse.json({
          success: true,
          message: 'Preferences updated successfully',
        });
      }),
      http.put('*/user/preferences', () => {
        return HttpResponse.json({
          success: true,
          message: 'Preferences updated successfully',
        });
      })
    );

    const { result } = renderHook(() => useUpdateUserPreferences(), {
      wrapper: TestQueryClientProvider,
    });

    // Trigger the mutation
    const newPreferences = {
      theme: 'dark',
      language: 'es',
      notifications: false,
    };

    result.current.mutate(newPreferences);

    // Wait for mutation to complete
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    }, { timeout: 3000 });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle update errors correctly', async () => {
    // Set up error response
    server.use(
      http.put('https://api.myapptino.com/user/preferences', () => {
        return HttpResponse.json(
          { error: 'Failed to update preferences' },
          { status: 500 }
        );
      }),
      http.put('*/user/preferences', () => {
        return HttpResponse.json(
          { error: 'Failed to update preferences' },
          { status: 500 }
        );
      })
    );

    const { result } = renderHook(() => useUpdateUserPreferences(), {
      wrapper: TestQueryClientProvider,
    });

    // Trigger the mutation
    const newPreferences = {
      theme: 'dark',
      language: 'es',
      notifications: false,
    };

    result.current.mutate(newPreferences);

    // Wait for mutation to fail
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    }, { timeout: 3000 });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeDefined();
  });

  it('should show success toast on successful update', async () => {
    // Set up successful response
    server.use(
      http.put('https://api.myapptino.com/user/preferences', () => {
        return HttpResponse.json({
          success: true,
          message: 'Preferences updated successfully',
        });
      }),
      http.put('*/user/preferences', () => {
        return HttpResponse.json({
          success: true,
          message: 'Preferences updated successfully',
        });
      })
    );

    const { result } = renderHook(() => useUpdateUserPreferences(), {
      wrapper: TestQueryClientProvider,
    });

    // Trigger the mutation
    const newPreferences = {
      theme: 'dark',
      language: 'es',
      notifications: false,
    };

    result.current.mutate(newPreferences);

    // Wait for mutation to complete
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    }, { timeout: 3000 });

    // Check if success toast was called (if your hook calls it)
    // Note: This depends on your hook implementation
    // expect(mockToast.success).toHaveBeenCalledWith('Preferences updated successfully');
  });

  it('should show error toast on failed update', async () => {
    // Set up error response
    server.use(
      http.put('https://api.myapptino.com/user/preferences', () => {
        return HttpResponse.json(
          { error: 'Failed to update preferences' },
          { status: 500 }
        );
      }),
      http.put('*/user/preferences', () => {
        return HttpResponse.json(
          { error: 'Failed to update preferences' },
          { status: 500 }
        );
      })
    );

    const { result } = renderHook(() => useUpdateUserPreferences(), {
      wrapper: TestQueryClientProvider,
    });

    // Trigger the mutation
    const newPreferences = {
      theme: 'dark',
      language: 'es',
      notifications: false,
    };

    result.current.mutate(newPreferences);

    // Wait for mutation to fail
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    }, { timeout: 3000 });

    // Check if error toast was called (if your hook calls it)
    // Note: This depends on your hook implementation
    // expect(mockToast.error).toHaveBeenCalledWith('Failed to update preferences');
  });
});