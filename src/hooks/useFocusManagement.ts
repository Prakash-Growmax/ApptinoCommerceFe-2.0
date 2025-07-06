import { useEffect, useRef, useCallback } from 'react';

export interface FocusManagementOptions {
  /** Whether to restore focus to the previous element when component unmounts */
  restoreFocus?: boolean;
  /** Whether to trap focus within the component */
  trapFocus?: boolean;
  /** Initial element to focus when component mounts */
  initialFocus?: React.RefObject<HTMLElement>;
  /** Selector for focusable elements when using focus trap */
  focusableSelector?: string;
}

const DEFAULT_FOCUSABLE_SELECTOR = 
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * useFocusManagement Hook
 * 
 * A utility hook for managing focus within components.
 * Provides focus restoration, focus trapping, and initial focus management.
 * 
 * @param options - Configuration options for focus management
 */
export const useFocusManagement = (options: FocusManagementOptions = {}) => {
  const {
    restoreFocus = false,
    trapFocus = false,
    initialFocus,
    focusableSelector = DEFAULT_FOCUSABLE_SELECTOR,
  } = options;

  const previousFocusRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Store the previously focused element
  useEffect(() => {
    if (restoreFocus || trapFocus) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [restoreFocus, trapFocus]);

  // Focus the initial element when component mounts
  useEffect(() => {
    if (initialFocus?.current) {
      initialFocus.current.focus();
    }
  }, [initialFocus]);

  // Focus trap implementation
  useEffect(() => {
    if (!trapFocus || !containerRef.current) return;

    const container = containerRef.current;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements = container.querySelectorAll(focusableSelector);
      const firstFocusable = focusableElements[0] as HTMLElement;
      const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [trapFocus, focusableSelector]);

  // Restore focus when component unmounts
  useEffect(() => {
    return () => {
      if (restoreFocus && previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [restoreFocus]);

  // Utility function to focus the first focusable element
  const focusFirstElement = useCallback(() => {
    if (!containerRef.current) return;

    const focusableElements = containerRef.current.querySelectorAll(focusableSelector);
    const firstFocusable = focusableElements[0] as HTMLElement;
    
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }, [focusableSelector]);

  // Utility function to focus the last focusable element
  const focusLastElement = useCallback(() => {
    if (!containerRef.current) return;

    const focusableElements = containerRef.current.querySelectorAll(focusableSelector);
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    if (lastFocusable) {
      lastFocusable.focus();
    }
  }, [focusableSelector]);

  // Utility function to focus a specific element by selector
  const focusElement = useCallback((selector: string) => {
    if (!containerRef.current) return;

    const element = containerRef.current.querySelector(selector) as HTMLElement;
    if (element) {
      element.focus();
    }
  }, []);

  return {
    containerRef,
    focusFirstElement,
    focusLastElement,
    focusElement,
  };
};