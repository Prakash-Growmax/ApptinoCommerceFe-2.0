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
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="mb-1 block text-sm font-medium text-foreground "
        >
          {label}
        </label>
      )}

      {children}

      {description && !error && (
        <p className="mt-1 text-xs text-muted-foreground ">{description}</p>
      )}

      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
};
