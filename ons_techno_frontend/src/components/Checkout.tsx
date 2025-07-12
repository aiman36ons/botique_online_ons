import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Card,
  CardContent,
} from '@mui/material';
import { useCart } from '../contexts/CartContext';
import { createOrder } from '../services/api';

const steps = ['Adresse de livraison', 'Paiement', 'Confirmation'];

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStep(1);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStep(2);
  };

  const handleConfirmOrder = async () => {
    try {
      setLoading(true);
      setError(null);

      const orderData = {
        items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        shipping_address: shippingAddress,
        total_amount: totalPrice,
      };

      await createOrder(orderData);
      clearCart();
      navigate('/orders');
    } catch (err) {
      setError('Une erreur est survenue lors de la création de la commande');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      try {
        setLoading(true);
        setError(null);
        await createOrder({
          items: items.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
          })),
          shipping_address: shippingAddress,
          total_amount: totalPrice,
        });
        clearCart();
        navigate('/order-success');
      } catch (err) {
        setError('Une erreur est survenue lors de la création de la commande');
        console.error('Order creation error:', err);
      } finally {
        setLoading(false);
      }
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleAddressChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <form onSubmit={handleShippingSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Prénom"
                  value={shippingAddress.firstName}
                  onChange={handleAddressChange('firstName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Nom"
                  value={shippingAddress.lastName}
                  onChange={handleAddressChange('lastName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Adresse"
                  value={shippingAddress.address}
                  onChange={handleAddressChange('address')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Ville"
                  value={shippingAddress.city}
                  onChange={handleAddressChange('city')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Code postal"
                  value={shippingAddress.postalCode}
                  onChange={handleAddressChange('postalCode')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Pays"
                  value={shippingAddress.country}
                  onChange={handleAddressChange('country')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Téléphone"
                  value={shippingAddress.phone}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, phone: e.target.value })
                  }
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Continuer
              </Button>
            </Box>
          </form>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Résumé de la commande
            </Typography>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                {items.map((item) => (
                  <Box key={item.id} sx={{ mb: 1 }}>
                    <Typography>
                      {item.name} x {item.quantity} - {(item.price * item.quantity).toFixed(2)} €
                    </Typography>
                  </Box>
                ))}
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Total: {totalPrice.toFixed(2)} €
                </Typography>
              </CardContent>
            </Card>
            <Typography variant="body1" gutterBottom>
              Paiement par carte bancaire
            </Typography>
            <form onSubmit={handlePaymentSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Numéro de carte"
                    value={paymentInfo.cardNumber}
                    onChange={(e) =>
                      setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Nom sur la carte"
                    value={paymentInfo.cardName}
                    onChange={(e) =>
                      setPaymentInfo({ ...paymentInfo, cardName: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Date d'expiration"
                    placeholder="MM/AA"
                    value={paymentInfo.expiryDate}
                    onChange={(e) =>
                      setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="CVV"
                    value={paymentInfo.cvv}
                    onChange={(e) =>
                      setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  onClick={() => setActiveStep(0)}
                >
                  Retour
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Continuer
                </Button>
              </Box>
            </form>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Confirmation de la commande
            </Typography>
            <Typography>
              Veuillez vérifier les informations de votre commande avant de la confirmer.
            </Typography>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Commande
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {renderStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Retour
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={loading}
          >
            {activeStep === steps.length - 1 ? 'Confirmer la commande' : 'Suivant'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Checkout; 