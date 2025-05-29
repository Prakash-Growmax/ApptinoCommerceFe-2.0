import React from "react";
import { cn } from "@/lib/utils"; // `cn` is typically included in shadcn projects
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "contained" | "outlined";
  color?: string; // Can be Tailwind color (e.g., "text-red-500") or hex
  bgColor?: string; // Optional background color for `contained`
  shape?: "square" | "rounded";
  title?: string;
}

const Label: React.FC<LabelProps> = ({
  className,
  variant = "contained",
  color = "text-gray-600",
  bgColor,
  shape = "square",
  title = "",
  children,
  style,
  ...rest
}) => {
  const baseClasses =
    "inline-flex items-center justify-center text-[10px] h-5 min-w-[50px] whitespace-nowrap px-2 py-[2px] font-semibold";

  const roundedClasses = shape === "rounded" ? "rounded-full px-[6px]" : "rounded-md";

  const variantClasses =
    variant === "contained"
      ? `${bgColor ? bgColor : "bg-gray-100"} ${color}`
      : `border ${color} ${color}`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={cn(baseClasses, roundedClasses, variantClasses, className)}
            style={style}
            {...rest}
          >
            {children}
          </span>
        </TooltipTrigger>
        {title && (
          <TooltipContent>
            <p>{title}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default Label;
