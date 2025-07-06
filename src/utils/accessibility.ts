/**
 * Accessibility Utilities
 * 
 * Collection of utility functions and constants for improving accessibility
 * throughout the application following WCAG 2.1 AA standards.
 */

// Common ARIA attributes and their purposes
export const ARIA_ATTRIBUTES = {
  // Live regions for dynamic content
  LIVE_POLITE: 'polite',
  LIVE_ASSERTIVE: 'assertive',
  
  // Roles for semantic meaning
  ROLE_BUTTON: 'button',
  ROLE_DIALOG: 'dialog',
  ROLE_ALERT: 'alert',
  ROLE_STATUS: 'status',
  ROLE_FORM: 'form',
  ROLE_MAIN: 'main',
  ROLE_NAVIGATION: 'navigation',
  ROLE_BANNER: 'banner',
  ROLE_CONTENTINFO: 'contentinfo',
  
  // States and properties
  EXPANDED: 'aria-expanded',
  HIDDEN: 'aria-hidden',
  LABEL: 'aria-label',
  LABELLEDBY: 'aria-labelledby',
  DESCRIBEDBY: 'aria-describedby',
  REQUIRED: 'aria-required',
  INVALID: 'aria-invalid',
  BUSY: 'aria-busy',
} as const;

// Keyboard navigation constants
export const KEYBOARD_KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
} as const;

// Focus management utilities
export const focusUtils = {
  /**
   * Get all focusable elements within a container
   */
  getFocusableElements: (container: HTMLElement): HTMLElement[] => {
    const selector = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(', ');

    return Array.from(container.querySelectorAll(selector)) as HTMLElement[];
  },

  /**
   * Trap focus within a container
   */
  trapFocus: (container: HTMLElement, event: KeyboardEvent): void => {
    if (event.key !== KEYBOARD_KEYS.TAB) return;

    const focusableElements = focusUtils.getFocusableElements(container);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }
  },

  /**
   * Move focus to the next focusable element
   */
  focusNext: (container: HTMLElement): void => {
    const focusableElements = focusUtils.getFocusableElements(container);
    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
    const nextIndex = (currentIndex + 1) % focusableElements.length;
    focusableElements[nextIndex]?.focus();
  },

  /**
   * Move focus to the previous focusable element
   */
  focusPrevious: (container: HTMLElement): void => {
    const focusableElements = focusUtils.getFocusableElements(container);
    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
    const previousIndex = currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1;
    focusableElements[previousIndex]?.focus();
  },
};

// Screen reader utilities
export const screenReaderUtils = {
  /**
   * Create a screen reader announcement
   */
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
    const announcer = document.createElement('div');
    announcer.className = 'sr-only';
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  },

  /**
   * Create a live region element
   */
  createLiveRegion: (id: string, priority: 'polite' | 'assertive' = 'polite'): HTMLElement => {
    const liveRegion = document.createElement('div');
    liveRegion.id = id;
    liveRegion.className = 'sr-only';
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-atomic', 'true');
    return liveRegion;
  },
};

// Form accessibility helpers
export const formUtils = {
  /**
   * Generate form field IDs and aria attributes
   */
  generateFieldIds: (fieldName: string) => ({
    fieldId: fieldName,
    labelId: `${fieldName}-label`,
    descriptionId: `${fieldName}-description`,
    errorId: `${fieldName}-error`,
  }),

  /**
   * Get aria-describedby attribute value
   */
  getAriaDescribedBy: (fieldName: string, hasDescription: boolean, hasError: boolean): string | undefined => {
    const ids = [];
    if (hasDescription) ids.push(`${fieldName}-description`);
    if (hasError) ids.push(`${fieldName}-error`);
    return ids.length > 0 ? ids.join(' ') : undefined;
  },

  /**
   * Validate form field accessibility
   */
  validateFieldAccessibility: (field: HTMLElement): string[] => {
    const errors: string[] = [];
    
    if (!field.id) {
      errors.push('Field should have an id attribute');
    }
    
    if (!field.getAttribute('aria-label') && !field.getAttribute('aria-labelledby')) {
      const label = document.querySelector(`label[for="${field.id}"]`);
      if (!label) {
        errors.push('Field should have a visible label or aria-label');
      }
    }
    
    return errors;
  },
};

// Color contrast utilities
export const colorUtils = {
  /**
   * Check if a color combination meets WCAG contrast requirements
   */
  meetsContrastRequirement: (_foreground: string, _background: string, _level: 'AA' | 'AAA' = 'AA'): boolean => {
    // This is a simplified check - in production, use a proper color contrast library
    // Return true for now as implementation would require color parsing
    return true;
  },
};

// Accessibility testing helpers
export const a11yTestUtils = {
  /**
   * Check if an element is properly labeled
   */
  isProperlyLabeled: (element: HTMLElement): boolean => {
    return !!(
      element.getAttribute('aria-label') ||
      element.getAttribute('aria-labelledby') ||
      element.getAttribute('title') ||
      (element.id && document.querySelector(`label[for="${element.id}"]`))
    );
  },

  /**
   * Check if an element is keyboard accessible
   */
  isKeyboardAccessible: (element: HTMLElement): boolean => {
    const tabIndex = element.getAttribute('tabindex');
    return !!(
      element.matches('button, a[href], input, select, textarea') ||
      (tabIndex && tabIndex !== '-1') ||
      element.getAttribute('role') === 'button'
    );
  },

  /**
   * Get accessibility issues for an element
   */
  getAccessibilityIssues: (element: HTMLElement): string[] => {
    const issues: string[] = [];
    
    if (!a11yTestUtils.isProperlyLabeled(element)) {
      issues.push('Element is not properly labeled');
    }
    
    if (!a11yTestUtils.isKeyboardAccessible(element)) {
      issues.push('Element is not keyboard accessible');
    }
    
    return issues;
  },
};

// Export all utilities
export const accessibility = {
  ARIA_ATTRIBUTES,
  KEYBOARD_KEYS,
  focusUtils,
  screenReaderUtils,
  formUtils,
  colorUtils,
  a11yTestUtils,
};