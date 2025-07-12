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
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  type: 'accessory' | 'digital' | 'service';
  stock: number;
}

const Products: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const type = searchParams.get('type') || 'all';
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = new URLSearchParams({
          page: page.toString(),
        });

        if (type !== 'all') {
          params.append('type', type);
        }

        if (search) {
          params.append('search', search);
        }

        const response = await axios.get(`http://localhost:8000/api/products?${params.toString()}`);
        setProducts(response.data.data);
        setTotalPages(Math.ceil(response.data.total / response.data.per_page));
      } catch (err) {
        setError(t('products.error', 'Erreur lors du chargement des produits'));
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [type, search, page, t]);

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
              image={product.image || '/images/placeholder.jpg'}
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
                disabled={product.stock === 0}
              >
                {product.stock === 0 
                  ? t('products.outOfStock', 'Rupture de stock')
                  : t('products.addToCart', 'Ajouter au panier')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={handlePageChange} 
          color="primary" 
        />
      </Box>
    </Container>
  );
};

export default Products; 