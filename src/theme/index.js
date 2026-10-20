/**
 * Theme — the single source of truth for the app's look.
 *
 * Colours, radii, type sizes and motion live here and in `./tokens`.
 * Pages must not hard-code these values: see
 * `plans/ui-audit/UI-CONSISTENCY-AUDIT.md` for the catalogue of
 * inconsistencies that came from doing so.
 */

import { createTheme, alpha } from '@mui/material/styles';
import { radius, fontSize, motion } from './tokens';

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
    // explicit per-page fontSize overrides everywhere. The page title uses the
    // same scale as the Home hero so the two never drift apart.
    //
    // Flat strings only — a theme typography variant cannot carry a
    // responsive `fontSize` object (it serialises to invalid CSS). The
    // responsive sizes live in `sx`, where MUI's sx processor handles them.
    h1: { fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: fontSize.pageTitle },
    h2: { fontFamily: '"Outfit", sans-serif', fontWeight: 700, fontSize: '2rem' },
    h3: { fontFamily: '"Outfit", sans-serif', fontWeight: 700, fontSize: fontSize.cardTitle },
    h4: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600, fontFamily: '"Outfit", sans-serif' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: radius.sm, transition: `all ${motion.hoverDuration} ease` },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: radius.lg,
          background: mode === 'dark' ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(15, 23, 42, 0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: radius.sm, fontWeight: 600 },
      },
      // `styleOverrides.root` applies to every variant, so the surface colour
      // lives in `variants` instead: those are applied *after* the style
      // overrides, which is what makes `variant="outlined"` genuinely
      // transparent instead of inheriting the filled background.
      variants: [
        {
          props: { variant: 'filled' },
          style: {
            background: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)',
            border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(15, 23, 42, 0.1)',
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            background: 'transparent',
            border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(15, 23, 42, 0.1)',
          },
        },
      ],
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
        // buttons and role="button" widgets alike. The ring uses the brand
        // colour rather than `currentColor`: with `currentColor` the ring took
        // the element's own text colour, which made it near-invisible on the
        // primary-coloured scroll-to-top button and gave every link a
        // different ring. Components must not add a second `box-shadow` ring
        // on top of this one.
        'a:focus-visible, button:focus-visible, [role="button"]:focus-visible': {
          outline: '2px solid',
          outlineColor: themeParam.palette.primary.main,
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

export const buildTheme = (mode) => createTheme(getDesignTokens(mode));

export default buildTheme;
