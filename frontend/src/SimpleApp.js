/**
 * Full App with Redux Authentication
 * Complete implementation với backend integration
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, selectIsAuthenticated } from './store/slices/authSlice';

// Import components
import LoginPageRedux from './pages/LoginPageRedux';
import ProfilePageRedux from './pages/ProfilePageRedux';
import AdminPageRedux from './pages/AdminPageRedux';
import ProtectedRouteRedux from './components/ProtectedRouteRedux';

// Simple Home Page
const HomePage = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px'
      }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>🏠 Group 4 Project</h1>
        <p style={{ color: '#666', marginBottom: '30px', fontSize: '18px' }}>
          Hệ thống Authentication với Redux
        </p>
        
        <div style={{ marginBottom: '30px' }}>
          <div style={{ marginBottom: '10px' }}>✅ <strong>Redux Store</strong> - Hoạt động</div>
          <div style={{ marginBottom: '10px' }}>✅ <strong>React Router</strong> - Hoạt động</div>
          <div style={{ marginBottom: '10px' }}>✅ <strong>Backend API</strong> - Kết nối</div>
          <div>✅ <strong>Authentication</strong> - {isAuthenticated ? 'Đã đăng nhập' : 'Chưa đăng nhập'}</div>
        </div>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {isAuthenticated ? (
            <>
              <button 
                onClick={() => window.location.href = '/profile'}
                style={{
                  padding: '12px 24px',
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                👤 Profile
              </button>
              <button 
                onClick={() => window.location.href = '/admin'}
                style={{
                  padding: '12px 24px',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                🛡️ Quản lý User
              </button>
            </>
          ) : (
            <button 
              onClick={() => window.location.href = '/login'}
              style={{
                padding: '12px 24px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              🔐 Đăng nhập
            </button>
          )}
        </div>

        <div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
          <p><strong>🎯 Tính năng:</strong> Login, Profile, Protected Routes, Redux State Management</p>
          <p><strong>🔗 Backend:</strong> https://group4-backend-api.onrender.com</p>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const SimpleApp = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Auto-load user profile nếu có token
    if (token) {
      dispatch(getUserProfile());
    }
  }, [dispatch, token]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPageRedux />} />
          
          {/* Protected Routes */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRouteRedux>
                <ProfilePageRedux />
              </ProtectedRouteRedux>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRouteRedux adminOnly={true}>
                <AdminPageRedux />
              </ProtectedRouteRedux>
            } 
          />
          
          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default SimpleApp;