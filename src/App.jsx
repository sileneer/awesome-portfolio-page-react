import React, { useEffect, useContext, useMemo, Suspense, lazy } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, CircularProgress, Fab, Zoom, useScrollTrigger } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ChevronUp } from 'lucide';
import { MotionConfig, AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import AppIcon from './components/AppIcon';
import { ThemeContext } from './context/ThemeContext';
import { buildTheme } from './theme';

import personalInfo from './data/personalInfo.json';
import navigation from './data/navigation.json';
import resume from './data/resume.json';
import projects from './data/projects.json';
import contact from './data/contact.json';
import research from './data/research.json';
import { validatePortfolioData } from './data/schemas';
import { pageTitle } from './utils/pageTitle';

const HomePage = lazy(() => import('./components/pages/HomePage'));
const ResumePage = lazy(() => import('./components/pages/ResumePage'));
const ProjectsPage = lazy(() => import('./components/pages/ProjectsPage'));
const ResearchPage = lazy(() => import('./components/pages/ResearchPage'));
const ContactPage = lazy(() => import('./components/pages/ContactPage'));

// Registry of page components addressable from navigation.json.
// Add new pages here: import lazily above, then register the same name used
// in navigation.json's `component` field.
const PAGE_COMPONENTS = { HomePage, ResumePage, ProjectsPage, ResearchPage, ContactPage };

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
const data = { personalInfo, navigation, resume, projects, research, contact };

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
  const theme = useMemo(() => buildTheme(mode), [mode]);

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

            {/* The navigation is a fixed bottom dock, so the clearance for it
                belongs to the last element in the column — the footer — not
                to the scrolling content. Pages must not add their own bottom
                padding on top of that. */}
            <Box component="main" id="main-content" sx={{ flex: 1 }}>
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
