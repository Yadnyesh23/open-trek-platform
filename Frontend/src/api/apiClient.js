import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach Token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor to handle your custom ApiResponse structure
apiClient.interceptors.response.use(
  (response) => response.data, // Returns the { data, message, success } object
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    return Promise.reject(message);
  }
);

export default apiClient;