import { api } from '@/services/api';

export const useAuth = () => {
  const login = (email: string, password: string) =>
    api.post('/auth/login', { email, password });

  const register = (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password });

  const verifyToken = (token: string) =>
    api.post('/auth/verify', { token });

  const forgotPassword = (email: string) =>
    api.post('/auth/forgot-password', { email });

  return { login, register, verifyToken, forgotPassword };
};
