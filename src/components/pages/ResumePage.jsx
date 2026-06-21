import React, { useState, useEffect, useMemo } from 'react';
import { Container, Typography, Box, Button, Card, CardContent, Chip, Stack, Grid, Link, Divider, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import {
  Download,
  Work,
  School,
  Code,
  WorkspacePremium,
  EmojiEvents,
  Interests,
  Place,
  Launch,
  CheckCircleOutline,
  Translate,
} from '@mui/icons-material';
import SectionHeading from '../SectionHeading';
import StatItem from '../StatItem';
import { yearsOfExperience } from '../../utils/experience';

// Shared entrance choreography: one stagger container reveals its children in
// sequence (30–60ms apart) instead of every element animating independently.
const staggerContainer = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// Tracks which section is currently in the upper-middle of the viewport so the
// side nav can highlight it (scrollspy). No-ops gracefully without an
// IntersectionObserver (e.g. jsdom) — the first section stays active.
const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0] ?? '');
  const key = ids.join('|');
  useEffect(() => {
    if (!ids.length || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return active;
};

const scrollToSection = (e, id) => {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
  if (window.history?.replaceState) window.history.replaceState(null, '', `#${id}`);
};

// Sticky in-page navigation (desktop only). Anchors keep the page deep-linkable
// and keyboard-navigable; the active item gets an accent bar + tint.
const SectionNav = ({ sections, activeId, sx }) => {
  const theme = useTheme();
  return (
    <Box component="nav" aria-label="Résumé sections" sx={sx}>
      <Stack spacing={0.5}>
        {sections.map(({ id, label, icon: Icon }) => {
          const active = id === activeId;
          return (
            <Link
              key={id}
              href={`#${id}`}
              onClick={(e) => scrollToSection(e, id)}
              aria-current={active ? 'true' : undefined}
              underline="none"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                px: 1.5,
                py: 1,
                borderRadius: 2,
                fontSize: '0.9rem',
                fontWeight: active ? 700 : 500,
                color: active ? theme.palette.primary.main : theme.palette.text.secondary,
                borderLeft: `2px solid ${active ? theme.palette.primary.main : 'transparent'}`,
                background: active ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                transition: 'color 0.2s ease, background 0.2s ease, border-color 0.2s ease',
                '&:hover': {
                  color: theme.palette.primary.main,
                  background: alpha(theme.palette.primary.main, 0.06),
                },
              }}
            >
              <Icon aria-hidden="true" sx={{ fontSize: '1.1rem' }} />
              {label}
            </Link>
          );
        })}
      </Stack>
    </Box>
  );
};

// Anchor target + consistent vertical rhythm wrapper for each résumé section.
const Section = ({ id, icon, title, children }) => (
  <Box
    component="section"
    id={id}
    sx={{ scrollMarginTop: { xs: '80px', md: '104px' }, mb: { xs: 7, md: 10 }, '&:last-of-type': { mb: 0 } }}
  >
    <SectionHeading icon={icon}>{title}</SectionHeading>
    {children}
  </Box>
);

// A labelled row of chips (Coursework / Activities). Renders nothing when empty.
const LabeledChips = ({ label, items, sx }) => {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <Box sx={sx}>
      <Typography variant="overline" color="text.secondary">{label}</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
        {items.map((item, i) => (
          <Chip key={i} label={item} size="small" variant="outlined" />
        ))}
      </Box>
    </Box>
  );
};

const cardHoverSx = (theme, accent) => ({
  height: '100%',
  transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
  '&:hover': {
    borderColor: accent,
    boxShadow: `0 8px 24px ${alpha(accent, 0.18)}`,
    transform: 'translateY(-2px)',
  },
});

