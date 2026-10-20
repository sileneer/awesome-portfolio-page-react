import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * The pulsing "available" indicator.
 *
 * It was implemented twice — a 10px dot on the Home portrait and a 16px dot
 * in a 64px tile on the Contact page — so the same business state looked
 * like two different things.
 */
const AvailabilityDot = ({ size = 10 }) => (
  <Box
    component={motion.span}
    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
    transition={{ duration: 2, repeat: Infinity }}
    sx={{
      width: size,
      height: size,
      borderRadius: '50%',
      backgroundColor: 'success.main',
      boxShadow: (t) => `0 0 ${size}px ${t.palette.success.main}`,
      display: 'inline-block',
      flexShrink: 0,
    }}
  />
);

export default AvailabilityDot;
