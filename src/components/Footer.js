import { Box, Container, Typography, Link, useTheme } from '@mui/material';
import { Favorite } from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 4,
        px: 2,
        backgroundColor: 'transparent',
        borderTop: `1px solid ${theme.palette.divider}`,
        mb: { xs: 8, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
            flexWrap: 'wrap',
            fontFamily: '"Outfit", sans-serif',
          }}
        >
          Crafted with{' '}
          <Favorite sx={{ fontSize: 16, color: theme.palette.secondary.main }} aria-label="love" />
          {' '}using{' '}
          <Link
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': { textShadow: `0 0 8px ${theme.palette.primary.main}` },
            }}
          >
            React
          </Link>
          {' '}&{' '}
          <Link
            href="https://framer.com/motion"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'secondary.main',
              textDecoration: 'none',
              '&:hover': { textShadow: `0 0 8px ${theme.palette.secondary.main}` },
            }}
          >
            Framer Motion
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
