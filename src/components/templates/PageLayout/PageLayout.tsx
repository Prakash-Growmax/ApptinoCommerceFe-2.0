import React from 'react';
import { cn } from '@/lib/utils';
import { COMPONENT_SPACING } from '@/lib/design-system/constants';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn(
      "min-h-screen bg-background",
      COMPONENT_SPACING.page.padding,
      className
    )}>
      <div className={cn("mx-auto", COMPONENT_SPACING.page.maxWidth)}>
        <div className={COMPONENT_SPACING.page.sectionGap}>
          {children}
        </div>
      </div>
    </div>
  );
};

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
  className
}) => {
  return (
    <div className={cn("flex flex-col gap-1 md:flex-row md:items-center md:justify-between", className)}>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          {actions}
        </div>
      )}
    </div>
  );
};

interface PageContentProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 'compact' | 'comfortable' | 'spacious';
}

export const PageContent: React.FC<PageContentProps> = ({
  children,
  className,
  spacing = 'comfortable'
}) => {
  const spacingClasses = {
    compact: 'gap-4',
    comfortable: 'gap-6',
    spacious: 'gap-8',
  };

  return (
    <div className={cn("flex flex-col", spacingClasses[spacing], className)}>
      {children}
    </div>
  );
};