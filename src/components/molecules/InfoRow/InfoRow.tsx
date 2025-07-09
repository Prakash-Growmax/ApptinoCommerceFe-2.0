import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  icon?: LucideIcon;
  layout?: 'vertical' | 'horizontal';
  emptyValue?: string;
  className?: string;
}

export const InfoRow = React.forwardRef<HTMLDivElement, InfoRowProps>(
  ({ label, value, icon: Icon, layout = 'horizontal', emptyValue = '—', className }, ref) => {
    const displayValue =
      !value || (Array.isArray(value) && value.length === 0)
        ? emptyValue
        : Array.isArray(value)
        ? value.join(', ')
        : value;

    const isVertical = layout === 'vertical';

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          isVertical ? 'flex-col space-y-1' : 'flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4',
          className
        )}
      >
        <div className={cn(
          'text-xs font-medium text-muted-foreground uppercase',
          !isVertical && 'sm:w-1/3 sm:flex-shrink-0'
        )}>
          {label}
        </div>
        <div className={cn(
          'text-sm text-foreground',
          !isVertical && 'sm:w-2/3'
        )}>
          {Icon && (
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <span>{displayValue}</span>
            </div>
          )}
          {!Icon && displayValue}
        </div>
      </div>
    );
  }
);

InfoRow.displayName = 'InfoRow';