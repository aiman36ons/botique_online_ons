import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Box,
  Rating,
  TextField,
  useTheme
} from '@mui/material';
import { ShoppingCart as CartIcon } from '@mui/icons-material';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  stock: number;
}

const ProductDetail: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const { t } = useTranslation();
  const theme = useTheme();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`);
      setProduct(response.data.data);
      setError(null);
    } catch (err) {
      setError(t('products.fetchError'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container>
        <Typography color="error">{error || t('products.notFound')}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={product.image}
              alt={product.name}
              sx={{ objectFit: 'contain' }}
            />
          </Card>
        </Box>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={product.rating} readOnly precision={0.5} />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.rating})
            </Typography>
          </Box>
          <Typography variant="h5" color="primary" gutterBottom>
            {product.price} DZD
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
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<CartIcon />}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {t('products.addToCart')}
            </Button>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {t('products.stock')}: {product.stock}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetail; 