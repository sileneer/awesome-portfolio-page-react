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
  // Tech Icons
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
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage('');
  };

  // Technology icon mapping (consistent with ResumePage)
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

  // Glass morphism effect consistent with HomePage and ResumePage
  const glowEffect = {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${theme.palette.primary.main}30`,
  };

  const cardHoverEffect = {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'translateY(0px)',
    boxShadow: theme.shadows[4],
    borderRadius: 4,
    width: '100%',
    display: 'flex',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: theme.shadows[8],
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.background.default}95, ${theme.palette.background.paper}95)`,
        pt: { xs: 10, md: 12 },
        pb: 4
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
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

        {projects.length === 0 ? (
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
          <Grid
            container
            spacing={4}
            sx={{ justifyContent: 'center' }}
          >
            {projects.map((project, index) => {
              const name = project?.name ?? 'Untitled Project';
              const description = project?.description ?? '';
              const role = project?.role ?? '';
              const duration = project?.duration ?? '';
              const screenshots = Array.isArray(project?.screenshots) ? project.screenshots : [];
              const technologies = Array.isArray(project?.technologies) ? project.technologies : [];
              const link = project?.link ?? '';
              return (
                <Grid
                  item
                  xs={12}
                  key={index}
                  sx={{ display: 'flex', width: '100%' }}
                >
                  <Fade in timeout={800 + index * 200}>
                    <Box sx={cardHoverEffect}>
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

                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Typography variant="h5" component="h3" color="text.primary">
                              {name}
                            </Typography>

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

                          <Box sx={{ mb: 3 }}>
                            <Grid container spacing={2}>
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

                          {technologies.length > 0 && (
                            <Box sx={{ mb: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Code color="primary" sx={{ mr: 1, fontSize: 20 }} />
                                <Typography variant="body2" fontWeight="bold">
                                  Technologies:
                                </Typography>
                              </Box>
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

                          {screenshots.length > 1 && (
                            <Box>
                              <Typography variant="body2" fontWeight="bold" gutterBottom>
                                Additional Screenshots:
                              </Typography>
                              <Grid container spacing={1}>
                                {screenshots.slice(1).map((screenshot, screenshotIndex) => (
                                  <Grid item xs={6} key={screenshotIndex}>
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

        {/* Image Modal */}
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
          <Box
            sx={{
              position: 'relative',
              maxWidth: '95vw',
              maxHeight: '95vh',
              outline: 'none',
            }}
          >
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
