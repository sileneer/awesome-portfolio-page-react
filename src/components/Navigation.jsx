import React, { useContext } from 'react';
import { Box, Typography, useTheme, useMediaQuery, IconButton, Tooltip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Description, Dashboard, Mail, LightMode, DarkMode, SettingsBrightness } from '@mui/icons-material';
import { ThemeContext } from '../context/ThemeContext';

const iconMap = {
  home: Home,
  resume: Description,
  projects: Dashboard,
  contact: Mail,
};

// Drives both the toggle icon and the tooltip / aria-label.
// `nextLabel` mirrors the cycle order in ThemeContext: light → dark → system → light.
const PREFERENCE_META = {
  light: { Icon: LightMode, label: 'Light mode', nextLabel: 'dark mode' },
  dark: { Icon: DarkMode, label: 'Dark mode', nextLabel: 'follow system' },
  system: { Icon: SettingsBrightness, label: 'Follow system', nextLabel: 'light mode' },
};

const Navigation = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { mode, preference, cyclePreference } = useContext(ThemeContext);
  const { Icon: ThemeIcon, label: themeLabel, nextLabel: themeNextLabel } = PREFERENCE_META[preference];
  const { menuItems } = data.navigation;
  const navigate = useNavigate();
  const location = useLocation();

  const isActivePath = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <Box
      component={motion.nav}
      aria-label="Primary"
      initial={{ y: 100, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      sx={{
        position: 'fixed',
        bottom: { xs: 16, md: 32 },
        left: '50%',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px',
        borderRadius: '32px',
        background: mode === 'dark' ? 'rgba(18, 18, 20, 0.75)' : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(15, 23, 42, 0.1)',
        boxShadow: mode === 'dark' ? '0 8px 32px rgba(0, 0, 0, 0.5)' : '0 8px 32px rgba(15, 23, 42, 0.08)',
        gap: { xs: 1, md: 2 },
      }}
    >
      {menuItems.map((item) => {
        const key = item.name.toLowerCase();
        const Icon = iconMap[key] || Home;
        const isActive = isActivePath(item.path);
        const label = item.name;

        const button = (
          <Box
            key={key}
            component="button"
            type="button"
            aria-label={`Navigate to ${label}`}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => navigate(item.path)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              padding: { xs: '8px', md: '10px 20px' },
              borderRadius: '24px',
              border: 'none',
              cursor: 'pointer',
              background: isActive
                ? alpha(theme.palette.primary.main, 0.12)
                : 'transparent',
              color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
              transition: 'background-color 0.2s ease, color 0.2s ease',
              outline: 'none',
              position: 'relative',
              '&:hover': {
                color: theme.palette.primary.main,
                background: mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(15,23,42,0.04)',
              },
              '&:focus-visible': {
                boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
              },
            }}
          >
            <Icon fontSize="small" />
            {!isMobile && (
              <Typography variant="button" sx={{ fontWeight: isActive ? 700 : 500 }}>
                {label}
              </Typography>
            )}

            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                style={{
                  position: 'absolute',
                  bottom: -2,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: theme.palette.primary.main,
                  boxShadow: `0 0 8px ${theme.palette.primary.main}`,
                }}
              />
            )}
          </Box>
        );

        return isMobile ? (
          <Tooltip key={key} title={label} arrow placement="top">
            {button}
          </Tooltip>
        ) : button;
      })}

      <Box sx={{ width: '1px', height: '24px', background: theme.palette.divider, mx: 1 }} />

      <Tooltip title={`Theme: ${themeLabel}. Click for ${themeNextLabel}.`} arrow placement="top">
        <IconButton
          onClick={cyclePreference}
          aria-label={`Theme: ${themeLabel}. Switch to ${themeNextLabel}.`}
          sx={{
            color: theme.palette.text.primary,
            '&:focus-visible': { boxShadow: `0 0 0 2px ${theme.palette.primary.main}` },
          }}
        >
          <ThemeIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Navigation;
