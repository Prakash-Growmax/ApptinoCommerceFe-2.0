// src/test/setup.ts
import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { server } from '../mocks/server';

// Establish API mocking before all tests
beforeAll(() => {
  server.listen({ 
    onUnhandledRequest: 'warn' // Changed from 'error' to 'warn' for easier debugging
  });
});

// Reset any request handlers that are declared as a part of our tests
afterEach(() => {
  server.resetHandlers();
});

// Clean up after the tests are finished
afterAll(() => {
  server.close();
});

// Mock localStorage for browser environment
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});


const mockToast = vi.fn();
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));


// Reset localStorage mocks after each test
afterEach(() => {
  vi.clearAllMocks();
  localStorageMock.clear();
  mockToast.mockClear();
});