import { forwardRef } from 'react';

import { FormField } from '../FormField/FormField';

interface FormCheckboxProps {
  name: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ name, label, description, disabled, className }, ref) => {
    return (
      <FormField
        name={name}
        {...(description && { description })}
        {...(className && { className })}
      >
        {({ field, fieldState }) => (
          <div className="flex items-center space-x-2">
            <input
              {...field}
              ref={ref}
              type="checkbox"
              checked={field.value || false}
              disabled={disabled}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              aria-invalid={!!fieldState.error}
              aria-describedby={fieldState.error ? `${name}-error` : undefined}
            />
            {label && (
              <label
                htmlFor={name}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </label>
            )}
          </div>
        )}
      </FormField>
    );
  }
);

FormCheckbox.displayName = 'FormCheckbox';
