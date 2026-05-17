/**
 * Application Entry Point
 * 
 * This is the main entry file for the React application.
 * It:
 * - Creates the React root element
 * - Renders the App component into the DOM
 * - Enables React StrictMode for development warnings
 * 
 * The application is mounted to the 'root' div in public/index.html
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeContextProvider } from './context/ThemeContext';
import { validatePortfolioData } from './data/schemas';

// Validate JSON data at boot — throws a clear error in the console if any
// data file is malformed, before React tries to render against bad data.
validatePortfolioData();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </React.StrictMode>
);
