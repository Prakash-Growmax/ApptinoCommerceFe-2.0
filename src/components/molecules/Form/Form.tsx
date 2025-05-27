import { FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { ZodType, ZodTypeDef } from 'zod';

interface FormProps<TFormValues, Schema> {
  form: UseFormReturn<TFormValues>;
  onSubmit: SubmitHandler<TFormValues>;
  children: React.ReactNode;
  schema?: Schema;
  className?: string;
}

export const Form = <
  TFormValues extends Record<string, unknown>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown>,
>({
  form,
  onSubmit,
  children,
  className,
}: FormProps<TFormValues, Schema>) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
};
