import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

export interface ErrorAlertProps {
  title?: string;
  message: string;
  className?: string;
  onDismiss?: () => void;
  variant?: 'default' | 'destructive';
}

export const ErrorAlert = React.forwardRef<HTMLDivElement, ErrorAlertProps>(
  ({ title = 'Error', message, className, onDismiss, variant = 'destructive' }, ref) => {
    return (
      <Alert ref={ref} variant={variant} className={cn('relative', className)}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Close error message"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </Alert>
    );
  }
);

ErrorAlert.displayName = 'ErrorAlert';