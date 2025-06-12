import { forwardRef } from 'react';

import { FormField } from '../FormField/FormField';

interface FormTextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  rows?: number;
  className?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    { name, label, placeholder, description, disabled, rows = 4, className },
    ref
  ) => {
    return (
      <FormField
        name={name}
        {...(description && { description })}
        {...(label && { label })}
        {...(className && { className })}
      >
        {({ field, fieldState }) => (
          <textarea
            {...field}
            ref={ref}
            rows={rows}
            placeholder={placeholder}
            disabled={disabled}
            className={`flex w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              fieldState.error
                ? 'border-destructive focus-visible:ring-destructive'
                : ''
            }`}
            aria-invalid={!!fieldState.error}
            aria-describedby={fieldState.error ? `${name}-error` : undefined}
          />
        )}
      </FormField>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';
