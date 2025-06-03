import { forwardRef } from 'react';

import { FormField } from '../FormField/FormField';

interface FormRadioGroupProps {
  name: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  className?: string;
}

export const FormRadioGroup = forwardRef<HTMLInputElement, FormRadioGroupProps>(
  ({ name, label, description, disabled, options, className }, ref) => {
    return (
      <FormField
        name={name}
        {...(label && { label })}
        {...(description && { description })}
        {...(className && { className })}
      >
        {({ field, fieldState }) => (
          <div className="space-y-2">
            {options.map(option => (
              <div key={option.value} className="flex items-center space-x-2">
                <input
                  {...field}
                  ref={ref}
                  type="radio"
                  value={option.value}
                  checked={field.value === option.value}
                  disabled={disabled || option.disabled}
                  className="h-4 w-4 border-border text-primary focus:ring-primary"
                  aria-invalid={!!fieldState.error}
                  aria-describedby={
                    fieldState.error ? `${name}-error` : undefined
                  }
                />
                <label
                  htmlFor={`${name}-${option.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </FormField>
    );
  }
);

FormRadioGroup.displayName = 'FormRadioGroup';
