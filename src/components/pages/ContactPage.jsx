import React, { useState } from 'react';
import {
  Container, Typography, Box, Card, Grid, Button, useTheme, Link,
  Snackbar, Alert, IconButton, Tooltip, Stack, Avatar, Divider,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import {
  Email, Phone, LocationOn, LinkedIn, GitHub, Language, Twitter, Facebook,
  Send, ContentCopy, Schedule, AlternateEmail, ContactMail, Public,
} from '@mui/icons-material';
import SectionHeading from '../SectionHeading';

// A single tappable contact method: icon tile, label, value (as a mailto/tel
// link), and a copy-to-clipboard button. Used for email, alternate email, phone.
const ContactMethod = ({ icon, accent, label, value, href, onCopy, copyLabel }) => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        p: 1.5,
        borderRadius: 3,
        transition: 'background 0.2s ease',
        '&:hover': { background: alpha(accent, 0.06) },
      }}
    >
      <Avatar sx={{ bgcolor: alpha(accent, 0.12), color: accent, width: 48, height: 48, flexShrink: 0 }}>
        {icon}
      </Avatar>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1.5, fontWeight: 700, lineHeight: 1.2 }}>
          {label}
        </Typography>
        <Link
          href={href}
          title={value}
          sx={{
            display: 'block',
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
            sx={{ flexShrink: 0, color: 'text.secondary', '&:hover': { color: accent } }}
          >
            <ContentCopy fontSize="small" />
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
  // Stat strip cell count drives the per-cell Grid size. Always at least 2.
  const statCells = 1 + (hasLocation ? 1 : 0) + 1;
  const statColSize = statCells === 3 ? 4 : 6;

  const socialLinks = [
    { name: 'LinkedIn', url: personalInfo.linkedin, icon: <LinkedIn />, color: '#0077b5' },
    { name: 'GitHub', url: personalInfo.github, icon: <GitHub />, color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000' },
    { name: 'Website', url: personalInfo.website, icon: <Language />, color: theme.palette.primary.main },
    { name: 'Twitter', url: contact.twitter, icon: <Twitter />, color: '#1da1f2' },
    { name: 'Facebook', url: contact.facebook, icon: <Facebook />, color: '#4267b2' },
  ].filter((link) => !!link.url);
  const hasSocial = socialLinks.length > 0;

  const methods = [
    personalInfo.email && {
      key: 'email', icon: <Email />, accent: theme.palette.primary.main,
      label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, copyLabel: 'Copy email address',
    },
    contact.alternateEmail && {
      key: 'alt', icon: <AlternateEmail />, accent: theme.palette.secondary.main,
      label: 'Alternate email', value: contact.alternateEmail, href: `mailto:${contact.alternateEmail}`, copyLabel: 'Copy alternate email',
    },
    personalInfo.phone && {
      key: 'phone', icon: <Phone />, accent: theme.palette.secondary.main,
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

  const primarySoft = alpha(theme.palette.primary.main, 0.1);
  const secondarySoft = alpha(theme.palette.secondary.main, 0.1);

  // Pulsing-dot icon tile — parallel to the Schedule / LocationOn tiles in
  // cells 1 and 2 of the stat strip.
  const availabilityTile = (
    <Box sx={{
      p: 2, borderRadius: 3,
      background: alpha('#00e676', 0.12),
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      width: 64, height: 64,
    }}>
      <Box
        component={motion.span}
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        sx={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#00e676', boxShadow: '0 0 12px #00e676', display: 'inline-block' }}
      />
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', pt: { xs: 10, md: 12 }, pb: 8 }}>
      <Container maxWidth="lg">

        {/* ---------- Hero ---------- */}
        <Box sx={{ mb: 5 }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Typography variant="h2" component="h1" sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800,
              background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 2,
              textShadow: theme.palette.mode === 'dark' ? '0 2px 10px rgba(0,0,0,0.5)' : 'none',
            }}>
              Let's Connect
            </Typography>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Typography variant="h6" component="p" color="text.secondary" sx={{ maxWidth: '65ch', fontWeight: 400 }}>
              {contact?.message || "Ready to bring your ideas to life? Let's discuss how we can work together to create something amazing."}
            </Typography>
          </motion.div>
        </Box>

        {/* ---------- Stat strip ---------- */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.35 }}>
          <Card sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, mb: 5 }}>
            <Grid container spacing={3} alignItems="center">

              <Grid size={{ xs: 12, md: statColSize }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, justifyContent: { xs: 'flex-start', md: 'center' } }}>
                  <Box sx={{ p: 2, borderRadius: 3, background: primarySoft, color: 'primary.main', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Schedule sx={{ fontSize: 32 }} />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1.5, fontWeight: 700, lineHeight: 1.2 }}>Typical reply</Typography>
                    <Typography variant="h6" component="p" fontWeight={800} color="text.primary">{responseTime}</Typography>
                  </Box>
                </Box>
              </Grid>

              {hasLocation && (
                <Grid
                  size={{ xs: 12, md: statColSize }}
                  sx={{
                    borderLeft: { md: `1px solid ${theme.palette.divider}` },
                    borderRight: { md: `1px solid ${theme.palette.divider}` },
                    borderTop: { xs: `1px solid ${theme.palette.divider}`, md: 'none' },
                    borderBottom: { xs: `1px solid ${theme.palette.divider}`, md: 'none' },
                    py: { xs: 2, md: 0 },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, justifyContent: { xs: 'flex-start', md: 'center' } }}>
                    <Box sx={{ p: 2, borderRadius: 3, background: secondarySoft, color: 'secondary.main', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <LocationOn sx={{ fontSize: 32 }} />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1.5, fontWeight: 700, lineHeight: 1.2 }}>Location</Typography>
                      <Typography variant="h6" component="p" fontWeight={800} color="text.primary">{personalInfo.location}</Typography>
                    </Box>
                  </Box>
                </Grid>
              )}

              <Grid size={{ xs: 12, md: statColSize }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, justifyContent: { xs: 'flex-start', md: 'center' } }}>
                  {availabilityTile}
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1.5, fontWeight: 700, lineHeight: 1.2 }}>Status</Typography>
                    <Typography variant="h6" component="p" fontWeight={800} color="text.primary">Available</Typography>
                  </Box>
                </Box>
              </Grid>

            </Grid>
          </Card>
        </motion.div>

        {/* ---------- Contact card ---------- */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.5 }}>
          <Card sx={{ borderRadius: 4, p: { xs: 3, md: 5 } }}>
            <Grid container spacing={{ xs: 4, md: 5 }}>

              {/* Direct contact methods */}
              <Grid size={{ xs: 12, md: hasSocial ? 7 : 12 }}>
                <SectionHeading icon={ContactMail} size="sm">Reach me directly</SectionHeading>
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
                    startIcon={<Send />}
                    href={`mailto:${personalInfo.email}`}
                    aria-label={`Open your email client to send a message to ${personalInfo.email}`}
                    sx={{
                      mt: 3,
                      px: 4, py: 1.25,
                      fontWeight: 700,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      color: theme.palette.getContrastText(theme.palette.primary.main),
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
                  <SectionHeading icon={Public} size="sm">Find me online</SectionHeading>
                  <Stack spacing={1}>
                    {socialLinks.map((social) => (
                      <Button
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={social.icon}
                        aria-label={`Open ${social.name} profile in a new tab`}
                        sx={{
                          justifyContent: 'flex-start',
                          px: 2, py: 1.25,
                          borderRadius: 2,
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
                          '&:focus-visible': { boxShadow: `0 0 0 2px ${theme.palette.primary.main}` },
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
