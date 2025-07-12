import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Card,
  CardContent,
  Divider,
  FormLabel,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Snackbar
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import { createOrder } from '../services/api';
import { CartItem } from '../types';

const formatPrice = (price: number | string): string => {
  if (price === null || price === undefined) return '0.00';
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numericPrice)) return '0.00';
  return numericPrice.toFixed(2);
};

const calculateItemTotal = (price: number | string, quantity: number): string => {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  return (numericPrice * quantity).toFixed(2);
};

const Checkout: React.FC = () => {
  const { t } = useTranslation();
  const { items, totalPrice, clearCart } = useCart();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'DZ'
  });

  const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Construction du payload attendu par le backend
      const shipping_address = {
        street: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        postal_code: shippingInfo.postalCode,
        country: shippingInfo.country
      };

      const billing_address = shipping_address;

      const customer_info = {
        full_name: shippingInfo.fullName,
        email: shippingInfo.email,
        phone: shippingInfo.phone
      };

      const orderItems = (items as CartItem[]).map((item) => ({
        product_id: item.id,
        quantity: item.quantity
      }));

      const response = await createOrder({
        items: orderItems,
        payment_method: paymentMethod,
        shipping_address,
        billing_address,
        currency: 'DZD',
        customer_info
      });

      // Afficher le numéro de commande
      setSnackbar({
        open: true,
        message: `Commande créée avec succès ! Numéro de commande: ${response.order_number}`,
        severity: 'success'
      });

      // Vider le panier
      clearCart();

    } catch (err: any) {
      console.error('Erreur lors de la création de la commande:', err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || 'Erreur lors de la création de la commande',
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>{t('checkout.title', 'Finaliser la commande')}</Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' }, gap: 3 }}>
          {/* Informations de livraison */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>{t('checkout.shippingInfo', 'Informations de livraison')}</Typography>

              <TextField
                fullWidth
                required
                label={t('checkout.fullName', 'Nom complet')}
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                required
                label={t('checkout.email', 'Email')}
                name="email"
                type="email"
                value={shippingInfo.email}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                required
                label={t('checkout.phone', 'Numéro de téléphone')}
                name="phone"
                value={shippingInfo.phone}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                required
                label={t('checkout.address', 'Adresse')}
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                required
                label={t('checkout.city', 'Ville')}
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label={t('checkout.state', 'État/Région')}
                name="state"
                value={shippingInfo.state}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label={t('checkout.postalCode', 'Code postal')}
                name="postalCode"
                value={shippingInfo.postalCode}
                onChange={handleInputChange}
                margin="normal"
              />
            </CardContent>
          </Card>

          {/* Méthode de paiement + résumé */}
          <Card>
            <CardContent>
              <FormLabel component="legend">{t('checkout.paymentMethod', 'Méthode de paiement')}</FormLabel>
              <RadioGroup
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="paypal"
                  control={<Radio />}
                  label="PayPal"
                />
                <FormControlLabel
                  value="baridi_mob"
                  control={<Radio />}
                  label="BaridiMob"
                />
                <FormControlLabel
                  value="cash_on_delivery"
                  control={<Radio />}
                  label={t('checkout.cod', 'Paiement à la livraison')}
                />
              </RadioGroup>

              <Divider sx={{ my: 2 }} />

              {/* Résumé de commande dynamique */}
              <Typography variant="subtitle1" sx={{ mb: 1 }}>{t('checkout.orderSummary', 'Résumé de la commande')}</Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Produit</TableCell>
                      <TableCell>Quantité</TableCell>
                      <TableCell>Prix</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <img src={item.image} alt={item.name} style={{ width: 40, height: 40, objectFit: 'contain' }} />
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{formatPrice(item.price)} €</TableCell>
                        <TableCell>{calculateItemTotal(item.price, item.quantity)} €</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ mt: 2, textAlign: 'right' }}>
                <Typography fontWeight="bold">
                  {t('checkout.total', 'Total')}: {typeof totalPrice === 'string' ? parseFloat(totalPrice).toFixed(2) : totalPrice.toFixed(2)} €
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={isSubmitting}
                sx={{ mt: 3 }}
              >
                {isSubmitting ? 'Traitement...' : t('checkout.placeOrder', 'Passer la commande')}
              </Button>
            </CardContent>
          </Card>
        </Box>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Checkout; 