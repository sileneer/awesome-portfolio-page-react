import React from 'react';
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
} from '@mui/material';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    threshold: 100,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navigation = ({ data, currentPage, onNavigate }) => {
  const { brand, menuItems } = data.navigation;
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const handleBrandClick = () => {
    onNavigate('home');
  };

  const handleMenuClick = (path, pageName) => {
    onNavigate(pageName);
  };

  // Glass morphism effect consistent with HomePage
  const glassEffect = {
    background: trigger 
      ? `rgba(255, 255, 255, 0.85)` 
      : `rgba(255, 255, 255, 0.95)`,
    backdropFilter: 'blur(20px)',
    border: `1px solid ${theme.palette.primary.main}20`,
    boxShadow: trigger 
      ? '0 8px 32px rgba(0, 0, 0, 0.1)' 
      : '0 4px 20px rgba(0, 0, 0, 0.08)',
  };

  return (
    <HideOnScroll>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          ...glassEffect,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          borderBottom: trigger ? 'none' : `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: { xs: 1, md: 1.5 } }}>
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
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              {menuItems.map((item, index) => {
                const isActive = currentPage === item.name.toLowerCase();
                return (
                  <Button
                    key={index}
                    onClick={() => handleMenuClick(item.path, item.name.toLowerCase())}
                    variant={isActive ? 'contained' : 'text'}
                    color="primary"
                    sx={{
                      fontWeight: 600,
                      px: 3,
                      py: 1,
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
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navigation;
