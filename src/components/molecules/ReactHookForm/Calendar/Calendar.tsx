// components/FormCalendar.tsx
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { ShadCnButton } from "@/components/ui/button";

interface FormCalendarProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const FormCalendar = ({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled,
}: FormCalendarProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ShadCnButton
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal border border-gray-300",
            !value && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
        </ShadCnButton>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
