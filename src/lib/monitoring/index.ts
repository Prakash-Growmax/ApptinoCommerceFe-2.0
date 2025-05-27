// src/lib/monitoring/index.ts
import { getEnvironmentVariables, isProduction } from '@config/environment';
import * as Sentry from '@sentry/react';
import { Metric, getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';

const { API_URL } = getEnvironmentVariables();

// Initialize Sentry for error tracking
export const initSentry = () => {
  const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

  if (!isProduction() || !sentryDsn) return;

  Sentry.init({
    dsn: sentryDsn,
    environment: import.meta.env.MODE,
    integrations: [
      Sentry.browserTracingIntegration({
        // Set tracing origins to connect sentry for performance monitoring
        tracePropagationTargets: [API_URL, /^\//],
      }),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],

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
        const error = hint.originalException;

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
  getCLS(sendToAnalytics);
  getFCP(sendToAnalytics);
  getFID(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
};

// Performance observer for custom metrics
export const initPerformanceObserver = () => {
  if (!('PerformanceObserver' in window)) return;

  // Largest Contentful Paint
  const lcpObserver = new PerformanceObserver(entryList => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];

    // Send to analytics
    console.log('LCP:', lastEntry.startTime);
  });
  lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

  // First Input Delay
  const fidObserver = new PerformanceObserver(entryList => {
    entryList.getEntries().forEach(entry => {
      console.log('FID:', entry.processingStart - entry.startTime);
    });
  });
  fidObserver.observe({ entryTypes: ['first-input'] });

  // Cumulative Layout Shift
  const clsObserver = new PerformanceObserver(entryList => {
    let clsValue = 0;
    entryList.getEntries().forEach(entry => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    });
    console.log('CLS:', clsValue);
  });
  clsObserver.observe({ entryTypes: ['layout-shift'] });
};

// Custom performance tracking
export class PerformanceTracker {
  private startTimes = new Map<string, number>();

  startMeasure(name: string) {
    this.startTimes.set(name, performance.now());
  }

  endMeasure(name: string) {
    const startTime = this.startTimes.get(name);
    if (!startTime) return;

    const duration = performance.now() - startTime;
    this.startTimes.delete(name);

    // Send to analytics
    this.sendCustomMetric(name, duration);

    return duration;
  }

  private sendCustomMetric(name: string, duration: number) {
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
      console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`);
    }
  }
}

// Error boundary logging
export const logErrorBoundary = (error: Error, errorInfo: any) => {
  if (isProduction()) {
    Sentry.withScope(scope => {
      scope.setTag('errorBoundary', true);
      scope.setContext('errorInfo', errorInfo);
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
  error: any
) => {
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
  additionalData?: Record<string, any>
) => {
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

  console.log('User Interaction:', { action, element, additionalData });
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
export const initMonitoring = () => {
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
