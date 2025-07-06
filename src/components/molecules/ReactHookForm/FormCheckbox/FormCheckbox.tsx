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
        {({ field, fieldState }) => {
          const descriptionId = description ? `${name}-description` : undefined;
          const errorId = fieldState.error ? `${name}-error` : undefined;
          const ariaDescribedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;
          
          return (
            <div className="flex items-center space-x-2">
              <input
                {...field}
                ref={ref}
                id={name}
                type="checkbox"
                checked={field.value || false}
                disabled={disabled}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary focus:ring-2 focus:ring-offset-2"
                aria-invalid={!!fieldState.error}
                aria-describedby={ariaDescribedBy}
                onKeyDown={(e) => {
                  // Add Space and Enter key support for toggling
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    field.onChange(!field.value);
                  }
                }}
              />
              {label && (
                <label
                  htmlFor={name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {label}
                </label>
              )}
            </div>
          );
        }}
      </FormField>
    );
  }
);

FormCheckbox.displayName = 'FormCheckbox';
