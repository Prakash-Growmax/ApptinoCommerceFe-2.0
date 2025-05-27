import { useMemo } from 'react';

interface DashboardChartProps {
  type: 'line' | 'bar' | 'pie';
  height?: number;
}

export const DashboardChart = ({ type, height = 300 }: DashboardChartProps) => {
  // Generate demo data for the chart
  const data = useMemo(() => {
    if (type === 'pie') {
      return [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
      ];
    }

    return Array.from({ length: 12 }, (_, i) => ({
      name: `Month ${i + 1}`,
      value: Math.floor(Math.random() * 1000) + 500,
      prevValue: Math.floor(Math.random() * 1000) + 500,
    }));
  }, [type]);

  // In a real application, you would use a charting library like Recharts
  // For simplicity, we'll just render placeholders here
  return (
    <div
      className="flex items-center justify-center rounded bg-muted/30"
      style={{ height: `${height}px` }}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <p className="text-lg font-medium">
          {type.charAt(0).toUpperCase() + type.slice(1)} Chart
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          (This is a placeholder for a real {type} chart)
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          {type === 'pie'
            ? data.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: `hsl(${index * 90}, 70%, 60%)`,
                    }}
                  ></div>
                  <span>
                    {item.name}: {item.value}
                  </span>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