// One unified badge style for the tag-cloud sections (Skills, Languages,
// Interests) so they read as a single consistent system: a softly primary-tinted
// pill with an accent border that lifts and glows on hover.
const badgeChipSx = (theme) => ({
  height: 34,
  px: 0.5,
  fontSize: '0.9rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  background: alpha(theme.palette.primary.main, 0.06),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.22)}`,
  transition: 'transform 0.2s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    borderColor: theme.palette.primary.main,
    background: alpha(theme.palette.primary.main, 0.14),
    boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.22)}`,
  },
});

// Single-rail timeline: one vertical rail on the left with full-width cards, so
// the eye reads straight down instead of zig-zagging across the row.
const ExperienceTimeline = ({ experience }) => {
  const theme = useTheme();
  return (
    <Box
      component={motion.div}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      sx={{ position: 'relative', pl: { xs: '28px', md: '36px' } }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          left: '7px',
          top: '12px',
          bottom: '12px',
          width: '2px',
          background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.main, 0.6)}, ${alpha(theme.palette.secondary.main, 0.6)})`,
        }}
      />
      {experience.map((exp, index) => {
        const achievements = Array.isArray(exp?.achievements) ? exp.achievements : [];
        const technologies = Array.isArray(exp?.technologies) ? exp.technologies : [];
        return (
          <Box
            key={index}
            component={motion.div}
            variants={staggerItem}
            sx={{ position: 'relative', mb: 4, '&:last-of-type': { mb: 0 } }}
          >
            <Box
              aria-hidden="true"
              sx={{
                position: 'absolute',
                left: { xs: '-28px', md: '-36px' },
                top: '16px',
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: theme.palette.background.paper,
                border: `3px solid ${theme.palette.primary.main}`,
                boxShadow: `0 0 12px ${alpha(theme.palette.primary.main, 0.6)}`,
                zIndex: 1,
              }}
            />
            <Card sx={cardHoverSx(theme, theme.palette.primary.main)}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ sm: 'flex-start' }}
                  spacing={1}
                  sx={{ mb: 1 }}
                >
                  <Box>
                    <Typography variant="h5" component="h3" color="primary.main" fontWeight={700}>{exp.role}</Typography>
                    <Typography variant="subtitle1" component="p" fontWeight={600}>{exp.company}</Typography>
                  </Box>
                  {exp.dates && <Chip label={exp.dates} size="small" sx={{ flexShrink: 0 }} />}
                </Stack>
                {exp.location && (
                  <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.secondary', mb: 2 }}>
                    <Place aria-hidden="true" sx={{ fontSize: '1rem' }} />
                    <Typography variant="body2">{exp.location}</Typography>
                  </Stack>
                )}
                <Typography variant="body1" color="text.secondary" sx={{ mb: achievements.length ? 2 : 0, maxWidth: '68ch' }}>
                  {exp.description}
                </Typography>
                {achievements.length > 0 && (
                  <Box sx={{ mb: technologies.length ? 2 : 0 }}>
                    {achievements.map((achievement, i) => (
                      <Stack key={i} direction="row" spacing={1} alignItems="flex-start" sx={{ mb: 1 }}>
                        <CheckCircleOutline aria-hidden="true" sx={{ fontSize: '1.1rem', color: 'primary.main', mt: '3px', flexShrink: 0 }} />
                        <Typography variant="body2" color="text.secondary">{achievement}</Typography>
                      </Stack>
                    ))}
                  </Box>
                )}
                {technologies.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {technologies.map((tech, i) => (
                      <Chip key={i} label={tech} size="small" variant="outlined" />
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
        );
      })}
    </Box>
  );
};

