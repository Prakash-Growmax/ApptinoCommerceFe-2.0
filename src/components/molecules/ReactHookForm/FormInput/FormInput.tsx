import { forwardRef } from 'react';

import { Input } from '@/components/ui/input';

import { FormField } from '../FormField/FormField';

interface FormInputProps {
  name: string;
  label?: string;
  rules?: any;
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
  rightElement?: React.ReactNode;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      name,
      label,
      rules,
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
        rules={rules}
        {...(label && { label })}
        {...(description && { description })}
        {...(className && { className })}
      >
        {({ field, fieldState }) => {
          const descriptionId = description ? `${name}-description` : undefined;
          const errorId = fieldState.error ? `${name}-error` : undefined;
          const ariaDescribedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;
          
          return (
            <div className="relative">
              <Input
                {...field}
                ref={ref}
                id={name}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                disabled={disabled}
                aria-invalid={!!fieldState.error}
                aria-describedby={ariaDescribedBy}
                aria-required={rules?.required ? true : undefined}
                className={`${fieldState.error ? 'border-red-500 focus:border-red-500' : 'rounded-sm border-gray-300 focus:border-gray-400 focus:ring-gray-400'} ${
                  rightElement ? 'pr-20' : ''
                }`}
                autoFocus={autoFocus}
                onKeyDown={(e) => {
                  // Add Enter key support for form submission
                  if (e.key === 'Enter' && !e.shiftKey) {
                    const form = e.currentTarget.closest('form');
                    if (form) {
                      const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
                      if (submitButton && !submitButton.disabled) {
                        e.preventDefault();
                        submitButton.click();
                      }
                    }
                  }
                  onKeyDown?.(e);
                }}
                onBlur={e => {
                  field.onBlur();
                  onBlur?.(e);
                }}
                onFocus={onFocus}
                onChange={e => {
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
          );
        }}
      </FormField>
    );
  }
);

FormInput.displayName = 'FormInput';
