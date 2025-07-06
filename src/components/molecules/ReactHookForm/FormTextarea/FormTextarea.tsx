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
  rules?: any;
  autoFocus?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    { 
      name, 
      label, 
      placeholder, 
      description, 
      disabled, 
      rows = 4, 
      className,
      rules,
      autoFocus,
      onKeyDown,
      onBlur,
      onFocus,
      onChange
    },
    ref
  ) => {
    return (
      <FormField
        name={name}
        rules={rules}
        {...(description && { description })}
        {...(label && { label })}
        {...(className && { className })}
      >
        {({ field, fieldState }) => {
          const descriptionId = description ? `${name}-description` : undefined;
          const errorId = fieldState.error ? `${name}-error` : undefined;
          const ariaDescribedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;
          
          return (
            <textarea
              {...field}
              ref={ref}
              id={name}
              rows={rows}
              placeholder={placeholder}
              disabled={disabled}
              autoFocus={autoFocus}
              className={`flex w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                fieldState.error
                  ? 'border-destructive focus-visible:ring-destructive'
                  : ''
              }`}
              aria-invalid={!!fieldState.error}
              aria-describedby={ariaDescribedBy}
              aria-required={rules?.required ? true : undefined}
              onKeyDown={onKeyDown}
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
          );
        }}
      </FormField>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';
