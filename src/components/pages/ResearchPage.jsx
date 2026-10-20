import React, { useState } from 'react';
import { Box, Button, Chip, Container, Divider, Link, Stack, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, Copy, FlaskConical, Sparkles } from 'lucide';
import AppIcon from '../AppIcon';
import SectionHeading from '../SectionHeading';
import PageIntro from '../PageIntro';
import Label from '../ui/Label';
import EmptyState from '../ui/EmptyState';
import InPageNav from '../ui/InPageNav';
import FilterSelect from '../ui/FilterSelect';
import { resolveAsset } from '../../utils/assets';
import { featuredResearch, sortedPublications, PUBLICATION_STATUSES, PROJECT_STATUSES, PUBLICATION_TYPES } from '../../utils/research';
import { cardSurface } from '../../theme/variants';
import { radius, iconSize, touchTarget, pagePaddingTop } from '../../theme/tokens';

const RESOURCE_LABELS = { paper: 'Paper', doi: 'DOI', pdf: 'PDF', code: 'Code', dataset: 'Dataset', slides: 'Slides', project: 'Project page' };
const EMPTY_FILTERS = { year: 'all', type: 'all', topic: 'all' };

// Shared entrance choreography, matching the other pages.
const staggerContainer = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const Topics = ({ items = [] }) => items.length > 0 && (
  <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1 }}>
    {items.map((topic) => <Chip key={topic} size="small" label={topic} variant="outlined" sx={{ maxWidth: '100%', height: 'auto', '& .MuiChip-label': { whiteSpace: 'normal', py: 0.5 } }} />)}
  </Stack>
);

const Resources = ({ links = {}, title }) => (
  <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1 }}>
    {Object.entries(RESOURCE_LABELS).filter(([key]) => links[key]).map(([key, label]) => (
      <Button key={key} size="small" href={resolveAsset(links[key])} target="_blank" rel="noopener noreferrer"
        aria-label={`${label} for ${title} (opens in a new tab)`}
        endIcon={<AppIcon icon={ArrowUpRight} size={iconSize.inline} />} sx={{ minHeight: touchTarget, px: 1.25 }}>
        {label}
      </Button>
    ))}
  </Stack>
);

const PublicationEntry = ({ item }) => {
  const [copyMessage, setCopyMessage] = useState('');
  const copyCitation = async () => {
    try {
      await navigator.clipboard.writeText(item.bibtex);
      setCopyMessage('Citation copied.');
    } catch {
      setCopyMessage('Could not copy. Select the citation below to copy it manually.');
    }
  };
  return (
    <Box component="article" aria-labelledby={`publication-${item.id}`} sx={{ py: 3.5, '& + &': { borderTop: 1, borderColor: 'divider' } }}>
      <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1, alignItems: 'center', mb: 1.5 }}>
        <Label component="span">{PUBLICATION_TYPES[item.type]}</Label>
        <Chip size="small" label={PUBLICATION_STATUSES[item.status]} variant="outlined"
          color={item.status === 'published' ? 'primary' : 'default'} />
      </Stack>
      <Typography id={`publication-${item.id}`} tabIndex={-1} variant="h5" component="h4"
        sx={{ fontWeight: 700, lineHeight: 1.35, mb: 1.5, scrollMarginTop: 32, overflowWrap: 'anywhere' }}>
        {item.title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
        {item.authors.map((author, i) => (
          <React.Fragment key={`${author.name}-${i}`}>
            {i > 0 && ', '}
            {author.isOwner ? <Box component="strong" sx={{ color: 'text.primary' }}>{author.name}</Box> : author.name}
          </React.Fragment>
        ))}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{[item.venue, item.year].filter(Boolean).join(' · ')}</Typography>
      <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 2 }}>{item.summary}</Typography>
      <Topics items={item.topics} />
      {item.abstract && (
        <Box component="details" sx={{ mt: 2, '& summary': { cursor: 'pointer', color: 'primary.main', fontWeight: 600, minHeight: touchTarget, alignContent: 'center' } }}>
          <Box component="summary" aria-label={`Read abstract for ${item.title}`}>Read abstract</Box>
          <Typography sx={{ color: 'text.secondary', pt: 1, lineHeight: 1.85, whiteSpace: 'pre-line' }}>{item.abstract}</Typography>
        </Box>
      )}
      <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1, alignItems: 'center', mt: 1 }}>
        <Resources links={item.links} title={item.title} />
        {item.bibtex && <Button size="small" onClick={copyCitation} startIcon={<AppIcon icon={Copy} size={iconSize.inline} />}
          aria-label={`Copy citation for ${item.title}`} sx={{ minHeight: touchTarget }}>Copy citation</Button>}
      </Stack>
      {item.bibtex && <Typography role="status" variant="body2" sx={{ color: 'text.secondary', mt: copyMessage ? 1 : 0 }}>{copyMessage}</Typography>}
      {copyMessage.startsWith('Could not') && <Box component="pre" sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', fontSize: '0.8rem', p: 2, bgcolor: 'action.hover', borderRadius: radius.sm }}>{item.bibtex}</Box>}
    </Box>
  );
};

