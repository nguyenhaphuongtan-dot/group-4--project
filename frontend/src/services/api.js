import axios from 'axios';
import API_CONFIG from './api';

// Tạo axios instance với cấu hình mặc định
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor để thêm token vào header
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor để handle refresh token
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(
            `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH}`,
            { refreshToken }
          );
          
          const { accessToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          
          // Retry original request với token mới
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh token failed, logout user
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// API service functions
export const authService = {
  login: (credentials) => 
    apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials),
  
  register: (userData) => 
    apiClient.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, userData),
  
  logout: () => 
    apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT),
  
  refreshToken: (refreshToken) => 
    apiClient.post(API_CONFIG.ENDPOINTS.AUTH.REFRESH, { refreshToken }),
  
  verifyEmail: (token) => 
    apiClient.post(API_CONFIG.ENDPOINTS.AUTH.VERIFY_EMAIL, { token }),
  
  forgotPassword: (email) => 
    apiClient.post(API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD, { email }),
  
  resetPassword: (token, newPassword) => 
    apiClient.post(API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD, { token, newPassword })
};

export const userService = {
  getProfile: () => 
    apiClient.get(API_CONFIG.ENDPOINTS.USER.PROFILE),
  
  updateProfile: (profileData) => 
    apiClient.put(API_CONFIG.ENDPOINTS.USER.UPDATE_PROFILE, profileData),
  
  uploadAvatar: (formData) => 
    apiClient.post(API_CONFIG.ENDPOINTS.USER.UPLOAD_AVATAR, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  
  deleteAvatar: () => 
    apiClient.delete(API_CONFIG.ENDPOINTS.USER.DELETE_AVATAR),
  
  changePassword: (passwordData) => 
    apiClient.put(API_CONFIG.ENDPOINTS.USER.CHANGE_PASSWORD, passwordData)
};

export const adminService = {
  getUsers: () => 
    apiClient.get(API_CONFIG.ENDPOINTS.ADMIN.USERS),
  
  getUserById: (id) => 
    apiClient.get(API_CONFIG.ENDPOINTS.ADMIN.USER_BY_ID(id)),
  
  updateUser: (id, userData) => 
    apiClient.put(API_CONFIG.ENDPOINTS.ADMIN.USER_BY_ID(id), userData),
  
  deleteUser: (id) => 
    apiClient.delete(API_CONFIG.ENDPOINTS.ADMIN.USER_BY_ID(id)),
  
  getRoles: () => 
    apiClient.get(API_CONFIG.ENDPOINTS.ADMIN.ROLES),
  
  createRole: (roleData) => 
    apiClient.post(API_CONFIG.ENDPOINTS.ADMIN.ROLES, roleData),
  
  updateRole: (id, roleData) => 
    apiClient.put(API_CONFIG.ENDPOINTS.ADMIN.ROLE_BY_ID(id), roleData),
  
  deleteRole: (id) => 
    apiClient.delete(API_CONFIG.ENDPOINTS.ADMIN.ROLE_BY_ID(id))
};

export const advancedService = {
  getAnalytics: () => 
    apiClient.get(API_CONFIG.ENDPOINTS.ADVANCED.ANALYTICS),
  
  getLogs: () => 
    apiClient.get(API_CONFIG.ENDPOINTS.ADVANCED.LOGS),
  
  getSystemInfo: () => 
    apiClient.get(API_CONFIG.ENDPOINTS.ADVANCED.SYSTEM_INFO)
};

export default apiClient;