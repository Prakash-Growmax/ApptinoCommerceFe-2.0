import React, { useEffect, useRef } from 'react';

interface AccessibilityAnnouncerProps {
  message: string;
  priority?: 'polite' | 'assertive';
  clearOnUnmount?: boolean;
}

/**
 * AccessibilityAnnouncer Component
 * 
 * A utility component for making announcements to screen readers.
 * Useful for dynamic content updates, form validation messages, and status changes.
 * 
 * @param message - The message to announce to screen readers
 * @param priority - The urgency level ('polite' or 'assertive')
 * @param clearOnUnmount - Whether to clear the message when component unmounts
 */
export const AccessibilityAnnouncer: React.FC<AccessibilityAnnouncerProps> = ({
  message,
  priority = 'polite',
  clearOnUnmount = false,
}) => {
  const announcerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (announcerRef.current) {
      announcerRef.current.textContent = message;
    }
  }, [message]);

  useEffect(() => {
    return () => {
      if (clearOnUnmount && announcerRef.current) {
        announcerRef.current.textContent = '';
      }
    };
  }, [clearOnUnmount]);

  if (!message) return null;

  return (
    <div
      ref={announcerRef}
      className="sr-only"
      aria-live={priority}
      aria-atomic="true"
      role="status"
    >
      {message}
    </div>
  );
};

AccessibilityAnnouncer.displayName = 'AccessibilityAnnouncer';