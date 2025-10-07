import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Avatar,
  Grid,
  Card,
  CardContent,
  Link,
  Fade,
  Grow,
  useTheme,
  useMediaQuery,
  Chip,
  Stack,
} from '@mui/material';
import { 
  GitHub, 
  LinkedIn, 
  Language, 
  LocationOn, 
  WorkOutline,
  FolderSpecial,
  EmojiObjects,
  ArrowDownward 
} from '@mui/icons-material';

const HomePage = ({ data }) => {
  const { personalInfo } = data;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Animation variants for cards
  const cardHoverEffect = {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'translateY(0px)',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: theme.shadows[8],
    },
  };

  const glowEffect = {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${theme.palette.primary.main}30`,
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: `linear-gradient(135deg, 
        ${theme.palette.background.default} 0%, 
        ${theme.palette.primary.main}08 50%, 
        ${theme.palette.secondary.main}08 100%
      )`,
    }}>
      <Container maxWidth="lg" sx={{ pt: { xs: 8, md: 10 }, pb: 8 }}>
        {/* Hero Section */}
        <Fade in timeout={1000}>
          <Box sx={{ py: { xs: 6, md: 10 } }}>
            <Grid 
              container 
              spacing={{ xs: 4, md: 6 }} 
              alignItems="center" 
              justifyContent="center"
              sx={{ width: '100%' }}
            >
              {/* Profile Image - Show first on mobile */}
              <Grid 
                item 
                xs={12} 
                md={6}
                lg={6} 
                sx={{ 
                  order: { xs: 1, md: 2 },
                  display: 'flex', 
                  justifyContent: 'center',
                  mb: { xs: 4, md: 0 }
                }}
              >
                <Grow in timeout={1200}>
                  <Box
                    sx={{
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: -20,
                        background: `conic-gradient(from 45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                        borderRadius: '50%',
                        animation: 'spin 8s linear infinite',
                        opacity: 0.3,
                        zIndex: -1,
                      },
                      '@keyframes spin': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' },
                      },
                    }}
                  >
                    <Avatar
                      src="/profile_photo.png"
                      alt={personalInfo.name}
                      sx={{
                        width: { xs: 220, sm: 280, md: 300 },
                        height: { xs: 220, sm: 280, md: 300 },
                        border: 6,
                        borderColor: 'background.paper',
                        boxShadow: theme.shadows[12],
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          boxShadow: theme.shadows[20],
                        },
                      }}
                    />
                  </Box>
                </Grow>
              </Grid>
              
              {/* Content */}
              <Grid item xs={12} md={6} lg={6} sx={{ order: { xs: 2, md: 1 } }}>
                <Box sx={{ textAlign: 'center', maxWidth: { xs: '100%', md: 820 }, mx: { xs: 'auto', md: 'auto' } }}>
                  <Typography
                    variant="h6"
                    color="primary.main"
                    sx={{ 
                      fontWeight: 600,
                      mb: 1,
                      textTransform: 'uppercase',
                      letterSpacing: 2,
                      fontSize: { xs: '0.75rem', sm: '1rem' }
                    }}
                  >
                    Welcome to my portfolio
                  </Typography>
                  
                  <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                      fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem', lg: '4.5rem' },
                      fontWeight: 800,
                      background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 100%)`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'inline-block',
                      lineHeight: 1.25,
                      paddingBottom: '0.15em',
                      mb: 2,
                    }}
                  >
                    Hello, I'm{' '}
                    <Box component="span" sx={{ display: { xs: 'block', sm: 'inline' } }}>
                      {personalInfo.name}
                    </Box>
                  </Typography>
                  
                  <Typography
                    variant="h4"
                    sx={{ 
                      fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                      fontWeight: 400,
                      color: 'text.secondary',
                      mb: 3,
                      lineHeight: 1.3,
                    }}
                  >
                    {personalInfo.title}
                  </Typography>
                  
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    paragraph
                    sx={{ 
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                      lineHeight: 1.7,
                      mb: 4,
                      maxWidth: { xs: '100%', md: '90%' },
                      fontWeight: 300,
                    }}
                  >
                    {personalInfo.bio}
                  </Typography>

                  {/* Info Cards */}
                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    spacing={2} 
                    sx={{ 
                      mb: 4,
                      justifyContent: { xs: 'center', md: 'flex-start' },
                      alignItems: { xs: 'center', sm: 'flex-start' }
                    }}
                  >
                    <Chip
                      icon={<LocationOn />}
                      label={personalInfo.location}
                      variant="outlined"
                      sx={{
                        py: 2,
                        px: 1,
                        fontSize: '1rem',
                        height: 'auto',
                        ...glowEffect,
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: theme.shadows[4],
                        },
                      }}
                    />
                    
                    <Chip
                      icon={<Language />}
                      label={personalInfo.languages.join(', ')}
                      variant="outlined"
                      sx={{
                        py: 2,
                        px: 1,
                        fontSize: '1rem',
                        height: 'auto',
                        ...glowEffect,
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: theme.shadows[4],
                        },
                      }}
                    />
                  </Stack>

                  <Box sx={{ mb: 4, textAlign: { xs: 'center', md: 'left' } }}>
                    <Link 
                      href={personalInfo.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      sx={{
                        color: 'primary.main',
                        textDecoration: 'none',
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        py: 1,
                        px: 2,
                        borderRadius: 2,
                        ...glowEffect,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: theme.shadows[4],
                        },
                      }}
                    >
                      🌐 {personalInfo.website}
                    </Link>
                  </Box>

                  {/* CTA Buttons */}
                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    spacing={2} 
                    sx={{ 
                      justifyContent: { xs: 'center', md: 'flex-start' },
                      alignItems: 'center'
                    }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<LinkedIn />}
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ 
                        px: 4, 
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        backgroundColor: '#0077B5',
                        borderRadius: 3,
                        textTransform: 'none',
                        minWidth: { xs: 200, sm: 'auto' },
                        boxShadow: '0 4px 20px rgba(0, 119, 181, 0.3)',
                        '&:hover': {
                          backgroundColor: '#005885',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(0, 119, 181, 0.4)',
                        },
                      }}
                    >
                      View LinkedIn
                    </Button>
                    
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<GitHub />}
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ 
                        px: 4, 
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        backgroundColor: '#24292f',
                        borderRadius: 3,
                        textTransform: 'none',
                        minWidth: { xs: 200, sm: 'auto' },
                        boxShadow: '0 4px 20px rgba(36, 41, 47, 0.3)',
                        '&:hover': {
                          backgroundColor: '#3a3f44',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(36, 41, 47, 0.4)',
                        },
                      }}
                    >
                      View GitHub
                    </Button>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Fade>

        {/* Scroll Indicator */}
        <Fade in timeout={2000}>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              opacity: 0.6,
              animation: 'bounce 2s infinite',
              '@keyframes bounce': {
                '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                '40%': { transform: 'translateY(-10px)' },
                '60%': { transform: 'translateY(-5px)' },
              },
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Scroll to explore
            </Typography>
            <ArrowDownward color="action" />
          </Box>
        </Fade>

        {/* Highlights Section */}
        <Fade in timeout={1500}>
          <Box sx={{ mt: { xs: 8, md: 12 } }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                textAlign: 'center',
                mb: 6,
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                lineHeight: 1.25,
                paddingBottom: '0.1em',
              }}
            >
              Key Highlights
            </Typography>
            
            <Grid 
              container 
              spacing={{ xs: 3, md: 4 }}
              sx={{ width: '100%' }}
            >
              <Grid item xs={12} md={4}>
                <Grow in timeout={1000}>
                  <Card 
                    elevation={0}
                    sx={{
                      height: '100%',
                      ...glowEffect,
                      ...cardHoverEffect,
                      borderRadius: 4,
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', py: { xs: 4, md: 6 } }}>
                      <Box
                        sx={{
                          mb: 3,
                          display: 'inline-flex',
                          p: 3,
                          borderRadius: '50%',
                          backgroundColor: 'primary.main',
                          color: 'primary.contrastText',
                        }}
                      >
                        <WorkOutline sx={{ fontSize: { xs: 30, md: 40 } }} />
                      </Box>
                      <Typography 
                        variant="h4" 
                        component="h3"
                        color="primary.main" 
                        gutterBottom
                        sx={{ 
                          fontWeight: 700,
                          fontSize: { xs: '1.75rem', md: '2.125rem' }
                        }}
                      >
                        {data.resume.experience.length}+
                      </Typography>
                      <Typography 
                        variant="h6" 
                        color="text.primary"
                        sx={{ 
                          fontWeight: 600,
                          mb: 1,
                          fontSize: { xs: '1.1rem', md: '1.25rem' }
                        }}
                      >
                        Years Experience
                      </Typography>
                      <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
                      >
                        Professional software development experience
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Grow in timeout={1200}>
                  <Card 
                    elevation={0}
                    sx={{
                      height: '100%',
                      ...glowEffect,
                      ...cardHoverEffect,
                      borderRadius: 4,
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', py: { xs: 4, md: 6 } }}>
                      <Box
                        sx={{
                          mb: 3,
                          display: 'inline-flex',
                          p: 3,
                          borderRadius: '50%',
                          backgroundColor: 'secondary.main',
                          color: 'secondary.contrastText',
                        }}
                      >
                        <FolderSpecial sx={{ fontSize: { xs: 30, md: 40 } }} />
                      </Box>
                      <Typography 
                        variant="h4" 
                        component="h3"
                        color="secondary.main" 
                        gutterBottom
                        sx={{ 
                          fontWeight: 700,
                          fontSize: { xs: '1.75rem', md: '2.125rem' }
                        }}
                      >
                        {data.projects.length}
                      </Typography>
                      <Typography 
                        variant="h6" 
                        color="text.primary"
                        sx={{ 
                          fontWeight: 600,
                          mb: 1,
                          fontSize: { xs: '1.1rem', md: '1.25rem' }
                        }}
                      >
                        Projects Completed
                      </Typography>
                      <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
                      >
                        Successful projects delivered with excellence
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Grow in timeout={1400}>
                  <Card 
                    elevation={0}
                    sx={{
                      height: '100%',
                      ...glowEffect,
                      ...cardHoverEffect,
                      borderRadius: 4,
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', py: { xs: 4, md: 6 } }}>
                      <Box
                        sx={{
                          mb: 3,
                          display: 'inline-flex',
                          p: 3,
                          borderRadius: '50%',
                          backgroundColor: 'success.main',
                          color: 'success.contrastText',
                        }}
                      >
                        <EmojiObjects sx={{ fontSize: { xs: 30, md: 40 } }} />
                      </Box>
                      <Typography 
                        variant="h4" 
                        component="h3"
                        color="success.main" 
                        gutterBottom
                        sx={{ 
                          fontWeight: 700,
                          fontSize: { xs: '1.75rem', md: '2.125rem' }
                        }}
                      >
                        {data.resume.skills.length}+
                      </Typography>
                      <Typography 
                        variant="h6" 
                        color="text.primary"
                        sx={{ 
                          fontWeight: 600,
                          mb: 1,
                          fontSize: { xs: '1.1rem', md: '1.25rem' }
                        }}
                      >
                        Skills Mastered
                      </Typography>
                      <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
                      >
                        Technologies and frameworks expertise
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default HomePage;
