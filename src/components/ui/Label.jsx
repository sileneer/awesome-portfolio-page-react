import React from 'react';
import { Typography } from '@mui/material';

/**
 * The one overline/label treatment used across the app.
 *
 * Before this existed the same role was styled five different ways
 * (letterSpacing 3px / 2px / 1.5px / normal / 0.08em, three weights and two
 * colours). `PageEyebrow` reuses it with the primary colour, so the only
 * difference between a page eyebrow and a field label is colour.
 */
const Label = ({ children, color = 'text.secondary', component = 'span', sx }) => (
  <Typography
    variant="overline"
    component={component}
    sx={{
      color,
      letterSpacing: 2,
      fontWeight: 700,
      lineHeight: 1.2,
      textTransform: 'uppercase',
      ...sx,
    }}
  >
    {children}
  </Typography>
);

export default Label;
