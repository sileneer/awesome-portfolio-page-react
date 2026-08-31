import React, { useEffect, useContext, useMemo, Suspense, lazy } from 'react';
import { ThemeProvider, createTheme, alpha } from '@mui/material/styles';
import { CssBaseline, Box, CircularProgress, Fab, Zoom, useScrollTrigger } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ChevronUp } from 'lucide';
import { MotionConfig, AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import AppIcon from './components/AppIcon';
import { ThemeContext } from './context/ThemeContext';

import personalInfo from './data/personalInfo.json';
import navigation from './data/navigation.json';
import resume from './data/resume.json';
import projects from './data/projects.json';
import contact from './data/contact.json';
import { validatePortfolioData } from './data/schemas';
import { pageTitle } from './utils/pageTitle';

const HomePage = lazy(() => import('./components/pages/HomePage'));
const ResumePage = lazy(() => import('./components/pages/ResumePage'));
const ProjectsPage = lazy(() => import('./components/pages/ProjectsPage'));
const ContactPage = lazy(() => import('./components/pages/ContactPage'));

// Registry of page components addressable from navigation.json.
// Add new pages here: import lazily above, then register the same name used
// in navigation.json's `component` field.
const PAGE_COMPONENTS = { HomePage, ResumePage, ProjectsPage, ContactPage };

// Throws at render time if nav.json references an unknown component — loud
// failure that surfaces config typos immediately. To soften this, return a
// fallback (e.g. HomePage) with a console.warn instead.
const resolvePageComponent = (name) => {
  const Component = PAGE_COMPONENTS[name];
  if (!Component) throw new Error(`Unknown page component "${name}" in navigation.json`);
  return Component;
};

// Static ESM imports that can never change at runtime — built once at module
// scope so the object identity is stable across renders.
const data = { personalInfo, navigation, resume, projects, contact };

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    // MUI's default of 3 is the WCAG *large text* threshold, so getContrastText
    // will hand back white for a button whose label is normal-sized and only
    // reaches ~3.7:1. 4.5 makes it flip to dark text instead of guessing.
    contrastThreshold: 4.5,
    ...(mode === 'dark'
      ? {
          primary: { main: '#2dd4bf', dark: '#0d9488', light: '#5eead4' }, // Teal/Cyan
          secondary: { main: '#a78bfa', dark: '#7c3aed', light: '#c4b5fd' }, // Violet
          success: { main: '#4ade80', dark: '#22c55e', light: '#86efac' }, // Green — "available" indicators
          background: { default: '#0f172a', paper: '#1e293b' }, // Slate
          text: { primary: '#f8fafc', secondary: '#cbd5e1' },
          divider: 'rgba(255, 255, 255, 0.1)',
        }
      : {
          // cyan-700, not cyan-600: #0891b2 only reaches 3.5-3.7:1 against every
          // light surface here, so primary-coloured body text and white-on-primary
          // buttons both failed AA. #0e7490 clears 4.8:1 on the worst of them.
          primary: { main: '#0e7490', dark: '#164e63', light: '#06b6d4' }, // Cyan
          secondary: { main: '#7c3aed', dark: '#4c1d95', light: '#8b5cf6' }, // Violet
          success: { main: '#16a34a', dark: '#15803d', light: '#4ade80' }, // Green — "available" indicators
          background: { default: '#f8fafc', paper: '#ffffff' }, // Slate
          text: { primary: '#0f172a', secondary: '#475569' },
          divider: 'rgba(15, 23, 42, 0.1)',
        }),
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    lineHeight: 1.7,
    letterSpacing: '0.02em',
    // Fluid scale: headings shrink on small screens instead of relying on the
    // explicit per-page fontSize overrides everywhere.
    h1: { fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: 'clamp(2.5rem, 5vw + 1rem, 4rem)' },
    h2: { fontFamily: '"Outfit", sans-serif', fontWeight: 700, fontSize: 'clamp(1.9rem, 3.5vw + 0.9rem, 3rem)' },
    h3: { fontFamily: '"Outfit", sans-serif', fontWeight: 700, fontSize: 'clamp(1.4rem, 2.5vw + 0.7rem, 2rem)' },
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
        // Firefox equivalent of the -webkit-scrollbar rules below.
        html: {
          scrollbarWidth: 'thin',
          scrollbarColor: `${themeParam.palette.mode === 'dark' ? '#2a2a35' : '#cbd5e1'} ${themeParam.palette.background.default}`,
        },
        // Brand-tinted text selection instead of the browser default blue.
        '::selection': {
          backgroundColor: alpha(themeParam.palette.primary.main, 0.28),
        },
        // One consistent, visible keyboard-focus ring everywhere — links, native
        // buttons and role="button" widgets alike. `currentColor` keeps the ring
        // readable even on accent-coloured elements.
        'a:focus-visible, button:focus-visible, [role="button"]:focus-visible': {
          outline: '2px solid currentColor',
          outlineOffset: 2,
        },
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
        {data.navigation.menuItems.map((item) => {
          const PageComponent = resolvePageComponent(item.component);
          return (
            <Route
              key={item.path}
              path={item.path}
              element={
                <RouteWrapper title={pageTitle(item, data.personalInfo)}>
                  <PageComponent data={data} />
                </RouteWrapper>
              }
            />
          );
        })}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

const RouteWrapper = ({ children, title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
};

// Omitting `behavior` makes these scrolls inherit `html { scroll-behavior }` from
// index.css, which is already switched to `auto` under prefers-reduced-motion.
// Passing `behavior: 'smooth'` here would override that guard.
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
};

const ScrollToTopButton = () => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 200 });

  const handleClick = () => {
    window.scrollTo({ top: 0 });
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
        <AppIcon icon={ChevronUp} size={24} />
      </Fab>
    </Zoom>
  );
};

function App() {
  // Validate portfolio JSON during render so the ErrorBoundary can surface a
  // readable message (instead of a blank screen) if a data file is malformed.
  useMemo(() => validatePortfolioData(), []);
  const { mode } = useContext(ThemeContext);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  // Keep the mobile browser chrome (status/nav bar tint) in step with the
  // active theme — index.html ships the dark default for the first paint.
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', mode === 'dark' ? '#0f172a' : '#f8fafc');
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MotionConfig reducedMotion="user">
        <BrowserRouter basename={import.meta.env.BASE_URL}>
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
            minHeight: '100dvh',
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
