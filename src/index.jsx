/**
 * Application Entry Point
 * 
 * This is the main entry file for the React application.
 * It:
 * - Creates the React root element
 * - Renders the App component into the DOM
 * - Enables React StrictMode for development warnings
 * 
 * The application is mounted to the 'root' div in index.html
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeContextProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Portfolio JSON is validated during App render (see validatePortfolioData),
// so the ErrorBoundary can surface a readable message instead of a blank screen.
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
