import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import axios from 'axios';

interface Order {
  id: number;
  order_number: string;
  total_amount: number;
  status: string;
  payment_method: string;
  payment_status: string;
  created_at: string;
  items: OrderItem[];
}

interface OrderItem {
  id: number;
  product: {
    name: string;
    price: number;
  };
  quantity: number;
  subtotal: number;
}

const Orders: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders`);
      setOrders(response.data.data);
      setError(null);
    } catch (err) {
      setError(t('orders.fetchError'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: number) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/orders/${orderId}/cancel`);
      fetchOrders();
    } catch (err) {
      setError(t('orders.cancelError'));
      console.error(err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'processing':
        return 'info';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
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
        {t('orders.title')}
      </Typography>

      {orders.length === 0 ? (
        <Card>
          <CardContent>
            <Typography align="center" color="textSecondary">
              {t('orders.noOrders')}
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/products')}
              >
                {t('products.title')}
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('orders.orderNumber')}</TableCell>
                <TableCell>{t('orders.date')}</TableCell>
                <TableCell>{t('orders.total')}</TableCell>
                <TableCell>{t('orders.status')}</TableCell>
                <TableCell>{t('orders.paymentMethod')}</TableCell>
                <TableCell>{t('orders.actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.order_number}</TableCell>
                  <TableCell>
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order.total_amount} DZD</TableCell>
                  <TableCell>
                    <Chip
                      label={t(`orders.status.${order.status}`)}
                      color={getStatusColor(order.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {t(`checkout.paymentMethods.${order.payment_method}`)}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        startIcon={<ViewIcon />}
                        onClick={() => navigate(`/orders/${order.id}`)}
                      >
                        {t('orders.details')}
                      </Button>
                      {order.status === 'pending' && (
                        <Button
                          size="small"
                          color="error"
                          startIcon={<CancelIcon />}
                          onClick={() => handleCancelOrder(order.id)}
                        >
                          {t('orders.cancel')}
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Orders; 