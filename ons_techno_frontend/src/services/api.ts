import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

// Attach JWT token to every request if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Redirect to login on 401 and clear token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// --- Product APIs ---
export const getProducts = async (params = {}) => {
  const res = await api.get('/products', { params });
  return res.data;
};

export const getProduct = async (id: number | string) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

// --- Auth APIs ---
export const login = async (credentials: { email: string; password: string }) => {
  const res = await api.post('/login', credentials);
  if (res.data.token) {
    localStorage.setItem('token', res.data.token);
  }
  return res.data;
};

export const register = async (userData: { name: string; email: string; password: string }) => {
  const res = await api.post('/register', userData);
  if (res.data.token) {
    localStorage.setItem('token', res.data.token);
  }
  return res.data;
};

export const getMe = async () => {
  const res = await api.get('/user');
  return res.data;
};

// --- Order APIs ---
export const createOrder = async (orderData: any) => {
  const res = await api.post('/orders', orderData);
  return res.data;
};

export const getOrders = async (params = {}) => {
  const res = await api.get('/orders', { params });
  return res.data;
};

export const getAllOrders = async (params = {}) => {
  const res = await api.get('/admin/orders', { params });
  return res.data;
};

export default api;