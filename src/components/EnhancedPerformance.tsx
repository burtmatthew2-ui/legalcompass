import { useEffect } from "react";
import { Helmet } from "react-helmet";

/**
 * Enhanced Performance Optimization Component
 * 
 * Implements Phase 3 recommendations for improved loading speed and Core Web Vitals:
 * - Image optimization with lazy loading
 * - Resource preloading and prefetching
 * - DNS prefetch for external resources
 * - Preconnect to critical origins
 */
export const EnhancedPerformance = () => {
  useEffect(() => {
    // Lazy load images that are below the fold
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    }

    // Optimize third-party script loading
    const optimizeScripts = () => {
      // Defer non-critical scripts
      const scripts = document.querySelectorAll('script[data-defer="true"]');
      scripts.forEach((script) => {
        script.setAttribute('defer', 'true');
      });
    };

    optimizeScripts();
  }, []);

  return (
    <Helmet>
      {/* DNS Prefetch for external resources */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      
      {/* Preconnect to critical origins */}
      <link rel="preconnect" href="https://ifsckryvwehynahixmro.supabase.co" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Preload critical resources */}
      <link rel="preload" as="style" href="/src/index.css" />
      
      {/* Resource hints for better performance */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
    </Helmet>
  );
};
