import { ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { FormControl } from '../FormControl/FormControl';

interface FormFieldProps {
  name: string;
  label?: string;
  description?: string;
  children: (props: {
    field: {
      value: any;
      onChange: (...event: any[]) => void;
      onBlur: () => void;
      name: string;
      ref: React.RefCallback<any>;
    };
    fieldState: {
      invalid: boolean;
      isTouched: boolean;
      isDirty: boolean;
      error?: {
        type: string;
        message: string;
      };
    };
  }) => ReactNode;
  className?: string;
}

export const FormField = ({
  name,
  label,
  description,
  children,
  className,
}: FormFieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl
          label={label}
          htmlFor={name}
          error={fieldState.error?.message}
          description={description}
          className={className}
        >
          {children({ field, fieldState })}
        </FormControl>
      )}
    />
  );
};
