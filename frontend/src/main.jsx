import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import AppRouter from './router/AppRouter';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--color-brand-primary)',
            color: 'var(--color-brand-accent)',
            fontSize: '14px',
            fontWeight: '500',
            borderRadius: '12px',
          },
          success: {
            iconTheme: { primary: 'var(--color-brand-secondary)', secondary: 'var(--color-brand-primary)' },
          },
        }}
      />
    </AuthProvider>
  </StrictMode>
);
