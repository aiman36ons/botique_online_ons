import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Menu as MenuIcon,
  Language as LanguageIcon
} from '@mui/icons-material';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState<null | HTMLElement>(null);

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    setLanguageMenuAnchor(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const navItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.products'), path: '/products' },
    { label: t('nav.orders'), path: '/orders' },
    { label: t('nav.profile'), path: '/profile' }
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold'
          }}
        >
          Ons_Techno
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              onClick={handleMobileMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMobileMenuClose}
            >
              {navItems.map((item) => (
                <MenuItem
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  onClick={handleMobileMenuClose}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                component={RouterLink}
                to={item.path}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        <IconButton
          color="inherit"
          onClick={(e) => setLanguageMenuAnchor(e.currentTarget)}
        >
          <LanguageIcon />
        </IconButton>
        <Menu
          anchorEl={languageMenuAnchor}
          open={Boolean(languageMenuAnchor)}
          onClose={() => setLanguageMenuAnchor(null)}
        >
          <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
          <MenuItem onClick={() => handleLanguageChange('fr')}>Français</MenuItem>
          <MenuItem onClick={() => handleLanguageChange('ar')}>العربية</MenuItem>
        </Menu>

        <IconButton
          color="inherit"
          component={RouterLink}
          to="/cart"
        >
          <Badge badgeContent={0} color="secondary">
            <CartIcon />
          </Badge>
        </IconButton>

        <Button
          color="inherit"
          component={RouterLink}
          to="/login"
          sx={{ ml: 2 }}
        >
          {t('nav.login')}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 