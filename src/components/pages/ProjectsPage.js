/**
 * ProjectsPage Component
 * 
 * Displays a portfolio of completed projects with:
 * - Project cards showing screenshots, descriptions, and details
 * - Technology tags with icons
 * - Role and duration information
 * - Links to live demos and source code
 * - Image modal for viewing screenshots in full size
 * 
 * Each project card includes:
 * - Main screenshot (clickable for full view)
 * - Project name and description
 * - Role and duration badges
 * - Technology stack with icons
 * - Additional screenshots (if available)
 * - Links to GitHub or live demo
 * 
 * @param {Object} props - Component props
 * @param {Object} props.data - Portfolio data containing projects array
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Button,
  Paper,
  Divider,
  Fade,
  useTheme,
  Modal,
  IconButton,
} from '@mui/material';
import {
  Launch,
  GitHub,
  Code,
  Schedule,
  Person,
  Close,
  // Technology Icons - Used for technology tags
  Javascript,
  Web,
  Storage,
  Cloud,
  Api,
  Terminal,
  AccountTree,
  DeviceHub,
  Memory,
  ViewInAr,
  Html,
  Css,
  Build,
  Computer,
  Speed,
  Security,
  BugReport,
  Layers,
  CloudQueue
} from '@mui/icons-material';

const ProjectsPage = ({ data }) => {
  // Extract projects data with safe fallback
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const theme = useTheme();
  
  // State for image modal (full-size screenshot viewer)
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  /**
   * Handle screenshot click - open modal with full-size image
   * @param {string} imageUrl - URL of the image to display
   */
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  /**
   * Close the image modal
   */
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage('');
  };

  /**
   * Get appropriate icon for a technology/skill
   * Maps technology names to Material-UI icons
   * 
   * @param {string} skill - Technology name
   * @returns {React.Component} Material-UI icon component
   */
  const getSkillIcon = (skill) => {
    const skillIconMap = {
      // Frontend Technologies
      'JavaScript': Javascript,
      'TypeScript': Code,
      'React': Web,
      'Redux': AccountTree,
      'HTML': Html,
      'CSS': Css,
      'Vue.js': ViewInAr,
      'Angular': Web,
      'Next.js': Web,
      'Gatsby': Web,

      // Backend Technologies
      'Node.js': Terminal,
      'Express': Api,
      'Django': Code,
      'Flask': Code,
      'FastAPI': Speed,
      'GraphQL': Api,
      'REST APIs': Api,

      // Databases
      'MongoDB': Storage,
      'PostgreSQL': Storage,
      'MySQL': Storage,
      'SQLite': Storage,
      'Redis': Memory,
      'Firebase': Storage,
      'DynamoDB': Storage,

      // Cloud & DevOps
      'AWS': Cloud,
      'Azure': Cloud,
      'Docker': Layers,
      'Kubernetes': DeviceHub,
      'Jenkins': Build,
      'GitHub Actions': GitHub,
      'Terraform': Cloud,

      // Tools & Others
      'Git': GitHub,
      'GitHub': GitHub,
      'Jest': BugReport,
      'Webpack': Build,
      'ESLint': BugReport,
      'Material-UI': Web,
      'Linux': Computer,
      'Nginx': CloudQueue,
      'Socket.io': DeviceHub,
      'OAuth': Security,
      'JWT': Security,
      'Python': Code,
    };

    return skillIconMap[skill] || Code;
  };

  /**
   * Glass morphism effect styling
   * Consistent with HomePage and ResumePage for unified design
   */
  const glowEffect = {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${theme.palette.primary.main}30`,
  };

  /**
   * Card hover effect styling
   * Provides smooth lift animation when hovering over project cards
   */
  const cardHoverEffect = {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'translateY(0px)',
    boxShadow: theme.shadows[4],
    borderRadius: 4,
    width: '100%',
    display: 'flex',
    '&:hover': {
      transform: 'translateY(-8px)', // Lift card on hover
      boxShadow: theme.shadows[8],   // Increase shadow on hover
    },
  };

  return (
    /* Main Page Container - full viewport height with gradient background */
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.background.default}95, ${theme.palette.background.paper}95)`,
        pt: { xs: 10, md: 12 },
        pb: 4
      }}
    >
      {/* Content Container - centers content */}
      <Container maxWidth="lg">
        
        {/* ========== PAGE HEADER ========== */}
        {/* Page title section */}
        <Fade in timeout={1000}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 6,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 3,
            textAlign: { xs: 'center', sm: 'left' }
          }}>
            {/* Page Title - "Featured Projects" */}
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                lineHeight: 1.25,
                paddingBottom: '0.1em',
              }}
            >
              Featured Projects
            </Typography>
          </Box>
        </Fade>

        {/* ========== PROJECTS DISPLAY ========== */}
        {/* Show message if no projects, otherwise display project cards */}
        {projects.length === 0 ? (
          /* Empty State - shown when no projects are added */
          <Fade in timeout={1200}>
            <Paper
              elevation={0}
              sx={{
                ...glowEffect,
                p: 8,
                textAlign: 'center',
                borderRadius: 4,
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No projects added yet.
              </Typography>
            </Paper>
          </Fade>
        ) : (
          /* Projects Grid - displays all projects */
          <Grid
            container
            spacing={4}
            sx={{ justifyContent: 'center' }}
          >
            {/* Map through projects array to create project cards */}
            {projects.map((project, index) => {
              const name = project?.name ?? 'Untitled Project';
              const description = project?.description ?? '';
              const role = project?.role ?? '';
              const duration = project?.duration ?? '';
              const screenshots = Array.isArray(project?.screenshots) ? project.screenshots : [];
              const technologies = Array.isArray(project?.technologies) ? project.technologies : [];
              const link = project?.link ?? '';
              return (
                /* Project Card Container - full width grid item */
                <Grid
                  item
                  xs={12}
                  key={index}
                  sx={{ display: 'flex', width: '100%' }}
                >
                  <Fade in timeout={800 + index * 200}>
                    <Box sx={cardHoverEffect}>
                      {/* === PROJECT CARD === */}
                      {/* Contains screenshot, details, technologies, and links */}
                      <Card
                        elevation={0}
                        sx={{
                          width: '100%',
                          flexGrow: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          ...glowEffect,
                          borderRadius: 4,
                          overflow: 'hidden',
                        }}
                      >
                        {/* Main Project Screenshot - first image from screenshots array */}
                        {screenshots.length > 0 && (
                          <CardMedia
                            component="img"
                            image={screenshots[0]}
                            alt={`${name} screenshot`}
                            sx={{
                              width: '100%',
                              height: 'auto',
                              objectFit: 'contain',
                              backgroundColor: 'grey.100',
                            }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        )}

                        {/* === CARD CONTENT === */}
                        {/* Project details, role, duration, technologies */}
                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                          
                          {/* Project Header - name and link button */}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            {/* Project Name */}
                            <Typography variant="h5" component="h3" color="text.primary">
                              {name}
                            </Typography>

                            {/* Link Button - GitHub or Live Demo */}
                            {link && (
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={link.includes('github.com') ? <GitHub /> : <Launch />}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  ml: 1,
                                  borderRadius: 3,
                                  textTransform: 'none',
                                  fontWeight: 600,
                                  boxShadow: `0 4px 12px ${theme.palette.primary.main}30`,
                                  '&:hover': {
                                    boxShadow: `0 8px 20px ${theme.palette.primary.main}40`,
                                  },
                                }}
                              >
                                {link.includes('github.com') ? 'View Code' : 'Live Demo'}
                              </Button>
                            )}
                          </Box>

                          {/* Project Description - detailed explanation */}
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            paragraph
                            sx={{
                              lineHeight: 1.6,
                              wordWrap: 'break-word',
                              overflowWrap: 'break-word',
                              whiteSpace: 'normal'
                            }}
                          >
                            {description}
                          </Typography>

                          {/* === INFO BADGES SECTION === */}
                          {/* Role and Duration displayed in cards */}
                          <Box sx={{ mb: 3 }}>
                            <Grid container spacing={2}>
                              {/* Role Badge */}
                              <Grid item xs={12} sm={6}>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: 2,
                                    borderRadius: 2,
                                    backgroundColor: `${theme.palette.primary.main}08`,
                                    border: `1px solid ${theme.palette.primary.main}20`,
                                  }}
                                >
                                  <Person color="primary" sx={{ mr: 2, fontSize: 24 }} />
                                  <Box>
                                    <Typography variant="body2" fontWeight="bold" color="primary">
                                      Role
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {role}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Grid>

                              {/* Duration Badge */}
                              <Grid item xs={12} sm={6}>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: 2,
                                    borderRadius: 2,
                                    backgroundColor: `${theme.palette.secondary.main}08`,
                                    border: `1px solid ${theme.palette.secondary.main}20`,
                                  }}
                                >
                                  <Schedule color="secondary" sx={{ mr: 2, fontSize: 24 }} />
                                  <Box>
                                    <Typography variant="body2" fontWeight="bold" color="secondary">
                                      Duration
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {duration}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>

                          <Divider sx={{ my: 2 }} />

                          {/* === TECHNOLOGIES SECTION === */}
                          {/* Technology chips with icons */}
                          {technologies.length > 0 && (
                            <Box sx={{ mb: 2 }}>
                              {/* Section Header */}
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Code color="primary" sx={{ mr: 1, fontSize: 20 }} />
                                <Typography variant="body2" fontWeight="bold">
                                  Technologies:
                                </Typography>
                              </Box>
                              
                              {/* Technology Chips - each tech with icon */}
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {technologies.map((tech, techIndex) => {
                                  const IconComponent = getSkillIcon(tech);
                                  return (
                                    <Chip
                                      key={techIndex}
                                      icon={<IconComponent sx={{ fontSize: '1rem !important' }} />}
                                      label={tech}
                                      size="small"
                                      sx={{
                                        backgroundColor: 'primary.main',
                                        color: 'primary.contrastText',
                                        fontWeight: 600,
                                        borderRadius: 2,
                                        '& .MuiChip-icon': {
                                          color: 'primary.contrastText',
                                        },
                                        '&:hover': {
                                          boxShadow: '0 2px 8px rgba(0, 123, 255, 0.3)',
                                        },
                                      }}
                                    />
                                  );
                                })}
                              </Box>
                            </Box>
                          )}

                          {/* === ADDITIONAL SCREENSHOTS === */}
                          {/* Thumbnail grid of extra screenshots (if more than 1) */}
                          {screenshots.length > 1 && (
                            <Box>
                              {/* Section Header */}
                              <Typography variant="body2" fontWeight="bold" gutterBottom>
                                Additional Screenshots:
                              </Typography>
                              
                              {/* Screenshot Thumbnails Grid */}
                              <Grid container spacing={1}>
                                {/* Map through remaining screenshots (skip first one) */}
                                {screenshots.slice(1).map((screenshot, screenshotIndex) => (
                                  <Grid item xs={6} key={screenshotIndex}>
                                    {/* Thumbnail Image - clickable to view full size */}
                                    <Box
                                      component="img"
                                      src={screenshot}
                                      alt={`${name} screenshot ${screenshotIndex + 2}`}
                                      onClick={() => handleImageClick(screenshot)}
                                      sx={{
                                        width: '100%',
                                        height: 120,
                                        objectFit: 'cover',
                                        borderRadius: 1,
                                        border: 1,
                                        borderColor: 'grey.300',
                                        backgroundColor: 'grey.100',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                          transform: 'scale(1.05)',
                                          boxShadow: theme.shadows[4],
                                          borderColor: 'primary.main',
                                        },
                                      }}
                                      onError={(e) => {
                                        e.target.style.display = 'none';
                                      }}
                                    />
                                  </Grid>
                                ))}
                              </Grid>
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    </Box>
                  </Fade>
                </Grid>
              );
            })}
          </Grid>
        )}

        {/* ========== IMAGE MODAL ========== */}
        {/* Full-screen modal for viewing screenshots */}
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          {/* Modal Content Container */}
          <Box
            sx={{
              position: 'relative',
              maxWidth: '95vw',
              maxHeight: '95vh',
              outline: 'none',
            }}
          >
            {/* Close Button - top right corner */}
            <IconButton
              onClick={handleCloseModal}
              sx={{
                position: 'absolute',
                top: -8,
                right: -8,
                backgroundColor: 'background.paper',
                color: 'text.primary',
                boxShadow: theme.shadows[4],
                zIndex: 1,
                '&:hover': {
                  backgroundColor: 'error.main',
                  color: 'error.contrastText',
                },
              }}
            >
              <Close />
            </IconButton>
            
            {/* Full-Size Image */}
            <Box
              component="img"
              src={selectedImage}
              alt="Full size screenshot"
              sx={{
                maxWidth: '100%',
                maxHeight: '95vh',
                objectFit: 'contain',
                borderRadius: 2,
                boxShadow: theme.shadows[24],
              }}
            />
          </Box>
        </Modal>
      </Container>
    </Box>
  );
};

ProjectsPage.propTypes = {
  data: PropTypes.shape({
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        role: PropTypes.string,
        duration: PropTypes.string,
        screenshots: PropTypes.arrayOf(PropTypes.string),
        technologies: PropTypes.arrayOf(PropTypes.string),
        link: PropTypes.string,
      })
    ),
  }),
};

export default ProjectsPage;
