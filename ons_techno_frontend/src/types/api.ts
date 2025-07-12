// Product type
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image?: string;
  stock?: number;
  category?: string;
}

// User type
export interface User {
  id: number;
  name: string;
  email: string;
  is_admin?: boolean;
}

// Order type
export interface Order {
  id: number;
  order_number: string;
  user?: User;
  customer_info?: {
    full_name: string;
    email: string;
    phone?: string;
  };
  total_amount: number;
  status: string;
  created_at: string;
  orderItems: Array<{
    id: number;
    product: Product;
    quantity: number;
    price: number;
    subtotal: number;
  }>;
} 