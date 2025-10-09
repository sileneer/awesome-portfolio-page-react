/**
 * Main Application Component
 * 
 * This is the root component of the portfolio application.
 * It manages:
 * - Global theme configuration using Material-UI
 * - Page navigation state
 * - Data loading from JSON files
 * - Page transitions with fade effects
 */

import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Fade } from '@mui/material';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { HomePage, ResumePage, ProjectsPage, ContactPage } from './components/Pages';

// Import all portfolio data from JSON files
import personalInfo from './data/user/personalInfo.json';
import navigation from './data/core/navigation.json';
import resume from './data/user/resume.json';
import projects from './data/user/projects.json';
import contact from './data/user/contact.json';

/**
 * Material-UI Theme Configuration
 * 
 * Defines the visual appearance of the entire application including:
 * - Color palette (primary, secondary, background, text colors)
 * - Typography settings (fonts, sizes, weights)
 * - Component style overrides (buttons, cards, chips, links)
 * - Responsive breakpoints and container settings
 */
const theme = createTheme({
  // Color palette configuration
  palette: {
    mode: 'light', // Light mode theme
    primary: {
      main: '#007bff', // Primary blue color for buttons, links, etc.
    },
    secondary: {
      main: '#6c757d', // Secondary gray color for accents
    },
    background: {
      default: '#ffffff', // Main background color
      paper: '#ffffff',   // Card/paper background color
    },
    text: {
      primary: '#333333',   // Main text color
      secondary: '#555555', // Secondary text color (less emphasis)
    },
  },
  // Typography configuration - defines font styles across the app
  typography: {
    // System font stack for optimal performance and native look
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
    // Heading 1 - Used for main page titles
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      '@media (max-width:768px)': {
        fontSize: '2rem', // Smaller on mobile devices
      },
    },
    // Heading 2 - Used for section titles
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      marginBottom: '1rem',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
    },
    // Heading 3 - Used for subsection titles
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
    },
  },
  // Component-specific style overrides
  components: {
    // Typography - Ensure text wraps properly on all screen sizes
    MuiTypography: {
      styleOverrides: {
        root: {
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
        },
      },
    },
    // Button - Custom styling for all buttons in the app
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'none', // Disable uppercase transformation
          borderRadius: 8,       // Rounded corners
          fontWeight: 500,
          // Smooth float-up hover effect for all buttons
          transform: 'translateY(0)',
          transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1), background-color 200ms linear',
          '&:hover': {
            transform: 'translateY(-2px)', // Lift button on hover
            boxShadow: theme.shadows[4],   // Add shadow on hover
          },
        }),
      },
    },
    // Card - Styling for content cards (projects, experience, etc.)
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 12, // Rounded corners for modern look
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'translateY(0)',
          '&:hover': {
            transform: 'translateY(-8px)', // Lift card on hover
            boxShadow: theme.shadows[8],   // Increase shadow on hover
          },
        }),
      },
    },
    // Chip - Styling for technology tags and labels
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          // Smooth float-up hover effect for chips
          transform: 'translateY(0)',
          transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)', // Slight lift on hover
            boxShadow: theme.shadows[2],
          },
        }),
      },
    },
    // Link - Styling for hyperlinks
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          // Gentle hover effect for links
          transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms linear',
          transform: 'translateY(0)',
          '&:hover': {
            transform: 'translateY(-2px)', // Slight lift on hover
            boxShadow: 'none',
          },
        }),
      },
    },
    // IconButton - Styling for icon-only buttons
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1), background-color 200ms linear',
          transform: 'translateY(0)',
        },
      },
    },
    // Container - Main content container settings
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg', // Default to large container size
      },
      styleOverrides: {
        root: {
          paddingLeft: '24px',
          paddingRight: '24px',
          '@media (max-width:600px)': {
            paddingLeft: '16px',  // Smaller padding on mobile
            paddingRight: '16px',
          },
        },
        maxWidthLg: {
          maxWidth: 'min(900px, calc(100vw - 48px))', // Responsive max width
        },
      },
    },
  },
});

/**
 * Main App Component
 * 
 * Manages the application state and renders the appropriate page
 * based on user navigation.
 */

function App() {
  // State to track which page is currently displayed
  const [currentPage, setCurrentPage] = useState('home');
  
  // Combine all data sources into a single object for easy passing to components
  const data = {
    personalInfo, // Personal information (name, title, bio, etc.)
    navigation,   // Navigation menu configuration
    resume,       // Resume data (experience, education, skills)
    projects,     // Projects portfolio data
    contact,      // Contact information and social links
  };

  // Update document title and meta description dynamically from JSON data
  useEffect(() => {
    // Set document title
    document.title = `${personalInfo.name} | ${personalInfo.title}`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `${personalInfo.name} - ${personalInfo.title}. ${personalInfo.bio}`);
    }
  }, []);

  /**
   * Handle navigation between pages
   * @param {string} page - The page identifier to navigate to
   */
  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  /**
   * Render the appropriate page component based on current navigation state
   * @returns {JSX.Element} The page component to display
   */
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage data={data} />;
      case 'resume':
        return <ResumePage data={data} />;
      case 'projects':
        return <ProjectsPage data={data} />;
      case 'contact':
        return <ContactPage data={data} />;
      default:
        return <HomePage data={data} />; // Fallback to home page
    }
  };

  return (
    // Apply Material-UI theme to entire application
    <ThemeProvider theme={theme}>
      {/* CssBaseline - Normalizes CSS across browsers */}
      <CssBaseline />
      
      {/* Main container with minimum full viewport height and flex layout */}
      <Box sx={{ 
        minHeight: '100vh', 
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Navigation bar - always visible at top */}
        <Navigation
          data={data}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
        
        {/* Page content with fade transition effect when switching pages */}
        <Fade in timeout={500} key={currentPage}>
          <Box sx={{ flex: 1 }}>
            {renderCurrentPage()}
          </Box>
        </Fade>

        {/* Footer - always visible at bottom */}
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
