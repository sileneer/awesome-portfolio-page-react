/**
 * Web Vitals Performance Monitoring
 * 
 * This module measures and reports Core Web Vitals metrics.
 * These metrics help understand the user experience quality:
 * 
 * - CLS (Cumulative Layout Shift): Visual stability
 * - FID (First Input Delay): Interactivity
 * - FCP (First Contentful Paint): Loading performance
 * - LCP (Largest Contentful Paint): Loading performance
 * - TTFB (Time to First Byte): Server response time
 * 
 * @param {Function} onPerfEntry - Callback function to handle performance entries
 * 
 * Usage:
 * reportWebVitals(console.log) - Log metrics to console
 * reportWebVitals(sendToAnalytics) - Send metrics to analytics service
 */
const reportWebVitals = onPerfEntry => {
  // Only measure if a valid callback function is provided
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import web-vitals library to avoid loading it unnecessarily
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);  // Cumulative Layout Shift
      getFID(onPerfEntry);  // First Input Delay
      getFCP(onPerfEntry);  // First Contentful Paint
      getLCP(onPerfEntry);  // Largest Contentful Paint
      getTTFB(onPerfEntry); // Time to First Byte
    });
  }
};

export default reportWebVitals;
