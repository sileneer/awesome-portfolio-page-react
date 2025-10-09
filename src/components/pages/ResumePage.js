/**
 * ResumePage Component
 * 
 * Comprehensive resume/CV page displaying professional background:
 * - Professional summary
 * - Work experience with achievements and technologies
 * - Technical skills with categorized icons
 * - Education history with coursework and activities
 * - Certifications and professional credentials
 * - Awards and recognitions
 * - Personal interests
 * - Downloadable CV/resume link
 * 
 * Features:
 * - Technology icons mapped to skill names
 * - Expandable experience cards with detailed achievements
 * - Responsive grid layout
 * - Smooth fade-in animations
 * - Glass morphism design consistent with other pages
 * 
 * @param {Object} props - Component props
 * @param {Object} props.data - Portfolio data containing resume information
 */

import React from 'react';
import PropTypes from 'prop-types';
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
  // Technology Icons - Used for skills and technologies
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
  // Extract resume data with safe fallbacks
  const resume = data?.resume ?? {};
  const summary = resume?.summary ?? '';
  const cvDownload = resume?.cvDownload ?? '';
  const experience = Array.isArray(resume?.experience) ? resume.experience : [];
  const skills = Array.isArray(resume?.skills) ? resume.skills : [];
  const education = Array.isArray(resume?.education) ? resume.education : [];
  const certifications = Array.isArray(resume?.certifications) ? resume.certifications : [];
  const awards = Array.isArray(resume?.awards) ? resume.awards : [];
  const interests = Array.isArray(resume?.interests) ? resume.interests : [];
  const theme = useTheme();

  // State for hover effects on icons
  const [hoveredIcon, setHoveredIcon] = React.useState(null);

  // Enhanced icon styles with better visual effects
  const iconStyles = React.useMemo(() => ({
    base: {
      fontSize: 22,
      mr: 1.5,
      flexShrink: 0,
      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
    achievement: (isHovered) => ({
      color: 'success.main',
      transform: isHovered ? 'scale(1.4) rotate(360deg)' : 'scale(1)',
      filter: isHovered
        ? 'drop-shadow(0 0 12px rgba(76, 175, 80, 0.8)) drop-shadow(0 0 20px rgba(76, 175, 80, 0.4))'
        : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
      opacity: isHovered ? 1 : 0.85,
    }),
    activity: (isHovered) => ({
      color: 'success.main',
      transform: isHovered ? 'scale(1.4) translateY(-4px)' : 'scale(1)',
      filter: isHovered
        ? 'drop-shadow(0 0 12px rgba(76, 175, 80, 0.8)) drop-shadow(0 0 20px rgba(76, 175, 80, 0.4))'
        : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
      opacity: isHovered ? 1 : 0.85,
    }),
    certification: (isHovered) => ({
      color: 'success.main',
      transform: isHovered ? 'scale(1.4) rotate(360deg)' : 'scale(1)',
      filter: isHovered
        ? 'drop-shadow(0 0 12px rgba(76, 175, 80, 0.8)) drop-shadow(0 0 20px rgba(76, 175, 80, 0.4))'
        : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
      opacity: isHovered ? 1 : 0.85,
    }),
    award: (isHovered) => ({
      color: 'warning.main',
      transform: isHovered ? 'scale(1.5) rotate(-15deg)' : 'scale(1)',
      filter: isHovered
        ? 'drop-shadow(0 0 12px rgba(255, 193, 7, 0.9)) drop-shadow(0 0 24px rgba(255, 193, 7, 0.5))'
        : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
      opacity: isHovered ? 1 : 0.85,
    }),
  }), []);

  // Section heading styles with enhanced visual effects
  const sectionHeadingStyle = {
    mb: 4,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    position: 'relative',
    '& > svg': {
      fontSize: '2.5rem',
      padding: '8px',
      borderRadius: '12px',
      background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
      border: `2px solid ${theme.palette.primary.main}30`,
      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      boxShadow: `0 4px 12px ${theme.palette.primary.main}20`,
      '&:hover': {
        transform: 'scale(1.1) rotate(5deg)',
        background: `linear-gradient(135deg, ${theme.palette.primary.main}25, ${theme.palette.secondary.main}25)`,
        border: `2px solid ${theme.palette.primary.main}50`,
        boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
      }
    }
  };

  /**
   * Get appropriate icon for a technology/skill
   * 
   * Maps technology names to Material-UI icons for visual representation.
   * Supports a comprehensive list of frontend, backend, database, cloud,
   * and DevOps technologies.
   * 
   * @param {string} skill - Technology or skill name
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

  /**
   * Glass morphism effect styling
   * Consistent with HomePage for unified design
   */
  const glowEffect = {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${theme.palette.primary.main}30`,
  };

  /**
   * Card hover effect styling
   * Provides smooth lift animation when hovering over cards
   */
  const cardHoverEffect = {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'translateY(0px)',
    '&:hover': {
      transform: 'translateY(-8px)', // Lift card on hover
      boxShadow: theme.shadows[8],   // Increase shadow on hover
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
      <Container maxWidth="lg" sx={{ pt: { xs: 10, md: 12 }, pb: 8 }}>
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
              My Resume
            </Typography>
            {cvDownload && (
              <Button
                variant="contained"
                size="large"
                startIcon={<Download />}
                href={cvDownload}
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
            )}
          </Box>
        </Fade>

        {/* Summary */}
        <Fade in timeout={1200}>
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h4"
              sx={{
                ...sectionHeadingStyle,
                mb: 3,
                color: 'primary.main',
              }}
            >
              <PsychologyAlt />
              Professional Summary
            </Typography>
            {summary && (
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
                    {summary}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        </Fade>

        {/* Experience */}
        <Fade in timeout={1400}>
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h4"
              sx={{
                ...sectionHeadingStyle,
                color: 'primary.main',
              }}
            >
              <BusinessCenter />
              Professional Experience
            </Typography>
            <Stack spacing={4}>
              {experience.map((exp, index) => (
                <Fade key={index} in timeout={1600 + index * 200}>
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
                            {exp?.role ?? 'Role'}
                          </Typography>
                          <Chip
                            label={exp?.dates ?? ''}
                            variant="outlined"
                            sx={{
                              borderWidth: 2,
                              borderColor: 'primary.main',
                              backgroundColor: `${theme.palette.primary.main}08`,
                              color: 'primary.main',
                              fontWeight: 700,
                              px: 2,
                              py: 1,
                              height: 'auto',
                              borderRadius: 2,
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
                          {[exp?.company, exp?.location].filter(Boolean).join(' • ')}
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
                          {exp?.description ?? ''}
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
                            {(Array.isArray(exp?.technologies) ? exp.technologies : []).map((tech, techIndex) => {
                              const IconComponent = getSkillIcon(tech);
                              return (
                                <Chip
                                  key={techIndex}
                                  icon={<IconComponent sx={{ fontSize: '0.9rem !important' }} />}
                                  label={tech}
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    borderWidth: 1.5,
                                    borderColor: 'divider',
                                    backgroundColor: 'background.paper',
                                    color: 'text.primary',
                                    fontWeight: 500,
                                    px: 1.5,
                                    py: 0.5,
                                    height: 'auto',
                                    borderRadius: 8,
                                    '& .MuiChip-icon': {
                                      color: 'primary.main',
                                      marginLeft: '6px',
                                    },
                                    '&:hover': {
                                      borderColor: 'primary.main',
                                      backgroundColor: `${theme.palette.primary.main}05`,
                                    },
                                  }}
                                />
                              );
                            })}
                          </Box>
                        </Box>

                        {Array.isArray(exp?.achievements) && exp.achievements.length > 0 && (
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
                                  onMouseEnter={() => setHoveredIcon(`achievement-${index}-${achievementIndex}`)}
                                  onMouseLeave={() => setHoveredIcon(null)}
                                  sx={{
                                    py: 0.75,
                                    px: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    borderRadius: 2,
                                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                    '&:hover': {
                                      transform: 'translateX(12px)',
                                      backgroundColor: `${theme.palette.success.main}08`,
                                      boxShadow: `0 4px 12px ${theme.palette.success.main}15`,
                                    }
                                  }}
                                >
                                  <CheckCircle
                                    sx={{
                                      ...iconStyles.base,
                                      ...iconStyles.achievement(hoveredIcon === `achievement-${index}-${achievementIndex}`),
                                    }}
                                  />
                                  <ListItemText
                                    primary={achievement}
                                    sx={{
                                      '& .MuiListItemText-primary': {
                                        fontSize: '1rem',
                                        lineHeight: 1.6,
                                        color: 'text.secondary',
                                        fontWeight: hoveredIcon === `achievement-${index}-${achievementIndex}` ? 600 : 400,
                                        transition: 'all 0.3s ease',
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
                </Fade>
              ))}
            </Stack>
          </Box>
        </Fade>

        {/* Skills */}
        {skills.length > 0 && (
          <Fade in timeout={1800}>
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h4"
                sx={{
                  ...sectionHeadingStyle,
                  color: 'primary.main',
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
                    {skills.map((skill, index) => {
                      const IconComponent = getSkillIcon(skill);
                      return (
                        <Chip
                          key={index}
                          icon={<IconComponent sx={{ fontSize: '1.1rem !important' }} />}
                          label={skill}
                          variant="outlined"
                          sx={{
                            borderWidth: 1.5,
                            borderColor: 'divider',
                            backgroundColor: 'background.paper',
                            color: 'text.primary',
                            fontWeight: 500,
                            fontSize: '0.95rem',
                            px: 2,
                            py: 1,
                            height: 'auto',
                            borderRadius: 8,
                            '& .MuiChip-icon': {
                              color: 'primary.main',
                              marginLeft: '8px',
                            },
                            '&:hover': {
                              borderColor: 'primary.main',
                              backgroundColor: `${theme.palette.primary.main}05`,
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
        )}

        {/* Education */}
        {education.length > 0 && (
          <Fade in timeout={2000}>
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h4"
                sx={{
                  ...sectionHeadingStyle,
                  color: 'primary.main',
                }}
              >
                <School />
                Education
              </Typography>
              <Stack spacing={4}>
                {education.map((edu, index) => (
                  <Fade key={index} in timeout={2200 + index * 200}>
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
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: { xs: 'flex-start', sm: 'center' },
                              gap: 2,
                              flexDirection: { xs: 'column', sm: 'row' },
                              mb: 2,
                            }}
                          >
                            <Typography
                              variant="h5"
                              sx={{
                                fontWeight: 700,
                                color: 'text.primary',
                              }}
                            >
                              {edu?.degree ?? 'Degree'}
                            </Typography>
                            <Stack
                              direction={{ xs: 'column', sm: 'row' }}
                              spacing={1}
                              alignItems={{ xs: 'flex-start', sm: 'center' }}
                            >
                              {edu?.dates && (
                                <Chip
                                  label={edu.dates}
                                  variant="outlined"
                                  sx={{
                                    borderWidth: 2,
                                    borderColor: 'primary.main',
                                    backgroundColor: `${theme.palette.primary.main}08`,
                                    color: 'primary.main',
                                    fontWeight: 700,
                                    px: 2,
                                    py: 1,
                                    height: 'auto',
                                    borderRadius: 2,
                                  }}
                                />
                              )}
                              {edu?.gpa && (
                                <Chip
                                  label={`GPA: ${edu.gpa}`}
                                  variant="outlined"
                                  sx={{
                                    borderWidth: 2,
                                    borderColor: 'secondary.main',
                                    backgroundColor: `${theme.palette.secondary.main}08`,
                                    color: 'secondary.main',
                                    fontWeight: 700,
                                    px: 2,
                                    py: 1,
                                    height: 'auto',
                                    borderRadius: 2,
                                  }}
                                />
                              )}
                            </Stack>
                          </Box>

                          <Typography
                            variant="h6"
                            sx={{
                              color: 'primary.main',
                              fontWeight: 600,
                              mb: 2,
                            }}
                          >
                            {[edu?.institution, edu?.location].filter(Boolean).join(' • ')}
                          </Typography>

                          {edu?.description && (
                            <Typography
                              variant="body1"
                              paragraph
                              sx={{
                                lineHeight: 1.7,
                                mb: 2,
                                fontSize: '1.05rem',
                                color: 'text.secondary',
                              }}
                            >
                              {edu.description}
                            </Typography>
                          )}

                          {Array.isArray(edu?.coursework) && edu.coursework.length > 0 && (
                            <Box sx={{ mb: 2 }}>
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 700,
                                  mb: 1.5,
                                  color: 'text.primary',
                                }}
                              >
                                Relevant Coursework:
                              </Typography>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {edu.coursework.map((course, courseIndex) => (
                                  <Chip
                                    key={courseIndex}
                                    label={course}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                      borderWidth: 1.5,
                                      borderColor: 'divider',
                                      backgroundColor: 'background.paper',
                                      color: 'text.primary',
                                      fontWeight: 500,
                                      px: 1.5,
                                      py: 0.5,
                                      height: 'auto',
                                      borderRadius: 8,
                                      '&:hover': {
                                        borderColor: 'primary.main',
                                        backgroundColor: `${theme.palette.primary.main}05`,
                                      },
                                    }}
                                  />
                                ))}
                              </Box>
                            </Box>
                          )}

                          {Array.isArray(edu?.extracurriculars) && edu.extracurriculars.length > 0 && (
                            <Box>
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 700,
                                  mb: 1.5,
                                  color: 'text.primary',
                                }}
                              >
                                Extracurricular Activities:
                              </Typography>
                              <List dense>
                                {edu.extracurriculars.map((activity, activityIndex) => (
                                  <ListItem
                                    key={activityIndex}
                                    onMouseEnter={() => setHoveredIcon(`activity-${index}-${activityIndex}`)}
                                    onMouseLeave={() => setHoveredIcon(null)}
                                    sx={{
                                      py: 0.75,
                                      px: 1,
                                      display: 'flex',
                                      alignItems: 'center',
                                      cursor: 'pointer',
                                      borderRadius: 2,
                                      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                      '&:hover': {
                                        transform: 'translateX(12px)',
                                        backgroundColor: `${theme.palette.success.main}08`,
                                        boxShadow: `0 4px 12px ${theme.palette.success.main}15`,
                                      }
                                    }}
                                  >
                                    <TrendingUp
                                      sx={{
                                        ...iconStyles.base,
                                        ...iconStyles.activity(hoveredIcon === `activity-${index}-${activityIndex}`),
                                      }}
                                    />
                                    <ListItemText
                                      primary={activity}
                                      sx={{
                                        '& .MuiListItemText-primary': {
                                          fontSize: '1rem',
                                          lineHeight: 1.6,
                                          color: 'text.secondary',
                                          fontWeight: hoveredIcon === `activity-${index}-${activityIndex}` ? 600 : 400,
                                          transition: 'all 0.3s ease',
                                        },
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
                  </Fade>
                ))}
              </Stack>
            </Box>
          </Fade>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <Fade in timeout={2200}>
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h4"
                sx={{
                  ...sectionHeadingStyle,
                  color: 'primary.main',
                }}
              >
                <CheckCircle />
                Certifications
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
                  <List dense>
                    {certifications.map((certification, index) => {
                      // Support both string format (legacy) and object format (with certificate link)
                      const certTitle = typeof certification === 'string' ? certification : (certification?.title ?? '');
                      const certificateLink = typeof certification === 'object' ? (certification?.certificateLink ?? '') : '';

                      return (
                        <ListItem
                          key={index}
                          onMouseEnter={() => setHoveredIcon(`cert-${index}`)}
                          onMouseLeave={() => setHoveredIcon(null)}
                          sx={{
                            py: 1,
                            px: 1.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            borderRadius: 2,
                            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            '&:hover': {
                              transform: 'translateX(12px)',
                              backgroundColor: `${theme.palette.success.main}08`,
                              boxShadow: `0 4px 12px ${theme.palette.success.main}15`,
                            }
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                            <CheckCircle
                              sx={{
                                ...iconStyles.base,
                                ...iconStyles.certification(hoveredIcon === `cert-${index}`),
                              }}
                            />
                            <ListItemText
                              primary={certTitle}
                              sx={{
                                '& .MuiListItemText-primary': {
                                  fontSize: '1.05rem',
                                  lineHeight: 1.6,
                                  color: 'text.secondary',
                                  fontWeight: hoveredIcon === `cert-${index}` ? 600 : 400,
                                  transition: 'all 0.3s ease',
                                },
                              }}
                            />
                          </Box>
                          {certificateLink && (
                            <Button
                              variant="contained"
                              size="small"
                              href={certificateLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                ml: 2,
                                borderRadius: 3,
                                textTransform: 'none',
                                fontWeight: 600,
                                boxShadow: `0 4px 12px ${theme.palette.primary.main}30`,
                                '&:hover': {
                                  boxShadow: `0 8px 20px ${theme.palette.primary.main}40`,
                                },
                              }}
                            >
                              View Certificate
                            </Button>
                          )}
                        </ListItem>
                      );
                    })}
                  </List>
                </CardContent>
              </Card>
            </Box>
          </Fade>
        )}

        {/* Awards */}
        {awards.length > 0 && (
          <Fade in timeout={2400}>
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h4"
                sx={{
                  ...sectionHeadingStyle,
                  color: 'primary.main',
                }}
              >
                <EmojiEvents />
                Awards
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
                  <List dense>
                    {awards.map((award, index) => {
                      // Support both string format (legacy) and object format (with certificate link)
                      const awardTitle = typeof award === 'string' ? award : (award?.title ?? '');
                      const certificateLink = typeof award === 'object' ? (award?.certificateLink ?? '') : '';

                      return (
                        <ListItem
                          key={index}
                          onMouseEnter={() => setHoveredIcon(`award-${index}`)}
                          onMouseLeave={() => setHoveredIcon(null)}
                          sx={{
                            py: 1,
                            px: 1.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            borderRadius: 2,
                            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            '&:hover': {
                              transform: 'translateX(12px)',
                              backgroundColor: `${theme.palette.warning.main}08`,
                              boxShadow: `0 4px 12px ${theme.palette.warning.main}15`,
                            }
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                            <EmojiEvents
                              sx={{
                                ...iconStyles.base,
                                ...iconStyles.award(hoveredIcon === `award-${index}`),
                              }}
                            />
                            <ListItemText
                              primary={awardTitle}
                              sx={{
                                '& .MuiListItemText-primary': {
                                  fontSize: '1.05rem',
                                  lineHeight: 1.6,
                                  color: 'text.secondary',
                                  fontWeight: hoveredIcon === `award-${index}` ? 600 : 400,
                                  transition: 'all 0.3s ease',
                                },
                              }}
                            />
                          </Box>
                          {certificateLink && (
                            <Button
                              variant="contained"
                              size="small"
                              href={certificateLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                ml: 2,
                                borderRadius: 3,
                                textTransform: 'none',
                                fontWeight: 600,
                                boxShadow: `0 4px 12px ${theme.palette.primary.main}30`,
                                '&:hover': {
                                  boxShadow: `0 8px 20px ${theme.palette.primary.main}40`,
                                },
                              }}
                            >
                              View Award
                            </Button>
                          )}
                        </ListItem>
                      );
                    })}
                  </List>
                </CardContent>
              </Card>
            </Box>
          </Fade>
        )}

        {/* Interests */}
        {interests.length > 0 && (
          <Fade in timeout={2600}>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  ...sectionHeadingStyle,
                  color: 'primary.main',
                }}
              >
                <Interests />
                Interests
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
                    {interests.map((interest, index) => (
                      <Chip
                        key={index}
                        label={interest}
                        variant="outlined"
                        sx={{
                          borderWidth: 1.5,
                          borderColor: 'divider',
                          backgroundColor: 'background.paper',
                          color: 'text.primary',
                          fontWeight: 500,
                          fontSize: '0.95rem',
                          px: 2,
                          py: 1,
                          height: 'auto',
                          borderRadius: 8,
                          '&:hover': {
                            borderColor: 'primary.main',
                            backgroundColor: `${theme.palette.primary.main}05`,
                          },
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

ResumePage.propTypes = {
  data: PropTypes.shape({
    resume: PropTypes.shape({
      summary: PropTypes.string,
      cvDownload: PropTypes.string,
      experience: PropTypes.arrayOf(
        PropTypes.shape({
          role: PropTypes.string,
          dates: PropTypes.string,
          company: PropTypes.string,
          location: PropTypes.string,
          description: PropTypes.string,
          technologies: PropTypes.arrayOf(PropTypes.string),
          achievements: PropTypes.arrayOf(PropTypes.string),
        })
      ),
      skills: PropTypes.arrayOf(PropTypes.string),
      education: PropTypes.arrayOf(
        PropTypes.shape({
          degree: PropTypes.string,
          institution: PropTypes.string,
          dates: PropTypes.string,
          gpa: PropTypes.string,
          location: PropTypes.string,
          description: PropTypes.string,
          coursework: PropTypes.arrayOf(PropTypes.string),
          extracurriculars: PropTypes.arrayOf(PropTypes.string),
        })
      ),
      certifications: PropTypes.arrayOf(PropTypes.string),
      awards: PropTypes.arrayOf(PropTypes.string),
      interests: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
};

export default ResumePage;
