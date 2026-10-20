import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Label from './ui/Label';
import IconTile from './ui/IconTile';

/**
 * Shared at-a-glance figure. The value is plain body text (not a heading) so
 * it doesn't pollute the page's heading outline.
 *
 * With an `icon` the figure sits beside an icon tile and the label sits above
 * the value; without one the label sits underneath. Both layouts use the
 * same type treatment, so a figure reads identically wherever it appears.
 *
 * `tile` replaces the icon tile with a custom element — used where the
 * indicator is a live status dot rather than an icon.
 */
const StatItem = ({ value, label, icon, accent, tile }) => {
  const theme = useTheme();
  const color = accent || theme.palette.primary.main;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
      {tile ?? (icon ? <IconTile icon={icon} color={color} size="lg" /> : null)}
      <Box sx={{ minWidth: 0 }}>
        {(tile || icon) && <Label sx={{ display: 'block', mb: 0.25 }}>{label}</Label>}
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: (tile || icon) ? '1.25rem' : { xs: '1.5rem', md: '1.75rem' },
            lineHeight: 1.1,
            color,
          }}
        >
          {value}
        </Typography>
        {!tile && !icon && <Label sx={{ display: 'block', mt: 0.5 }}>{label}</Label>}
      </Box>
    </Box>
  );
};

export default StatItem;
