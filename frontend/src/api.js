import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Products API
export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data.data || response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data.data || response.data;
};

// Cart API
export const getCart = async () => {
  const response = await api.get('/cart');
  return response.data;
};

export const addToCart = async (productId, qty = 1) => {
  const response = await api.post('/cart', { productId, qty });
  return response.data.data || response.data;
};

export const updateCartItem = async (id, qty) => {
  const response = await api.put(`/cart/${id}`, { qty });
  return response.data.data || response.data;
};

export const deleteCartItem = async (id) => {
  const response = await api.delete(`/cart/${id}`);
  return response.data;
};

export const checkout = async (cartItems, name, email) => {
  const response = await api.post('/cart/checkout', { cartItems, name, email });
  return response.data.data || response.data;
};

export default api;
