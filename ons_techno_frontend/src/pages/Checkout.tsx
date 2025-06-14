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
  Box
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const Checkout: React.FC = () => {
  const { t } = useTranslation();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    phone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('cod'); // cod = Cash on Delivery

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit order logic
    console.log('Shipping Info:', shippingInfo);
    console.log('Payment Method:', paymentMethod);
    alert('Commande enregistrée avec succès !');
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
                required
                label={t('checkout.phone', 'Numéro de téléphone')}
                name="phone"
                value={shippingInfo.phone}
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
                  value="baridimob"
                  control={<Radio />}
                  label="BaridiMob"
                />
                <FormControlLabel
                  value="cod"
                  control={<Radio />}
                  label={t('checkout.cod', 'Paiement à la livraison')}
                />
              </RadioGroup>

              <Divider sx={{ my: 2 }} />

              {/* Résumé de commande statique pour exemple */}
              <Box>
                <Typography variant="subtitle1">{t('checkout.orderSummary', 'Résumé de la commande')}</Typography>
                <Typography>Produit 1 x2 - 2000 DZD</Typography>
                <Typography>Produit 2 x1 - 1500 DZD</Typography>
                <Typography fontWeight="bold" sx={{ mt: 1 }}>
                  {t('checkout.total', 'Total')}: 3500 DZD
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ mt: 3 }}
              >
                {t('checkout.placeOrder', 'Passer la commande')}
              </Button>
            </CardContent>
          </Card>
        </Box>
      </form>
    </Container>
  );
};

export default Checkout; 