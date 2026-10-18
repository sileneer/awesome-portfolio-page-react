import React from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import AppIcon from './AppIcon';

// Page eyebrows are descriptive text, not extra headings in the document outline.
export const PageEyebrow = ({ icon, children }) => (
  <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, color: 'primary.main', mb: 2 }}>
    <AppIcon icon={icon} size={21} />
    <Typography variant="overline" component="p" sx={{ letterSpacing: 3, fontWeight: 700 }}>{children}</Typography>
  </Stack>
);

const PageIntro = ({ icon, eyebrow, title, description, action, children }) => {
  const theme = useTheme();
  return (
    <Box component={motion.header} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }} sx={{ pb: { xs: 4, md: 6 }, mb: { xs: 5, md: 7 }, borderBottom: 1, borderColor: 'divider' }}>
      <PageEyebrow icon={icon}>{eyebrow}</PageEyebrow>
      <Box sx={{ display: 'flex', alignItems: { sm: 'center' }, justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, mb: description ? 2 : 0 }}>
        <Typography variant="h1" sx={{
          fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800, lineHeight: 1.15,
          letterSpacing: '-0.025em', overflowWrap: 'anywhere', minWidth: 0,
          background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>{title}</Typography>
        {action}
      </Box>
      {description && <Typography variant="h6" component="p" color="text.secondary" sx={{ fontWeight: 400, lineHeight: 1.8, maxWidth: '65ch' }}>{description}</Typography>}
      {children}
    </Box>
  );
};

export default PageIntro;
