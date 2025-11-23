import { useCallback, useEffect, useRef } from "react";
import { memoryLeakDetector } from "@/utils/performanceMonitor";

/**
 * Hook to prevent unnecessary re-renders and detect memory leaks
 */
export const useOptimizedRender = (componentName: string) => {
  const renderCount = useRef(0);
  const mountTime = useRef(Date.now());

  useEffect(() => {
    renderCount.current += 1;
    
    // Track component mount
    memoryLeakDetector.trackMount(componentName);

    // Warn if component renders too frequently
    if (renderCount.current > 50) {
      console.warn(
        `[Performance] ${componentName} has rendered ${renderCount.current} times. Check for unnecessary re-renders.`
      );
    }

    return () => {
      // Track component unmount
      memoryLeakDetector.trackUnmount(componentName);
      
      // Log component lifetime
      const lifetime = Date.now() - mountTime.current;
      if (import.meta.env.DEV && lifetime < 100) {
        console.warn(
          `[Performance] ${componentName} unmounted after ${lifetime}ms. Possible memory leak or unnecessary mount/unmount.`
        );
      }
    };
  }, [componentName]);

  return renderCount.current;
};

/**
 * Debounced callback to prevent excessive function calls
 */
export const useDebouncedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};

/**
 * Throttled callback to limit function call frequency
 */
export const useThrottledCallback = <T extends (...args: any[]) => any>(
  callback: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  const inThrottle = useRef(false);

  return useCallback(
    (...args: Parameters<T>) => {
      if (!inThrottle.current) {
        callback(...args);
        inThrottle.current = true;
        setTimeout(() => {
          inThrottle.current = false;
        }, limit);
      }
    },
    [callback, limit]
  );
};
