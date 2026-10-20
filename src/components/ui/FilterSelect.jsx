import React from 'react';
import { Box } from '@mui/material';
import Label from './Label';
import { radius, touchTarget } from '../../theme/tokens';

/**
 * A filter dropdown.
 *
 * A native `<select>` is kept on purpose: it is keyboard- and
 * screen-reader-native, and the Research page's filters are single-choice
 * dropdowns rather than the multi-select tag toggles the Projects page uses.
 * It is styled here so it speaks the same control language as every other
 * input in the app (same radius, border, height and focus ring).
 */
const FilterSelect = ({ label, value, onChange, children, sx }) => (
  <Box component="label" sx={{ flex: '1 1 120px', minWidth: 0, ...sx }}>
    <Label component="span">{label}</Label>
    <Box
      component="select"
      aria-label={label}
      value={value}
      onChange={onChange}
      sx={{
        display: 'block',
        width: '100%',
        mt: 0.5,
        p: 1.25,
        minHeight: touchTarget,
        borderRadius: radius.sm,
        border: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        color: 'text.primary',
        font: 'inherit',
        cursor: 'pointer',
        '&:hover': { borderColor: 'primary.main' },
      }}
    >
      {children}
    </Box>
  </Box>
);

export default FilterSelect;
