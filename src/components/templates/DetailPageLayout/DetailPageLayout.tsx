import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ShadCnButton as Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface DetailPageLayoutProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  tabs?: TabItem[];
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  loading?: boolean;
  error?: Error | null;
  className?: string;
}

export const DetailPageLayout = React.forwardRef<HTMLDivElement, DetailPageLayoutProps>(
  (
    {
      title,
      breadcrumbs,
      actions,
      tabs,
      children,
      sidebar,
      loading,
      error,
      className,
    },
    ref
  ) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = React.useState(tabs?.[0]?.id);

    if (loading) {
      return (
        <div className="w-full p-4 md:p-6 space-y-4 md:space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-12 w-64" />
          <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
            <div className="space-y-4 md:space-y-6">
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="w-full p-4 md:p-6">
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
            <p className="text-sm text-destructive">{error.message}</p>
          </div>
        </div>
      );
    }

    const activeContent = tabs?.find(tab => tab.id === activeTab)?.content || children;

    return (
      <div ref={ref} className={cn('w-full', className)}>
        {/* Mobile Header with Back Button */}
        <div className="md:hidden px-4 py-3 border-b">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="gap-1 pl-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span>/</span>}
                  {crumb.href ? (
                    <a
                      href={crumb.href}
                      className="hover:text-foreground transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(crumb.href!);
                      }}
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-foreground">{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}

          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-xl md:text-2xl font-semibold">{title}</h1>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>

          {/* Tabs Navigation */}
          {tabs && tabs.length > 0 && (
            <div className="border-b">
              <nav className="-mb-px flex space-x-4 md:space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                      activeTab === tab.id
                        ? 'border-primary text-foreground'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          )}

          {/* Main Content */}
          <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {activeContent}
            </div>
            {sidebar && (
              <div className="space-y-4 md:space-y-6">
                {sidebar}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

DetailPageLayout.displayName = 'DetailPageLayout';