import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';

import { ZodType, ZodTypeDef } from 'zod';

interface FormProps<TFormValues extends FieldValues, Schema> {
  form: UseFormReturn<TFormValues>;
  onSubmit: SubmitHandler<TFormValues>;
  children: React.ReactNode;
  schema?: Schema;
  className?: string;
  role?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export const Form = <
  TFormValues extends Record<string, unknown>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown>,
>({
  form,
  onSubmit,
  children,
  className,
  role,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
}: FormProps<TFormValues, Schema>) => {
  return (
    <FormProvider {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className={className}
        role={role}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
      >
        {children}
      </form>
    </FormProvider>
  );
};
