import React from 'react';
import { Box, Typography } from '@mui/material';
import { radius } from '../../theme/tokens';

/**
 * The one empty-state treatment.
 *
 * The Projects page rendered a bare line of text while the Research page
 * used a dashed panel; both now use this box.
 */
const EmptyState = ({ children, sx }) => (
  <Box
    sx={{
      p: { xs: 3, md: 4 },
      border: '1px dashed',
      borderColor: 'divider',
      borderRadius: radius.lg,
      ...sx,
    }}
  >
    <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
      {children}
    </Typography>
  </Box>
);

export default EmptyState;
