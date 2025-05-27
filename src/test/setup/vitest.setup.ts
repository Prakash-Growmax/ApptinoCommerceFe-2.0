// src/test/setup/vitest.setup.ts
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

// Import your MSW handlers here
import { handlers } from '../mocks/handlers';

// Setup MSW server
const server = setupServer(...handlers);

// Start the MSW server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Reset handlers after each test (important for test isolation)
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

// Close server after all tests
afterAll(() => server.close());

// Mock IntersectionObserver
class MockIntersectionObserver {
  readonly root: Element | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;

  constructor() {
    this.root = null;
    this.rootMargin = '0px';
    this.thresholds = [0];
  }

  disconnect() {
    return null;
  }

  observe() {
    return null;
  }

  takeRecords() {
    return [];
  }

  unobserve() {
    return null;
  }
}

// Mock ResizeObserver
class MockResizeObserver {
  constructor() {}

  disconnect() {
    return null;
  }

  observe() {
    return null;
  }

  unobserve() {
    return null;
  }
}

// Assign mocks to global
global.IntersectionObserver = MockIntersectionObserver;
global.ResizeObserver = MockResizeObserver;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock the console.error to fail tests when React error boundaries catch errors
const originalConsoleError = console.error;
console.error = (...args) => {
  // Check if the error is related to React
  if (
    typeof args[0] === 'string' &&
    args[0].includes(
      'React will try to recreate this component tree from scratch'
    )
  ) {
    throw new Error('React Error Boundary caught an error: ' + args.join(' '));
  }
  originalConsoleError(...args);
};
