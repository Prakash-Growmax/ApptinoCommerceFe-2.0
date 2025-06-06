import { ReactNode } from 'react';
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  useFormContext,
  RegisterOptions,
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
   rules?: RegisterOptions;
  
}
export const FormField = ({
  name,
  label,
  description,
  children,
  className,
  rules,
}: FormFieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules} 
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
