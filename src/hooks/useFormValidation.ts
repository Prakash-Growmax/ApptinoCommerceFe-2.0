import { useCallback } from 'react';
import { FieldValues, Path, useFormContext } from 'react-hook-form';

export function useFormValidation<T extends FieldValues>() {
  const { trigger, getFieldState, formState } = useFormContext<T>();

  const validateField = useCallback(
    async (name: Path<T>) => {
      const result = await trigger(name);
      const fieldState = getFieldState(name, formState);
      return {
        isValid: result,
        error: fieldState.error?.message,
      };
    },
    [trigger, getFieldState, formState]
  );

  return { validateField };
}
