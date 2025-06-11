import { ReactNode } from 'react';
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  useFormContext,
} from 'react-hook-form';

import { FormControl } from '../FormControl/FormControl';

interface FormFieldProps {
  name: string;
  label?: string;
  description?: string;
  children: (props: {
    field: ControllerRenderProps;
    fieldState: ControllerFieldState;
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
          htmlFor={name}
          {...(label && { label })}
          {...(fieldState.error?.message && {
            error: fieldState.error.message,
          })}
          {...(description && { description })}
          {...(className && { className })}
        >
          {children({ field, fieldState })}
        </FormControl>
      )}
    />
  );
};
