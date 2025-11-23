// App entry point - force fresh type generation
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n/config";
import { initPerformanceObserver, checkBundleSize } from "./utils/performanceMonitor";

// Initialize performance monitoring
if (import.meta.env.DEV) {
  initPerformanceObserver();
  checkBundleSize();
}

createRoot(document.getElementById("root")!).render(<App />);
