// import Select from "react-select";
// import { FormField } from "../FormField/FormField";
// import { RegisterOptions } from "react-hook-form";
// type OptionType =
//   | { value: string | number; label: string; disabled?: boolean } // primitive
//   | { id: number; name: string; [key: string]: any };              // object
// interface FormSelectProps {
//   name: string;
//   label?: string;
//   placeholder?: string;
//   description?: string;
//   disabled?: boolean;
//   options: OptionType[];
//   className?: string;
//   rules?: RegisterOptions;
// }
// export const FormSelect = ({
//   name,
//   label,
//   placeholder,
//   description,
//   disabled,
//   rules,
//   options,
//   className,
// }: FormSelectProps) => {
//   const isPrimitive = typeof options[0]?.value !== "undefined";
//   // Format options for react-select
//   const formattedOptions = options.map((option: any) =>
//     isPrimitive
//       ? {
//           value: option.value,
//           label: option.label,
//           isDisabled: option.disabled,
//         }
//       : {
//           value: option.id,
//           label: option.name,
//           isDisabled: option.disabled,
//         }
//   );
//   return (
//     <FormField
//       name={name}
//        rules={rules}
//       {...(label && { label })}
//       {...(description && { description })}
//       {...(className && { className })}
//     >
//       {({ field }) => (
//         <Select
//           options={formattedOptions}
//           value={formattedOptions.find((opt) =>
//             isPrimitive
//               ? opt.value === field.value
//               : opt.value === field.value?.id
//           )}
//           onChange={(selected) => {
//             const selectedOption = isPrimitive
//               ? selected?.value
//               : options.find((opt: any) => opt.id === selected?.value);
//             field.onChange(selectedOption);
//           }}
//           placeholder={placeholder}
//           isDisabled={disabled}
//           className="react-select-container"
//           classNamePrefix="react-select"
//           styles={{
//             menu: (provided) => ({
//               ...provided,
//               maxHeight: 200,
//               overflowY: "auto",
//             }),
//           }}
//         />
//       )}
//     </FormField>
//   );
// };
// FormSelect.displayName = "FormSelect";



import { RegisterOptions } from 'react-hook-form';
import Select from 'react-select';

import { FormField } from '../FormField/FormField';

type OptionType =
  | { value: string | number; label: string; disabled?: boolean }
  | { id: number; name: string; [key: string]: any };

interface FormSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  options: OptionType[];
  className?: string;
  rules?: RegisterOptions;
  rightElement?: React.ReactNode;
}

export const FormSelect = ({
  name,
  label,
  placeholder,
  description,
  disabled,
  rules,
  options,
  className,
  rightElement,
}: FormSelectProps) => {
  // const isPrimitive = typeof options[0]?.value !== 'undefined';
  const isPrimitive = options.length > 0 && typeof options[0]?.value !== 'undefined';


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
      {...(rules && { rules })}
      {...(label && { label })}
      {...(description && { description })}
      {...(className && { className })}
    >
      {({ field, fieldState }) => {
        const descriptionId = description ? `${name}-description` : undefined;
        const errorId = fieldState.error ? `${name}-error` : undefined;
        const ariaDescribedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;
        
        return (
          <div className="relative z-0">
            <Select
              inputId={name}
              options={formattedOptions}
              value={formattedOptions.find(opt =>
                isPrimitive
                  ? opt.value === field.value
                  : opt.value === field.value?.id
              )}
              onChange={selected => {
                const selectedOption = isPrimitive
                  ? selected?.value
                  : options.find((opt: any) => opt.id === selected?.value);
                field.onChange(selectedOption);
              }}
              placeholder={placeholder}
              isDisabled={disabled}
              className={`react-select-container ${
                fieldState.error
                  ? 'border border-destructive rounded-sm'
                  : 'border focus:border-input rounded-xl'
              } ${rightElement ? 'pr-20' : ''}`}
              classNamePrefix="react-select"
              aria-invalid={!!fieldState.error}
              aria-describedby={ariaDescribedBy}
              aria-required={rules?.required ? true : undefined}
              isSearchable={true}
              isClearable={!rules?.required}
              menuPlacement="auto"
              menuPosition="absolute"
              onKeyDown={(e) => {
                // Enhanced keyboard navigation
                if (e.key === 'Escape') {
                  (e.target as HTMLElement).blur();
                }
              }}
              styles={{
                control: (base) => ({
                  ...base,
                  boxShadow: 'none',
                  borderColor: fieldState.error ? '#ef4444' : base.borderColor,
                  '&:hover': {
                    borderColor: fieldState.error ? '#ef4444' : base.borderColor,
                  },
                  '&:focus-within': {
                    borderColor: fieldState.error ? '#ef4444' : '#6b7280',
                    boxShadow: fieldState.error ? '0 0 0 1px #ef4444' : '0 0 0 1px #6b7280',
                  },
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 1000,
                }),
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
};

FormSelect.displayName = 'FormSelect';
