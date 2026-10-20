import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide';
import AppIcon from './AppIcon';
import SectionHeading from './SectionHeading';
import { featuredResearch, sortedPublications } from '../utils/research';
import { touchTarget, iconSize } from '../theme/tokens';

const ResearchPreview = ({ research, path }) => {
  const item = featuredResearch(research)?.item ?? sortedPublications(research)[0] ?? research?.projects?.[0];
  if (!path || !item) return null;
  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 6, md: 9 } }}>
      <Box component="section" aria-label="Research preview" sx={{ borderTop: 1, borderColor: 'divider', pt: { xs: 4, md: 6 } }}>
        <SectionHeading icon={BookOpen}>Research & publications</SectionHeading>
        <Box sx={{ maxWidth: '68ch', overflowWrap: 'anywhere' }}>
          <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 2 }}>{item.title}</Typography>
          <Typography sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.8 }}>{item.summary}</Typography>
          <Button component={RouterLink} to={path} endIcon={<AppIcon icon={ArrowRight} size={iconSize.inline} />} sx={{ minHeight: touchTarget }}>View research</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ResearchPreview;
