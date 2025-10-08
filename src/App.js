import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Fade } from '@mui/material';
import Navigation from './components/Navigation';
import { HomePage, ResumePage, ProjectsPage, ContactPage } from './components/Pages';
import personalInfo from './data/user/personalInfo.json';
import navigation from './data/core/navigation.json';
import resume from './data/user/resume.json';
import projects from './data/user/projects.json';
import contact from './data/user/contact.json';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#6c757d',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
    },
  },
  typography: {
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
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      '@media (max-width:768px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      marginBottom: '1rem',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
          // Global smooth float-up hover
          transform: 'translateY(0)',
          transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1), background-color 200ms linear',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[4],
          },
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'translateY(0)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: theme.shadows[8],
          },
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          // Global smooth float-up hover for chips
          transform: 'translateY(0)',
          transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[2],
          },
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          // Gentle hover float for links
          transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms linear',
          transform: 'translateY(0)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 'none',
          },
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1), background-color 200ms linear',
          transform: 'translateY(0)',
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
      styleOverrides: {
        root: {
          paddingLeft: '24px',
          paddingRight: '24px',
          '@media (max-width:600px)': {
            paddingLeft: '16px',
            paddingRight: '16px',
          },
        },
        maxWidthLg: {
          maxWidth: 'min(900px, calc(100vw - 48px))',
        },
      },
    },
  },
});

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const data = {
    personalInfo,
    navigation,
    resume,
    projects,
    contact,
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

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
        return <HomePage data={data} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        <Navigation
          data={data}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
        <Fade in timeout={500} key={currentPage}>
          <div>
            {renderCurrentPage()}
          </div>
        </Fade>
      </Box>
    </ThemeProvider>
  );
}

export default App;
