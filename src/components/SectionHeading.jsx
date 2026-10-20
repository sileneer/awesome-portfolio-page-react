import React from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import IconTile from './ui/IconTile';
import { fontSize } from '../theme/tokens';

// Shared section heading used across pages: an accented icon tile beside a
// gradient-clipped heading. Renders a real <h2> (override via `component`) so
// the page keeps a clean h1 → h2 → h3 outline.
//
// Two roles, one component:
//   variant="section" — a page-level section (Résumé, Research)
//   variant="panel"   — a sub-section inside a card (Contact columns)
// The role picks the size from the shared type scale; the heading level is
// always h2 unless `component` says otherwise.
const VARIANTS = {
  section: { fontSize: fontSize.sectionTitle, mb: 4 },
  panel: { fontSize: fontSize.panelTitle, mb: 3 },
};

const SectionHeading = ({ icon: Icon, children, variant = 'section', component = 'h2' }) => {
  const theme = useTheme();
  const { fontSize, mb } = VARIANTS[variant] ?? VARIANTS.section;
  return (
    <Stack
      component={motion.div}
      direction="row"
      spacing={1.5}
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      sx={{ mb, alignItems: 'center' }}
    >
      {Icon && (
        <IconTile icon={Icon} color={theme.palette.primary.main} size="sm" />
      )}
      <Typography variant="h3" component={component} sx={{
        fontWeight: 800, fontSize,
        background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
        {children}
      </Typography>
    </Stack>
  );
};

export default SectionHeading;
