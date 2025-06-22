import Select from "react-select";
import { FormField } from "../FormField/FormField";

type OptionType =
  | { value: string | number; label: string; disabled?: boolean } // primitive
  | { id: number; name: string; [key: string]: any };              // object

interface FormSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  options: OptionType[];
  className?: string;
}

export const FormSelect = ({
  name,
  label,
  placeholder,
  description,
  disabled,
  options,
  className,
}: FormSelectProps) => {
  const isPrimitive = typeof options[0]?.value !== "undefined";

  // Format options for react-select
  const formattedOptions = options.map((option: any) =>
    isPrimitive
      ? {
          value: option.value,
          label: option.label,
          isDisabled: option.disabled,
        }
      : {
          value: option.id,
          label: option.name,
          isDisabled: option.disabled,
        }
  );

  return (
    <FormField
      name={name}
      {...(label && { label })}
      {...(description && { description })}
      {...(className && { className })}
    >
      {({ field }) => (
        <Select
          options={formattedOptions}
          value={formattedOptions.find((opt) =>
            isPrimitive
              ? opt.value === field.value
              : opt.value === field.value?.id
          )}
          onChange={(selected) => {
            const selectedOption = isPrimitive
              ? selected?.value
              : options.find((opt: any) => opt.id === selected?.value);
            field.onChange(selectedOption);
          }}
          placeholder={placeholder}
          isDisabled={disabled}
          className="react-select-container"
          classNamePrefix="react-select"
          styles={{
            menu: (provided) => ({
              ...provided,
              maxHeight: 200,
              overflowY: "auto",
            }),
          }}
        />
      )}
    </FormField>
  );
};


FormSelect.displayName = "FormSelect";
