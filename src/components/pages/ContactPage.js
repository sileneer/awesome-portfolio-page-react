import React from 'react';
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
  CalendarToday,
  Star,
  Send,
  ContactMail,
  ConnectWithoutContact,
} from '@mui/icons-material';

const ContactPage = ({ data }) => {
  const { personalInfo, contact } = data;
  const theme = useTheme();

  // Glass morphism effect consistent with other pages
  const glowEffect = {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${theme.palette.primary.main}30`,
  };

  const cardHoverEffect = {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: `0 20px 40px ${theme.palette.primary.main}20`,
    },
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${personalInfo.email}`;
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${personalInfo.phone}`;
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: personalInfo.linkedin,
      icon: <LinkedIn />,
      color: '#0077b5',
    },
    {
      name: 'GitHub',
      url: personalInfo.github,
      icon: <GitHub />,
      color: '#333',
    },
    {
      name: 'Website',
      url: personalInfo.website,
      icon: <Language />,
      color: '#007bff',
    },
    {
      name: 'Twitter',
      url: contact.twitter,
      icon: <Twitter />,
      color: '#1da1f2',
    },
    {
      name: 'Facebook',
      url: contact.facebook,
      icon: <Facebook />,
      color: '#4267b2',
    },
  ].filter(link => link.url);

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.background.default}95, ${theme.palette.background.paper}95)`,
        pt: { xs: 10, md: 12 },
        pb: 4
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Fade in timeout={800}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              <ConnectWithoutContact sx={{ fontSize: { xs: '2rem', md: '3rem' }, color: theme.palette.primary.main }} />
              Let's Connect
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                maxWidth: 700, 
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1.1rem', md: '1.25rem' }
              }}
            >
              {contact.message || "Ready to bring your ideas to life? Let's discuss how we can work together to create something amazing."}
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <Box sx={{ height: '100%' }}>
                <Card 
                  elevation={0}
                  sx={{ 
                    height: '100%',
                    ...glowEffect,
                    ...cardHoverEffect,
                    borderRadius: 4,
                  }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <ContactMail 
                      sx={{ 
                        fontSize: '2rem', 
                        color: theme.palette.primary.main,
                        mr: 2
                      }} 
                    />
                    <Typography 
                      variant="h4" 
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
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Email */}
                <Grow in timeout={1200}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      p: 3,
                      borderRadius: 3,
                      backgroundColor: `${theme.palette.primary.main}08`,
                      border: `1px solid ${theme.palette.primary.main}20`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(8px)',
                        backgroundColor: `${theme.palette.primary.main}12`,
                        borderColor: `${theme.palette.primary.main}40`,
                      }
                    }}
                  >
                    <IconButton 
                      color="primary" 
                      sx={{ 
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                        mr: 3,
                        width: 56,
                        height: 56,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.dark,
                          transform: 'scale(1.1)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                      onClick={handleEmailClick}
                    >
                      <Email sx={{ fontSize: '1.5rem' }} />
                    </IconButton>
                    <Box>
                      <Typography variant="h6" gutterBottom color="primary" fontWeight={600}>
                        Email
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        sx={{ 
                          cursor: 'pointer',
                          '&:hover': { color: theme.palette.primary.main },
                          transition: 'color 0.2s ease',
                          fontWeight: 500
                        }}
                        onClick={handleEmailClick}
                      >
                        {personalInfo.email}
                      </Typography>
                      {contact.alternateEmail && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ 
                            mt: 0.5,
                            cursor: 'pointer',
                            '&:hover': { color: theme.palette.primary.main },
                            transition: 'color 0.2s ease'
                          }}
                          onClick={() => window.location.href = `mailto:${contact.alternateEmail}`}
                        >
                          {contact.alternateEmail}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Grow>

                <Divider />

                {/* Phone */}
                <Grow in timeout={1400}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      p: 3,
                      borderRadius: 3,
                      backgroundColor: `${theme.palette.secondary.main}08`,
                      border: `1px solid ${theme.palette.secondary.main}20`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(8px)',
                        backgroundColor: `${theme.palette.secondary.main}12`,
                        borderColor: `${theme.palette.secondary.main}40`,
                      }
                    }}
                  >
                    <IconButton 
                      color="secondary" 
                      sx={{ 
                        backgroundColor: theme.palette.secondary.main,
                        color: 'white',
                        mr: 3,
                        width: 56,
                        height: 56,
                        '&:hover': {
                          backgroundColor: theme.palette.secondary.dark,
                          transform: 'scale(1.1)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                      onClick={handlePhoneClick}
                    >
                      <Phone sx={{ fontSize: '1.5rem' }} />
                    </IconButton>
                    <Box>
                      <Typography variant="h6" gutterBottom color="secondary" fontWeight={600}>
                        Phone
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        sx={{ 
                          cursor: 'pointer',
                          '&:hover': { color: theme.palette.secondary.main },
                          transition: 'color 0.2s ease',
                          fontWeight: 500
                        }}
                        onClick={handlePhoneClick}
                      >
                        {personalInfo.phone}
                      </Typography>
                    </Box>
                  </Box>
                </Grow>

                <Divider />

                {/* Location */}
                <Grow in timeout={1600}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      p: 3,
                      borderRadius: 3,
                      backgroundColor: `${theme.palette.info.main}08`,
                      border: `1px solid ${theme.palette.info.main}20`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(8px)',
                        backgroundColor: `${theme.palette.info.main}12`,
                        borderColor: `${theme.palette.info.main}40`,
                      }
                    }}
                  >
                    <IconButton 
                      sx={{ 
                        backgroundColor: theme.palette.info.main,
                        color: 'white',
                        mr: 3,
                        width: 56,
                        height: 56,
                        '&:hover': {
                          backgroundColor: theme.palette.info.dark,
                          transform: 'scale(1.1)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <LocationOn sx={{ fontSize: '1.5rem' }} />
                    </IconButton>
                    <Box>
                      <Typography variant="h6" gutterBottom color="info.main" fontWeight={600}>
                        Location
                      </Typography>
                      <Typography variant="body1" color="text.primary" fontWeight={500}>
                        {personalInfo.location}
                      </Typography>
                    </Box>
                  </Box>
                </Grow>
              </Box>
                </CardContent>
              </Card>
              </Box>
            </Fade>
          </Grid>

          {/* Social Links & Scheduling */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
              {/* Social Links */}
              <Fade in timeout={1200}>
                <Box sx={{ flexGrow: 1 }}>
                  <Card 
                    elevation={0}
                    sx={{ 
                      height: '100%',
                      ...glowEffect,
                      ...cardHoverEffect,
                      borderRadius: 4,
                    }}
                  >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Star 
                        sx={{ 
                          fontSize: '2rem', 
                          color: theme.palette.secondary.main,
                          mr: 2
                        }} 
                      />
                      <Typography 
                        variant="h4" 
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
                
                    <Grid container spacing={2}>
                      {socialLinks.map((social, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Grow in timeout={1400 + index * 100}>
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
                                  transform: 'translateY(-4px) scale(1.02)',
                                  boxShadow: `0 8px 20px ${social.color}60`,
                                },
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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

              {/* Scheduling Section */}
              {contact.calendly && (
                <Fade in timeout={1600}>
                  <Box>
                    <Card 
                      elevation={0}
                      sx={{
                        ...glowEffect,
                        ...cardHoverEffect,
                        borderRadius: 4,
                      }}
                    >
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                        <CalendarToday 
                          sx={{ 
                            fontSize: '2rem', 
                            color: theme.palette.primary.main,
                            mr: 2
                          }} 
                        />
                        <Typography 
                          variant="h4" 
                          sx={{
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 600,
                          }}
                        >
                          Schedule a Meeting
                        </Typography>
                      </Box>
                      
                      <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 3 }}>
                        Ready for a conversation? Let's schedule a time that works for both of us.
                      </Typography>
                      
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<Send />}
                        href={contact.calendly}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          px: 4, 
                          py: 2,
                          fontSize: '1.1rem',
                          textTransform: 'none',
                          fontWeight: 600,
                          borderRadius: 3,
                          boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: `0 8px 20px ${theme.palette.primary.main}60`,
                          },
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        Book a Call
                      </Button>
                    </CardContent>
                  </Card>
                  </Box>
                </Fade>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactPage;
