// src/components/ui/table-typography.tsx
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Caption, Text, type TypographyProps } from './typography';

// Specialized components for table content
interface TableCellTextProps extends Omit<TypographyProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'numeric' | 'status' | 'action';
  truncate?: boolean;
  maxWidth?: string;
}

const TableCellText = React.forwardRef<
  HTMLParagraphElement,
  TableCellTextProps
>(
  (
    {
      variant = 'primary',
      truncate = false,
      maxWidth,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary: 'body-sm', // Main content - your row.original?.title case
      secondary: 'body-sm', // Secondary info
      numeric: 'body-sm', // Numbers, dates, IDs
      status: 'body-xs', // Status badges, labels
      action: 'body-sm', // Action links, buttons
    } as const;

    const weightStyles = {
      primary: 'medium',
      secondary: 'regular',
      numeric: 'medium',
      status: 'medium',
      action: 'medium',
    } as const;

    const colorStyles = {
      primary: 'default',
      secondary: 'muted',
      numeric: 'default',
      status: 'default',
      action: 'primary',
    } as const;

    return (
      <Text
        ref={ref}
        variant={variantStyles[variant]}
        weight={weightStyles[variant]}
        color={colorStyles[variant]}
        className={cn(
          truncate && 'truncate',
          maxWidth && `max-w-[${maxWidth}]`,
          className
        )}
        style={maxWidth ? { maxWidth } : undefined}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

TableCellText.displayName = 'TableCellText';

// Common data display patterns
interface DataDisplayProps {
  label: string;
  value: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

const DataDisplay: React.FC<DataDisplayProps> = ({
  label,
  value,
  direction = 'vertical',
  className,
}) => {
  return (
    <div
      className={cn(
        'space-y-1',
        direction === 'horizontal' && 'flex items-center space-y-0 space-x-2',
        className
      )}
    >
      <Caption as="dt">{label}</Caption>
      <Text variant="body-sm" weight="medium" as="dd">
        {value}
      </Text>
    </div>
  );
};

// Status indicators with consistent styling
interface StatusTextProps {
  status: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  children: React.ReactNode;
  variant?: 'text' | 'badge';
  className?: string;
}

const StatusText: React.FC<StatusTextProps> = ({
  status,
  children,
  variant = 'text',
  className,
}) => {
  const statusColors = {
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-destructive',
    info: 'text-info',
    neutral: 'text-muted-foreground',
  };

  const badgeStyles = {
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    error: 'bg-destructive/10 text-destructive border-destructive/20',
    info: 'bg-info/10 text-info border-info/20',
    neutral: 'bg-muted text-muted-foreground border-border',
  };

  if (variant === 'badge') {
    return (
      <span
        className={cn(
          'inline-flex items-center px-2 py-1 rounded-md text-body-xs font-medium border',
          badgeStyles[status],
          className
        )}
      >
        {children}
      </span>
    );
  }

  return (
    <Text
      variant="body-sm"
      weight="medium"
      className={cn(statusColors[status], className)}
    >
      {children}
    </Text>
  );
};

// Metric/KPI display component
interface MetricDisplayProps {
  value: string | number;
  label: string;
  change?: {
    value: string | number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  className?: string;
}

const MetricDisplay: React.FC<MetricDisplayProps> = ({
  value,
  label,
  change,
  className,
}) => {
  const changeColors = {
    increase: 'text-success',
    decrease: 'text-destructive',
    neutral: 'text-muted-foreground',
  };

  return (
    <div className={cn('space-y-1', className)}>
      <Text variant="display-sm" weight="bold">
        {value}
      </Text>
      <Caption>{label}</Caption>
      {change && (
        <Text
          variant="body-xs"
          weight="medium"
          className={changeColors[change.type]}
        >
          {change.type === 'increase'
            ? '↗'
            : change.type === 'decrease'
              ? '↘'
              : '→'}{' '}
          {change.value}
        </Text>
      )}
    </div>
  );
};

// Export everything
export {
  DataDisplay,
  MetricDisplay,
  StatusText,
  TableCellText,
  type DataDisplayProps,
  type MetricDisplayProps,
  type StatusTextProps,
  type TableCellTextProps,
};

// Usage examples:
/*
// Your original code:
// <div className="text-sm font-medium">{row.original?.title}</div>

// Better approach:
<TableCellText variant="primary">{row.original?.title}</TableCellText>

// For different table cell types:
<TableCellText variant="primary">{row.original?.title}</TableCellText>
<TableCellText variant="secondary">{row.original?.description}</TableCellText>
<TableCellText variant="numeric">{row.original?.amount}</TableCellText>
<StatusText status="success">Active</StatusText>
<StatusText status="error" variant="badge">Failed</StatusText>

// For truncated content:
<TableCellText variant="primary" truncate maxWidth="200px">
  {row.original?.longTitle}
</TableCellText>

// For data displays:
<DataDisplay label="Created" value={formatDate(row.original?.createdAt)} />
<DataDisplay 
  label="Status" 
  value={<StatusText status="success">Active</StatusText>}
  direction="horizontal"
/>

// For metrics:
<MetricDisplay 
  value="1,234" 
  label="Total Users" 
  change={{ value: "+12%", type: "increase" }}
/>
*/