const ResearchProject = ({ item }) => {
  const theme = useTheme();
  return (
    <Box component="article" aria-labelledby={`project-${item.id}`} sx={{ ...cardSurface(theme), p: { xs: 2.5, sm: 3 }, borderRadius: radius.lg, minWidth: 0 }}>
      <Chip size="small" label={PROJECT_STATUSES[item.status]} color={item.status === 'ongoing' ? 'secondary' : 'default'} variant="outlined" sx={{ mb: 2 }} />
      <Typography id={`project-${item.id}`} tabIndex={-1} variant="h5" component="h3" sx={{ fontWeight: 700, mb: 1.5, lineHeight: 1.4, scrollMarginTop: 32, overflowWrap: 'anywhere' }}>{item.title}</Typography>
      {(item.institution || item.dates) && <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{[item.institution, item.dates].filter(Boolean).join(' · ')}</Typography>}
      <Typography sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.8 }}>{item.summary}</Typography>
      {item.question && <Typography sx={{ mb: 2 }}><Box component="strong">Research question. </Box>{item.question}</Typography>}
      {item.contribution && <Typography sx={{ color: 'text.secondary', mb: 2 }}><Box component="strong" sx={{ color: 'text.primary' }}>My contribution. </Box>{item.contribution}</Typography>}
      {item.collaborators?.length > 0 && <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>With {item.collaborators.join(', ')}</Typography>}
      <Topics items={item.topics} />
      <Box sx={{ mt: 1 }}><Resources links={item.links} title={item.title} /></Box>
    </Box>
  );
};

