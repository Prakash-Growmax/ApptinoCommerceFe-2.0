import { useFieldArray, useFormContext } from 'react-hook-form';

import { Plus, Trash2 } from 'lucide-react';

import { ShadCnButton } from '@/components/ui/button';

import { FormInput } from '../FormInput/FormInput';

interface DynamicFormFieldsProps {
  name: string;
  label: string;
}

export function DynamicFormFields({ name, label }: DynamicFormFieldsProps) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <ShadCnButton
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ value: '' })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add {label}
        </ShadCnButton>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center space-x-2">
          <FormInput
            name={`${name}.${index}.value`}
            placeholder={`Enter ${label.toLowerCase()}`}
            className="flex-1"
          />

          {fields.length > 1 && (
            <ShadCnButton
              type="button"
              variant="outline"
              size="sm"
              onClick={() => remove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </ShadCnButton>
          )}
        </div>
      ))}
    </div>
  );
}
