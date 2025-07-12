import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import { getOrders } from '../services/api';

interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  product: {
    name: string;
    image: string;
  };
}

interface Order {
  id: number;
  total_amount: number;
  status: string;
  created_at: string;
  items: OrderItem[];
  shipping_address: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'warning';
    case 'processing':
      return 'info';
    case 'shipped':
      return 'primary';
    case 'delivered':
      return 'success';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        setError('Erreur lors du chargement des commandes');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6">
            Vous n'avez pas encore de commandes
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mes commandes
      </Typography>
      {orders.map((order) => (
        <Paper key={order.id} sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">
                  Commande #{order.id}
                </Typography>
                <Chip
                  label={order.status}
                  color={getStatusColor(order.status) as any}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Passée le {formatDate(order.created_at)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="subtitle1" gutterBottom>
                Articles
              </Typography>
              {order.items.map((item) => (
                <Box key={item.id} sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2}>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        style={{
                          width: '100%',
                          maxHeight: '60px',
                          objectFit: 'contain',
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        {item.product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantité: {item.quantity}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body1" align="right">
                        {(item.price * item.quantity).toFixed(2)} €
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Grid>
            <Grid item xs={12} md={4}>
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Adresse de livraison
                </Typography>
                <Typography variant="body2">
                  {order.shipping_address.firstName} {order.shipping_address.lastName}
                </Typography>
                <Typography variant="body2">
                  {order.shipping_address.address}
                </Typography>
                <Typography variant="body2">
                  {order.shipping_address.postalCode} {order.shipping_address.city}
                </Typography>
                <Typography variant="body2">
                  {order.shipping_address.country}
                </Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1">
                  Total: {order.total_amount.toFixed(2)} €
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Container>
  );
};

export default Orders; 