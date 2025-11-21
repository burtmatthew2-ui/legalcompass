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

    // Lazy load images
    if ("loading" in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[data-src]');
      images.forEach((img) => {
        const imgElement = img as HTMLImageElement;
        imgElement.src = imgElement.dataset.src || "";
      });
    } else {
      // Fallback for browsers that don't support lazy loading
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <Helmet>
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS prefetch for faster resource loading */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
    </Helmet>
  );
};
