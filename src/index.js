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

// Create React root and attach to DOM element with id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
// StrictMode helps identify potential problems in the application during development
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
