import { ReactNode } from 'react';
import { RegisterOptions } from 'react-hook-form';

export interface FormControlProps {
  children: ReactNode;
  label?: string;
  rules?: RegisterOptions;
  
  htmlFor?: string;
  error?: string;
  description?: string;
  className?: string;
}

export const FormControl = ({
  children,
  label,
  htmlFor,
  error,
  description,
  className = '',
  rules,
}: FormControlProps) => {
  const isRequired = rules?.required;
  const descriptionId = htmlFor ? `${htmlFor}-description` : undefined;
  const errorId = htmlFor ? `${htmlFor}-error` : undefined;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="mb-1 block text-sm font-medium text-foreground"
        >
          {label}
          {isRequired && (
            <span className="text-destructive ml-1" aria-label="required">
              *
            </span>
          )}
        </label>
      )}

      {children}

      {description && !error && (
        <p 
          id={descriptionId}
          className="mt-1 text-xs text-muted-foreground"
          role="note"
        >
          {description}
        </p>
      )}

      {error && (
        <p 
          id={errorId}
          className="mt-1 text-xs text-destructive"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
};
