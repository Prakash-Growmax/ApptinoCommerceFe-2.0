import React, { useEffect, useRef, useState } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

// Performance metrics interface
interface PerformanceMetrics {
  cls: number | null;
  inp: number | null;
  fcp: number | null;
  lcp: number | null;
  ttfb: number | null;
}

// Performance thresholds
const PERFORMANCE_THRESHOLDS = {
  cls: { good: 0.1, needsImprovement: 0.25 },
  inp: { good: 200, needsImprovement: 500 },
  fcp: { good: 1800, needsImprovement: 3000 },
  lcp: { good: 2500, needsImprovement: 4000 },
  ttfb: { good: 800, needsImprovement: 1800 },
};

// Performance monitoring hook
export const usePerformanceMonitoring = (enabled: boolean = true) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    cls: null,
    inp: null,
    fcp: null,
    lcp: null,
    ttfb: null,
  });

  useEffect(() => {
    if (!enabled) return;

    const updateMetric = (metric: keyof PerformanceMetrics, value: number) => {
      setMetrics(prev => ({ ...prev, [metric]: value }));
    };

    onCLS((metric) => updateMetric('cls', metric.value));
    onINP((metric) => updateMetric('inp', metric.value));
    onFCP((metric) => updateMetric('fcp', metric.value));
    onLCP((metric) => updateMetric('lcp', metric.value));
    onTTFB((metric) => updateMetric('ttfb', metric.value));
  }, [enabled]);

  return metrics;
};

// Component render performance tracker
export const useRenderPerformance = (componentName: string) => {
  const renderCount = useRef(0);
  const lastRenderTime = useRef<number>(0);
  const renderTimes = useRef<number[]>([]);

  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      renderCount.current++;
      lastRenderTime.current = renderTime;
      renderTimes.current.push(renderTime);
      
      // Keep only last 10 render times
      if (renderTimes.current.length > 10) {
        renderTimes.current.shift();
      }
      
      // Log if render time is concerning
      if (renderTime > 16.67) { // 60fps threshold
        console.warn(`${componentName} render took ${renderTime.toFixed(2)}ms (>16.67ms)`);
      }
    };
  });

  return {
    renderCount: renderCount.current,
    lastRenderTime: lastRenderTime.current,
    averageRenderTime: renderTimes.current.length > 0 
      ? renderTimes.current.reduce((a, b) => a + b, 0) / renderTimes.current.length 
      : 0,
  };
};

// Memory usage tracker
export const useMemoryMonitoring = () => {
  const [memoryInfo, setMemoryInfo] = useState<{
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  } | null>(null);

  useEffect(() => {
    if (!('memory' in performance)) return;

    const updateMemoryInfo = () => {
      const memory = (performance as any).memory;
      setMemoryInfo({
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
      });
    };

    updateMemoryInfo();
    const interval = setInterval(updateMemoryInfo, 5000);

    return () => clearInterval(interval);
  }, []);

  return memoryInfo;
};

// Bundle size monitor
export const useBundleMonitoring = () => {
  const [bundleSize, setBundleSize] = useState<number | null>(null);
  const [resourceTiming, setResourceTiming] = useState<PerformanceResourceTiming[]>([]);

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const resources = list.getEntries() as PerformanceResourceTiming[];
      setResourceTiming(prev => [...prev, ...resources]);
      
      // Calculate total bundle size
      const totalSize = resources.reduce((total, resource) => {
        return total + (resource.transferSize || 0);
      }, 0);
      
      setBundleSize(totalSize);
    });

    observer.observe({ entryTypes: ['resource'] });

    return () => observer.disconnect();
  }, []);

  return { bundleSize, resourceTiming };
};

// Performance alert component
export const PerformanceAlerts: React.FC<{ 
  metrics: PerformanceMetrics;
  onAlert?: (metric: string, value: number) => void;
}> = ({ metrics, onAlert }) => {
  const alerts = Object.entries(metrics).filter(([key, value]) => {
    if (value === null) return false;
    const threshold = PERFORMANCE_THRESHOLDS[key as keyof typeof PERFORMANCE_THRESHOLDS];
    return value > threshold.needsImprovement;
  });

  useEffect(() => {
    alerts.forEach(([metric, value]) => {
      if (onAlert) {
        onAlert(metric, value as number);
      }
    });
  }, [alerts, onAlert]);

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg z-50">
      <h3 className="text-sm font-semibold text-yellow-800">Performance Alerts</h3>
      <ul className="mt-2 text-xs text-yellow-700">
        {alerts.map(([metric, value]) => (
          <li key={metric}>
            {metric.toUpperCase()}: {typeof value === 'number' ? value.toFixed(2) : value}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Performance dashboard component
export const PerformanceDashboard: React.FC = () => {
  const metrics = usePerformanceMonitoring();
  const memoryInfo = useMemoryMonitoring();
  const { bundleSize } = useBundleMonitoring();
  const [showDashboard, setShowDashboard] = useState(false);

  if (!showDashboard) {
    return (
      <button
        onClick={() => setShowDashboard(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-3 py-2 rounded-lg text-xs z-50"
      >
        Performance
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold">Performance Metrics</h3>
        <button
          onClick={() => setShowDashboard(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-2 text-xs">
        <div>
          <strong>Core Web Vitals:</strong>
          <ul className="ml-2 mt-1 space-y-1">
            {Object.entries(metrics).map(([key, value]) => (
              <li key={key} className="flex justify-between">
                <span>{key.toUpperCase()}:</span>
                <span className={
                  value !== null && value > PERFORMANCE_THRESHOLDS[key as keyof typeof PERFORMANCE_THRESHOLDS].needsImprovement
                    ? 'text-red-500'
                    : value !== null && value > PERFORMANCE_THRESHOLDS[key as keyof typeof PERFORMANCE_THRESHOLDS].good
                    ? 'text-yellow-500'
                    : 'text-green-500'
                }>
                  {value !== null ? value.toFixed(2) : 'N/A'}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        {memoryInfo && (
          <div>
            <strong>Memory Usage:</strong>
            <div className="ml-2 mt-1">
              <div>Used: {(memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB</div>
              <div>Total: {(memoryInfo.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB</div>
            </div>
          </div>
        )}
        
        {bundleSize && (
          <div>
            <strong>Bundle Size:</strong>
            <div className="ml-2 mt-1">
              {(bundleSize / 1024 / 1024).toFixed(2)} MB
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// HOC for performance monitoring
export const withPerformanceMonitoring = <P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) => {
  return React.memo((props: P) => {
    useRenderPerformance(componentName);
    
    return <Component {...props} />;
  });
};