import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const getProductos = () => api.get('/productos');
export const getVentas = () => api.get('/ventas');
export const crearVenta = (payload) => api.post('/ventas', payload);
