import { useTranslation } from 'react-i18next';

import { DashboardCard } from '../components/DashboardCard';
import { DashboardChart } from '../components/DashboardChart';
import { DashboardStats } from '../components/DashboardStats';

const DashboardPage = () => {
  const { t } = useTranslation();

  // Demo statistics
  const stats = [
    {
      title: t('dashboard.totalUsers'),
      value: '12,345',
      change: '+12%',
      trend: 'up',
    },
    {
      title: t('dashboard.revenue'),
      value: '$34,567',
      change: '+23%',
      trend: 'up',
    },
    {
      title: t('dashboard.activeProjects'),
      value: '42',
      change: '+8%',
      trend: 'up',
    },
    {
      title: t('dashboard.taskCompletion'),
      value: '89%',
      change: '-2%',
      trend: 'down',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold md:text-3xl">
          {t('navigation.dashboard')}
        </h1>

        <div className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <DashboardStats
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend as 'up' | 'down'}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <DashboardCard title={t('dashboard.performanceOverTime')}>
          <DashboardChart type="line" />
        </DashboardCard>

        <DashboardCard title={t('dashboard.userDistribution')}>
          <DashboardChart type="pie" />
        </DashboardCard>
      </div>

      {/* Recent Activity */}
      <DashboardCard title={t('dashboard.recentActivity')}>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-border pb-2 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {index % 2 === 0 ? '👤' : '📝'}
                </div>
                <div>
                  <p className="font-medium">
                    {index % 2 === 0
                      ? t('dashboard.newUserJoined', {
                          name: `User ${index + 1}`,
                        })
                      : t('dashboard.taskCompleted', {
                          task: `Task ${index + 1}`,
                        })}
                  </p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <button className="text-sm text-primary hover:underline">
                {t('common.view')}
              </button>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
};

export default DashboardPage;
