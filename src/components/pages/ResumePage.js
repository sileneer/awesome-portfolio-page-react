import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Fade,
  Grow,
  Slide,
  Stack,
} from '@mui/material';
import { 
  Download, 
  Work, 
  School, 
  Star, 
  EmojiEvents, 
  Interests,
  CheckCircle,
  TrendingUp,
  BusinessCenter,
  PsychologyAlt,
  // Tech Skills Icons
  Code,
  DataObject,
  Web,
  Storage,
  Cloud,
  DeviceHub,
  BugReport,
  Terminal,
  GitHub,
  Api,
  Memory,
  CloudQueue,
  AccountTree,
  ViewInAr,
  Layers,
  Speed,
  Security,
  Language,
  Html,
  Css,
  Javascript,
  Build,
  Settings,
  Computer
} from '@mui/icons-material';

const ResumePage = ({ data }) => {
  const { resume } = data;
  const theme = useTheme();

  // Comprehensive Skills Mapping with Icons (using only available Material-UI icons)
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
      'Svelte': Web,
      'Next.js': Web,
      'Nuxt.js': Web,
      'Gatsby': Web,
      
      // Backend Technologies
      'Node.js': Terminal,
      'Express': Api,
      'Django': Code,
      'Flask': Code,
      'FastAPI': Speed,
      'Spring': Code,
      'Laravel': Code,
      'Ruby on Rails': Code,
      'ASP.NET': Code,
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
      'Cassandra': Storage,
      
      // Cloud & DevOps
      'AWS': Cloud,
      'Azure': Cloud,
      'GCP': Cloud,
      'Docker': Layers,
      'Kubernetes': DeviceHub,
      'Jenkins': Build,
      'GitHub Actions': GitHub,
      'GitLab CI': Build,
      'Terraform': Cloud,
      'Ansible': DeviceHub,
      
      // Tools & Others
      'Git': GitHub,
      'GitHub': GitHub,
      'GitLab': GitHub,
      'Jest': BugReport,
      'Cypress': BugReport,
      'Webpack': Build,
      'Vite': Speed,
      'Babel': Code,
      'ESLint': BugReport,
      'Prettier': Code,
      'SASS': Web,
      'SCSS': Web,
      'TailwindCSS': Web,
      'Material-UI': Web,
      'Bootstrap': Web,
      'Figma': ViewInAr,
      'Photoshop': ViewInAr,
      'Linux': Computer,
      'Nginx': CloudQueue,
      'Apache': CloudQueue,
      'Postman': Api,
      'Swagger': Api,
      'WebSockets': DeviceHub,
      'Socket.io': DeviceHub,
      
      // Programming Languages
      'Python': Code,
      'Java': Code,
      'C++': Code,
      'C#': Code,
      'Go': Code,
      'Rust': Code,
      'PHP': Code,
      'Ruby': Code,
      'Swift': Code,
      'Kotlin': Code,
      'Dart': Code,
      
      // Security & Performance
      'OAuth': Security,
      'JWT': Security,
      'SSL/TLS': Security,
      'Performance Optimization': Speed,
      'SEO': TrendingUp,
      'Analytics': TrendingUp,
    };

    // Return the mapped icon or fallback to Code icon
    return skillIconMap[skill] || Code;
  };

  // Glass morphism effect consistent with HomePage
  const glowEffect = {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${theme.palette.primary.main}30`,
  };

  const cardHoverEffect = {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'translateY(0px)',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: theme.shadows[8],
    },
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
      <Container maxWidth="lg" sx={{ pt: { xs: 12, md: 14 }, pb: 8 }}>
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
              Professional Resume
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<Download />}
              href={resume.cvDownload}
              download
              sx={{ 
                px: 4, 
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                textTransform: 'none',
                boxShadow: '0 4px 20px rgba(0, 123, 255, 0.3)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0, 123, 255, 0.4)',
                },
              }}
            >
              Download CV
            </Button>
          </Box>
        </Fade>

        {/* Summary */}
        <Slide direction="up" in timeout={1200}>
          <Box sx={{ mb: 6 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 3,
                fontWeight: 700,
                color: 'primary.main',
                display: 'flex', 
                alignItems: 'center', 
                gap: 1 
              }}
            >
              <PsychologyAlt />
              Professional Summary
            </Typography>
            <Card 
              elevation={0}
              sx={{
                ...glowEffect,
                ...cardHoverEffect,
                borderRadius: 4,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    lineHeight: 1.7, 
                    fontSize: '1.2rem',
                    fontWeight: 300,
                    color: 'text.primary'
                  }}
                >
                  {resume.summary}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Slide>

        {/* Experience */}
        <Fade in timeout={1400}>
          <Box sx={{ mb: 6 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 4,
                fontWeight: 700,
                color: 'primary.main',
                display: 'flex', 
                alignItems: 'center', 
                gap: 1 
              }}
            >
              <BusinessCenter />
              Professional Experience
            </Typography>
            <Stack spacing={4}>
              {resume.experience.map((exp, index) => (
                <Grow key={index} in timeout={1600 + index * 200}>
                  <Box>
                    <Card 
                      elevation={0}
                      sx={{
                        ...glowEffect,
                        ...cardHoverEffect,
                        borderRadius: 4,
                      }}
                    >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start', 
                        mb: 3, 
                        flexDirection: { xs: 'column', sm: 'row' } 
                      }}>
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            fontWeight: 700,
                            color: 'text.primary',
                            mb: { xs: 1, sm: 0 }
                          }}
                        >
                          {exp.role}
                        </Typography>
                        <Chip 
                          label={exp.dates}
                          sx={{
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            fontWeight: 600,
                            px: 2,
                            py: 1,
                            height: 'auto',
                            borderRadius: 3,
                          }}
                        />
                      </Box>
                      
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: 'primary.main',
                          fontWeight: 600,
                          mb: 2
                        }}
                      >
                        {exp.company} • {exp.location}
                      </Typography>
                      
                      <Typography 
                        variant="body1" 
                        paragraph 
                        sx={{ 
                          lineHeight: 1.7, 
                          mb: 3,
                          fontSize: '1.1rem',
                          color: 'text.secondary'
                        }}
                      >
                        {exp.description}
                      </Typography>
                      
                      <Box sx={{ mb: 3 }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 700, 
                            mb: 1.5,
                            color: 'text.primary'
                          }}
                        >
                          Technologies & Tools:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {exp.technologies.map((tech, techIndex) => {
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
                                  px: 1.5,
                                  py: 0.5,
                                  height: 'auto',
                                  borderRadius: 2,
                                  '& .MuiChip-icon': {
                                    color: 'primary.contrastText',
                                    marginLeft: '6px',
                                  },
                                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                  '&:hover': {
                                    transform: 'translateY(-2px) scale(1.05)',
                                    boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)',
                                  },
                                }}
                              />
                            );
                          })}
                        </Box>
                      </Box>
                      
                      {exp.achievements && (
                        <Box>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 700, 
                              mb: 1.5,
                              color: 'text.primary'
                            }}
                          >
                            Key Achievements:
                          </Typography>
                          <List dense>
                            {exp.achievements.map((achievement, achievementIndex) => (
                              <ListItem 
                                key={achievementIndex} 
                                sx={{ 
                                  py: 0.5,
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <CheckCircle 
                                  sx={{ 
                                    color: 'success.main', 
                                    fontSize: 20, 
                                    mr: 1.5,
                                    flexShrink: 0
                                  }} 
                                />
                                <ListItemText 
                                  primary={achievement}
                                  sx={{
                                    '& .MuiListItemText-primary': {
                                      fontSize: '1rem',
                                      lineHeight: 1.6,
                                      color: 'text.secondary'
                                    }
                                  }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                  </Box>
                </Grow>
              ))}
            </Stack>
          </Box>
        </Fade>

        {/* Skills, Education, and other sections */}
        <Fade in timeout={1800}>
          <Box sx={{ mb: 6 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 4,
                fontWeight: 700,
                color: 'primary.main',
                display: 'flex', 
                alignItems: 'center', 
                gap: 1 
              }}
            >
              <Star />
              Technical Skills
            </Typography>
            <Card 
              elevation={0}
              sx={{
                ...glowEffect,
                ...cardHoverEffect,
                borderRadius: 4,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {resume.skills.map((skill, index) => {
                    // Get the appropriate icon for this skill with fallback
                    const IconComponent = getSkillIcon(skill);
                    return (
                      <Chip
                        key={index}
                        icon={<IconComponent sx={{ fontSize: '1.2rem !important' }} />}
                        label={skill}
                        sx={{
                          backgroundColor: 'primary.main',
                          color: 'primary.contrastText',
                          fontWeight: 600,
                          fontSize: '1rem',
                          px: 2,
                          py: 1,
                          height: 'auto',
                          borderRadius: 3,
                          '& .MuiChip-icon': {
                            color: 'primary.contrastText',
                            marginLeft: '8px',
                          },
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            transform: 'translateY(-2px) scale(1.05)',
                            boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)',
                          },
                        }}
                      />
                    );
                  })}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default ResumePage;