// One education entry. Uses a secondary accent so it reads as distinct from the
// teal-accented experience timeline.
const EducationCard = ({ edu }) => {
  const theme = useTheme();
  const subtitle = [edu?.institution, edu?.location].filter(Boolean).join(' • ');
  const hasActivities = Array.isArray(edu?.extracurriculars) && edu.extracurriculars.length > 0;

  return (
    <Card sx={cardHoverSx(theme, theme.palette.secondary.main)}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" component="h3" color="secondary.main" fontWeight={700} mb={1}>{edu?.degree}</Typography>
        {subtitle && <Typography variant="subtitle1" component="p" fontWeight={600} mb={2}>{subtitle}</Typography>}
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 2 }}>
          {edu?.dates && <Chip label={edu.dates} size="small" />}
          {edu?.gpa && <Chip label={`GPA: ${edu.gpa}`} size="small" color="secondary" variant="outlined" />}
        </Stack>
        {edu?.description && (
          <Typography variant="body2" color="text.secondary" mb={2}>{edu.description}</Typography>
        )}
        <LabeledChips label="Coursework" items={edu?.coursework} sx={{ mb: hasActivities ? 2 : 0 }} />
        <LabeledChips label="Activities" items={edu?.extracurriculars} />
      </CardContent>
    </Card>
  );
};

