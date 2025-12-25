import axios from 'axios';

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL ||
  "https://delhi-tandoori-momo.onrender.com";

const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handler
const handleError = (error) => {
  console.error('API Error:', error);
  if (error.response) {
    throw new Error(error.response.data.detail || 'An error occurred');
  } else if (error.request) {
    throw new Error('Network error. Please check your connection.');
  } else {
    throw new Error('An unexpected error occurred');
  }
};

// Menu APIs
export const menuAPI = {
  getCategories: async () => {
  const response = await api.get('/menu/categories');

  const data = response.data;

  //  Normalize to array always
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.categories)) return data.categories;
  if (Array.isArray(data.data)) return data.data;

  return []; // fallback
},

  
  getItems: async (category = null) => {
    try {
      const params = category ? { category } : {};
      const response = await api.get('/menu/items', { params });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  
  getItem: async (itemId) => {
    try {
      const response = await api.get(`/menu/item/${itemId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

// Order APIs
export const orderAPI = {
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  
  getOrder: async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

// Review APIs
export const reviewAPI = {
  getReviews: async (limit = 10) => {
    try {
      const response = await api.get('/reviews', { params: { limit } });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  
  createReview: async (reviewData) => {
    try {
      const response = await api.post('/reviews', reviewData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

// Contact APIs
export const contactAPI = {
  sendMessage: async (messageData) => {
    try {
      const response = await api.post('/contact', messageData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

// Restaurant Info API
export const restaurantAPI = {
  getInfo: async () => {
    try {
      const response = await api.get('/restaurant/info');
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

export default api;