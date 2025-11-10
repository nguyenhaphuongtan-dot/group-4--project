/**
 * Protected Route Component
 * Kiểm tra authentication trước khi cho phép truy cập
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserProfile, selectIsAuthenticated, selectUser, selectIsLoading } from '../store/slices/authSlice';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Nếu có token nhưng chưa authenticated, thử lấy profile
    if (token && !isAuthenticated && !user) {
      dispatch(getUserProfile());
    }
  }, [dispatch, token, isAuthenticated, user]);

  // Đang loading, hiển thị loading
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ color: '#495057', marginBottom: '20px' }}>⏳ Đang kiểm tra quyền truy cập...</h2>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
        </div>
      </div>
    );
  }

  // Không có token hoặc không authenticated
  if (!token || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Yêu cầu admin nhưng user không phải admin
  if (adminOnly && user?.role !== 'admin') {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ color: '#dc3545', marginBottom: '20px' }}>🚫 Không có quyền truy cập</h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Trang này chỉ dành cho Administrator
          </p>
          <button 
            onClick={() => window.location.href = '/profile'}
            style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🏠 Về trang Profile
          </button>
        </div>
      </div>
    );
  }

  // Cho phép truy cập
  return children;
};

export default ProtectedRoute;