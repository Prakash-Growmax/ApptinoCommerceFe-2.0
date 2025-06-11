import { forwardRef } from 'react';

import { Input } from '@/components/ui/input';

import { FormField } from '../FormField/FormField';

interface FormInputProps {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  autoComplete?: string;
  className?: string;
  autoFocus?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightElement?: React.ReactNode; // New prop for right-side content
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      name,
      label,
      type = 'text',
      placeholder,
      description,
      disabled,
      autoComplete,
      className,
      autoFocus,
      onKeyDown,
      onBlur,
      onFocus,
      onChange,
      rightElement,
    },
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
          <div className="relative">
            <Input
              {...field}
              ref={ref}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              disabled={disabled}
              aria-invalid={!!fieldState.error}
              aria-describedby={fieldState.error ? `${name}-error` : undefined}
              className={`${fieldState.error ? 'border-red-500' : ''} ${rightElement ? 'pr-20' : ''}`}
              autoFocus={autoFocus}
              onKeyDown={onKeyDown}
              onBlur={e => {
                field.onBlur(); // Call React Hook Form's onBlur
                onBlur?.(e); // Call custom onBlur if provided
              }}
              onFocus={onFocus}
              onChange={e => {
                field.onChange(e); // RHF onChange
                onChange?.(e); // Custom onChange
              }}
            />
            {rightElement && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-auto">
                {rightElement}
              </div>
            )}
          </div>
        )}
      </FormField>
    );
  }
);

FormInput.displayName = 'FormInput';
