import { ReactNode } from 'react';

export interface RouteObject {
  path: string;
  element?: ReactNode;
  children?: {
    path?: string;
    index?: boolean;
    element: ReactNode;
  }[];
}
