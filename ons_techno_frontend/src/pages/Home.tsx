import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  useTheme
} from '@mui/material';
import {
  Computer as ComputerIcon,
  Code as CodeIcon,
  Build as BuildIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const categories = [
    {
      title: t('products.type.accessory'),
      description: 'High-quality IT accessories for your devices',
      icon: <ComputerIcon sx={{ fontSize: 60 }} />,
      link: '/products?type=accessory'
    },
    {
      title: t('products.type.digital'),
      description: 'Digital products and software solutions',
      icon: <CodeIcon sx={{ fontSize: 60 }} />,
      link: '/products?type=digital'
    },
    {
      title: t('products.type.service'),
      description: 'Professional IT services and support',
      icon: <BuildIcon sx={{ fontSize: 60 }} />,
      link: '/products?type=service'
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Clavier mécanique RGB',
      image: '/images/keyboard.jpg',
      price: '12000 DZD'
    },
    {
      id: 2,
      name: 'Souris gaming',
      image: '/images/mouse.jpg',
      price: '8000 DZD'
    },
    {
      id: 3,
      name: 'Casque audio',
      image: '/images/headphones.jpg',
      price: '15000 DZD'
    }
  ];

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ 
        textAlign: 'center', 
        py: 8,
        background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
        borderRadius: 2,
        color: 'white',
        mb: 6
      }}>
        <Typography variant="h2" component="h1" gutterBottom>
          {t('home.welcome', 'Bienvenue chez Ons_Techno')}
        </Typography>
        <Typography variant="h5" paragraph>
          {t('home.subtitle', 'Votre destination pour tous vos besoins technologiques')}
        </Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          size="large"
          onClick={() => navigate('/products')}
        >
          {t('home.shopNow', 'Acheter maintenant')}
        </Button>
      </Box>

      {/* Featured Products */}
      <Typography variant="h4" component="h2" gutterBottom>
        {t('home.featuredProducts', 'Produits en vedette')}
      </Typography>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        gap: 3,
        mb: 6
      }}>
        {featuredProducts.map((product) => (
          <Card key={product.id} sx={{ height: '100%' }}>
            <CardMedia
              component="img"
              height="200"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">
                {product.name}
              </Typography>
              <Typography variant="h6" color="primary">
                {product.price}
              </Typography>
              <Button 
                variant="outlined" 
                color="primary"
                onClick={() => navigate(`/products/${product.id}`)}
                sx={{ mt: 2 }}
              >
                {t('home.viewDetails', 'Voir les détails')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Categories */}
      <Typography variant="h4" component="h2" gutterBottom>
        {t('home.categories', 'Catégories')}
      </Typography>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        gap: 3
      }}>
        {['accessory', 'digital', 'service'].map((category) => (
          <Card key={category} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h3" gutterBottom>
                {t(`products.type.${category}`)}
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => navigate(`/products?type=${category}`)}
                sx={{ mt: 2 }}
              >
                {t('home.browseCategory', 'Parcourir')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Categories Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          {t('home.categories')}
        </Typography>
        <Box sx={{ mt: 2 }}>
          {categories.map((category) => (
            <Card
              key={category.title}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: 3
              }}
            >
              <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                {category.icon}
              </Box>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  {category.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {category.description}
                </Typography>
                <Button
                  component={RouterLink}
                  to={category.link}
                  variant="outlined"
                  color="primary"
                >
                  {t('home.explore')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            {t('home.whyChooseUs')}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                {t('home.quality')}
              </Typography>
              <Typography>
                We offer only the highest quality products and services.
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                {t('home.support')}
              </Typography>
              <Typography>
                24/7 customer support to help you with any questions.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                {t('home.security')}
              </Typography>
              <Typography>
                Secure payment methods and data protection.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default Home; 