// Certifications and Awards share the `{ title, certificateLink }` shape, so
// they render through one component, differing only by icon.
const CredentialGrid = ({ items, icon: Icon }) => {
  const theme = useTheme();
  return (
    <Grid
      container
      spacing={3}
      component={motion.div}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {items.map((item, index) => {
        const title = typeof item === 'string' ? item : (item?.title ?? '');
        const certificateLink = typeof item === 'object' ? (item?.certificateLink ?? '') : '';
        return (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`${title}-${index}`} component={motion.div} variants={staggerItem}>
            <Card sx={cardHoverSx(theme, theme.palette.primary.main)}>
              <CardContent sx={{ p: 3, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box aria-hidden="true" sx={{ color: theme.palette.primary.main, display: 'inline-flex', mt: '2px' }}>
                  <Icon />
                </Box>
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography variant="subtitle1" component="p" fontWeight={700}>{title}</Typography>
                  {certificateLink && (
                    <Link
                      href={certificateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View credential: ${title}`}
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.5,
                        mt: 0.5,
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                      }}
                    >
                      View credential <Launch sx={{ fontSize: '1rem' }} />
                    </Link>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

const ResumePage = ({ data }) => {
  const resume = data?.resume ?? {};
  const summary = typeof resume?.summary === 'string' ? resume.summary : '';
  const experience = useMemo(() => (Array.isArray(resume?.experience) ? resume.experience : []), [resume?.experience]);
  const education = Array.isArray(resume?.education) ? resume.education : [];
  const skills = Array.isArray(resume?.skills) ? resume.skills : [];
  const certifications = Array.isArray(resume?.certifications) ? resume.certifications : [];
  const awards = Array.isArray(resume?.awards) ? resume.awards : [];
  const interests = Array.isArray(resume?.interests) ? resume.interests : [];
  const personalInfo = data?.personalInfo ?? {};
  const languages = Array.isArray(personalInfo?.languages) ? personalInfo.languages : [];
  const theme = useTheme();

  const sections = useMemo(() => {
    const list = [];
    if (experience.length) list.push({ id: 'experience', label: 'Experience', icon: Work });
    if (education.length) list.push({ id: 'education', label: 'Education', icon: School });
    if (skills.length) list.push({ id: 'skills', label: 'Skills', icon: Code });
    if (languages.length) list.push({ id: 'languages', label: 'Languages', icon: Translate });
    if (certifications.length) list.push({ id: 'certifications', label: 'Certifications', icon: WorkspacePremium });
    if (awards.length) list.push({ id: 'awards', label: 'Awards', icon: EmojiEvents });
    if (interests.length) list.push({ id: 'interests', label: 'Interests', icon: Interests });
    return list;
  }, [experience.length, education.length, skills.length, languages.length, certifications.length, awards.length, interests.length]);

  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections]);
  const activeId = useActiveSection(sectionIds);

  const stats = useMemo(() => {
    const list = [];
    const years = yearsOfExperience(experience);
    if (years) list.push({ value: `${years}+`, label: years === 1 ? 'Year' : 'Years' });
    if (experience.length) list.push({ value: experience.length, label: experience.length === 1 ? 'Role' : 'Roles' });
    if (skills.length) list.push({ value: skills.length, label: 'Skills' });
    if (certifications.length) list.push({ value: certifications.length, label: certifications.length === 1 ? 'Certification' : 'Certifications' });
    return list;
  }, [experience, skills.length, certifications.length]);

  return (
    <Box sx={{ minHeight: '100vh', pt: { xs: 10, md: 12 }, pb: 8 }}>
      <Container maxWidth="lg">

        {/* Intro band */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ mb: { xs: 6, md: 9 } }}
        >
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { sm: 'center' },
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 3,
            mb: summary || stats.length ? 3 : 0,
          }}>
            <Typography variant="h2" component="h1" sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800,
              background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Résumé
            </Typography>
            {resume.cvDownload && (
              <Button
                variant="contained"
                startIcon={<Download />}
                href={resume.cvDownload}
                download
                aria-label="Download CV as PDF"
                sx={{
                  flexShrink: 0,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  color: theme.palette.getContrastText(theme.palette.primary.main),
                  px: 4, py: 1.5,
                }}
              >
                Download CV
              </Button>
            )}
          </Box>

          {summary && (
            <Typography variant="h6" component="p" sx={{ fontWeight: 400, color: 'text.secondary', lineHeight: 1.8, maxWidth: '65ch' }}>
              {summary}
            </Typography>
          )}

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

        {/* Sticky section nav + content */}
        <Box sx={{ display: 'flex', gap: { md: 6 }, alignItems: 'flex-start' }}>
          {sections.length > 1 && (
            <SectionNav
              sections={sections}
              activeId={activeId}
              sx={{
                display: { xs: 'none', md: 'block' },
                position: 'sticky',
                top: 104,
                flex: '0 0 184px',
                width: 184,
              }}
            />
          )}

          <Box sx={{ flexGrow: 1, minWidth: 0, width: '100%' }}>
            {experience.length > 0 && (
              <Section id="experience" icon={Work} title="Experience">
                <ExperienceTimeline experience={experience} />
              </Section>
            )}

            {education.length > 0 && (
              <Section id="education" icon={School} title="Education">
                <Grid
                  container
                  spacing={3}
                  component={motion.div}
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                >
                  {education.map((edu, index) => (
                    <Grid size={{ xs: 12, md: 6 }} key={index} component={motion.div} variants={staggerItem}>
                      <EducationCard edu={edu} />
                    </Grid>
                  ))}
                </Grid>
              </Section>
            )}

            {skills.length > 0 && (
              <Section id="skills" icon={Code} title="Technical Arsenal">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25 }}>
                  {skills.map((skill, index) => (
                    <Chip key={index} label={skill} sx={badgeChipSx(theme)} />
                  ))}
                </Box>
              </Section>
            )}

            {languages.length > 0 && (
              <Section id="languages" icon={Translate} title="Languages">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25 }}>
                  {languages.map((language, index) => (
                    <Chip key={index} label={language} sx={badgeChipSx(theme)} />
                  ))}
                </Box>
              </Section>
            )}

            {certifications.length > 0 && (
              <Section id="certifications" icon={WorkspacePremium} title="Certifications">
                <CredentialGrid items={certifications} icon={WorkspacePremium} />
              </Section>
            )}

            {awards.length > 0 && (
              <Section id="awards" icon={EmojiEvents} title="Awards">
                <CredentialGrid items={awards} icon={EmojiEvents} />
              </Section>
            )}

            {interests.length > 0 && (
              <Section id="interests" icon={Interests} title="Interests">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25 }}>
                  {interests.map((interest, index) => (
                    <Chip key={index} label={interest} sx={badgeChipSx(theme)} />
                  ))}
                </Box>
              </Section>
            )}
          </Box>
        </Box>

      </Container>
    </Box>
  );
};

export default ResumePage;
