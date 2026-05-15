import React from 'react';
import { Container, Typography, Box, Button, Card, CardContent, Chip, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Download } from '@mui/icons-material';

const ResumePage = ({ data }) => {
  const resume = data?.resume ?? {};
  const experience = Array.isArray(resume?.experience) ? resume.experience : [];
  const skills = Array.isArray(resume?.skills) ? resume.skills : [];
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', pt: { xs: 10, md: 12 }, pb: 8 }}>
      <Container maxWidth="lg">

        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 8,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 3,
        }}>
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <Typography variant="h2" sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800,
              background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Experience
            </Typography>
          </motion.div>
          {resume.cvDownload && (
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Button
                variant="contained"
                startIcon={<Download />}
                href={resume.cvDownload}
                download
                aria-label="Download CV as PDF"
                sx={{
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  color: theme.palette.getContrastText(theme.palette.primary.main),
                  px: 4, py: 1.5,
                }}
              >
                Download CV
              </Button>
            </motion.div>
          )}
        </Box>

        <Box sx={{ position: 'relative' }}>
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              left: { xs: '12px', md: '50%' },
              top: 0,
              bottom: 0,
              width: '2px',
              background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.main, 0.5)}, ${alpha(theme.palette.secondary.main, 0.5)})`,
              transform: { md: 'translateX(-50%)' },
            }}
          />

          {experience.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: { xs: 'flex-start', md: isEven ? 'flex-start' : 'flex-end' },
                  mb: 6,
                  pl: { xs: '40px', md: 0 },
                }}
              >
                <Box
                  aria-hidden="true"
                  sx={{
                    position: 'absolute',
                    left: { xs: '12px', md: '50%' },
                    top: 24,
                    transform: 'translate(-50%, -50%)',
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: theme.palette.primary.main,
                    boxShadow: `0 0 16px ${theme.palette.primary.main}`,
                    zIndex: 1,
                  }}
                />

                <Box
                  component={motion.div}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, type: 'spring' }}
                  sx={{
                    width: { xs: '100%', md: 'calc(50% - 40px)' },
                  }}
                >
                  <Card sx={{
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.25)}`,
                    },
                  }}>
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h5" color="primary.main" fontWeight={700} mb={1}>{exp.role}</Typography>
                      <Typography variant="h6" mb={2}>{exp.company}</Typography>
                      <Chip label={exp.dates} size="small" sx={{ mb: 2 }} />
                      <Typography variant="body1" color="text.secondary" mb={2}>{exp.description}</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {exp.technologies?.map((tech, i) => (
                          <Chip key={i} label={tech} size="small" variant="outlined" />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            );
          })}
        </Box>

        <Box sx={{ mt: 10 }}>
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, fontWeight: 800 }}>Technical Arsenal</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.03, 0.6) }}
              >
                <Chip
                  label={skill}
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    py: 2,
                    px: 1,
                    fontSize: '1.1rem',
                    '&:hover': {
                      borderColor: theme.palette.secondary.main,
                      background: alpha(theme.palette.secondary.main, 0.1),
                      boxShadow: `0 0 15px ${alpha(theme.palette.secondary.main, 0.35)}`,
                    },
                  }}
                />
              </motion.div>
            ))}
          </Box>
        </Box>

      </Container>
    </Box>
  );
};

export default ResumePage;
