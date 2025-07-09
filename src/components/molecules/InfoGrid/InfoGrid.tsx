import React from 'react';
import { InfoRow, InfoRowProps } from '../InfoRow';
import { cn } from '@/lib/utils';

export interface InfoGridProps {
  data: InfoRowProps[];
  columns?: 1 | 2 | 3;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

const gapClasses = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
};

const columnClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};

export const InfoGrid = React.forwardRef<HTMLDivElement, InfoGridProps>(
  ({ data, columns = 2, gap = 'md', className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          columnClasses[columns],
          gapClasses[gap],
          className
        )}
      >
        {data.map((item, index) => (
          <InfoRow
            key={`${item.label}-${index}`}
            {...item}
          />
        ))}
      </div>
    );
  }
);

InfoGrid.displayName = 'InfoGrid';