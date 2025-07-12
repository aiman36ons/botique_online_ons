import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    CircularProgress,
    Alert,
    Pagination,
} from '@mui/material';
import { getProducts } from '../services/api';
import { useCart } from '../contexts/CartContext';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number | string;
    image: string;
    stock: number;
}

interface PaginatedResponse {
    data: Product[];
    current_page: number;
    last_page: number;
    total: number;
}

// Fonction utilitaire pour formater le prix
const formatPrice = (price: number | string): string => {
    if (price === null || price === undefined) return '0.00';
    
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    
    if (isNaN(numericPrice)) return '0.00';
    
    return numericPrice.toFixed(2);
};

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { addToCart } = useCart();

    const fetchProducts = async (pageNumber: number) => {
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching products...');
            const response = await getProducts({ page: pageNumber });
            console.log('API Response:', response);
            
            if (response && response.data) {
                setProducts(response.data);
                setTotalPages(response.last_page);
            } else {
                throw new Error('Format de réponse invalide');
            }
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err instanceof Error ? err.message : 'Erreur lors du chargement des produits');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    const handleAddToCart = (product: Product) => {
        try {
            // Convert price to number if it's a string
            const productWithNumericPrice = {
                ...product,
                price: typeof product.price === 'string' ? parseFloat(product.price) : product.price
            };
            addToCart(productWithNumericPrice);
            console.log('Product added to cart:', productWithNumericPrice);
        } catch (err) {
            console.error('Error adding to cart:', err);
            setError('Erreur lors de l\'ajout au panier');
        }
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

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
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => fetchProducts(page)}
                    >
                        Réessayer
                    </Button>
                </Box>
            </Container>
        );
    }

    if (!products.length) {
        return (
            <Container>
                <Alert severity="info">Aucun produit disponible</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Nos Produits
            </Typography>
            <Grid container spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.image}
                                alt={product.name}
                                sx={{ objectFit: 'contain', p: 2 }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {product.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                    }}
                                >
                                    {product.description}
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="h6" color="primary">
                                        {formatPrice(product.price)} €
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleAddToCart(product)}
                                        disabled={product.stock === 0}
                                        fullWidth
                                        sx={{ mt: 1 }}
                                    >
                                        {product.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {totalPages > 1 && (
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>
            )}
        </Container>
    );
};

export default ProductList; 