import React, { useState } from 'react';
import { LucideIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShadCnButton as Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface InfoCardProps {
  title: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const InfoCard = React.forwardRef<HTMLDivElement, InfoCardProps>(
  (
    {
      title,
      icon: Icon,
      actions,
      collapsible = false,
      defaultCollapsed = false,
      children,
      className,
      contentClassName,
    },
    ref
  ) => {
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

    const toggleCollapse = () => {
      if (collapsible) {
        setIsCollapsed(!isCollapsed);
      }
    };

    return (
      <Card ref={ref} className={cn('w-full rounded-md', className)}>
        <CardHeader className="p-2 md:p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
              <CardTitle className="text-base md:text-lg">{title}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              {actions}
              {collapsible && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleCollapse}
                  className="h-8 w-8 p-0 md:hidden"
                  aria-expanded={!isCollapsed}
                  aria-label={isCollapsed ? 'Expand' : 'Collapse'}
                >
                  {isCollapsed ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronUp className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <div className="h-px bg-border w-full" />
        {(!collapsible || !isCollapsed) && (
          <CardContent className={cn('p-4 md:p-6 pt-4 md:pt-6', contentClassName)}>
            {children}
          </CardContent>
        )}
      </Card>
    );
  }
);

InfoCard.displayName = 'InfoCard';