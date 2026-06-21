# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2026-06-21

Feature release. Restores résumé content that existed in the data and schema but
stopped rendering after the 2.0.0 migration, redesigns the Résumé, Projects, and
Contact pages around one shared design language, and adds an accessibility and
consistency pass across the site. No data or schema changes — existing `*.json`
files work unchanged.

### Added
- **Restored résumé sections**: professional `summary`, per-role `location` and
  `achievements`, and full **Education**, **Certifications**, **Awards**, and
  **Interests** sections. These fields were already present in `resume.json`,
  the zod schema, and the docs, but no component rendered them.
- **Résumé page**: a sticky in-page section navigation (desktop) with
  IntersectionObserver scrollspy and smooth-scroll anchors that respect
  `prefers-reduced-motion`; an intro band with at-a-glance stats (years of
  experience, roles, skills, certifications); and a single-rail experience
  timeline.
- **Languages** section on the Résumé page, sourced from
  `personalInfo.languages` (previously not rendered anywhere).
- **Projects page**: an intro band with project and technology counts; `role`
  and `duration` surfaced on each card; a rich project detail dialog (gallery +
  description + role/duration + technologies + links) replacing the
  screenshot-only lightbox; and a "Showing X of Y" count while filtering.
- **Contact page**: `contact.alternateEmail` surfaced as a second contact
  method, with copy-to-clipboard on phone and alternate email (previously
  email only).
- **Error boundary**: malformed `src/data` JSON or an unknown `navigation.json`
  component now shows a readable message instead of a blank screen.
- **Tests**: component tests for the Résumé, Projects, Contact, and Home pages,
  a unit test for the years-of-experience helper, and jest-dom wiring
  (`src/setupTests.js`).

### Changed
- **Heading hierarchy (all pages)**: each page now has exactly one `<h1>`, and
  value/label text that MUI was silently rendering as `<h6>` (the `subtitle1`
  and `h6` variants default to an `<h6>` tag) is now non-heading text — fixing
  the document outline for screen readers.
- **Contact page** aligned with the rest of the site: a left-aligned hero, the
  shared icon-chip section-heading style, and a balanced two-column layout for
  contact methods and social links.
- **Badges** for Skills, Languages, and Interests unified into one consistent
  soft-tint pill style (previously inconsistent sizes and treatments).
- **Shared components**: `SectionHeading`, `StatItem`, and a `yearsOfExperience`
  helper were extracted to `src/components` / `src/utils` and reused across
  pages so they cannot drift apart.
- **Languages** moved from the Home hero to the Résumé page.

### Removed
- Redundant "View details" button on project cards — the card image (with its
  hover affordance) opens the detail dialog, which carries the external link.

### Fixed
- The project detail dialog now plays its close transition instead of snapping
  shut.
- Home stat values no longer show "0+" when a count is zero.
- `aria-current` added to the active Résumé section-nav link.
- The footer heart icon now exposes its "love" label to assistive tech
  (`titleAccess` instead of an ignored `aria-label`).
- Stale `public/index.html` reference in `src/index.jsx` corrected to
  `index.html` (post-Vite).

### Security
- N/A

---

## [2.0.0] - 2026-05-20

Major release. This version refreshes the Contact page, introduces a
three-state theme system, and standardises the site-wide motion language.
It also removes a long-standing dead field from the contact schema, so a
clean upgrade may require minor edits to `contact.json` if the legacy field
was set.

### Added
- Three-state theme preference: `light`, `dark`, and `system`. The toggle
  in the floating nav now cycles through all three states. When set to
  `system`, the page follows `prefers-color-scheme` live via `matchMedia`,
  so flipping the OS theme updates the app without a reload.
- Contact page **stat strip**: typical reply time, location, and a live
  availability pill (visually paired with the HomePage availability
  indicator), all in a three-cell card with parallel structure.
- Contact page **featured email card**: avatar + email value + two CTAs
  (`Copy address`, `Email me`) on a single horizontal row that spans the
  contact card's full width.
- Optional `contact.responseTime` field (string, max 40 chars) — surfaced
  on the stat strip; falls back to "Within 24 hours" when unset.
- HomePage statistic cards refactored to individual hover-lift cards with
  gradient values and motion-spring entry animations.

### Changed
- **Default theme behaviour**: new visitors with no stored preference now
  follow their OS theme instead of defaulting to dark. The hard fallback
  is light if `matchMedia` is unavailable.
- **Contact page layout**: stat strip and contact card both span the same
  full container width for visual consistency.
- **Animation language**: card-entry physics are unified across pages
  using spring `(stiffness: 80, damping: 15)`. The Projects grid now uses
  `whileInView` (scroll-triggered) instead of eager `animate`, so cards
  below the fold animate as they enter the viewport.
- **Theme context API**: `mode` is now a derived value (`'light' | 'dark'`)
  computed from `preference` (`'light' | 'dark' | 'system'`) and the OS
  state. `toggleTheme` is replaced by `setPreference(value)` and
  `cyclePreference()`. Components that read only `mode` are unaffected.
- Build/dev tooling references updated: this project runs on **Vite**
  (`npm start` serves at `http://localhost:5173`), replacing the original
  Create React App references in the README.
- Page component file extensions are `.jsx`, reflected in the README's
  project structure section.

### Removed
- **Contact form** (`name` / `email` / `message` mailto-form, draft
  persistence, validation, character counter, honeypot, mailto-failure
  detection). The featured email card with `Email me` covers the same
  use case via a single `mailto:` link.
- **`contact.calendly`** field. The field was documented in v1.x but was
  never read by any component. The zod schema and docs no longer mention
  it. Existing `calendly` values in `contact.json` are silently ignored
  (the contact schema is in `strip` mode), so this is non-blocking for
  upgrades.

### Fixed
- Temporal dead zone error in `HomePage.jsx`: `primarySoft` and
  `secondarySoft` were referenced inside the `stats` useMemo before their
  `const` declaration. Declarations hoisted above first use.
- Misleading `cursor: pointer` on HomePage stat cards (cards aren't
  clickable; cursor signalled false affordance).
- Inconsistent `+` suffix on HomePage stat values: `Projects Completed`
  now shows `N+` to match `Years Experience` and `Technologies Mastered`.
- Documentation referenced `localhost:3000` (CRA default) instead of
  Vite's `5173`; "Built with Create React App" in acknowledgments
  replaced with Vite.
- `docs/PORTFOLIO_DATA_STRUCTURE.md` was missing the new `responseTime`
  field; now documented alongside the other contact-section fields.

### Security
- N/A

---

## [1.0.0] - 2025-10-09

### Added
- Initial release of the portfolio website
- Responsive Material-UI based design
- Portfolio data structure with support for:
  - Personal information and bio
  - Skills and technologies
  - Work experience
  - Projects showcase
  - Education history
  - Contact information
- React 19 implementation
- GitHub Pages deployment support

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- N/A

---

## Template for Future Releases

## [Unreleased]

### Added
- New features go here

### Changed
- Changes to existing functionality

### Deprecated
- Soon-to-be removed features

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security updates
