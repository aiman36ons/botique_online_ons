import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  IconButton,
  TextField,
  useTheme
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';

interface CartItem {
  id: number;
  product: {
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
}

const Cart: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch cart items from API or local storage
    setCartItems([
      {
        id: 1,
        product: { name: 'Produit 1', price: 1000, image: '' },
        quantity: 2
      },
      {
        id: 2,
        product: { name: 'Produit 2', price: 1500, image: '' },
        quantity: 1
      }
    ]);
    setLoading(false);
  }, []);

  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        {t('cart.title')}
      </Typography>
      {cartItems.length === 0 ? (
        <Card>
          <CardContent>
            <Typography align="center" color="textSecondary">
              {t('cart.empty')}
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" color="primary" onClick={() => navigate('/products')}>
                {t('products.title')}
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
          <Box>
            {cartItems.map((item) => (
              <Card key={item.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr 1fr auto', gap: 2, alignItems: 'center' }}>
                    <Box sx={{ width: 80, height: 80, bgcolor: 'grey.200' }} />
                    <Box>
                      <Typography variant="h6">{item.product.name}</Typography>
                      <Typography color="textSecondary">{item.product.price} DZD</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton onClick={() => handleQuantityChange(item.id, -1)}>
                        <RemoveIcon />
                      </IconButton>
                      <TextField
                        value={item.quantity}
                        size="small"
                        sx={{ width: 50, mx: 1 }}
                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                      />
                      <IconButton onClick={() => handleQuantityChange(item.id, 1)}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <Typography>{item.product.price * item.quantity} DZD</Typography>
                    <IconButton color="error" onClick={() => handleRemove(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
          <Box>
            <Card>
              <CardContent>
                <Typography variant="h6">{t('cart.summary')}</Typography>
                <Typography>{t('cart.subtotal')}: {subtotal} DZD</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => navigate('/checkout')}
                >
                  {t('cart.checkout')}
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Cart; 