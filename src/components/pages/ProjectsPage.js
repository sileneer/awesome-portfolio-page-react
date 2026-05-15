import React, { useMemo, useState } from 'react';
import { Container, Typography, Box, Grid, Chip, Button, useTheme, Modal, IconButton, Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { Launch, GitHub, Close, ChevronLeft, ChevronRight, FilterList } from '@mui/icons-material';

const ProjectsPage = ({ data }) => {
  const projects = useMemo(
    () => (Array.isArray(data?.projects) ? data.projects : []),
    [data?.projects],
  );
  const theme = useTheme();

  const [activeFilter, setActiveFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState(null);
  const [modalIndex, setModalIndex] = useState(0);

  const allTechnologies = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => (p?.technologies || []).forEach((t) => set.add(t)));
    return ['All', ...Array.from(set).sort()];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((p) => Array.isArray(p?.technologies) && p.technologies.includes(activeFilter));
  }, [projects, activeFilter]);

  const handleOpenModal = (project, startIndex = 0) => {
    setModalProject(project);
    setModalIndex(startIndex);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalProject(null);
    setModalIndex(0);
  };

  const handleNextImage = () => {
    if (!modalProject) return;
    const count = modalProject.screenshots?.length || 0;
    if (count > 0) setModalIndex((i) => (i + 1) % count);
  };

  const handlePrevImage = () => {
    if (!modalProject) return;
    const count = modalProject.screenshots?.length || 0;
    if (count > 0) setModalIndex((i) => (i - 1 + count) % count);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') handleNextImage();
    if (e.key === 'ArrowLeft') handlePrevImage();
    if (e.key === 'Escape') handleCloseModal();
  };

  return (
    <Box sx={{ minHeight: '100vh', pt: { xs: 10, md: 12 }, pb: 8 }}>
      <Container maxWidth="lg">

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Typography variant="h2" sx={{
            fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800, mb: 4,
            background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.secondary.main} 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Featured Projects
          </Typography>
        </motion.div>

        {allTechnologies.length > 1 && (
          <Box sx={{ mb: 6 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2, color: 'text.secondary' }}>
              <FilterList fontSize="small" />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>Filter by technology</Typography>
            </Stack>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }} role="group" aria-label="Project technology filters">
              {allTechnologies.map((tech) => {
                const isActive = activeFilter === tech;
                return (
                  <Chip
                    key={tech}
                    label={tech}
                    clickable
                    onClick={() => setActiveFilter(tech)}
                    aria-pressed={isActive}
                    sx={{
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? theme.palette.getContrastText(theme.palette.primary.main) : theme.palette.text.primary,
                      background: isActive ? theme.palette.primary.main : undefined,
                      borderColor: isActive ? theme.palette.primary.main : undefined,
                      '&:hover': {
                        background: isActive ? theme.palette.primary.dark : alpha(theme.palette.primary.main, 0.12),
                      },
                    }}
                  />
                );
              })}
            </Box>
          </Box>
        )}

        {filteredProjects.length === 0 ? (
          <Typography color="text.secondary">No projects match this filter.</Typography>
        ) : (
          <Grid container spacing={4} component={motion.div} layout>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const name = project?.name ?? 'Untitled';
                const description = project?.description ?? '';
                const screenshots = Array.isArray(project?.screenshots) ? project.screenshots : [];
                const technologies = Array.isArray(project?.technologies) ? project.technologies : [];
                const link = project?.link ?? '';

                return (
                  <Grid
                    size={{ xs: 12, md: 6 }}
                    key={`${name}-${index}`}
                    component={motion.div}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, type: 'spring' }}
                  >
                    <motion.div
                      whileHover={{ y: -6 }}
                      style={{ height: '100%' }}
                    >
                    <Box sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 4,
                      overflow: 'hidden',
                      background: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.9)',
                      border: `1px solid ${theme.palette.divider}`,
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        borderColor: theme.palette.secondary.main,
                        boxShadow: `0 8px 24px ${alpha(theme.palette.secondary.main, 0.15)}`,
                      },
                    }}>
                      {screenshots.length > 0 && (
                        <Box
                          sx={{
                            position: 'relative',
                            height: 250,
                            overflow: 'hidden',
                            cursor: 'pointer',
                            '&:hover img': { filter: 'brightness(1.05)' },
                          }}
                          onClick={() => handleOpenModal(project, 0)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpenModal(project, 0); } }}
                          aria-label={`Open screenshots for ${name}`}
                        >
                          <img
                            src={screenshots[0]}
                            alt={`${name} screenshot`}
                            loading="lazy"
                            style={{
                              width: '100%', height: '100%', objectFit: 'cover',
                              transition: 'filter 0.3s ease',
                            }}
                          />
                          {screenshots.length > 1 && (
                            <Chip
                              size="small"
                              label={`+${screenshots.length - 1} more`}
                              sx={{
                                position: 'absolute',
                                bottom: 12,
                                right: 12,
                                background: 'rgba(0,0,0,0.6)',
                                color: '#fff',
                                fontWeight: 600,
                              }}
                            />
                          )}
                        </Box>
                      )}

                      <Box sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>{name}</Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>{description}</Typography>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                          {technologies.map((tech, i) => (
                            <Chip
                              key={i}
                              label={tech}
                              size="small"
                              variant="outlined"
                              sx={{ color: theme.palette.primary.main, borderColor: alpha(theme.palette.primary.main, 0.4) }}
                            />
                          ))}
                        </Box>

                        {link && (
                          <Button
                            variant="outlined"
                            startIcon={link.includes('github.com') ? <GitHub /> : <Launch />}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${link.includes('github.com') ? 'View source code' : 'Open live demo'} of ${name} in a new tab`}
                            sx={{
                              alignSelf: 'flex-start',
                              borderColor: theme.palette.divider,
                              color: theme.palette.text.primary,
                              '&:hover': { borderColor: theme.palette.text.primary },
                            }}
                          >
                            {link.includes('github.com') ? 'View Code' : 'Live Demo'}
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              );
            })}
            </AnimatePresence>
          </Grid>
        )}

        <AnimatePresence>
          {modalOpen && modalProject && (
            <Modal
              open={modalOpen}
              onClose={handleCloseModal}
              aria-labelledby="project-modal-title"
              onKeyDown={handleKeyDown}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}
            >
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                <Box sx={{ position: 'relative', maxWidth: '95vw', maxHeight: '95vh', outline: 'none' }}>
                  <Typography
                    id="project-modal-title"
                    sx={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}
                  >
                    {modalProject.name} screenshot {modalIndex + 1} of {modalProject.screenshots?.length || 1}
                  </Typography>

                  <IconButton
                    onClick={handleCloseModal}
                    aria-label="Close screenshot viewer"
                    sx={{
                      position: 'absolute',
                      top: -16,
                      right: -16,
                      backgroundColor: '#000',
                      color: '#fff',
                      zIndex: 2,
                      '&:hover': { backgroundColor: theme.palette.error.main },
                    }}
                  >
                    <Close />
                  </IconButton>

                  {(modalProject.screenshots?.length || 0) > 1 && (
                    <>
                      <IconButton
                        onClick={handlePrevImage}
                        aria-label="Previous screenshot"
                        sx={{
                          position: 'absolute',
                          left: -16,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          color: '#fff',
                          zIndex: 2,
                          '&:hover': { backgroundColor: theme.palette.primary.main, color: theme.palette.getContrastText(theme.palette.primary.main) },
                        }}
                      >
                        <ChevronLeft />
                      </IconButton>
                      <IconButton
                        onClick={handleNextImage}
                        aria-label="Next screenshot"
                        sx={{
                          position: 'absolute',
                          right: -16,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          color: '#fff',
                          zIndex: 2,
                          '&:hover': { backgroundColor: theme.palette.primary.main, color: theme.palette.getContrastText(theme.palette.primary.main) },
                        }}
                      >
                        <ChevronRight />
                      </IconButton>
                    </>
                  )}

                  <img
                    src={modalProject.screenshots?.[modalIndex]}
                    alt={`${modalProject.name} screenshot ${modalIndex + 1}`}
                    style={{ maxWidth: '95vw', maxHeight: '90vh', borderRadius: 8, display: 'block' }}
                  />

                  {(modalProject.screenshots?.length || 0) > 1 && (
                    <Box sx={{
                      position: 'absolute',
                      bottom: 12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      px: 2,
                      py: 0.5,
                      borderRadius: 4,
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                    }}>
                      {modalIndex + 1} / {modalProject.screenshots.length}
                    </Box>
                  )}
                </Box>
              </motion.div>
            </Modal>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default ProjectsPage;
