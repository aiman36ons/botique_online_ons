import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    Button,
    Grid,
    Card,
    CardContent,
    IconButton,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Divider
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';

// Fonction utilitaire pour formater le prix
const formatPrice = (price: number | string): string => {
    if (price === null || price === undefined) return '0.00';
    
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    
    if (isNaN(numericPrice)) return '0.00';
    
    return numericPrice.toFixed(2);
};

// Fonction pour calculer le prix total d'un item
const calculateItemTotal = (price: number | string, quantity: number): string => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return (numericPrice * quantity).toFixed(2);
};

export default function Cart() {
    const { items, totalPrice, clearCart, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();

    if (items.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Votre panier est vide
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/products')}
                >
                    Continuer vos achats
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Votre panier
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <TableContainer component={Paper} sx={{ mb: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Produit</TableCell>
                                    <TableCell>Prix unitaire</TableCell>
                                    <TableCell>Quantité</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                style={{ width: 60, height: 60, objectFit: 'contain' }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{item.name}</Typography>
                                        </TableCell>
                                        <TableCell>{formatPrice(item.price)} €</TableCell>
                                        <TableCell>
                                            <TextField
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value);
                                                    if (value > 0 && value <= item.stock) {
                                                        updateQuantity(item.id, value);
                                                    }
                                                }}
                                                inputProps={{ min: 1, max: item.stock }}
                                                size="small"
                                                sx={{ width: 70 }}
                                            />
                                        </TableCell>
                                        <TableCell>{calculateItemTotal(item.price, item.quantity)} €</TableCell>
                                        <TableCell>
                                            <IconButton color="error" onClick={() => removeFromCart(item.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Résumé de la commande
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ my: 2 }}>
                                <Typography variant="body1">
                                    Total: {typeof totalPrice === 'string' ? parseFloat(totalPrice).toFixed(2) : totalPrice.toFixed(2)} €
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => navigate('/checkout')}
                                sx={{ mb: 1 }}
                            >
                                Passer la commande
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                fullWidth
                                onClick={clearCart}
                            >
                                Vider le panier
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
} 