const ResearchPage = ({ data }) => {
  const theme = useTheme();
  const research = data?.research ?? { publications: [], projects: [] };
  const intro = research.introduction ?? {};
  const publications = sortedPublications(research);
  const projects = research.projects ?? [];
  const featured = featuredResearch(research);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const years = [...new Set(publications.map((item) => item.year))];
  const types = [...new Set(publications.map((item) => item.type))];
  const topics = [...new Set(publications.flatMap((item) => item.topics ?? []))].sort();
  const filterOptions = [
    { key: 'year', label: 'Year', values: years },
    { key: 'type', label: 'Type', values: types },
    { key: 'topic', label: 'Topic', values: topics },
  ].filter((option) => option.values.length > 1);
  const showFilters = publications.length >= 5 && filterOptions.length > 0;
  const visible = publications.filter((item) => !showFilters || (
    (filters.year === 'all' || String(item.year) === filters.year)
    && (filters.type === 'all' || item.type === filters.type)
    && (filters.topic === 'all' || item.topics?.includes(filters.topic))
  ));
  const visibleYears = [...new Set(visible.map((item) => item.year))];
  const filtersActive = Object.values(filters).some((value) => value !== 'all');
  const revealFeatured = () => {
    setFilters(EMPTY_FILTERS);
    requestAnimationFrame(() => {
      const heading = document.getElementById(`${featured.kind}-${featured.item.id}`);
      heading?.scrollIntoView();
      heading?.focus({ preventScroll: true });
    });
  };

  const navItems = [
    ...(featured ? [{ id: 'featured-work', label: 'Featured work', icon: Sparkles }] : []),
    { id: 'publications', label: 'Publications', icon: BookOpen },
    { id: 'research-projects', label: 'Research projects', icon: FlaskConical },
  ];

  return (
    <Box sx={{ pt: pagePaddingTop, overflowWrap: 'anywhere' }}>
      <Container maxWidth="lg">
        <PageIntro icon={BookOpen} eyebrow="Ideas & inquiry" title="Research & Publications"
          description={intro.statement ?? 'Publications, research projects, and the questions behind them.'} />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '220px minmax(0, 1fr)' }, gap: { xs: 5, md: 7 } }}>
          <Box component="aside" aria-label="Research profile" sx={{ alignSelf: 'start', position: { md: 'sticky' }, top: 32 }}>
            {intro.areas?.length > 0 && <Box sx={{ mb: 4 }}>
              <Label component="h2" sx={{ display: 'block', mb: 2 }}>Research areas</Label>
              <Topics items={intro.areas} />
            </Box>}
            {intro.profiles?.length > 0 && <Stack spacing={0.5} sx={{ mb: 4 }}>
              {intro.profiles.map((profile) => <Link key={profile.url} href={profile.url} target="_blank" rel="noopener noreferrer"
                aria-label={`${profile.label} (opens in a new tab)`} sx={{ display: 'flex', gap: 1, alignItems: 'center', minHeight: touchTarget, fontSize: '0.9rem' }}>
                {profile.label}<AppIcon icon={ArrowUpRight} size={iconSize.inline} />
              </Link>)}
            </Stack>}
            <Label component="p" sx={{ display: 'block' }}>On this page</Label>
            <InPageNav items={navItems} ariaLabel="Research sections" sx={{ mt: 1 }} />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            {featured && <Box component="section" id="featured-work" aria-label="Featured work" sx={{ scrollMarginTop: 32, p: { xs: 3, sm: 4 }, mb: 7, borderRadius: radius.lg, border: 1,
              borderColor: alpha(theme.palette.primary.main, 0.35), background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)}, ${alpha(theme.palette.secondary.main, 0.06)})` }}>
              <Label component="h2" color="primary.main" sx={{ display: 'block', mb: 2 }}>Featured work</Label>
              <Typography variant="h4" component="p" sx={{ fontWeight: 700, lineHeight: 1.3, mb: 2 }}>{featured.item.title}</Typography>
              <Chip size="small" variant="outlined" label={(featured.kind === 'publication' ? PUBLICATION_STATUSES : PROJECT_STATUSES)[featured.item.status]} sx={{ mb: 2 }} />
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 2 }}>{featured.item.contribution ?? featured.item.summary}</Typography>
              <Topics items={featured.item.topics} />
              <Resources links={featured.item.links} title={featured.item.title} />
              <Button onClick={revealFeatured} endIcon={<AppIcon icon={ArrowDown} size={iconSize.inline} />} sx={{ mt: 1, minHeight: touchTarget }}>View full entry</Button>
            </Box>}

            <Box component="section" id="publications" aria-label="Publications" sx={{ scrollMarginTop: 32 }}>
              <SectionHeading icon={BookOpen}>Publications</SectionHeading>
              {showFilters && <Box sx={{ mb: 3 }}>
                <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 2, mb: 2 }}>
                  {filterOptions.map(({ key, label, values }) => (
                    <FilterSelect
                      key={key}
                      label={label}
                      value={filters[key]}
                      onChange={(event) => setFilters({ ...filters, [key]: event.target.value })}
                    >
                      <option value="all">All {label.toLowerCase()}s</option>
                      {values.map((value) => <option key={value} value={value}>{key === 'type' ? PUBLICATION_TYPES[value] : value}</option>)}
                    </FilterSelect>
                  ))}
                </Stack>
                <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                  <Typography role="status" variant="body2" sx={{ color: 'text.secondary' }}>Showing {visible.length} of {publications.length} entries</Typography>
                  {filtersActive && <Button onClick={() => setFilters(EMPTY_FILTERS)} sx={{ minHeight: touchTarget }}>Reset filters</Button>}
                </Stack>
              </Box>}
              {publications.length === 0 ? <EmptyState>No publications listed yet.</EmptyState> : visible.length === 0 ? <EmptyState>No publications match these filters. Try another selection or reset the filters.</EmptyState> : (
                visibleYears.map((year) => <Box key={year} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '64px minmax(0, 1fr)' }, gap: { xs: 0, sm: 3 }, borderTop: 1, borderColor: 'divider' }}>
                  <Typography variant="h6" component="h3" sx={{ pt: 3.5, color: 'primary.main', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{year}</Typography>
                  <Box sx={{ minWidth: 0 }}>{visible.filter((item) => item.year === year).map((item) => <PublicationEntry key={item.id} item={item} />)}</Box>
                </Box>)
              )}
            </Box>

            <Divider sx={{ my: { xs: 5, md: 7 } }} />
            <Box component="section" id="research-projects" aria-label="Research projects" sx={{ scrollMarginTop: 32 }}>
              <SectionHeading icon={FlaskConical}>Research projects</SectionHeading>
              {projects.length === 0 ? <EmptyState>No research projects listed yet.</EmptyState> : (
                <Stack
                  spacing={3}
                  component={motion.div}
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                >
                  {projects.map((item) => (
                    <Box key={item.id} component={motion.div} variants={staggerItem}>
                      <ResearchProject item={item} />
                    </Box>
                  ))}
                </Stack>
              )}
            </Box>
            {intro.collaboration && <Box sx={{ mt: 6, pt: 4, borderTop: 1, borderColor: 'divider' }}>
              <Typography variant="h5" component="h2" sx={{ mb: 1 }}>Have a research question in common?</Typography>
              <Typography sx={{ color: 'text.secondary', mb: 2 }}>Get in touch to discuss ideas and collaboration.</Typography>
              <Button component={RouterLink} to="/contact" endIcon={<AppIcon icon={ArrowRight} size={iconSize.inline} />} sx={{ minHeight: touchTarget }}>Let’s talk</Button>
            </Box>}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ResearchPage;
