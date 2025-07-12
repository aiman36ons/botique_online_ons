declare module '@mui/material/*';
declare module '@mui/icons-material/*';
declare module 'react-i18next';
declare module 'i18next';
declare module 'axios';
declare module '@reduxjs/toolkit';
declare module 'react-redux';
declare module 'react-router-dom';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number | string;
    image: string;
    stock: number;
    type?: string;
    is_active?: boolean;
    slug?: string;
    translations?: any;
    created_at?: string;
    updated_at?: string;
}

export interface CartItem extends Omit<Product, 'price'> {
    price: number; // Dans le panier, le prix est toujours un nombre
    quantity: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number;
    to: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface Order {
    id: number;
    user_id: number;
    status: string;
    payment_status: string;
    total: number | string;
    created_at: string;
    updated_at: string;
    items?: OrderItem[];
}

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number | string;
    product?: Product;
} 