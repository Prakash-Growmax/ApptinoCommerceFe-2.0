//  src/test/utils/index.ts
// Re-export all test utilities from a single entry point

// Components
export * from './test-providers';

// Utilities (excluding render to avoid conflict)
export * from './i18n';

// Testing library with custom render (this includes the render function)
export * from './testing-library';
