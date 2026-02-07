import apiClient from './apiClient';

export const authService = {
  register: (userData) => apiClient.post('/register', userData),
  login: (credentials) => apiClient.post('/login', credentials),
};