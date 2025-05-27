import { getEnvironmentVariables } from '@config/environment';
import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

const { ENABLE_MOCKS } = getEnvironmentVariables();

// Create MSW worker
export const worker = setupWorker(...handlers);

// Initialize MSW worker if mocks are enabled
if (ENABLE_MOCKS) {
  console.info('Mock Service Worker is enabled');
}
