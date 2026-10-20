import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import AppIcon from '../AppIcon';
import { iconSize } from '../../theme/tokens';

/**
 * A filter bar: an icon, a caption and the controls.
 *
 * The Projects page and the Research page both filter, but they had no
 * shared framing — one was a bare chip row, the other a caption plus three
 * selects. This gives both the same header.
 */
const FilterBar = ({ icon, label, children, sx }) => (
  <Box sx={sx}>
    <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 2, color: 'text.secondary' }}>
      {icon && <AppIcon icon={icon} size={iconSize.control} />}
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>
    </Stack>
    {children}
  </Box>
);

export default FilterBar;
