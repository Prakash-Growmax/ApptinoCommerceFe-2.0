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
  value?: string | number | boolean | null;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightElement?: React.ReactNode;
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
      value,
      autoFocus,
      onKeyDown,
      onBlur,
      onFocus,
      onChange,
      rightElement,
    },
    ref
  ) => {
    // Convert `boolean | null` values to empty string
    const safeValue =
      value === null || typeof value === 'boolean' ? '' : value;

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
              value={safeValue}
              autoComplete={autoComplete}
              disabled={disabled}
              aria-invalid={!!fieldState.error}
              aria-describedby={fieldState.error ? `${name}-error` : undefined}
              className={`${fieldState.error ? 'border-red-500' : ''} ${
                rightElement ? 'pr-20' : ''
              }`}
              autoFocus={autoFocus}
              onKeyDown={onKeyDown}
              onBlur={(e) => {
                field.onBlur();
                onBlur?.(e);
              }}
              onFocus={onFocus}
              onChange={(e) => {
                field.onChange(e);
                onChange?.(e);
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

