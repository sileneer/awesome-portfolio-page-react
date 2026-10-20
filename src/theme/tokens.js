/**
 * Design tokens — the single source of truth for the UI scale.
 *
 * Every page reads its colours, radii, type sizes and motion from here
 * instead of hard-coding values. Adding a raw px number to a page is what
 * caused the inconsistencies catalogued in
 * `plans/ui-audit/UI-CONSISTENCY-AUDIT.md`; keep the scale here instead.
 *
 * Radii are **strings** on purpose: in `sx`, a numeric `borderRadius` is
 * multiplied by `theme.shape.borderRadius` (4 in MUI v9), so `borderRadius: 16`
 * would silently become 64px. Strings are taken literally.
 */

// ── Corner radius ──────────────────────────────────────────────────────────
// 8 controls / chips · 12 icon tiles · 16 cards / panels · 24 nav pills
// 32 the navigation dock · 999 fully round
export const radius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  dock: '32px',
  pill: '999px',
};

// ── Type scale ─────────────────────────────────────────────────────────────
// `pageTitle` is fluid and shared by the Home hero and every interior page,
// so the two never drift apart. `sectionTitle` is for page-level sections,
// `panelTitle` for sub-sections inside a card, `cardTitle` for the title of a
// card or list entry, `display` for the large figures in a stat band.
//
// Responsive objects (`{ xs, md }`) are only valid inside `sx`: a theme
// typography variant with an object `fontSize` serialises to invalid CSS
// (`fontSize{xs:…;md:…}`) and the heading silently loses its size. Theme
// variants therefore use the flat strings below.
export const fontSize = {
  pageTitle: 'clamp(2.5rem, 5vw + 1rem, 4rem)',
  sectionTitle: { xs: '1.6rem', md: '2rem' },
  panelTitle: { xs: '1.3rem', md: '1.5rem' },
  cardTitle: '1.5rem',
  display: '1.75rem',
};

// ── Spacing ────────────────────────────────────────────────────────────────
// Vertical rhythm between page-level sections. The one value every page uses.
export const sectionGap = { xs: 7, md: 10 };
// Gap between the page container and the first block of content.
export const pagePaddingTop = { xs: 4, md: 6 };
// Bottom safe area so the fixed bottom navigation never covers content.
export const bottomSafeArea = { xs: 10, md: 12 };

// ── Motion ─────────────────────────────────────────────────────────────────
// One hover lift, one reveal duration, one easing curve.
export const motion = {
  lift: 'translateY(-4px)',
  liftShadow: '0 16px 36px',
  hoverDuration: '0.3s',
  hoverEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
  revealDuration: 0.4,
  revealEase: 'easeOut',
  staggerStep: 0.06,
};

// ── Touch targets ──────────────────────────────────────────────────────────
// The project already enforces 44px in the navigation and on the Research
// page; every other interactive element now follows the same floor.
export const touchTarget = 44;

// ── Buttons ────────────────────────────────────────────────────────────────
// `lg` for the one primary action on a page, `md` for everything secondary.
// The Home hero is the only place a larger type size is used.
export const buttonHeight = {
  lg: 48,
  md: 44,
};

// ── Icon sizes ─────────────────────────────────────────────────────────────
// 16 inline · 20 controls · 24 headings · 32 large tiles
export const iconSize = {
  inline: 16,
  control: 20,
  heading: 24,
  tile: 32,
};
