import React, { useMemo, useState } from 'react';
import { Container, Typography, Box, Grid, Chip, Button, Stack, Divider, Dialog, IconButton, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { Launch, GitHub, Close, ChevronLeft, ChevronRight, FilterList, Person, Schedule, Visibility } from '@mui/icons-material';
import StatItem from '../StatItem';

const MAX_CARD_TECH = 5;

const isGithubLink = (link) => typeof link === 'string' && link.includes('github.com');

// Role · duration meta row, shared by the card and the detail dialog.
const ProjectMeta = ({ role, duration, sx }) => {
  if (!role && !duration) return null;
  return (
    <Stack direction="row" spacing={2.5} useFlexGap flexWrap="wrap" sx={{ color: 'text.secondary', ...sx }}>
      {role && (
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Person aria-hidden="true" fontSize="small" />
          <Typography variant="body2" fontWeight={600}>{role}</Typography>
        </Stack>
      )}
      {duration && (
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Schedule aria-hidden="true" fontSize="small" />
          <Typography variant="body2">{duration}</Typography>
        </Stack>
      )}
    </Stack>
  );
};

const ProjectCard = ({ project, onOpen }) => {
  const theme = useTheme();
  const name = project?.name ?? 'Untitled';
  const description = project?.description ?? '';
  const screenshots = Array.isArray(project?.screenshots) ? project.screenshots : [];
  const technologies = Array.isArray(project?.technologies) ? project.technologies : [];
  const link = project?.link ?? '';
  const shownTech = technologies.slice(0, MAX_CARD_TECH);
  const extraTech = technologies.length - shownTech.length;

  return (
    <Box
      component={motion.div}
      whileHover={{ y: -6 }}
      sx={{ height: '100%' }}
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
          boxShadow: `0 12px 28px ${alpha(theme.palette.secondary.main, 0.18)}`,
        },
        '&:hover .project-media img': { transform: 'scale(1.05)' },
        '&:hover .project-overlay': { opacity: 1 },
      }}>
        {screenshots.length > 0 && (
          <Box
            className="project-media"
            onClick={() => onOpen(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(project); } }}
            aria-label={`View screenshots of ${name}`}
            sx={{ position: 'relative', height: 230, overflow: 'hidden', cursor: 'pointer' }}
          >
            <img
              src={screenshots[0]}
              alt={`${name} screenshot`}
              loading="lazy"
              width="600"
              height="230"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
            />
            <Box
              className="project-overlay"
              aria-hidden="true"
              sx={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1,
                color: '#fff', fontWeight: 700,
                background: `linear-gradient(to top, ${alpha('#000', 0.65)}, ${alpha('#000', 0.15)})`,
                opacity: 0, transition: 'opacity 0.3s ease', pointerEvents: 'none',
              }}
            >
              <Visibility fontSize="small" /> View details
            </Box>
            {screenshots.length > 1 && (
              <Chip
                size="small"
                label={`+${screenshots.length - 1} more`}
                sx={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(0,0,0,0.6)', color: '#fff', fontWeight: 600 }}
              />
            )}
          </Box>
        )}

        <Box sx={{ p: { xs: 3, md: 4 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" component="h2" sx={{ mb: 1, fontWeight: 700 }}>{name}</Typography>
          <ProjectMeta role={project?.role} duration={project?.duration} sx={{ mb: 2 }} />
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: 3, flexGrow: 1,
              // Clamp only when the image can open the modal for the full text;
              // otherwise show everything so nothing is unreachable.
              ...(screenshots.length > 0
                ? { display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }
                : {}),
            }}
          >
            {description}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {shownTech.map((tech, i) => (
              <Chip
                key={i}
                label={tech}
                size="small"
                variant="outlined"
                sx={{ color: theme.palette.primary.main, borderColor: alpha(theme.palette.primary.main, 0.4) }}
              />
            ))}
            {extraTech > 0 && (
              <Chip label={`+${extraTech}`} size="small" variant="outlined" sx={{ color: 'text.secondary' }} />
            )}
          </Box>

          {link && (
            <Box sx={{ mt: 'auto' }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={isGithubLink(link) ? <GitHub /> : <Launch />}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${isGithubLink(link) ? 'View source code' : 'Open live demo'} of ${name} in a new tab`}
                sx={{ borderColor: theme.palette.divider, color: theme.palette.text.primary, '&:hover': { borderColor: theme.palette.text.primary } }}
              >
                {isGithubLink(link) ? 'View Code' : 'Live Demo'}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

// Rich detail dialog: gallery on one side, project context on the other.
const ProjectDialog = ({ project, index, open, onClose, onExited, onNext, onPrev, onKeyDown }) => {
  const theme = useTheme();
  if (!project) return null;
  const screenshots = Array.isArray(project.screenshots) ? project.screenshots : [];
  const technologies = Array.isArray(project.technologies) ? project.technologies : [];
  const link = project.link ?? '';
  const hasGallery = screenshots.length > 0;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      onKeyDown={onKeyDown}
      aria-labelledby="project-dialog-title"
      TransitionProps={{ onExited }}
      PaperProps={{ sx: { borderRadius: 4, overflow: 'hidden', position: 'relative', width: '100%', m: { xs: 2, md: 4 } } }}
    >
      <IconButton
        onClick={onClose}
        aria-label="Close project details"
        sx={{
          position: 'absolute', top: 8, right: 8, zIndex: 3,
          backgroundColor: alpha('#000', 0.5), color: '#fff',
          '&:hover': { backgroundColor: theme.palette.error.main },
        }}
      >
        <Close />
      </IconButton>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        {hasGallery && (
          <Box sx={{
            position: 'relative', flex: { md: '1 1 62%' },
            backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center',
            minHeight: { xs: 240, md: 520 },
          }}>
            <img
              src={screenshots[index]}
              alt={`${project.name} screenshot ${index + 1}`}
              style={{ width: '100%', height: '100%', maxHeight: '82vh', objectFit: 'contain', display: 'block' }}
            />
            {screenshots.length > 1 && (
              <>
                <IconButton
                  onClick={onPrev}
                  aria-label="Previous screenshot"
                  sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', '&:hover': { backgroundColor: theme.palette.primary.main } }}
                >
                  <ChevronLeft />
                </IconButton>
                <IconButton
                  onClick={onNext}
                  aria-label="Next screenshot"
                  sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', '&:hover': { backgroundColor: theme.palette.primary.main } }}
                >
                  <ChevronRight />
                </IconButton>
                <Box sx={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', px: 1.5, py: 0.5, borderRadius: 4, backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff', fontWeight: 600, fontSize: '0.8rem' }}>
                  {index + 1} / {screenshots.length}
                </Box>
              </>
            )}
          </Box>
        )}

        <Box sx={{
          flex: { md: '1 1 38%' }, p: { xs: 3, md: 4 },
          display: 'flex', flexDirection: 'column', gap: 2,
          maxHeight: { md: '82vh' }, overflowY: 'auto',
        }}>
          <Box>
            <Typography id="project-dialog-title" variant="h4" component="h2" fontWeight={800} sx={{ mb: 1 }}>
              {project.name}
            </Typography>
            <ProjectMeta role={project.role} duration={project.duration} />
          </Box>

          <Typography variant="body1" color="text.secondary">{project.description}</Typography>

          {technologies.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {technologies.map((tech, i) => (
                <Chip key={i} label={tech} size="small" variant="outlined" sx={{ color: theme.palette.primary.main, borderColor: alpha(theme.palette.primary.main, 0.4) }} />
              ))}
            </Box>
          )}

          {link && (
            <Button
              variant="contained"
              startIcon={isGithubLink(link) ? <GitHub /> : <Launch />}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${isGithubLink(link) ? 'View source code' : 'Open live demo'} of ${project.name} in a new tab`}
              sx={{
                alignSelf: 'flex-start', mt: 'auto',
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: theme.palette.getContrastText(theme.palette.primary.main),
                px: 3,
              }}
            >
              {isGithubLink(link) ? 'View Code' : 'Live Demo'}
            </Button>
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

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

  const techCount = allTechnologies.length - 1;

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
  };

  // Clear the project only after the dialog's close transition finishes, so the
  // content doesn't vanish mid-animation.
  const handleDialogExited = () => {
    setModalProject(null);
    setModalIndex(0);
  };

  const handleNextImage = () => {
    const count = modalProject?.screenshots?.length || 0;
    if (count > 0) setModalIndex((i) => (i + 1) % count);
  };

  const handlePrevImage = () => {
    const count = modalProject?.screenshots?.length || 0;
    if (count > 0) setModalIndex((i) => (i - 1 + count) % count);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') handleNextImage();
    if (e.key === 'ArrowLeft') handlePrevImage();
  };

  const stats = [];
  if (projects.length) stats.push({ value: projects.length, label: projects.length === 1 ? 'Project' : 'Projects' });
  if (techCount > 0) stats.push({ value: techCount, label: techCount === 1 ? 'Technology' : 'Technologies' });

  return (
    <Box sx={{ minHeight: '100vh', pt: { xs: 10, md: 12 }, pb: 8 }}>
      <Container maxWidth="lg">

        {/* Intro band */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ mb: { xs: 5, md: 7 } }}
        >
          <Typography variant="h2" component="h1" sx={{
            fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800, mb: 2,
            background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Featured Projects
          </Typography>
          <Typography variant="h6" component="p" sx={{ fontWeight: 400, color: 'text.secondary', maxWidth: '60ch' }}>
            Selected projects and the technologies behind them.
          </Typography>
          {stats.length > 0 && (
            <Stack
              direction="row"
              spacing={{ xs: 3, md: 5 }}
              useFlexGap
              flexWrap="wrap"
              divider={<Divider orientation="vertical" flexItem />}
              sx={{ mt: 4 }}
            >
              {stats.map((stat, i) => (
                <StatItem key={i} value={stat.value} label={stat.label} />
              ))}
            </Stack>
          )}
        </Box>

        {/* Filter */}
        {allTechnologies.length > 1 && (
          <Box sx={{ mb: 4 }}>
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
                      '&:hover': { background: isActive ? theme.palette.primary.dark : alpha(theme.palette.primary.main, 0.12) },
                    }}
                  />
                );
              })}
            </Box>
            {activeFilter !== 'All' && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Showing {filteredProjects.length} of {projects.length} projects
              </Typography>
            )}
          </Box>
        )}

        {filteredProjects.length === 0 ? (
          <Typography color="text.secondary">No projects match this filter.</Typography>
        ) : (
          <Grid container spacing={4} component={motion.div} layout>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <Grid
                  size={{ xs: 12, md: 6 }}
                  key={`${project?.name ?? 'project'}-${index}`}
                  component={motion.div}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 90, damping: 16, delay: Math.min(index * 0.05, 0.3) }}
                >
                  <ProjectCard project={project} onOpen={handleOpenModal} />
                </Grid>
              ))}
            </AnimatePresence>
          </Grid>
        )}

        <ProjectDialog
          project={modalProject}
          index={modalIndex}
          open={modalOpen}
          onClose={handleCloseModal}
          onExited={handleDialogExited}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
          onKeyDown={handleKeyDown}
        />
      </Container>
    </Box>
  );
};

export default ProjectsPage;
