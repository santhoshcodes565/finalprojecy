import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem('slt_token');
      const storedUser = localStorage.getItem('slt_user');
      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      localStorage.removeItem('slt_token');
      localStorage.removeItem('slt_user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token, user: userData } = res.data;

    localStorage.setItem('slt_token', token);
    localStorage.setItem('slt_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const register = async (name, email, phone, password, dob, city, whatsapp) => {
    const res = await api.post('/auth/register', { name, email, phone, password, dob, city, whatsapp });
    const { token, user: userData } = res.data;

    localStorage.setItem('slt_token', token);
    localStorage.setItem('slt_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const updateProfile = async (data) => {
    const res = await api.put('/auth/profile', data);
    const { user: userData } = res.data;
    localStorage.setItem('slt_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('slt_token');
    localStorage.removeItem('slt_user');
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export default AuthContext;
