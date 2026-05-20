import React, { useState } from 'react';
import {
  Container, Typography, Box, Card, Grid, Button, useTheme, Link,
  Snackbar, Alert, IconButton, Tooltip, Stack, Avatar, Divider,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import {
  Email, Phone, LocationOn, LinkedIn, GitHub, Language, Twitter, Facebook,
  Send, ContentCopy, Schedule,
} from '@mui/icons-material';

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

  const showSnackbar = (severity, message) => setSnackbar({ open: true, severity, message });

  const handleCopyEmail = async () => {
    if (!personalInfo.email) return;
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      showSnackbar('success', 'Email address copied to clipboard.');
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
  // cells 1 and 2 of the stat strip. The pulse keeps the HomePage's identity
  // element alive while letting cell 3 share the others' visual skeleton.
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
        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Typography variant="h2" sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800,
              background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 2,
              textShadow: theme.palette.mode === 'dark' ? '0 2px 10px rgba(0,0,0,0.5)' : 'none',
            }}>
              Let's Connect
            </Typography>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', fontWeight: 400 }}>
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
                    <Typography variant="h6" fontWeight={800} color="text.primary">{responseTime}</Typography>
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
                      <Typography variant="h6" fontWeight={800} color="text.primary">{personalInfo.location}</Typography>
                    </Box>
                  </Box>
                </Grid>
              )}

              <Grid size={{ xs: 12, md: statColSize }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, justifyContent: { xs: 'flex-start', md: 'center' } }}>
                  {availabilityTile}
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1.5, fontWeight: 700, lineHeight: 1.2 }}>Status</Typography>
                    <Typography variant="h6" fontWeight={800} color="text.primary">Available</Typography>
                  </Box>
                </Box>
              </Grid>

            </Grid>
          </Card>
        </motion.div>

        {/* ---------- Contact card ---------- */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.5 }}>
          <Card sx={{
            borderRadius: 4,
            p: { xs: 4, md: 5 },
          }}>

            {personalInfo.email && (
              <Box>
                <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2.5}>
                  <Avatar sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.12),
                    color: theme.palette.primary.main,
                    width: 56,
                    height: 56,
                    flexShrink: 0,
                  }}>
                    <Email sx={{ fontSize: 28 }} />
                  </Avatar>
                  <Box sx={{ minWidth: 0, flex: 1, width: '100%' }}>
                    <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1.5, fontWeight: 700, lineHeight: 1.2 }}>
                      Email
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                      title={personalInfo.email}
                    >
                      {personalInfo.email}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
                    <Button
                      variant="outlined"
                      startIcon={<ContentCopy />}
                      onClick={handleCopyEmail}
                      aria-label="Copy email address to clipboard"
                      sx={{
                        borderColor: theme.palette.divider,
                        color: theme.palette.text.primary,
                        '&:hover': { borderColor: theme.palette.primary.main, color: theme.palette.primary.main },
                      }}
                    >
                      Copy
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<Send />}
                      href={`mailto:${personalInfo.email}`}
                      aria-label={`Open your email client to send a message to ${personalInfo.email}`}
                      sx={{
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        color: theme.palette.getContrastText(theme.palette.primary.main),
                        fontWeight: 700,
                        '&:hover': { boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.4)}` },
                      }}
                    >
                      Email me
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            )}

            {personalInfo.phone && (
              <>
                <Divider sx={{ my: 3 }} />
                <Stack direction="row" alignItems="center" spacing={2.5}>
                  <Avatar sx={{
                    bgcolor: alpha(theme.palette.secondary.main, 0.12),
                    color: theme.palette.secondary.main,
                    width: 56,
                    height: 56,
                    flexShrink: 0,
                  }}>
                    <Phone sx={{ fontSize: 28 }} />
                  </Avatar>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1.5, fontWeight: 700, lineHeight: 1.2 }}>
                      Phone
                    </Typography>
                    <Link
                      href={`tel:${personalInfo.phone}`}
                      sx={{
                        display: 'block',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        color: theme.palette.text.primary,
                        textDecoration: 'none',
                        '&:hover': { color: theme.palette.secondary.main },
                      }}
                    >
                      {personalInfo.phone}
                    </Link>
                  </Box>
                </Stack>
              </>
            )}

            {socialLinks.length > 0 && (
              <>
                <Divider sx={{ my: 3 }} />
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Typography variant="h6" fontWeight={700}>Follow me</Typography>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                    {socialLinks.map((social, index) => (
                      <Tooltip key={index} title={social.name} arrow placement="top">
                        <IconButton
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${social.name} profile in a new tab`}
                          sx={{
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.05)',
                            color: social.color,
                            border: `1px solid ${theme.palette.divider}`,
                            p: 1.5,
                            transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.08)',
                              borderColor: social.color,
                              boxShadow: `0 0 15px ${alpha(social.color, 0.4)}`,
                            },
                            '&:focus-visible': { boxShadow: `0 0 0 2px ${theme.palette.primary.main}` },
                          }}
                        >
                          {social.icon}
                        </IconButton>
                      </Tooltip>
                    ))}
                  </Stack>
                </Stack>
              </>
            )}

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
