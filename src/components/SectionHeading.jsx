import React from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Shared section heading used across pages: an accented icon chip beside a
// gradient-clipped heading. Renders a real <h2> (override via `component`) so
// the page keeps a clean h1 → h2 → h3 outline.
//   size="lg" — page-level section headers (Résumé, Projects)
//   size="sm" — in-card sub-section headers (Contact columns)
const SIZES = {
  lg: { fontSize: { xs: '1.6rem', md: '2rem' }, mb: 4 },
  sm: { fontSize: { xs: '1.3rem', md: '1.55rem' }, mb: 3 },
};

const SectionHeading = ({ icon: Icon, children, size = 'lg', component = 'h2' }) => {
  const theme = useTheme();
  const { fontSize, mb } = SIZES[size] ?? SIZES.lg;
  return (
    <Stack
      component={motion.div}
      direction="row"
      spacing={1.5}
      alignItems="center"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      sx={{ mb }}
    >
      {Icon && (
        <Box aria-hidden="true" sx={{
          display: 'inline-flex', p: 1, borderRadius: 2,
          color: theme.palette.primary.main, background: alpha(theme.palette.primary.main, 0.1),
        }}>
          <Icon />
        </Box>
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
