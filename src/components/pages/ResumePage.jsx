import React, { useState, useMemo } from 'react';
import { Container, Typography, Box, Button, Card, CardContent, Chip, Stack, Grid, Link, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import {
  Download,
  Briefcase,
  Building2,
  GraduationCap,
  Code,
  Award,
  Trophy,
  Sparkles,
  MapPin,
  ExternalLink,
  CircleCheck,
  Languages,
} from 'lucide';
import AppIcon from '../AppIcon';
import SectionHeading from '../SectionHeading';
import StatBand from '../ui/StatBand';
import Label from '../ui/Label';
import InPageNav from '../ui/InPageNav';
import PageIntro from '../PageIntro';
import { yearsOfExperience } from '../../utils/experience';
import { resolveAsset } from '../../utils/assets';
import { cardHover, gradientCta } from '../../theme/variants';
import { radius, iconSize, touchTarget, buttonHeight, sectionGap, pagePaddingTop } from '../../theme/tokens';

// Shared entrance choreography: one stagger container reveals its children in
// sequence instead of every element animating independently.
const staggerContainer = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// Anchor target + consistent vertical rhythm wrapper for each résumé section.
const Section = ({ id, icon, title, children }) => (
  <Box
    component="section"
    id={id}
    sx={{ scrollMarginTop: { xs: '80px', md: '104px' }, mb: sectionGap, '&:last-of-type': { mb: 0 } }}
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
      <Label component="p">{label}</Label>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
        {items.map((item, i) => (
          <Chip key={i} label={item} size="small" variant="outlined" />
        ))}
      </Box>
    </Box>
  );
};

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

