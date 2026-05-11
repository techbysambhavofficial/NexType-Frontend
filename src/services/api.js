import axios from 'axios';

const API_URL = 'https://nextype-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
};

// Test services
export const testService = {
  submitTest: (testData) => api.post('/tests/submit', testData),
  getHistory: (params) => api.get('/tests/history', { params }),
  getStatistics: () => api.get('/tests/statistics'),
  getTestById: (id) => api.get(`/tests/${id}`),
};

// User services
export const userService = {
  updateSettings: (settings) => api.put('/users/settings', { settings }),
  updateProfile: (profileData) => api.put('/users/profile', profileData),
  getAchievements: () => api.get('/users/achievements'),
  getDashboard: () => api.get('/users/dashboard'),
};

// Leaderboard services
export const leaderboardService = {
  getLeaderboard: (params) => api.get('/leaderboard', { params }),
  getUserRank: (userId) => api.get(`/leaderboard/rank/${userId}`),
};

export default api;