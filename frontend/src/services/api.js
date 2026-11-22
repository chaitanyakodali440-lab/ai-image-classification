import axios from 'axios';

// Determine backend API base URL from env or fallback to relative URL (proxied in Vite / Nginx)
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30s timeout for model download/initial inference
});

export const api = {
  // Health check
  checkHealth: async () => {
    const res = await client.get('/api/health');
    return res.data;
  },

  // Image classification
  classifyImage: async (file, onUploadProgress = null) => {
    const formData = new FormData();
    formData.append('image', file);

    const res = await client.post('/api/classify', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
    return res.data;
  },

  // Classification history
  getHistory: async (limit = 50, offset = 0) => {
    const res = await client.get('/api/history', {
      params: { limit, offset },
    });
    return res.data;
  },

  // Delete single history item
  deleteHistoryItem: async (id) => {
    const res = await client.delete(`/api/history/${id}`);
    return res.data;
  },

  // Clear all history
  clearAllHistory: async () => {
    const res = await client.delete('/api/history');
    return res.data;
  },

  // Dashboard statistics
  getStats: async () => {
    const res = await client.get('/api/stats');
    return res.data;
  },
};

export default api;
