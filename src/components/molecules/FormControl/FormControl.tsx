import { ReactNode } from 'react';

export interface FormControlProps {
  children: ReactNode;
  label?: string;
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
}: FormControlProps) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="mb-1 block text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}

      {children}

      {description && !error && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}

      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
};
