import React, { useEffect, useContext, useMemo, Suspense, lazy } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, CircularProgress, Fab, Zoom, useScrollTrigger } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MotionConfig, AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { ThemeContext } from './context/ThemeContext';

import personalInfo from './data/user/personalInfo.json';
import navigation from './data/core/navigation.json';
import resume from './data/user/resume.json';
import projects from './data/user/projects.json';
import contact from './data/user/contact.json';

const HomePage = lazy(() => import('./components/pages/HomePage'));
const ResumePage = lazy(() => import('./components/pages/ResumePage'));
const ProjectsPage = lazy(() => import('./components/pages/ProjectsPage'));
const ContactPage = lazy(() => import('./components/pages/ContactPage'));

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'dark'
      ? {
          primary: { main: '#2dd4bf', dark: '#0d9488', light: '#5eead4' }, // Teal/Cyan
          secondary: { main: '#a78bfa', dark: '#7c3aed', light: '#c4b5fd' }, // Violet
          background: { default: '#0f172a', paper: '#1e293b' }, // Slate
          text: { primary: '#f8fafc', secondary: '#cbd5e1' },
          divider: 'rgba(255, 255, 255, 0.1)',
        }
      : {
          primary: { main: '#0891b2', dark: '#164e63', light: '#06b6d4' }, // Cyan
          secondary: { main: '#7c3aed', dark: '#4c1d95', light: '#8b5cf6' }, // Violet
          background: { default: '#f8fafc', paper: '#ffffff' }, // Slate
          text: { primary: '#0f172a', secondary: '#475569' },
          divider: 'rgba(15, 23, 42, 0.1)',
        }),
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    lineHeight: 1.7,
    letterSpacing: '0.02em',
    h1: { fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: '4rem', '@media (max-width:768px)': { fontSize: '2.5rem' } },
    h2: { fontFamily: '"Outfit", sans-serif', fontWeight: 700, fontSize: '3rem' },
    h3: { fontFamily: '"Outfit", sans-serif', fontWeight: 700, fontSize: '2rem' },
    h4: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600, fontFamily: '"Outfit", sans-serif' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, transition: 'all 0.3s ease' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: mode === 'dark' ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(15, 23, 42, 0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          background: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)',
          border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(15, 23, 42, 0.1)',
        },
      },
    },
    MuiContainer: {
      defaultProps: { maxWidth: 'lg' },
    },
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        '::-webkit-scrollbar-track': {
          background: themeParam.palette.background.default,
        },
        '::-webkit-scrollbar-thumb': {
          background: themeParam.palette.mode === 'dark' ? '#2a2a35' : '#cbd5e1',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: themeParam.palette.secondary.main,
        },
      }),
    },
  },
});

const PageLoader = () => (
  <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <CircularProgress />
  </Box>
);

const AnimatedRoutes = ({ data }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<RouteWrapper><HomePage data={data} /></RouteWrapper>} />
        <Route path="/resume" element={<RouteWrapper><ResumePage data={data} /></RouteWrapper>} />
        <Route path="/projects" element={<RouteWrapper><ProjectsPage data={data} /></RouteWrapper>} />
        <Route path="/contact" element={<RouteWrapper><ContactPage data={data} /></RouteWrapper>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

const RouteWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
  >
    {children}
  </motion.div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const ScrollToTopButton = () => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 200 });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        color="primary"
        size="medium"
        onClick={handleClick}
        aria-label="Scroll back to top"
        sx={{
          position: 'fixed',
          bottom: { xs: 88, md: 104 },
          right: { xs: 16, md: 32 },
          zIndex: 999,
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};

function App() {
  const { mode } = useContext(ThemeContext);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const data = {
    personalInfo,
    navigation,
    resume,
    projects,
    contact,
  };

  useEffect(() => {
    document.title = `${personalInfo.name} | ${personalInfo.title}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `${personalInfo.name} - ${personalInfo.title}. ${personalInfo.bio}`);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <ScrollToTop />
          <ScrollToTopButton />

          <Box
            component="a"
            href="#main-content"
            sx={{
              position: 'absolute',
              left: -9999,
              top: 0,
              padding: '8px 16px',
              background: theme.palette.primary.main,
              color: theme.palette.getContrastText(theme.palette.primary.main),
              zIndex: 9999,
              borderRadius: '0 0 8px 0',
              '&:focus': { left: 0 },
            }}
          >
            Skip to content
          </Box>

          <Box sx={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: -1,
            background: mode === 'dark'
              ? 'radial-gradient(circle at 15% 50%, rgba(45, 212, 191, 0.08), transparent 30%), radial-gradient(circle at 85% 30%, rgba(167, 139, 250, 0.08), transparent 30%)'
              : 'radial-gradient(circle at 15% 50%, rgba(8, 145, 178, 0.08), transparent 35%), radial-gradient(circle at 85% 30%, rgba(124, 58, 237, 0.08), transparent 35%)',
          }} />

          <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Navigation data={data} />

            <Box component="main" id="main-content" sx={{ flex: 1, pb: 10 }}>
              <Suspense fallback={<PageLoader />}>
                <AnimatedRoutes data={data} />
              </Suspense>
            </Box>

            <Footer />
          </Box>
        </BrowserRouter>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
