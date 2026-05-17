import axios from 'axios';

// Production: VITE_API_BASE_URL is set via Vercel env vars
// Development: falls back to localhost proxy
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://travelswebsitebackend.onrender.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  // Render's free tier can have cold starts of 15-20s — use 30s timeout
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

// Request interceptor — attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('slt_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — unified error handling
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Network error (CORS, server down, etc.)
    if (!err.response) {
      console.error('🔴 Network/CORS Error:', err.message, '| URL:', err.config?.url);
      err.message = 'Cannot connect to server. Please try again shortly.';
      return Promise.reject(err);
    }

    // Unauthorized — clear auth and redirect ONLY if not already on auth pages
    if (err.response?.status === 401) {
      const isAuthPage = ['/login', '/signin', '/register', '/signup'].some(
        (p) => window.location.pathname.includes(p)
      );
      if (!isAuthPage) {
        localStorage.removeItem('slt_token');
        localStorage.removeItem('slt_user');
        window.location.href = '/login';
      }
    }

    return Promise.reject(err);
  }
);

export default api;
