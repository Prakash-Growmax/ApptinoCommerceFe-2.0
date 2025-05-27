import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

export const DashboardCard = ({
  title,
  children,
  className = '',
  action,
}: DashboardCardProps) => {
  return (
    <div
      className={`rounded-lg border border-border bg-card shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between p-4 md:p-6">
        <h2 className="text-lg font-medium">{title}</h2>
        {action && <div>{action}</div>}
      </div>
      <div className="p-4 md:p-6 pt-0">{children}</div>
    </div>
  );
};
