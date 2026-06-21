import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

// Shared at-a-glance figure for intro stat bands. The value is plain body text
// (not a heading) so it doesn't pollute the page's heading outline.
const StatItem = ({ value, label, accent }) => {
  const theme = useTheme();
  const color = accent || theme.palette.primary.main;
  return (
    <Box>
      <Typography sx={{ fontWeight: 800, fontSize: { xs: '1.5rem', md: '1.75rem' }, lineHeight: 1.1, color }}>
        {value}
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
        {label}
      </Typography>
    </Box>
  );
};

export default StatItem;
