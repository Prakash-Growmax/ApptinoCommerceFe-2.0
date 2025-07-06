import * as React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { cn } from '@/lib/utils';

interface DataCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  headerAction?: React.ReactNode;
  noPadding?: boolean;
}

const DataCard = React.forwardRef<HTMLDivElement, DataCardProps>(
  ({ className, title, description, footer, headerAction, noPadding, children, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn('overflow-hidden', className)} {...props}>
        {(title || description || headerAction) && (
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="space-y-1">
              {title && <CardTitle>{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </div>
            {headerAction}
          </CardHeader>
        )}
        <CardContent className={cn({ 'p-0': noPadding })}>{children}</CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    );
  }
);
DataCard.displayName = 'DataCard';

export { DataCard };