/**
 * Navigation Component
 * 
 * Provides the main navigation bar for the portfolio application.
 * Features:
 * - Responsive design (desktop menu + mobile drawer)
 * - Hide-on-scroll functionality for better UX
 * - Glass morphism effect with backdrop blur
 * - Active page highlighting
 * - Smooth transitions and hover effects
 */

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useTheme,
  Slide,
  useScrollTrigger,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

/**
 * HideOnScroll Component
 * 
 * Wrapper component that hides the navigation bar when user scrolls down
 * and shows it again when scrolling up.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 */
function HideOnScroll(props) {
  const { children } = props;
  
  // Trigger when user scrolls past 100px
  const trigger = useScrollTrigger({
    threshold: 100,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

/**
 * Navigation Component
 * 
 * Main navigation bar component with responsive behavior.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.data - Portfolio data containing navigation configuration
 * @param {string} props.currentPage - Currently active page identifier
 * @param {Function} props.onNavigate - Callback function to handle page navigation
 */
const Navigation = ({ data, currentPage, onNavigate }) => {
  // Extract navigation data
  const { brand, menuItems } = data.navigation;
  const theme = useTheme();
  
  // Scroll trigger for changing navigation appearance
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50, // Trigger after scrolling 50px
  });
  
  // State for mobile drawer (hamburger menu)
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Check if current viewport is mobile size
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  /**
   * Handle brand/logo click - navigate to home page
   */
  const handleBrandClick = () => {
    onNavigate('home');
  };

  /**
   * Handle menu item click
   * @param {string} path - Menu item path (not currently used)
   * @param {string} pageName - Page identifier to navigate to
   */
  const handleMenuClick = (path, pageName) => {
    onNavigate(pageName);
    // Close mobile drawer after navigation
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  /**
   * Toggle mobile drawer open/closed
   * @param {boolean} open - Whether to open or close the drawer
   * @returns {Function} Event handler function
   */
  const toggleDrawer = (open) => (event) => {
    // Prevent closing on Tab or Shift key press
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  /**
   * Glass morphism effect styling
   * Changes appearance based on scroll position
   */
  const glassEffect = {
    background: trigger 
      ? `rgba(255, 255, 255, 0.85)`  // More transparent when scrolled
      : `rgba(255, 255, 255, 0.95)`, // More opaque at top
    backdropFilter: 'blur(20px)',    // Blur effect for glass look
    border: `1px solid ${theme.palette.primary.main}20`,
    boxShadow: trigger 
      ? '0 8px 32px rgba(0, 0, 0, 0.1)'  // Stronger shadow when scrolled
      : '0 4px 20px rgba(0, 0, 0, 0.08)', // Lighter shadow at top
  };

  return (
    <>
      {/* Hide-on-scroll wrapper - hides navigation when scrolling down */}
      <HideOnScroll>
        {/* Main navigation bar - fixed at top of page */}
        <AppBar 
          position="fixed" 
          elevation={0}
          sx={{ 
            ...glassEffect,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            borderBottom: trigger ? 'none' : `1px solid ${theme.palette.divider}`,
          }}
        >
          {/* Container - centers and constrains navigation width */}
          <Container maxWidth="lg">
            {/* Toolbar - contains all navigation elements */}
            <Toolbar
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 1.5,
              }}
            >
              {/* Brand/Logo - clickable text that navigates to home */}
              <Typography
                variant="h5"
                component="div"
                onClick={handleBrandClick}
                sx={{
                  fontWeight: 800,
                  cursor: 'pointer',
                  background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 70%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: 'scale(1)',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 70%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  },
                }}
              >
                {brand}
              </Typography>
              
              {/* Desktop Navigation Menu - horizontal buttons (hidden on mobile) */}
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  gap: 1,
                }}
              >
                {/* Map through menu items to create navigation buttons */}
                {menuItems.map((item, index) => {
                  const isActive = currentPage === item.name.toLowerCase();
                  return (
                    /* Navigation Button - each menu item (Home, Resume, Projects, Contact) */
                    <Button
                      key={index}
                      onClick={() => handleMenuClick(item.path, item.name.toLowerCase())}
                      variant={isActive ? 'contained' : 'text'}
                      color="primary"
                      sx={{
                        fontWeight: 600,
                        px: { xs: 2.25, md: 3 },
                        py: { xs: 0.8, md: 1 },
                        borderRadius: 3,
                        minWidth: 'auto',
                        textTransform: 'none',
                        fontSize: '1rem',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        ...(isActive ? {
                          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                          boxShadow: '0 4px 20px rgba(0, 123, 255, 0.3)',
                          transform: 'translateY(0px)',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px rgba(0, 123, 255, 0.4)',
                          },
                        } : {
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}08, ${theme.palette.secondary.main}08)`,
                          backdropFilter: 'blur(10px)',
                          border: `1px solid ${theme.palette.primary.main}20`,
                          color: theme.palette.text.primary,
                          '&:hover': {
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                            border: `1px solid ${theme.palette.primary.main}40`,
                          },
                        }),
                        '&::before': !isActive ? {
                          content: '""',
                          position: 'absolute',
                          inset: 0,
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          borderRadius: 'inherit',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          zIndex: -1,
                        } : {},
                        '&:hover::before': !isActive ? {
                          opacity: 0.05,
                        } : {},
                      }}
                    >
                      {item.name}
                    </Button>
                  );
                })}
              </Box>

              {/* Mobile Menu Icon - hamburger button (visible only on mobile) */}
              <IconButton
                edge="end"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.secondary.main}10)`,
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${theme.palette.primary.main}20`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      
      {/* Mobile Drawer - slide-out menu from right side (mobile only) */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.main}05 100%)`,
            backdropFilter: 'blur(20px)',
            borderLeft: `1px solid ${theme.palette.primary.main}20`,
          },
        }}
      >
        {/* Drawer Content Container */}
        <Box
          sx={{
            pt: 3,
            pb: 2,
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {/* Drawer Header - "Menu" title */}
          <Typography
            variant="h6"
            sx={{
              px: 3,
              pb: 2,
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 70%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Menu
          </Typography>
          
          {/* Mobile Menu List - vertical list of navigation items */}
          <List>
            {/* Map through menu items to create list items */}
            {menuItems.map((item, index) => {
              const isActive = currentPage === item.name.toLowerCase();
              return (
                /* Mobile Menu Item - each navigation option */
                <ListItem key={index} disablePadding sx={{ px: 2, py: 0.5 }}>
                  {/* Mobile Menu Button - clickable area for navigation */}
                  <ListItemButton
                    onClick={() => handleMenuClick(item.path, item.name.toLowerCase())}
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      py: 1.5,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      ...(isActive ? {
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        boxShadow: '0 4px 20px rgba(0, 123, 255, 0.3)',
                        '&:hover': {
                          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                          boxShadow: '0 6px 25px rgba(0, 123, 255, 0.4)',
                        },
                      } : {
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}08, ${theme.palette.secondary.main}08)`,
                        '&:hover': {
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
                          transform: 'translateX(-4px)',
                        },
                      }),
                    }}
                  >
                    {/* Mobile Menu Item Text - displays the menu item name */}
                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{
                        fontWeight: isActive ? 700 : 600,
                        fontSize: '1rem',
                        color: isActive ? 'white' : theme.palette.text.primary,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navigation;
