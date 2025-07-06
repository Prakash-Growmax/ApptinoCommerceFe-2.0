/**
 * Design System Constants
 * 
 * This file contains all the design tokens and constants used throughout the application.
 * Always use these constants instead of hardcoding values.
 */

// Spacing Scale (in Tailwind classes)
export const SPACING = {
  none: 'p-0',
  xs: 'p-2',      // 8px
  sm: 'p-3',      // 12px
  md: 'p-4',      // 16px
  lg: 'p-6',      // 24px
  xl: 'p-8',      // 32px
  '2xl': 'p-10',  // 40px
  '3xl': 'p-12',  // 48px
} as const;

// Gap spacing for flex/grid containers
export const GAP = {
  none: 'gap-0',
  xs: 'gap-2',    // 8px
  sm: 'gap-3',    // 12px
  md: 'gap-4',    // 16px
  lg: 'gap-6',    // 24px
  xl: 'gap-8',    // 32px
  '2xl': 'gap-10', // 40px
} as const;

// Component-specific spacing
export const COMPONENT_SPACING = {
  // Cards
  card: {
    padding: 'p-6',
    gap: 'gap-4',
  },
  // Forms
  form: {
    fieldGap: 'gap-4',
    sectionGap: 'gap-6',
    labelGap: 'gap-2',
  },
  // Tables
  table: {
    cellPadding: 'px-4 py-3',
    headerPadding: 'px-4 py-3',
  },
  // Buttons
  button: {
    sm: 'px-3 py-1.5',
    md: 'px-4 py-2',
    lg: 'px-6 py-3',
  },
  // Page layouts
  page: {
    padding: 'p-6',
    maxWidth: 'max-w-7xl',
    sectionGap: 'gap-8',
  },
} as const;

// Typography variants for different UI elements
export const TYPOGRAPHY = {
  // Page headers
  pageTitle: 'text-3xl font-semibold',
  pageSubtitle: 'text-lg text-muted-foreground',
  
  // Section headers
  sectionTitle: 'text-2xl font-semibold',
  sectionSubtitle: 'text-base text-muted-foreground',
  
  // Card headers
  cardTitle: 'text-lg font-semibold',
  cardDescription: 'text-sm text-muted-foreground',
  
  // Form elements
  label: 'text-sm font-medium',
  helperText: 'text-xs text-muted-foreground',
  errorText: 'text-xs text-destructive',
  
  // Table elements
  tableHeader: 'text-xs font-medium uppercase tracking-wider',
  tableCell: 'text-sm',
  
  // Body text
  body: 'text-base',
  bodySmall: 'text-sm',
  bodyLarge: 'text-lg',
  
  // Special
  caption: 'text-xs text-muted-foreground',
  overline: 'text-xs font-medium uppercase tracking-wider text-muted-foreground',
} as const;

// Border radius
export const RADIUS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
} as const;

// Shadows
export const SHADOW = {
  none: 'shadow-none',
  xs: 'shadow-xs',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
} as const;

// Consistent heights
export const HEIGHT = {
  input: 'h-9',
  button: 'h-9',
  buttonSm: 'h-8',
  buttonLg: 'h-11',
} as const;

// Z-index scale
export const Z_INDEX = {
  dropdown: 50,
  sticky: 100,
  fixed: 200,
  modalBackdrop: 300,
  modal: 400,
  popover: 500,
  tooltip: 600,
  notification: 700,
} as const;

// Animation durations
export const ANIMATION = {
  fast: 'duration-150',
  normal: 'duration-300',
  slow: 'duration-500',
} as const;

// Breakpoints for responsive design
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;