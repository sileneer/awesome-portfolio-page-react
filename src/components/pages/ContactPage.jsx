import React, { useState } from 'react';
import {
  Container, Typography, Box, Card, Grid, Button, useTheme, List, ListItem, ListItemAvatar,
  Avatar, ListItemText, Link, TextField, Snackbar, Alert, CircularProgress, IconButton, Tooltip, Stack,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Email, Phone, LocationOn, LinkedIn, GitHub, Language, Twitter, Facebook, Send, ContentCopy } from '@mui/icons-material';

const ContactPage = ({ data }) => {
  const personalInfo = data?.personalInfo ?? {};
  const contact = data?.contact ?? {};
  const theme = useTheme();

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, severity: 'success', message: '' });

  const socialLinks = [
    { name: 'LinkedIn', url: personalInfo.linkedin, icon: <LinkedIn />, color: '#0077b5' },
    { name: 'GitHub', url: personalInfo.github, icon: <GitHub />, color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000' },
    { name: 'Website', url: personalInfo.website, icon: <Language />, color: theme.palette.primary.main },
    { name: 'Twitter', url: contact.twitter, icon: <Twitter />, color: '#1da1f2' },
    { name: 'Facebook', url: contact.facebook, icon: <Facebook />, color: '#4267b2' },
  ].filter((link) => !!link.url);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showSnackbar = (severity, message) => setSnackbar({ open: true, severity, message });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!personalInfo.email) {
      showSnackbar('error', 'No contact email configured.');
      return;
    }
    setIsSubmitting(true);
    const subject = encodeURIComponent(`Portfolio inquiry from ${formData.name || 'a visitor'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`,
    );
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;

    try {
      window.location.href = mailtoUrl;
      showSnackbar('success', 'Opening your email client…');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      showSnackbar('error', 'Could not open your email client. Copy the address instead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = async () => {
    if (!personalInfo.email) return;
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      showSnackbar('success', 'Email address copied to clipboard.');
    } catch (err) {
      showSnackbar('error', 'Copy failed — please copy manually.');
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((s) => ({ ...s, open: false }));
  };

  const textFieldSx = {
    mb: 3,
    '& .MuiOutlinedInput-root': {
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(15,23,42,0.03)',
      borderRadius: 2,
      color: theme.palette.text.primary,
      transition: 'all 0.3s ease',
      '& fieldset': { borderColor: theme.palette.divider },
      '&:hover fieldset': { borderColor: theme.palette.text.secondary },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.25)}`,
      },
    },
    '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
    '& .MuiInputLabel-root.Mui-focused': { color: theme.palette.primary.main },
  };

  return (
    <Box sx={{ minHeight: '100vh', pt: { xs: 10, md: 12 }, pb: 8 }}>
      <Container maxWidth="lg">

        <Box sx={{ mb: 6, textAlign: 'center' }}>
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

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <Card sx={{ borderRadius: 4, overflow: 'hidden' }}>
            <Grid container>

              <Grid size={{ xs: 12, md: 7 }} sx={{
                p: { xs: 4, md: 6 },
                background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(15,23,42,0.02)',
              }}>
                <Typography variant="h4" fontWeight={700} mb={4}>Send a Message</Typography>

                <form onSubmit={handleSubmit} aria-label="Contact form">
                  <Box component={motion.div} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                    <TextField fullWidth label="Your Name" name="name" value={formData.name} onChange={handleChange} required sx={textFieldSx} autoComplete="name" />
                  </Box>
                  <Box component={motion.div} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                    <TextField fullWidth label="Your Email" name="email" type="email" value={formData.email} onChange={handleChange} required sx={textFieldSx} autoComplete="email" />
                  </Box>
                  <Box component={motion.div} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                    <TextField fullWidth label="Your Message" name="message" value={formData.message} onChange={handleChange} required multiline rows={5} sx={textFieldSx} />
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isSubmitting}
                    endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <Send />}
                    aria-label="Send message via your email client"
                    sx={{
                      py: 2,
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      color: theme.palette.getContrastText(theme.palette.primary.main),
                      '&:hover': {
                        boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                      },
                    }}
                  >
                    {isSubmitting ? 'Opening…' : 'Send Message'}
                  </Button>

                  <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block', textAlign: 'center' }}>
                    Submitting opens your email client with this message pre-filled.
                  </Typography>
                </form>
              </Grid>

              <Grid size={{ xs: 12, md: 5 }} sx={{
                p: { xs: 4, md: 6 },
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                <Typography variant="h4" fontWeight={700} mb={4}>Contact Info</Typography>

                <List sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 6 }}>
                  {personalInfo.email && (
                    <ListItem sx={{ p: 0 }} secondaryAction={
                      <Tooltip title="Copy email" arrow>
                        <IconButton edge="end" onClick={handleCopyEmail} aria-label="Copy email address to clipboard" size="small">
                          <ContentCopy fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    }>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.12), color: theme.palette.primary.main }}><Email /></Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Typography variant="subtitle1" fontWeight={600} color="text.primary">Email</Typography>}
                        secondary={
                          <Link href={`mailto:${personalInfo.email}`} color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: theme.palette.primary.main } }}>
                            {personalInfo.email}
                          </Link>
                        }
                      />
                    </ListItem>
                  )}
                  {personalInfo.phone && (
                    <ListItem sx={{ p: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.12), color: theme.palette.secondary.main }}><Phone /></Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Typography variant="subtitle1" fontWeight={600} color="text.primary">Phone</Typography>}
                        secondary={
                          <Link href={`tel:${personalInfo.phone}`} color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: theme.palette.secondary.main } }}>
                            {personalInfo.phone}
                          </Link>
                        }
                      />
                    </ListItem>
                  )}
                  {personalInfo.location && (
                    <ListItem sx={{ p: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: alpha(theme.palette.text.primary, 0.06), color: theme.palette.text.primary }}><LocationOn /></Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Typography variant="subtitle1" fontWeight={600} color="text.primary">Location</Typography>}
                        secondary={<Typography color="text.secondary">{personalInfo.location}</Typography>}
                      />
                    </ListItem>
                  )}
                </List>

                <Typography variant="h6" fontWeight={700} mb={2}>Follow Me</Typography>
                <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
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
                          p: 2,
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

              </Grid>
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
