import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  MenuItem,
  Pagination
} from '@mui/material';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  type: 'accessory' | 'digital' | 'service';
}

const Products: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const type = searchParams.get('type') || 'all';
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    // Simuler un appel API
    setLoading(true);
    setTimeout(() => {
      const mockProducts: Product[] = [
        {
          id: 1,
          name: 'Clavier mécanique RGB',
          description: 'Clavier mécanique gaming avec rétroéclairage RGB',
          price: 12000,
          image: '/images/keyboard.jpg',
          type: 'accessory'
        },
        {
          id: 2,
          name: 'Souris gaming',
          description: 'Souris gaming avec capteur optique haute précision',
          price: 8000,
          image: '/images/mouse.jpg',
          type: 'accessory'
        },
        {
          id: 3,
          name: 'Licence Windows 10 Pro',
          description: 'Licence numérique pour Windows 10 Professionnel',
          price: 15000,
          image: '/images/windows.jpg',
          type: 'digital'
        }
      ];

      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev: URLSearchParams) => {
      prev.set('type', event.target.value);
      prev.set('page', '1');
      return prev;
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev: URLSearchParams) => {
      prev.set('search', event.target.value);
      prev.set('page', '1');
      return prev;
    });
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams((prev: URLSearchParams) => {
      prev.set('page', value.toString());
      return prev;
    });
  };

  if (loading) {
    return (
      <Container>
        <Typography>{t('common.loading', 'Chargement...')}</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        {t('products.title', 'Nos Produits')}
      </Typography>

      {/* Filtres */}
      <Box sx={{ mb: 4, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
        <TextField
          select
          label={t('products.filterByType', 'Filtrer par type')}
          value={type}
          onChange={handleTypeChange}
          fullWidth
        >
          <MenuItem value="all">{t('products.allTypes', 'Tous les types')}</MenuItem>
          <MenuItem value="accessory">{t('products.type.accessory', 'Accessoires')}</MenuItem>
          <MenuItem value="digital">{t('products.type.digital', 'Produits numériques')}</MenuItem>
          <MenuItem value="service">{t('products.type.service', 'Services')}</MenuItem>
        </TextField>

        <TextField
          label={t('products.search', 'Rechercher')}
          value={search}
          onChange={handleSearchChange}
          fullWidth
        />
      </Box>

      {/* Liste des produits */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        gap: 3,
        mb: 4
      }}>
        {products.map((product) => (
          <Card key={product.id} sx={{ height: '100%' }}>
            <CardMedia
              component="img"
              height="200"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {product.description}
              </Typography>
              <Typography variant="h6" color="primary">
                {product.price.toLocaleString()} DZD
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                {t('products.addToCart', 'Ajouter au panier')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination 
          count={10} 
          page={page} 
          onChange={handlePageChange} 
          color="primary" 
        />
      </Box>
    </Container>
  );
};

export default Products; 