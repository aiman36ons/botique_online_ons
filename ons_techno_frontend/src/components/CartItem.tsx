import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../contexts/CartContext';

interface CartItemProps {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

export default function CartItem({ id, name, price, quantity, image }: CartItemProps) {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <Card sx={{ display: 'flex', mb: 2 }}>
            {image && (
                <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    image={image}
                    alt={name}
                />
            )}
            <CardContent sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        ${price.toFixed(2)}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                        size="small"
                        onClick={() => updateQuantity(id, quantity - 1)}
                    >
                        <RemoveIcon />
                    </IconButton>
                    <Typography>{quantity}</Typography>
                    <IconButton
                        size="small"
                        onClick={() => updateQuantity(id, quantity + 1)}
                    >
                        <AddIcon />
                    </IconButton>
                    <IconButton
                        size="small"
                        color="error"
                        onClick={() => removeFromCart(id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
} 