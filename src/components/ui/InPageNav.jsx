import React from 'react';
import { Box, Link, Stack, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AppIcon from '../AppIcon';
import { radius, touchTarget, iconSize } from '../../theme/tokens';
import { useActiveSection } from '../../utils/useActiveSection';

// No `behavior` here on purpose: omitting it inherits `html { scroll-behavior }`
// from index.css, which already flips to `auto` under prefers-reduced-motion.
const scrollToSection = (e, id) => {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ block: 'start' });
  if (window.history?.replaceState) window.history.replaceState(null, '', `#${id}`);
};

/**
 * The one in-page navigation.
 *
 * The Résumé page had a full treatment (icon, accent bar, scrollspy) while
 * the Research page had bare links with no active state at all. Both now use
 * this component, so scrolling tells the reader where they are on either
 * page.
 *
 * Anchors keep the page deep-linkable and keyboard-navigable.
 */
const InPageNav = ({ items, ariaLabel, sx }) => {
  const theme = useTheme();
  const activeId = useActiveSection(items.map((item) => item.id));

  return (
    <Box component="nav" aria-label={ariaLabel} sx={sx}>
      <Stack spacing={0.5}>
        {items.map(({ id, label, icon: Icon }) => {
          const active = id === activeId;
          return (
            <Link
              key={id}
              href={`#${id}`}
              onClick={(e) => scrollToSection(e, id)}
              aria-current={active ? 'true' : undefined}
              underline="none"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                px: 1.5,
                py: 1,
                minHeight: touchTarget,
                borderRadius: radius.sm,
                fontSize: '0.9rem',
                fontWeight: active ? 700 : 500,
                color: active ? theme.palette.primary.main : theme.palette.text.secondary,
                borderLeft: `2px solid ${active ? theme.palette.primary.main : 'transparent'}`,
                background: active ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                transition: 'color 0.2s ease, background 0.2s ease, border-color 0.2s ease',
                '&:hover': {
                  color: theme.palette.primary.main,
                  background: alpha(theme.palette.primary.main, 0.06),
                },
              }}
            >
              {Icon && <AppIcon icon={Icon} size={iconSize.control} />}
              {label}
            </Link>
          );
        })}
      </Stack>
    </Box>
  );
};

export default InPageNav;
