import React, { useMemo } from 'react';
import { Container, Typography, Box, Button, Avatar, Grid, Card, useTheme, Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { GitHub, LinkedIn, WorkOutline, FolderSpecial, EmojiObjects } from '@mui/icons-material';

const calculateYearsOfExperience = (experience) => {
  if (!Array.isArray(experience) || experience.length === 0) return 0;
  const years = experience
    .map((exp) => {
      const match = String(exp?.dates || '').match(/\d{4}/);
      return match ? parseInt(match[0], 10) : null;
    })
    .filter((y) => y !== null);
  if (years.length === 0) return 0;
  const earliest = Math.min(...years);
  const current = new Date().getFullYear();
  return Math.max(0, current - earliest);
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
      delay: i * 0.1,
    },
  }),
};

const HomePage = ({ data }) => {
  const theme = useTheme();

  const personalInfo = data?.personalInfo ?? {};
  const name = personalInfo?.name ?? 'Your Name';
  const title = personalInfo?.title ?? '';
  const bio = personalInfo?.bio ?? '';
  const linkedin = personalInfo?.linkedin ?? '';
  const github = personalInfo?.github ?? '';
  const photo = personalInfo?.photo ?? '';

  const yearsExperience = useMemo(() => calculateYearsOfExperience(data?.resume?.experience), [data?.resume?.experience]);
  const skillsCount = Array.isArray(data?.resume?.skills) ? data.resume.skills.length : 0;
  const projectsCount = Array.isArray(data?.projects) ? data.projects.length : 0;

  const primarySoft = alpha(theme.palette.primary.main, 0.1);
  const secondarySoft = alpha(theme.palette.secondary.main, 0.1);

  const stats = useMemo(() => [
    {
      value: `${yearsExperience}+`,
      label: 'Years Experience',
      icon: WorkOutline,
      color: theme.palette.primary.main,
      bg: primarySoft,
      glow: theme.palette.primary.main,
    },
    {
      value: `${projectsCount}+`,
      label: 'Projects Completed',
      icon: FolderSpecial,
      color: theme.palette.secondary.main,
      bg: secondarySoft,
      glow: theme.palette.secondary.main,
    },
    {
      value: `${skillsCount}+`,
      label: 'Technologies Mastered',
      icon: EmojiObjects,
      color: theme.palette.primary.main,
      bg: primarySoft,
      glow: theme.palette.primary.main,
    },
  ], [yearsExperience, projectsCount, skillsCount, theme]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Box sx={{ pb: 8 }}>
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        pt: { xs: 8, md: 0 },
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">

            <Grid size={{ xs: 12, md: 7 }}>
              <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible" sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <motion.div variants={textVariants}>
                  <Typography variant="h6" color="primary.main" sx={{ mb: 2, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 700 }}>
                    Welcome to my universe
                  </Typography>
                </motion.div>

                <motion.div variants={textVariants}>
                  <Typography variant="h1" sx={{
                    background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 2,
                    textShadow: theme.palette.mode === 'dark' ? '0 2px 10px rgba(0,0,0,0.5)' : 'none',
                  }}>
                    I'm {name}
                  </Typography>
                </motion.div>

                <motion.div variants={textVariants}>
                  <Typography variant="h4" color="secondary.light" sx={{ mb: 4, fontWeight: 600 }}>
                    {title}
                  </Typography>
                </motion.div>

                <motion.div variants={textVariants}>
                  <Typography variant="h6" color="text.secondary" paragraph sx={{ fontWeight: 400, fontSize: '1.2rem', mb: 6, maxWidth: 650, lineHeight: 1.8 }}>
                    {bio}
                  </Typography>
                </motion.div>

                <motion.div variants={textVariants}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
                    {linkedin && (
                      <Button
                        variant="contained"
                        startIcon={<LinkedIn />}
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open LinkedIn profile in a new tab"
                        sx={{
                          py: 1.5, px: 4, fontSize: '1.1rem',
                          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                          color: theme.palette.getContrastText(theme.palette.primary.main),
                          boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.25)}`,
                          '&:hover': { boxShadow: `0 8px 30px ${alpha(theme.palette.primary.main, 0.4)}` },
                        }}
                      >
                        LinkedIn
                      </Button>
                    )}
                    {github && (
                      <Button
                        variant="outlined"
                        startIcon={<GitHub />}
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open GitHub profile in a new tab"
                        sx={{
                          py: 1.5, px: 4, fontSize: '1.1rem',
                          borderColor: theme.palette.text.primary,
                          color: theme.palette.text.primary,
                          '&:hover': { borderColor: theme.palette.primary.main, color: theme.palette.primary.main },
                        }}
                      >
                        GitHub
                      </Button>
                    )}
                  </Stack>
                </motion.div>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', justifyContent: 'center', perspective: 1000 }}>
              <Box
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                sx={{
                  width: { xs: 300, md: 400 },
                  height: { xs: 300, md: 400 },
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <motion.div
                  style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute', inset: -40, borderRadius: '50%',
                      background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.4)} 0%, transparent 70%)`,
                      filter: 'blur(30px)', zIndex: -1, transform: 'translateZ(-50px)',
                    }}
                  />

                  <Box sx={{
                    position: 'absolute', top: 20, right: 0,
                    display: 'flex', alignItems: 'center', gap: 1,
                    background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.85)',
                    px: 2, py: 1, borderRadius: 4, backdropFilter: 'blur(10px)',
                    border: `1px solid ${theme.palette.divider}`,
                    zIndex: 2, transform: 'translateZ(50px)',
                  }}>
                    <Box
                      component={motion.span}
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#00e676', boxShadow: '0 0 10px #00e676', display: 'inline-block' }}
                    />
                    <Typography variant="caption" fontWeight={700}>Available</Typography>
                  </Box>

                  <Avatar
                    src={photo}
                    alt={`Portrait of ${name}`}
                    sx={{
                      width: { xs: 260, md: 340 },
                      height: { xs: 260, md: 340 },
                      border: `4px solid ${theme.palette.divider}`,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    }}
                  />
                </motion.div>
              </Box>
            </Grid>

          </Grid>
        </Container>

      </Box>

      <Container maxWidth="lg" sx={{ mt: { xs: -4, md: -8 }, position: 'relative', zIndex: 10 }}>
        <Grid container spacing={3} alignItems="stretch">
          {stats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <Grid key={i} size={{ xs: 12, md: 4 }}>
                <Card
                  component={motion.div}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    boxShadow: theme.palette.mode === 'dark' 
                      ? `0 16px 36px ${alpha(stat.glow, 0.15)}` 
                      : `0 16px 36px ${alpha(stat.glow, 0.08)}`,
                    borderColor: alpha(stat.color, 0.35),
                  }}
                  sx={{
                    p: { xs: 3, md: 4 },
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 4,
                    background: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.45)' : 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(16px)',
                    border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.06)',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
                    '&:hover .icon-container': {
                      transform: 'scale(1.1) rotate(5deg)',
                      background: alpha(stat.color, 0.25),
                      boxShadow: `0 0 20px ${alpha(stat.color, 0.4)}`,
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, width: '100%' }}>
                    <Box
                      className="icon-container"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 56,
                        height: 56,
                        borderRadius: '16px',
                        background: stat.bg,
                        color: stat.color,
                        flexShrink: 0,
                        border: `1px solid ${alpha(stat.color, 0.2)}`,
                        boxShadow: `0 4px 12px ${alpha(stat.color, 0.05)}`,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      <IconComponent sx={{ fontSize: 28 }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="h3"
                        fontWeight={900}
                        sx={{
                          fontFamily: '"Outfit", sans-serif',
                          background: `linear-gradient(135deg, ${stat.color} 0%, ${alpha(stat.color, 0.85)} 100%)`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          textShadow: theme.palette.mode === 'dark' ? `0 0 25px ${alpha(stat.color, 0.25)}` : 'none',
                          lineHeight: 1.1,
                          mb: 0.5,
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        sx={{
                          color: theme.palette.text.primary,
                          opacity: 0.9,
                          letterSpacing: '0.01em',
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
