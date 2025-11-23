import { lazy, Suspense, ComponentType } from "react";

/**
 * Lazy Load Routes Utility
 * 
 * Implements code splitting to reduce initial bundle size and improve load times.
 * Each route is loaded only when needed, reducing memory usage and preview breaking.
 */

// Loading fallback component
const RouteLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

/**
 * Wrapper for lazy-loaded components with Suspense
 */
export const lazyLoad = (
  importFunc: () => Promise<{ default: ComponentType<any> }>
) => {
  const LazyComponent = lazy(importFunc);
  
  return (props: any) => (
    <Suspense fallback={<RouteLoading />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

/**
 * Preload a route before it's needed (on hover/focus)
 */
export const preloadRoute = (
  importFunc: () => Promise<{ default: ComponentType<any> }>
) => {
  importFunc();
};
