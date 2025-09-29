import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Fade } from '@mui/material';
import Navigation from './components/Navigation';
import { HomePage, ResumePage, ProjectsPage, ContactPage } from './components/Pages';
import portfolioData from './data/portfolio.json';

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
      '@media (max-width:768px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      marginBottom: '1rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
  },
});

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const data = portfolioData;

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
