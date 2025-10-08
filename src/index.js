/**
 * Application Entry Point
 * 
 * This is the main entry file for the React application.
 * It:
 * - Creates the React root element
 * - Renders the App component into the DOM
 * - Enables React StrictMode for development warnings
 * - Initializes performance monitoring
 * 
 * The application is mounted to the 'root' div in public/index.html
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create React root and attach to DOM element with id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
// StrictMode helps identify potential problems in the application during development
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/**
 * Performance Monitoring
 * 
 * reportWebVitals measures and reports key performance metrics:
 * - CLS (Cumulative Layout Shift)
 * - FID (First Input Delay)
 * - FCP (First Contentful Paint)
 * - LCP (Largest Contentful Paint)
 * - TTFB (Time to First Byte)
 * 
 * To log results to console: reportWebVitals(console.log)
 * To send to analytics: reportWebVitals(sendToAnalytics)
 * Learn more: https://bit.ly/CRA-vitals
 */
reportWebVitals();
