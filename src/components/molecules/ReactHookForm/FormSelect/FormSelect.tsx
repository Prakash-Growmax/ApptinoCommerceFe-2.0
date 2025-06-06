import { forwardRef } from 'react';

import { FormField } from '../FormField/FormField';

interface FormSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  className?: string;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    { name, label, placeholder, description, disabled, options, className },
    ref
  ) => {
    return (
      <FormField
        name={name}
        {...(label && { label })}
        {...(description && { description })}
        {...(className && { className })}
      >
        {({ field, fieldState }) => (
          <select
            {...field}
            ref={ref}
            disabled={disabled}
            
            className={`flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              fieldState.error
              ? 'border-destructive focus-visible:ring-destructive'
              : ''
            }`}

            
            aria-invalid={!!fieldState.error}
            aria-describedby={fieldState.error ? `${name}-error` : undefined}
            >
            
            {placeholder && <option value="">{placeholder}</option>}
            {options.map(option => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
        )}
      </FormField>
    );
  }
);

FormSelect.displayName = 'FormSelect';
