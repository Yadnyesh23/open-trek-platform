import apiClient from './apiClient';

export const trekService = {
  // GET /api/treks with filters
  getAllTreks: (params) => {
    return apiClient.get('/treks', { params });
  },

  // GET /api/treks/:id
  getTrekById: (id) => {
    return apiClient.get(`/treks/${id}`);
  },

  // POST /api/treks (Multipart for images)
  createTrek: (formData) => {
    return apiClient.post('/treks', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // GET /api/treks/my
  getMyTreks: () => {
    return apiClient.get('/treks/my');
  }
};