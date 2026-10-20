import React from 'react';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AppIcon from '../AppIcon';
import { radius, iconSize } from '../../theme/tokens';

/**
 * A soft, accent-tinted square behind an icon.
 *
 * The Home stat band used 56px tiles, the Contact page used 64px ones, and
 * the section headings used a 40px chip — three sizes for the same idea.
 * `size` keeps that variation explicit and deliberate instead of ad hoc.
 */
const SIZES = {
  sm: { dimension: 40, glyph: iconSize.heading },
  md: { dimension: 56, glyph: iconSize.tile },
  lg: { dimension: 64, glyph: iconSize.tile },
};

const IconTile = ({ icon, color, size = 'md', sx }) => {
  const { dimension, glyph } = SIZES[size] ?? SIZES.md;

  return (
    <Box
      aria-hidden="true"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dimension,
        height: dimension,
        flexShrink: 0,
        borderRadius: radius.md,
        background: alpha(color, 0.12),
        color,
        ...sx,
      }}
    >
      <AppIcon icon={icon} size={glyph} />
    </Box>
  );
};

export default IconTile;
