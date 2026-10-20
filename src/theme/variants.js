/**
 * Shared style variants — the reusable `sx` fragments that used to be
 * copy-pasted (and drifted) across pages.
 *
 * Import these instead of re-deriving a card surface, a hover lift or a CTA
 * gradient inline. A change here propagates to every page at once.
 */

import { alpha } from '@mui/material/styles';
import { radius, motion } from './tokens';

/**
 * The canonical card surface. Every card in the app uses this so the
 * translucency, the border weight and the corner radius are identical.
 */
export const cardSurface = (theme) => ({
  borderRadius: radius.lg,
  background: theme.palette.mode === 'dark'
    ? 'rgba(30, 41, 59, 0.85)'
    : 'rgba(255, 255, 255, 0.9)',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(255, 255, 255, 0.15)'
    : '1px solid rgba(15, 23, 42, 0.08)',
});

/**
 * The single hover treatment for cards: one lift distance, one shadow.
 * `accent` tints the shadow and the border.
 */
export const cardHover = (theme, accent) => ({
  transition: `border-color ${motion.hoverDuration} ease, box-shadow ${motion.hoverDuration} ease, transform ${motion.hoverDuration} ease`,
  '&:hover': {
    borderColor: accent,
    boxShadow: `${motion.liftShadow} ${alpha(accent, theme.palette.mode === 'dark' ? 0.18 : 0.12)}`,
    transform: motion.lift,
  },
});

/**
 * The single primary CTA gradient.
 *
 * Both endpoints stay within one colour family on purpose: a two-hue
 * gradient needs two contrast checks, and `getContrastText` only resolves
 * one of them — which made the violet end unreadable in dark mode.
 */
export const gradientCta = (theme) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  color: theme.palette.getContrastText(theme.palette.primary.main),
});

/** A soft, accent-tinted square behind an icon. */
export const iconTile = (theme, color) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 64,
  height: 64,
  borderRadius: radius.md,
  background: alpha(color, 0.12),
  color,
  flexShrink: 0,
});

/**
 * The single focus ring. The global stylesheet owns `outline`; components
 * must not stack a second `box-shadow` ring on top of it.
 */
export const focusRing = (theme) => ({
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: theme.palette.primary.main,
    outlineOffset: 2,
  },
});

/** Muted body copy. Always via `sx` — see the MUI v9 `color` prop note below. */
export const muted = { color: 'text.secondary' };

/**
 * MUI v9 removed the dotted `color` values from the Typography colour
 * variants: `color="text.secondary"` matches no variant and is silently
 * ignored, leaving the text at full primary contrast. Always express the
 * colour through `sx` instead.
 */
