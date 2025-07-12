import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
  Box,
  TextField,
  CircularProgress
} from '@mui/material';
import { ShoppingCart as CartIcon } from '@mui/icons-material';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  type: 'accessory' | 'digital' | 'service';
  stock: number;
  is_active: boolean;
}

const ProductDetail: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const { t } = useTranslation();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:8000/api/products/${id}`);
      setProduct(response.data);
    } catch (error: unknown) {
      console.error('Error fetching product:', error);
      const axiosError = error as { response?: { status: number } };
      if (axios.isAxiosError(error) && axiosError.response?.status === 404) {
        setError(t('products.notFound', 'Produit non trouvé'));
      } else {
        setError(t('products.fetchError', 'Erreur lors du chargement du produit'));
      }
    } finally {
      setLoading(false);
    }
  }, [id, t]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value > 0 && value <= (product?.stock || 1)) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', { productId: id, quantity });
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container>
        <Typography color="error" variant="h6" align="center" sx={{ mt: 4 }}>
          {error || t('products.notFound', 'Produit non trouvé')}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, py: 4 }}>
        <Box>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={product.image || '/images/placeholder.jpg'}
              alt={product.name}
              sx={{ objectFit: 'contain', bgcolor: 'grey.100' }}
            />
          </Card>
        </Box>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            {product.price.toLocaleString()} DZD
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1, max: product.stock }}
              sx={{ width: '100px', mr: 2 }}
              disabled={product.stock === 0}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<CartIcon />}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              fullWidth
            >
              {product.stock === 0 
                ? t('products.outOfStock', 'Rupture de stock')
                : t('products.addToCart', 'Ajouter au panier')}
            </Button>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {t('products.stock', 'Stock disponible')}: {product.stock}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {t('products.type', 'Type')}: {t(`products.type.${product.type}`, product.type)}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetail; 