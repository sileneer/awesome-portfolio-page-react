import React, { useState } from 'react';
import {
  Container, Box, Card, Grid, Button, useTheme, Link,
  Snackbar, Alert, IconButton, Tooltip, Stack, Divider,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, Send, Copy, Clock, AtSign, Contact, MessageCircle } from 'lucide';
import { Linkedin, Github, Twitter, Facebook } from '../brandIcons';
import AppIcon from '../AppIcon';
import SectionHeading from '../SectionHeading';
import PageIntro from '../PageIntro';
import StatBand from '../ui/StatBand';
import Label from '../ui/Label';
import AvailabilityDot from '../ui/AvailabilityDot';
import { gradientCta } from '../../theme/variants';
import { radius, iconSize, touchTarget, buttonHeight, pagePaddingTop } from '../../theme/tokens';

// A single tappable contact method: icon tile, label, value (as a mailto/tel
// link), and a copy-to-clipboard button. Used for email, alternate email, phone.
const ContactMethod = ({ icon, accent, label, value, href, onCopy, copyLabel }) => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        alignItems: 'center',
        p: 1.5,
        borderRadius: radius.lg,
        transition: 'background 0.2s ease',
        '&:hover': { background: alpha(accent, 0.06) },
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 48, height: 48, flexShrink: 0,
          borderRadius: radius.md,
          background: alpha(accent, 0.12),
          color: accent,
        }}
      >
        <AppIcon icon={icon} size={iconSize.heading} />
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Label component="span" sx={{ display: 'block' }}>{label}</Label>
        <Link
          href={href}
          title={value}
          sx={{
            display: 'flex',
            alignItems: 'center',
            minHeight: touchTarget,
            fontWeight: 700,
            color: theme.palette.text.primary,
            textDecoration: 'none',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            '&:hover': { color: accent },
          }}
        >
          {value}
        </Link>
      </Box>
      {onCopy && (
        <Tooltip title={copyLabel} arrow placement="top">
          <IconButton
            onClick={onCopy}
            aria-label={copyLabel}
            sx={{ flexShrink: 0, width: touchTarget, height: touchTarget, color: 'text.secondary', '&:hover': { color: accent } }}
          >
            <AppIcon icon={Copy} size={iconSize.control} />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
};

const ContactPage = ({ data }) => {
  const personalInfo = data?.personalInfo ?? {};
  const contact = data?.contact ?? {};
  const theme = useTheme();

  const [snackbar, setSnackbar] = useState({ open: false, severity: 'success', message: '' });

  const responseTime = contact.responseTime || 'Within 24 hours';
  const hasLocation = !!personalInfo.location;

  const socialLinks = [
    { name: 'LinkedIn', url: personalInfo.linkedin, icon: Linkedin, color: '#0077b5' },
    { name: 'GitHub', url: personalInfo.github, icon: Github, color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000' },
    { name: 'Website', url: personalInfo.website, icon: Globe, color: theme.palette.primary.main },
    { name: 'Twitter', url: contact.twitter, icon: Twitter, color: '#1da1f2' },
    { name: 'Facebook', url: contact.facebook, icon: Facebook, color: '#4267b2' },
  ].filter((link) => !!link.url);
  const hasSocial = socialLinks.length > 0;

  const methods = [
    personalInfo.email && {
      key: 'email', icon: Mail, accent: theme.palette.primary.main,
      label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, copyLabel: 'Copy email address',
    },
    contact.alternateEmail && {
      key: 'alt', icon: AtSign, accent: theme.palette.secondary.main,
      label: 'Alternate email', value: contact.alternateEmail, href: `mailto:${contact.alternateEmail}`, copyLabel: 'Copy alternate email',
    },
    personalInfo.phone && {
      key: 'phone', icon: Phone, accent: theme.palette.secondary.main,
      label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}`, copyLabel: 'Copy phone number',
    },
  ].filter(Boolean);

  const showSnackbar = (severity, message) => setSnackbar({ open: true, severity, message });

  const handleCopy = async (value, label) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      showSnackbar('success', `${label} copied to clipboard.`);
    } catch {
      showSnackbar('error', 'Copy failed — please copy manually.');
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((s) => ({ ...s, open: false }));
  };

  // The status tile mirrors the "Available" badge on the Home portrait — one
  // indicator, one look, in both places.
  const statusTile = (
    <Box
      aria-hidden="true"
      sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 64, height: 64, flexShrink: 0,
        borderRadius: radius.md,
        background: alpha(theme.palette.success.main, 0.12),
      }}
    >
      <AvailabilityDot size={16} />
    </Box>
  );

  const statItems = [
    {
      icon: Clock,
      accent: theme.palette.primary.main,
      label: 'Typical reply',
      value: responseTime,
    },
    ...(hasLocation
      ? [{ icon: MapPin, accent: theme.palette.secondary.main, label: 'Location', value: personalInfo.location }]
      : []),
    { icon: null, accent: theme.palette.success.main, label: 'Status', value: 'Available', tile: statusTile },
  ];

  return (
    <Box sx={{ pt: pagePaddingTop }}>
      <Container maxWidth="lg">

        <PageIntro icon={MessageCircle} eyebrow="Connect & collaborate" title="Let's Connect"
          description={contact?.message || "Ready to bring your ideas to life? Let's discuss how we can work together to create something amazing."} />

        {/* ---------- Stat strip ---------- */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.35 }}>
          <Card sx={{ p: { xs: 3, md: 4 }, borderRadius: radius.lg, mb: 5 }}>
            <StatBand items={statItems} divided={false} />
          </Card>
        </motion.div>

        {/* ---------- Contact card ---------- */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.5 }}>
          <Card sx={{ borderRadius: radius.lg, p: { xs: 3, md: 5 } }}>
            <Grid container spacing={{ xs: 4, md: 5 }}>

              {/* Direct contact methods */}
              <Grid size={{ xs: 12, md: hasSocial ? 7 : 12 }}>
                <SectionHeading icon={Contact} variant="panel">Reach me directly</SectionHeading>
                <Stack spacing={0.5} divider={<Divider flexItem sx={{ my: 0.5 }} />}>
                  {methods.map((m) => (
                    <ContactMethod
                      key={m.key}
                      icon={m.icon}
                      accent={m.accent}
                      label={m.label}
                      value={m.value}
                      href={m.href}
                      copyLabel={m.copyLabel}
                      onCopy={() => handleCopy(m.value, m.label)}
                    />
                  ))}
                </Stack>
                {personalInfo.email && (
                  <Button
                    variant="contained"
                    startIcon={<AppIcon icon={Send} size={iconSize.control} />}
                    href={`mailto:${personalInfo.email}`}
                    aria-label={`Open your email client to send a message to ${personalInfo.email}`}
                    sx={{
                      ...gradientCta(theme),
                      mt: 3,
                      minHeight: buttonHeight.lg,
                      px: 4, py: 1.25,
                      fontWeight: 700,
                      '&:hover': { boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.4)}` },
                    }}
                  >
                    Email me
                  </Button>
                )}
              </Grid>

              {/* Social links */}
              {hasSocial && (
                <Grid
                  size={{ xs: 12, md: 5 }}
                  sx={{
                    borderLeft: { md: `1px solid ${theme.palette.divider}` },
                    borderTop: { xs: `1px solid ${theme.palette.divider}`, md: 'none' },
                    pt: { xs: 4, md: 0 },
                    pl: { md: 5 },
                  }}
                >
                  <SectionHeading icon={Globe} variant="panel">Find me online</SectionHeading>
                  <Stack spacing={1}>
                    {socialLinks.map((social) => (
                      <Button
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<AppIcon icon={social.icon} size={iconSize.control} />}
                        aria-label={`Open ${social.name} profile in a new tab`}
                        sx={{
                          justifyContent: 'flex-start',
                          minHeight: buttonHeight.md,
                          px: 2, py: 0.75,
                          borderRadius: radius.sm,
                          fontWeight: 600,
                          color: theme.palette.text.primary,
                          border: `1px solid ${theme.palette.divider}`,
                          transition: 'border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
                          '& .MuiButton-startIcon': { color: social.color },
                          '&:hover': {
                            borderColor: social.color,
                            background: alpha(social.color, 0.06),
                            boxShadow: `0 0 14px ${alpha(social.color, 0.25)}`,
                          },
                        }}
                      >
                        {social.name}
                      </Button>
                    ))}
                  </Stack>
                </Grid>
              )}

            </Grid>
          </Card>
        </motion.div>

      </Container>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: '100%',
            background: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.98)',
            color: theme.palette.text.primary,
            border: `1px solid ${snackbar.severity === 'success' ? theme.palette.primary.main : theme.palette.error.main}`,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactPage;
