import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  useTheme
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon
} from '@mui/icons-material';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.grey[900],
        color: 'white'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 3 }}>
          {/* À propos */}
          <Box>
            <Typography variant="h6" gutterBottom>
              {t('footer.about', 'À propos')}
            </Typography>
            <Typography variant="body2">
              {t('footer.aboutText', 'Votre boutique en ligne de confiance pour tous vos besoins technologiques.')}
            </Typography>
          </Box>

          {/* Liens rapides */}
          <Box>
            <Typography variant="h6" gutterBottom>
              {t('footer.quickLinks', 'Liens rapides')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/products" color="inherit">
                {t('footer.products', 'Produits')}
              </Link>
              <Link href="/about" color="inherit">
                {t('footer.about', 'À propos')}
              </Link>
              <Link href="/contact" color="inherit">
                {t('footer.contact', 'Contact')}
              </Link>
            </Box>
          </Box>

          {/* Contact */}
          <Box>
            <Typography variant="h6" gutterBottom>
              {t('footer.contact', 'Contact')}
            </Typography>
            <Typography variant="body2" paragraph>
              Email: contact@onstechno.com
            </Typography>
            <Typography variant="body2" paragraph>
              Tél: +213 123 456 789
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} {t('footer.copyright', 'Ons Techno. Tous droits réservés.')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 