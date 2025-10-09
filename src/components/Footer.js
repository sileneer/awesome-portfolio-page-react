/**
 * Footer Component
 * 
 * Simple footer displaying:
 * - Made with React message
 * - Template attribution
 */

import {
    Box,
    Container,
    Typography,
    Link,
    useTheme,
} from '@mui/material';
import {
    GitHub,
    Favorite,
} from '@mui/icons-material';

const Footer = () => {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                mt: 'auto',
                py: 4,
                px: 2,
                backgroundColor: theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                borderTop: `1px solid ${theme.palette.divider}`,
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
                    }}
                >
                    Made with{' '}
                    <Favorite sx={{ fontSize: 16, color: 'error.main' }} /> 
                    using{' '}
                    <Link
                        href="https://react.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            color: 'primary.main',
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        React
                    </Link>
                    {' '}•{' '}
                    <GitHub sx={{ fontSize: 16 }} />
                    Built with{' '}
                    <Link
                        href="https://github.com/sileneer/awesome-portfolio-page-react"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            color: 'primary.main',
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        Awesome Portfolio Template
                    </Link>
                </Typography>
            </Container>
        </Box>
    );
};



export default Footer;
