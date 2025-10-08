/**
 * HomePage Component
 * 
 * Landing page of the portfolio featuring:
 * - Hero section with profile photo, name, and title
 * - Professional bio and location information
 * - Links to LinkedIn, GitHub, and personal website
 * - Key highlights section showing experience, projects, and skills count
 * 
 * This page serves as the first impression and provides quick access
 * to important information and external profiles.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.data - Portfolio data containing personal info, resume, and projects
 */

import React from 'react';
import PropTypes from 'prop-types';
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
} from '@mui/icons-material';

const HomePage = ({ data }) => {
  const theme = useTheme();

  // Extract personal information with safe fallbacks to prevent errors
  const personalInfo = data?.personalInfo ?? {};
  const name = personalInfo?.name ?? 'Your Name';
  const title = personalInfo?.title ?? '';
  const bio = personalInfo?.bio ?? '';
  const location = personalInfo?.location ?? '';
  const languages = Array.isArray(personalInfo?.languages) ? personalInfo.languages : [];
  const website = personalInfo?.website ?? '';
  const linkedin = personalInfo?.linkedin ?? '';
  const github = personalInfo?.github ?? '';

  // Calculate statistics for highlight cards
  const experienceCount = Array.isArray(data?.resume?.experience) ? data.resume.experience.length : 0;
  const skillsCount = Array.isArray(data?.resume?.skills) ? data.resume.skills.length : 0;
  const projectsCount = Array.isArray(data?.projects) ? data.projects.length : 0;

  /**
   * Card hover effect styling
   * Provides smooth lift animation on hover
   */
  const cardHoverEffect = {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important',
    transform: 'translateY(0px) !important',
    '&:hover': {
      transform: 'translateY(-8px) !important', // Lift card 8px on hover
      boxShadow: `${theme.shadows[8]} !important`,
    },
  };

  /**
   * Glass morphism effect styling
   * Creates a frosted glass appearance with blur
   */
  const glowEffect = {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${theme.palette.primary.main}30`,
  };

  return (
    /* Main Page Container - full viewport height with gradient background */
    <Box sx={{ 
      minHeight: '100vh',
      background: `linear-gradient(135deg, 
        ${theme.palette.background.default} 0%, 
        ${theme.palette.primary.main}08 50%, 
        ${theme.palette.secondary.main}08 100%
      )`,
    }}>
      {/* Content Container - centers content and adds padding */}
      <Container maxWidth="lg" sx={{ pt: { xs: 10, md: 12 }, pb: 8 }}>
        
        {/* ========== HERO SECTION ========== */}
        {/* Contains profile photo, name, title, bio, and CTA buttons */}
        <Fade in timeout={1000}>
          <Box sx={{ pb: { xs: 6, md: 10 } }}>
            {/* Hero Grid - 2 columns on desktop, stacked on mobile */}
            <Grid 
              container 
              spacing={{ xs: 4, md: 6 }} 
              columns={{ xs: 12, md: 12, lg: 12 }}
              alignItems="center" 
              justifyContent="center"
              sx={{ width: '100%' }}
            >
              {/* === LEFT COLUMN (Desktop) / TOP (Mobile): Profile Photo === */}
              <Grid 
                size={{ xs: 12, md: 6, lg: 6 }} 
                sx={{ 
                  order: { xs: 1, md: 2 },
                  display: 'flex', 
                  justifyContent: 'center',
                  mb: { xs: 4, md: 0 }
                }}
              >
                {/* Profile Photo with Animated Border */}
                <Grow in timeout={1200}>
                  <Box
                    sx={{
                      position: 'relative',
                      /* Animated spinning gradient border effect */
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
                    {/* Profile Photo Avatar - displays your photo from public folder */}
                    <Avatar
                      src="/profile_photo.png"
                      alt={name}
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
              
              {/* === RIGHT COLUMN (Desktop) / BOTTOM (Mobile): Text Content === */}
              <Grid size={{ xs: 12, md: 6, lg: 6 }} sx={{ order: { xs: 2, md: 1 } }}>
                <Box sx={{ textAlign: 'left', maxWidth: { xs: '100%', md: 820 }, mx: { xs: 'auto', md: 'auto' } }}>
                  
                  {/* Welcome Message - small text above name */}
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
                  
                  {/* Main Heading - "Hello, I'm [Your Name]" with gradient text */}
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
                      {name}
                    </Box>
                  </Typography>
                  
                  {/* Professional Title - your job title/role */}
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
                    {title}
                  </Typography>
                  
                  {/* Bio/Tagline - professional summary or tagline */}
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
                    {bio}
                  </Typography>

                  {/* === Info Chips Section === */}
                  {/* Displays location and languages as chips */}
                  {(location || languages.length > 0) && (
                    <Stack 
                      direction={{ xs: 'column', sm: 'row' }} 
                      spacing={2} 
                      sx={{ 
                        mb: 4,
                        justifyContent: 'flex-start',
                        alignItems: { xs: 'flex-start', sm: 'flex-start' }
                      }}
                    >
                      {/* Location Chip - shows your location */}
                      {location && (
                        <Chip
                          icon={<LocationOn />}
                          label={location}
                          variant="outlined"
                          sx={{
                            py: 2,
                            px: 1,
                            fontSize: '1rem',
                            height: 'auto',
                            ...glowEffect,
                            '&:hover': {
                              boxShadow: theme.shadows[4],
                            },
                          }}
                        />
                      )}
                      
                      {/* Languages Chip - shows languages you speak */}
                      {languages.length > 0 && (
                        <Chip
                          icon={<Language />}
                          label={languages.join(', ')}
                          variant="outlined"
                          sx={{
                            py: 2,
                            px: 1,
                            fontSize: '1rem',
                            height: 'auto',
                            ...glowEffect,
                            '&:hover': {
                              boxShadow: theme.shadows[4],
                            },
                          }}
                        />
                      )}
                    </Stack>
                  )}

                  {/* === Website Link === */}
                  {/* Displays your personal website link */}
                  {website && (
                    <Box sx={{ mb: 4, textAlign: 'left' }}>
                      <Link 
                        href={website} 
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
                          '&:hover': {
                            boxShadow: theme.shadows[4],
                          },
                        }}
                      >
                        🌐 {website}
                      </Link>
                    </Box>
                  )}

                  {/* === Call-to-Action Buttons === */}
                  {/* LinkedIn and GitHub buttons for external profiles */}
                  {(linkedin || github) && (
                    <Stack 
                      direction={{ xs: 'column', sm: 'row' }} 
                      spacing={2} 
                      sx={{ 
                        justifyContent: 'flex-start',
                        alignItems: { xs: 'flex-start', sm: 'center' }
                      }}
                    >
                      {/* LinkedIn Button - links to your LinkedIn profile */}
                      {linkedin && (
                        <Button
                          variant="contained"
                          size="large"
                          startIcon={<LinkedIn />}
                          href={linkedin}
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
                              boxShadow: '0 8px 25px rgba(0, 119, 181, 0.4)',
                            },
                          }}
                        >
                          View LinkedIn
                        </Button>
                      )}
                      
                      {/* GitHub Button - links to your GitHub profile */}
                      {github && (
                        <Button
                          variant="contained"
                          size="large"
                          startIcon={<GitHub />}
                          href={github}
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
                              boxShadow: '0 8px 25px rgba(36, 41, 47, 0.4)',
                            },
                          }}
                        >
                          View GitHub
                        </Button>
                      )}
                    </Stack>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Fade>

        {/* ========== HIGHLIGHTS SECTION ========== */}
        {/* Shows statistics: years of experience, projects count, skills count */}
        <Fade in timeout={1500}>
          <Box id="highlights" sx={{ mt: { xs: 8, md: 12 } }}>
            
            {/* Section Title - "Key Highlights" */}
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
            
            {/* Highlights Grid - 3 cards showing statistics */}
            <Grid 
              container 
              spacing={{ xs: 3, md: 4 }}
              columns={{ xs: 12, md: 12, lg: 12 }}
              sx={{ width: '100%' }}
            >
              {/* === CARD 1: Years of Experience === */}
              <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', minWidth: 0 }}>
                <Grow in timeout={1000} style={{ width: '100%' }}>
                  {/* Experience Card - shows number of work experiences */}
                  <Card 
                    elevation={0}
                    sx={{
                      height: '100%',
                      width: '100%',
                      flex: 1,
                      ...glowEffect,
                      ...cardHoverEffect,
                      borderRadius: 4,
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', py: { xs: 4, md: 6 } }}>
                      {/* Icon Circle - briefcase icon */}
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
                      
                      {/* Experience Count Number */}
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
                        {experienceCount}+
                      </Typography>
                      
                      {/* Card Title */}
                      <Typography 
                        variant="h6" 
                        color="text.primary"
                        sx={{ 
                          fontWeight: 600,
                          mb: 1,
                          fontSize: { xs: '1.1rem', md: '1.25rem' },
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                        }}
                      >
                        Years Experience
                      </Typography>
                      
                      {/* Card Description */}
                      <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{ 
                          lineHeight: 1.6,
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                        }}
                      >
                        Professional software development experience
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
              
              {/* === CARD 2: Projects Completed === */}
              <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', minWidth: 0 }}>
                <Grow in timeout={1200} style={{ width: '100%' }}>
                  {/* Projects Card - shows number of projects */}
                  <Card 
                    elevation={0}
                    sx={{
                      height: '100%',
                      width: '100%',
                      flex: 1,
                      ...glowEffect,
                      ...cardHoverEffect,
                      borderRadius: 4,
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', py: { xs: 4, md: 6 } }}>
                      {/* Icon Circle - folder icon */}
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
                      
                      {/* Projects Count Number */}
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
                        {projectsCount}
                      </Typography>
                      
                      {/* Card Title */}
                      <Typography 
                        variant="h6" 
                        color="text.primary"
                        sx={{ 
                          fontWeight: 600,
                          mb: 1,
                          fontSize: { xs: '1.1rem', md: '1.25rem' },
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                        }}
                      >
                        Projects Completed
                      </Typography>
                      
                      {/* Card Description */}
                      <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{ 
                          lineHeight: 1.6,
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                        }}
                      >
                        Successful projects delivered with excellence
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
              
              {/* === CARD 3: Skills Mastered === */}
              <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', minWidth: 0 }}>
                <Grow in timeout={1400} style={{ width: '100%' }}>
                  {/* Skills Card - shows number of skills */}
                  <Card 
                    elevation={0}
                    sx={{
                      height: '100%',
                      width: '100%',
                      flex: 1,
                      ...glowEffect,
                      ...cardHoverEffect,
                      borderRadius: 4,
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', py: { xs: 4, md: 6 } }}>
                      {/* Icon Circle - lightbulb icon */}
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
                      
                      {/* Skills Count Number */}
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
                        {skillsCount}+
                      </Typography>
                      
                      {/* Card Title */}
                      <Typography 
                        variant="h6" 
                        color="text.primary"
                        sx={{ 
                          fontWeight: 600,
                          mb: 1,
                          fontSize: { xs: '1.1rem', md: '1.25rem' },
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                        }}
                      >
                        Skills Mastered
                      </Typography>
                      
                      {/* Card Description */}
                      <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{ 
                          lineHeight: 1.6,
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                        }}
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

HomePage.propTypes = {
  data: PropTypes.shape({
    personalInfo: PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string,
      bio: PropTypes.string,
      location: PropTypes.string,
      languages: PropTypes.arrayOf(PropTypes.string),
      website: PropTypes.string,
      linkedin: PropTypes.string,
      github: PropTypes.string,
    }),
    resume: PropTypes.shape({
      experience: PropTypes.array,
      skills: PropTypes.array,
    }),
    projects: PropTypes.array,
  }),
};

export default HomePage;
