import { useEffect } from "react";
import { Helmet } from "react-helmet";

export const PerformanceOptimizations = () => {
  useEffect(() => {
    // Preconnect to external domains
    const preconnectDomains = [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
    ];

    preconnectDomains.forEach((domain) => {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = domain;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    });

    // Native lazy loading for all images
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach((img) => {
      const imgElement = img as HTMLImageElement;
      // Add native lazy loading if not already present
      if (!imgElement.hasAttribute('loading')) {
        imgElement.setAttribute('loading', 'lazy');
      }
      // Add decoding async for better performance
      if (!imgElement.hasAttribute('decoding')) {
        imgElement.setAttribute('decoding', 'async');
      }
    });

    // Observer for dynamically added images
    const imageObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLImageElement) {
            node.setAttribute('loading', 'lazy');
            node.setAttribute('decoding', 'async');
          }
        });
      });
    });

    imageObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service worker registration failed - not critical
      });
    }

    return () => {
      imageObserver.disconnect();
    };
  }, []);

  return (
    <Helmet>
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS prefetch for faster resource loading */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

      {/* Resource hints for critical assets */}
      <link rel="prefetch" href="/icon-192.png" />
      <link rel="prefetch" href="/icon-512.png" />
    </Helmet>
  );
};
