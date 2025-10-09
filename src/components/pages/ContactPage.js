/**
 * ContactPage Component
 * 
 * Displays contact information and provides multiple ways to connect:
 * - Email and phone contact with click-to-action functionality
 * - Physical location information
 * - Social media links (LinkedIn, GitHub, Twitter, Facebook, Website)
 * - Meeting scheduling integration (Calendly)
 * 
 * Features:
 * - Interactive contact cards with hover effects
 * - Direct mailto: and tel: links for easy communication
 * - Social media buttons with brand colors
 * - Optional meeting scheduler integration
 * - Responsive layout for all screen sizes
 * 
 * @param {Object} props - Component props
 * @param {Object} props.data - Portfolio data containing personal info and contact details
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  Divider,
  Fade,
  useTheme,
  Grow,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Link,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  LinkedIn,
  GitHub,
  Language,
  Twitter,
  Facebook,
  Star,
  ContactMail,
} from '@mui/icons-material';

const ContactPage = ({ data }) => {
  // Extract contact data with safe fallbacks
  const personalInfo = data?.personalInfo ?? {};
  const contact = data?.contact ?? {};
  const theme = useTheme();

  /**
   * Glass morphism effect styling
   * Consistent with other pages for unified design
   */
  const glowEffect = {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${theme.palette.primary.main}30`,
  };

  /**
   * Card hover effect styling
   * Provides lift and scale animation on hover
   */
  const cardHoverEffect = {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)', // Lift and slightly enlarge
      boxShadow: `0 20px 40px ${theme.palette.primary.main}20`,
    },
  };

  /**
   * Handle email click - open default email client
   */
  const handleEmailClick = () => {
    if (personalInfo?.email) {
      window.location.href = `mailto:${personalInfo.email}`;
    }
  };

  /**
   * Handle phone click - initiate phone call on mobile devices
   */
  const handlePhoneClick = () => {
    if (personalInfo?.phone) {
      window.location.href = `tel:${personalInfo.phone}`;
    }
  };

  /**
   * Social media links configuration
   * Each link includes name, URL, icon, and brand color
   * Filters out links that don't have a URL
   */
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: personalInfo.linkedin,
      icon: <LinkedIn />,
      color: '#0077b5', // LinkedIn brand color
    },
    {
      name: 'GitHub',
      url: personalInfo.github,
      icon: <GitHub />,
      color: '#333', // GitHub brand color
    },
    {
      name: 'Website',
      url: personalInfo.website,
      icon: <Language />,
      color: '#007bff', // Primary blue
    },
    {
      name: 'Twitter',
      url: contact.twitter,
      icon: <Twitter />,
      color: '#1da1f2', // Twitter brand color
    },
    {
      name: 'Facebook',
      url: contact.facebook,
      icon: <Facebook />,
      color: '#4267b2', // Facebook brand color
    },
  ].filter(link => !!link.url); // Only include links with valid URLs

  return (
    /* Main Page Container - full viewport height with gradient background */
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.background.default}95, ${theme.palette.background.paper}95)`,
        pt: { xs: 10, md: 12 },
        pb: 4
      }}
    >
      {/* Content Container - centers content */}
      <Container maxWidth="lg">

        {/* ========== PAGE HEADER ========== */}
        {/* Page title and welcome message */}
        <Fade in timeout={1000}>
          <Box sx={{ mb: 6 }}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 3,
              textAlign: { xs: 'center', sm: 'left' }
            }}>
              {/* Page Title - "Let's Connect" */}
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                  lineHeight: 1.25,
                  paddingBottom: '0.1em',
                }}
              >
                Let's Connect
              </Typography>
            </Box>

            {/* Welcome Message - personalized contact message */}
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: 700,
                mx: { xs: 'auto', sm: 0 },
                mt: 1.5,
                lineHeight: 1.6,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                textAlign: { xs: 'center', sm: 'left' }
              }}
            >
              {contact?.message || "Ready to bring your ideas to life? Let's discuss how we can work together to create something amazing."}
            </Typography>
          </Box>
        </Fade>

        {/* ========== MAIN CONTENT GRID ========== */}
        {/* Two columns: Contact Info (left) and Social Links (right) */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 3, md: 4 },
            alignItems: 'stretch',
          }}
        >

          {/* === LEFT COLUMN: Contact Information Card === */}
          <Box sx={{ height: '100%' }}>
            <Fade in timeout={1000}>
              <Box sx={{ width: '100%', height: '100%' }}>
                {/* Contact Information Card - email, phone, location */}
                <Card
                  elevation={0}
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    ...glowEffect,
                    ...cardHoverEffect,
                    borderRadius: 4,
                  }}>
                  <CardContent sx={{ p: 4 }}>

                    {/* Card Header - "Get In Touch" with icon */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <ContactMail
                        sx={{
                          fontSize: '1.75rem',
                          color: theme.palette.primary.main,
                          mr: 2
                        }}
                      />
                      <Typography
                        variant="h5"
                        sx={{
                          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontWeight: 600,
                        }}
                      >
                        Get In Touch
                      </Typography>
                    </Box>

                    {/* === CONTACT METHODS (compact) === */}
                    <List dense sx={{ p: 0, m: 0, '& .MuiListItem-root + .MuiListItem-root': { mt: 1 } }}>
                      {personalInfo?.email && (
                        <Grow in timeout={1200}>
                          <ListItem sx={{ px: 0, py: 1.25, borderRadius: 2, '&:hover': { backgroundColor: theme.palette.action.hover } }}>
                            <ListItemAvatar>
                              <Avatar sx={{ bgcolor: theme.palette.primary.main, color: '#fff', width: 40, height: 40 }}>
                                <Email fontSize="small" />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={<Typography variant="subtitle1" color="text.primary" fontWeight={600}>Email</Typography>}
                              secondary={
                                <Box>
                                  <Link href={`mailto:${personalInfo.email}`} underline="hover" color="primary" sx={{ fontWeight: 500 }}>
                                    {personalInfo.email}
                                  </Link>
                                  {contact.alternateEmail && (
                                    <Box sx={{ mt: 0.25 }}>
                                      <Link href={`mailto:${contact.alternateEmail}`} underline="hover" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                                        {contact.alternateEmail}
                                      </Link>
                                    </Box>
                                  )}
                                </Box>
                              }
                            />
                          </ListItem>
                        </Grow>
                      )}

                      {personalInfo?.phone && (
                        <Grow in timeout={1400}>
                          <ListItem sx={{ px: 0, py: 1.25, borderRadius: 2, '&:hover': { backgroundColor: theme.palette.action.hover } }}>
                            <ListItemAvatar>
                              <Avatar sx={{ bgcolor: theme.palette.secondary.main, color: '#fff', width: 40, height: 40 }}>
                                <Phone fontSize="small" />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={<Typography variant="subtitle1" color="text.primary" fontWeight={600}>Phone</Typography>}
                              secondary={
                                <Link href={`tel:${personalInfo.phone}`} underline="hover" color="secondary" sx={{ fontWeight: 500 }}>
                                  {personalInfo.phone}
                                </Link>
                              }
                            />
                          </ListItem>
                        </Grow>
                      )}

                      {personalInfo?.location && (
                        <Grow in timeout={1600}>
                          <ListItem sx={{ px: 0, py: 1.25, borderRadius: 2, '&:hover': { backgroundColor: theme.palette.action.hover } }}>
                            <ListItemAvatar>
                              <Avatar sx={{ bgcolor: theme.palette.info.main, color: '#fff', width: 40, height: 40 }}>
                                <LocationOn fontSize="small" />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={<Typography variant="subtitle1" color="text.primary" fontWeight={600}>Location</Typography>}
                              secondary={<Typography variant="body2" color="text.primary" fontWeight={500}>{personalInfo.location}</Typography>}
                            />
                          </ListItem>
                        </Grow>
                      )}
                    </List>
                  </CardContent>
                </Card>
              </Box>
            </Fade>
          </Box>

          {/* === RIGHT COLUMN: Social Links === */}
          <Box sx={{ height: '100%' }}>
            <Fade in timeout={1200}>
              <Box sx={{ width: '100%', height: '100%' }}>
                {/* Social Links Card */}
                <Card
                  elevation={0}
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    ...glowEffect,
                    ...cardHoverEffect,
                    borderRadius: 4,
                  }}
                >
                  <CardContent sx={{ p: 4 }}>

                    {/* Card Header - "Connect With Me" with icon */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Star
                        sx={{
                          fontSize: '2rem',
                          color: theme.palette.secondary.main,
                          mr: 2
                        }}
                      />
                      <Typography
                        variant="h5"
                        sx={{
                          background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontWeight: 600,
                        }}
                      >
                        Connect With Me
                      </Typography>
                    </Box>

                    {/* Social Links Grid - 2 columns */}
                    <Grid container spacing={2}>
                      {/* Map through social links to create buttons */}
                      {socialLinks.map((social, index) => (
                        <Grid item xs={12} key={index}>
                          <Grow in timeout={1400 + index * 100}>
                            {/* Social Media Button - links to external profile */}
                            <Button
                              fullWidth
                              variant="contained"
                              startIcon={social.icon}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                py: 2,
                                px: 3,
                                justifyContent: 'flex-start',
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: 3,
                                backgroundColor: social.color,
                                color: 'white',
                                boxShadow: `0 4px 12px ${social.color}40`,
                                '&:hover': {
                                  backgroundColor: social.color,
                                  boxShadow: `0 8px 20px ${social.color}60`,
                                },
                              }}
                            >
                              {social.name}
                            </Button>
                          </Grow>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Fade>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

ContactPage.propTypes = {
  data: PropTypes.shape({
    personalInfo: PropTypes.shape({
      email: PropTypes.string,
      phone: PropTypes.string,
      location: PropTypes.string,
      linkedin: PropTypes.string,
      github: PropTypes.string,
      website: PropTypes.string,
    }),
    contact: PropTypes.shape({
      message: PropTypes.string,
      alternateEmail: PropTypes.string,
      twitter: PropTypes.string,
      facebook: PropTypes.string,
    }),
  }),
};

export default ContactPage;
