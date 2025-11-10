// API configuration for connecting to backend
const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://group4-backend-api.onrender.com/api',
  BACKEND_URL: process.env.REACT_APP_API_URL || 'https://group4-backend-api.onrender.com',
  FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL || window.location.origin,
  TIMEOUT: 10000, // 10 seconds
  
  // API endpoints
  ENDPOINTS: {
    // Health check
    HEALTH: '/health',
    
    // Authentication
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
      VERIFY_EMAIL: '/auth/verify-email',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password'
    },
    
    // User management
    USER: {
      PROFILE: '/user/profile',
      UPDATE_PROFILE: '/user/profile',
      UPLOAD_AVATAR: '/user/avatar',
      DELETE_AVATAR: '/user/avatar',
      CHANGE_PASSWORD: '/user/change-password'
    },
    
    // Admin routes
    ADMIN: {
      USERS: '/users',  // Updated to match backend
      USER_BY_ID: (id) => `/users/${id}`,
      ROLES: '/admin/roles',
      ROLE_BY_ID: (id) => `/admin/roles/${id}`
    },
    
    // Advanced features
    ADVANCED: {
      ANALYTICS: '/advanced/analytics',
      LOGS: '/advanced/logs',
      SYSTEM_INFO: '/advanced/system-info'
    }
  }
};

export default API_CONFIG;