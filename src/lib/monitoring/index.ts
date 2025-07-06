// src/lib/monitoring/index.ts
import { getEnvironmentVariables, isProduction } from '@config/environment';
import * as Sentry from '@sentry/react';
import { Metric } from 'web-vitals';
import { ErrorInfo } from 'react';

const { API_URL } = getEnvironmentVariables();

// Initialize Sentry for error tracking
export const initSentry = () => {
  const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

  if (!isProduction() || !sentryDsn) return;

  Sentry.init({
    dsn: sentryDsn,
    environment: import.meta.env.MODE,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],

    // Set tracing origins to connect sentry for performance monitoring
    tracePropagationTargets: API_URL ? [API_URL, /^\//] : [/^\//],

    // Performance monitoring
    tracesSampleRate: isProduction() ? 0.1 : 1.0,

    // Session replay (optional)
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    // Release tracking
    release: import.meta.env.VITE_APP_VERSION,

    // Enhanced error capture
    beforeSend: (event, hint) => {
      // Filter out specific errors
      if (event.exception) {
        const error = hint.originalException as Error;

        // Ignore network errors in development
        if (!isProduction() && error?.message?.includes('fetch')) {
          return null;
        }

        // Ignore React DevTools extension errors
        if (error?.stack?.includes('chrome-extension://')) {
          return null;
        }
      }

      return event;
    },
  });
};

// Web Vitals monitoring
const vitalsUrl = '/api/analytics/web-vitals';

function sendToAnalytics(metric: Metric) {
  const body = JSON.stringify(metric);

  // Use sendBeacon if available
  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, body);
  } else {
    // Fallback to fetch
    fetch(vitalsUrl, {
      body,
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(console.error);
  }
}

// Initialize Web Vitals tracking
export const initWebVitals = () => {
  // Import web-vitals dynamically to use the new API
  import('web-vitals').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onINP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  });
};

// Performance observer for custom metrics
export const initPerformanceObserver = () => {
  if (!('PerformanceObserver' in window)) return;

  // Largest Contentful Paint
  const lcpObserver = new PerformanceObserver(entryList => {
    const entries = entryList.getEntries();
    // Process LCP entries if needed
    entries.forEach(() => {
      // Add processing logic here if needed
    });
  });
  lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

  // First Input Delay
  const fidObserver = new PerformanceObserver(entryList => {
    entryList.getEntries().forEach(() => {
      // Add processing logic here if needed
    });
  });
  fidObserver.observe({ entryTypes: ['first-input'] });

  // Cumulative Layout Shift
  const clsObserver = new PerformanceObserver(entryList => {
    let clsValue = 0;
    entryList.getEntries().forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    });
    // Send clsValue to analytics if needed
    if (clsValue > 0) {
      sendToAnalytics({ 
        name: 'CLS', 
        value: clsValue, 
        rating: 'good', 
        delta: 0, 
        entries: [],
        id: `v5-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
        navigationType: 'navigate'
      });
    }
  });
  clsObserver.observe({ entryTypes: ['layout-shift'] });
};

// Custom performance tracking
export class PerformanceTracker {
  private startTimes = new Map<string, number>();

  startMeasure(name: string): void {
    this.startTimes.set(name, performance.now());
  }

  endMeasure(name: string): number | undefined {
    const startTime = this.startTimes.get(name);
    if (!startTime) return;

    const duration = performance.now() - startTime;
    this.startTimes.delete(name);

    // Send to analytics
    this.sendCustomMetric(name, duration);

    return duration;
  }

  private sendCustomMetric(name: string, duration: number): void {
    // Send to your analytics service
    if (isProduction()) {
      fetch('/api/analytics/custom-metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          duration,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          url: window.location.href,
        }),
      }).catch(console.error);
    } else {
    }
  }
}

// Error boundary logging
export const logErrorBoundary = (error: Error, errorInfo: ErrorInfo): void => {
  if (isProduction()) {
    Sentry.withScope(scope => {
      scope.setTag('errorBoundary', true);
      scope.setContext('errorInfo', {
        componentStack: errorInfo.componentStack,
        digest: errorInfo.digest
      });
      Sentry.captureException(error);
    });
  }

  console.error('Error Boundary caught an error:', error, errorInfo);
};

// API error tracking
export const logApiError = (
  url: string,
  method: string,
  status: number,
  error: unknown
): void => {
  if (isProduction()) {
    Sentry.addBreadcrumb({
      category: 'api',
      message: `${method} ${url} - ${status}`,
      level: 'error',
      data: { error },
    });
  }

  console.error(`API Error: ${method} ${url}`, { status, error });
};

// User interaction tracking
export const trackUserInteraction = (
  action: string,
  element?: string,
  additionalData?: Record<string, unknown>
): void => {
  if (isProduction()) {
    // Send to your analytics service
    fetch('/api/analytics/interactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action,
        element,
        timestamp: Date.now(),
        url: window.location.pathname,
        ...additionalData,
      }),
    }).catch(console.error);
  }
};

// Bundle size tracking
export const trackBundleSize = () => {
  if (!isProduction()) return;

  // Track loaded resources
  const resources = performance.getEntriesByType('resource');
  const bundleSize = resources
    .filter(
      resource =>
        resource.name.includes('.js') || resource.name.includes('.css')
    )
    .reduce((total, resource) => total + (resource.transferSize || 0), 0);

  fetch('/api/analytics/bundle-size', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bundleSize,
      resourceCount: resources.length,
      timestamp: Date.now(),
    }),
  }).catch(console.error);
};

// Initialize all monitoring
export const initMonitoring = (): void => {
  initSentry();
  initWebVitals();
  initPerformanceObserver();

  // Track bundle size after load
  window.addEventListener('load', () => {
    setTimeout(trackBundleSize, 1000);
  });
};

// Export performance tracker instance
export const performanceTracker = new PerformanceTracker();