// Keep a stable tile when an optional logo fails; a new source can load again.
const CompanyLogo = ({ source, company }) => {
  const [failedSource, setFailedSource] = useState(null);
  const url = resolveAsset(source);
  return (
    <Box sx={{ width: 48, height: 48, flexShrink: 0, border: 1, borderColor: 'divider', borderRadius: radius.sm,
      overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'action.hover', color: 'primary.main' }}>
      {failedSource === url ? <AppIcon icon={Building2} size={iconSize.heading} /> : (
        <Box component="img" src={url} alt={`${company} logo`} width={48} height={48} loading="lazy" decoding="async"
          onError={() => setFailedSource(url)} sx={{ width: '100%', height: '100%', objectFit: 'contain', p: 0.75, bgcolor: '#fff' }} />
      )}
    </Box>
  );
};

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
            <Card sx={{ ...cardHover(theme, theme.palette.primary.main) }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1}
                  sx={{ mb: 1, justifyContent: 'space-between', alignItems: { sm: 'flex-start' } }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, minWidth: 0 }}>
                    {exp.logo && <CompanyLogo source={exp.logo} company={exp.company} />}
                    <Box sx={{ minWidth: 0, overflowWrap: 'anywhere' }}>
                      <Typography variant="h5" component="h3" sx={{ color: 'primary.main', fontWeight: 700 }}>{exp.role}</Typography>
                      <Typography variant="subtitle1" component="p" fontWeight={600}>{exp.company}</Typography>
                    </Box>
                  </Box>
                  {exp.dates && <Chip label={exp.dates} size="small" sx={{ flexShrink: 0 }} />}
                </Stack>
                {exp.location && (
                  <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: 'text.secondary', mb: 2 }}>
                    <AppIcon icon={MapPin} size={iconSize.inline} />
                    <Typography variant="body2">{exp.location}</Typography>
                  </Stack>
                )}
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: achievements.length ? 2 : 0, maxWidth: '68ch' }}>
                  {exp.description}
                </Typography>
                {achievements.length > 0 && (
                  <Box sx={{ mb: technologies.length ? 2 : 0 }}>
                    {achievements.map((achievement, i) => (
                      <Stack key={i} direction="row" spacing={1} sx={{ alignItems: 'flex-start', mb: 1 }}>
                        <AppIcon
                          icon={CircleCheck}
                          size={iconSize.inline}
                          style={{ color: theme.palette.primary.main, marginTop: 3, flexShrink: 0 }}
                        />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{achievement}</Typography>
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
    <Card sx={{ ...cardHover(theme, theme.palette.secondary.main) }}>
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Typography variant="h5" component="h3" sx={{ color: 'secondary.main', fontWeight: 700, mb: 1 }}>{edu?.degree}</Typography>
        {subtitle && <Typography variant="subtitle1" component="p" fontWeight={600} mb={2}>{subtitle}</Typography>}
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mb: 2 }}>
          {edu?.dates && <Chip label={edu.dates} size="small" />}
          {edu?.gpa && <Chip label={`GPA: ${edu.gpa}`} size="small" color="secondary" variant="outlined" />}
        </Stack>
        {edu?.description && (
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{edu.description}</Typography>
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
            <Card sx={{ ...cardHover(theme, theme.palette.primary.main) }}>
              <CardContent sx={{ p: 3, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box aria-hidden="true" sx={{ color: theme.palette.primary.main, display: 'inline-flex', mt: '2px' }}>
                  <AppIcon icon={Icon} size={iconSize.heading} />
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
                        minHeight: touchTarget,
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                      }}
                    >
                      View credential <AppIcon icon={ExternalLink} size={iconSize.inline} />
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
    if (experience.length) list.push({ id: 'experience', label: 'Experience', icon: Briefcase });
    if (education.length) list.push({ id: 'education', label: 'Education', icon: GraduationCap });
    if (skills.length) list.push({ id: 'skills', label: 'Skills', icon: Code });
    if (languages.length) list.push({ id: 'languages', label: 'Languages', icon: Languages });
    if (certifications.length) list.push({ id: 'certifications', label: 'Certifications', icon: Award });
    if (awards.length) list.push({ id: 'awards', label: 'Awards', icon: Trophy });
    if (interests.length) list.push({ id: 'interests', label: 'Interests', icon: Sparkles });
    return list;
  }, [experience.length, education.length, skills.length, languages.length, certifications.length, awards.length, interests.length]);

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
    <Box sx={{ pt: pagePaddingTop }}>
      <Container maxWidth="lg">

        <PageIntro icon={Briefcase} eyebrow="Experience & skills" title="Résumé" description={summary}
          action={(() => {
              const rawCv = resume?.cvDownload ?? '';
              if (!rawCv) return null;
              const cvHref = resolveAsset(rawCv);
              return (
                <Button
                  variant="contained"
                  startIcon={<AppIcon icon={Download} size={iconSize.control} />}
                  href={cvHref}
                  download
                  aria-label="Download CV as PDF"
                  sx={{
                    ...gradientCta(theme),
                    flexShrink: 0,
                    minHeight: buttonHeight.lg,
                    px: 4, py: 1.5,
                  }}
                >
                  Download CV
                </Button>
              );
            })()}>
          {stats.length > 0 && (
            <StatBand items={stats} sx={{ mt: 4 }} />
          )}
        </PageIntro>

        {/* Sticky section nav + content */}
        <Box sx={{ display: 'flex', gap: { md: 6 }, alignItems: 'flex-start' }}>
          {sections.length > 1 && (
            <InPageNav
              items={sections}
              ariaLabel="Résumé sections"
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
              <Section id="experience" icon={Briefcase} title="Experience">
                <ExperienceTimeline experience={experience} />
              </Section>
            )}

            {education.length > 0 && (
              <Section id="education" icon={GraduationCap} title="Education">
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
              <Section id="languages" icon={Languages} title="Languages">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25 }}>
                  {languages.map((language, index) => (
                    <Chip key={index} label={language} sx={badgeChipSx(theme)} />
                  ))}
                </Box>
              </Section>
            )}

            {certifications.length > 0 && (
              <Section id="certifications" icon={Award} title="Certifications">
                <CredentialGrid items={certifications} icon={Award} />
              </Section>
            )}

            {awards.length > 0 && (
              <Section id="awards" icon={Trophy} title="Awards">
                <CredentialGrid items={awards} icon={Trophy} />
              </Section>
            )}

            {interests.length > 0 && (
              <Section id="interests" icon={Sparkles} title="Interests">
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
