interface DashboardStatsProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
  className?: string;
}

export const DashboardStats = ({
  title,
  value,
  change,
  trend = 'up',
  className = '',
}: DashboardStatsProps) => {
  return (
    <div
      className={`rounded-lg border border-border bg-card p-4 shadow-sm ${className}`}
    >
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>

      {change && (
        <div className="mt-2 flex items-center">
          <span
            className={`mr-1 text-sm font-medium ${
              trend === 'up' ? 'text-success' : 'text-destructive'
            }`}
          >
            {change}
          </span>

          <span
            className={`text-lg ${
              trend === 'up' ? 'text-success' : 'text-destructive'
            }`}
          >
            {trend === 'up' ? '↑' : '↓'}
          </span>

          <span className="ml-1 text-xs text-muted-foreground">
            vs last month
          </span>
        </div>
      )}
    </div>
  );
};
