import api from './api';

export const login = (email, password) => api.post('/auth/login', { email, password });
export const logout = () => {
  localStorage.removeItem('token');
};
export const isAuthenticated = () => !!localStorage.getItem('token');
