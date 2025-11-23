/**
 * Performance Monitoring Utility
 * 
 * Tracks Core Web Vitals and component performance to identify bottlenecks
 * and prevent preview breaking due to performance issues.
 */

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

/**
 * Report Web Vitals to console (can be extended to send to analytics)
 */
export const reportWebVitals = (metric: PerformanceMetric) => {
  // Only log in development
  if (import.meta.env.DEV) {
    console.log(`[Performance] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating
    });
  }
  
  // In production, you could send to analytics:
  // sendToAnalytics(metric);
};

/**
 * Measure component render time
 */
export const measureRenderTime = (componentName: string, callback: () => void) => {
  const startTime = performance.now();
  callback();
  const endTime = performance.now();
  const renderTime = endTime - startTime;
  
  if (import.meta.env.DEV && renderTime > 16) {
    console.warn(`[Performance Warning] ${componentName} took ${renderTime.toFixed(2)}ms to render (>16ms)`);
  }
  
  return renderTime;
};

/**
 * Detect memory leaks by tracking component mounts
 */
class MemoryLeakDetector {
  private mountedComponents = new Map<string, number>();
  
  trackMount(componentName: string) {
    const count = this.mountedComponents.get(componentName) || 0;
    this.mountedComponents.set(componentName, count + 1);
    
    // Warn if too many instances
    if (count > 50) {
      console.error(`[Memory Leak Warning] ${componentName} has ${count} mounted instances!`);
    }
  }
  
  trackUnmount(componentName: string) {
    const count = this.mountedComponents.get(componentName) || 0;
    this.mountedComponents.set(componentName, Math.max(0, count - 1));
  }
  
  getStats() {
    return Array.from(this.mountedComponents.entries())
      .filter(([_, count]) => count > 0)
      .sort((a, b) => b[1] - a[1]);
  }
}

export const memoryLeakDetector = new MemoryLeakDetector();

/**
 * Performance observer for LCP, FID, CLS
 */
export const initPerformanceObserver = () => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }
  
  try {
    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      
      reportWebVitals({
        name: 'LCP',
        value: lastEntry.renderTime || lastEntry.loadTime,
        rating: lastEntry.renderTime < 2500 ? 'good' : lastEntry.renderTime < 4000 ? 'needs-improvement' : 'poor'
      });
    });
    
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    
    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        reportWebVitals({
          name: 'FID',
          value: entry.processingStart - entry.startTime,
          rating: entry.processingStart - entry.startTime < 100 ? 'good' : entry.processingStart - entry.startTime < 300 ? 'needs-improvement' : 'poor'
        });
      });
    });
    
    fidObserver.observe({ entryTypes: ['first-input'] });
    
    // Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      
      reportWebVitals({
        name: 'CLS',
        value: clsValue,
        rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
      });
    });
    
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  } catch (error) {
    // Silently fail if PerformanceObserver is not supported
    console.error('Performance monitoring failed:', error);
  }
};

/**
 * Check bundle size and warn if too large
 */
export const checkBundleSize = () => {
  if (import.meta.env.DEV) {
    const scripts = document.querySelectorAll('script[src]');
    let totalSize = 0;
    
    scripts.forEach((script) => {
      const src = script.getAttribute('src');
      if (src && src.includes('index')) {
        // Estimate size based on content length (rough estimate)
        fetch(src)
          .then(res => res.text())
          .then(text => {
            const sizeKB = new Blob([text]).size / 1024;
            totalSize += sizeKB;
            
            if (sizeKB > 500) {
              console.warn(`[Bundle Warning] Large bundle detected: ${sizeKB.toFixed(2)}KB`);
            }
          })
          .catch(() => {});
      }
    });
  }
};
