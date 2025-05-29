import type { ReactNode } from 'react';

// Common component props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// API Response types

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface FormState {
  isSubmitting: boolean;
  isValid: boolean;
  errors: Record<string, string>;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  icon?: ReactNode;
  disabled?: boolean;
  external?: boolean;
}

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system';
