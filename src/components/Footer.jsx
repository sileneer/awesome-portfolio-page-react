import { Box, Container, Typography, Link, useTheme } from '@mui/material';
import { Heart } from 'lucide';
import { Github } from './brandIcons';
import AppIcon from './AppIcon';
import { iconSize, bottomSafeArea } from '../theme/tokens';

const Footer = () => {
  const theme = useTheme();

  // The links are inline in a sentence, so WCAG's 44px target rule does not
  // apply to them (WCAG 2.5.8 exempts targets in a sentence). They still get
  // vertical padding so they are comfortably tappable on a phone.
  const linkSx = {
    color: 'primary.main',
    textDecoration: 'none',
    display: 'inline-block',
    py: 1,
    '&:hover': { textShadow: `0 0 8px ${theme.palette.primary.main}` },
  };

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 4,
        px: 2,
        backgroundColor: 'transparent',
        borderTop: `1px solid ${theme.palette.divider}`,
        // Clearance for the fixed bottom navigation dock. This is the only
        // place the bottom safe area is defined.
        mb: bottomSafeArea,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            align: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
            flexWrap: 'wrap',
            fontFamily: '"Outfit", sans-serif',
          }}
        >
          Crafted with{' '}
          <AppIcon icon={Heart} size={iconSize.inline} label="love" style={{ color: theme.palette.secondary.main }} />
          {' '}using{' '}
          <Link
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            sx={linkSx}
          >
            React
          </Link>
          {' '}&{' '}
          <Link
            href="https://framer.com/motion"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ ...linkSx, color: 'secondary.main', '&:hover': { textShadow: `0 0 8px ${theme.palette.secondary.main}` } }}
          >
            Framer Motion
          </Link>
          {' '}•{' '}
          <AppIcon icon={Github} size={iconSize.inline} aria-hidden="true" />
          {' '}Built with{' '}
          <Link
            href="https://github.com/sileneer/awesome-portfolio-page-react"
            target="_blank"
            rel="noopener noreferrer"
            sx={linkSx}
          >
            Awesome Portfolio Template
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
