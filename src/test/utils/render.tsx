// src/test/utils/render.ts
import { ReactElement } from 'react';

import { RenderOptions, RenderResult, render } from '@testing-library/react';
import { UserEvent, userEvent } from '@testing-library/user-event';

import {
  TestI18nextProvider,
  TestMemoryRouterProvider,
  TestQueryClientProvider,
} from './test-providers';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
  routerOptions?: {
    initialEntries?: string[];
  };
}

interface CustomRenderResult extends RenderResult {
  user: UserEvent;
}

/**
 * Custom render function that wraps the component with all providers
 */
export const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
): CustomRenderResult => {
  const route = options?.route || '/';
  const routerOptions = options?.routerOptions || { initialEntries: [route] };

  return {
    user: userEvent.setup(),
    ...render(ui, {
      wrapper: ({ children }) => (
        <TestMemoryRouterProvider routerOptions={routerOptions}>
          <TestQueryClientProvider>
            <TestI18nextProvider>{children}</TestI18nextProvider>
          </TestQueryClientProvider>
        </TestMemoryRouterProvider>
      ),
      ...options,
    }),
  };
};

// Export with the expected name
export { customRender as render };
