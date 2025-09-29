import React from 'react';
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
} from '@mui/material';
import { 
  Launch, 
  GitHub, 
  Code, 
  Schedule, 
  Person, 
  Star,
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
  Language,
  BugReport,
  Layers,
  Settings,
  CloudQueue
} from '@mui/icons-material';

const ProjectsPage = ({ data }) => {
  const { projects } = data;
  const theme = useTheme();

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
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: `0 20px 40px ${theme.palette.primary.main}20`,
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
        <Fade in timeout={800}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              <Star sx={{ fontSize: { xs: '2rem', md: '3rem' }, color: theme.palette.primary.main }} />
              Featured Projects
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                maxWidth: 700, 
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1.1rem', md: '1.25rem' }
              }}
            >
              Explore my portfolio of innovative projects that demonstrate technical expertise, creative problem-solving, and modern development practices.
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
          <Grid container spacing={4}>
            {projects.map((project, index) => (
              <Grid item xs={12} lg={6} key={index}>
                <Fade in timeout={800 + index * 200}>
                  <Card 
                    elevation={0}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      ...glowEffect,
                      ...cardHoverEffect,
                      borderRadius: 4,
                      overflow: 'hidden',
                    }}
              >
                {project.screenshots && project.screenshots.length > 0 && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={project.screenshots[0]}
                    alt={`${project.name} screenshot`}
                    sx={{ 
                      objectFit: 'cover',
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
                      {project.name}
                    </Typography>
                    
                    {project.link && (
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={project.link.includes('github.com') ? <GitHub /> : <Launch />}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          ml: 1,
                          borderRadius: 3,
                          textTransform: 'none',
                          fontWeight: 600,
                          boxShadow: `0 4px 12px ${theme.palette.primary.main}30`,
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: `0 8px 20px ${theme.palette.primary.main}40`,
                          },
                        }}
                      >
                        {project.link.includes('github.com') ? 'View Code' : 'Live Demo'}
                      </Button>
                    )}
                  </Box>

                  <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.6 }}>
                    {project.description}
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
                              {project.role}
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
                              {project.duration}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Code color="primary" sx={{ mr: 1, fontSize: 20 }} />
                      <Typography variant="body2" fontWeight="bold">
                        Technologies:
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {project.technologies.map((tech, techIndex) => {
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
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0 2px 8px rgba(0, 123, 255, 0.3)',
                              },
                            }}
                          />
                        );
                      })}
                    </Box>
                  </Box>

                  {project.screenshots && project.screenshots.length > 1 && (
                    <Box>
                      <Typography variant="body2" fontWeight="bold" gutterBottom>
                        Additional Screenshots:
                      </Typography>
                      <Grid container spacing={1}>
                        {project.screenshots.slice(1).map((screenshot, screenshotIndex) => (
                          <Grid item xs={6} key={screenshotIndex}>
                            <Box
                              component="img"
                              src={screenshot}
                              alt={`${project.name} screenshot ${screenshotIndex + 2}`}
                              sx={{
                                width: '100%',
                                height: 80,
                                objectFit: 'cover',
                                borderRadius: 1,
                                border: 1,
                                borderColor: 'grey.300',
                                backgroundColor: 'grey.100',
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
                </Fade>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ProjectsPage;
