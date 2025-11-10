/**
 * Full App with Redux Authentication
 * Complete implementation với backend integration
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserProfile } from './store/slices/authSlice';

// Import components
import HomePage from './pages/HomePage';
import LoginPageRedux from './pages/LoginPageRedux';
import ProfilePageRedux from './pages/ProfilePageRedux';
import AdminPageRedux from './pages/AdminPageRedux';
import ProtectedRouteRedux from './components/ProtectedRouteRedux';

// HomePage component được import từ pages/HomePage.jsx

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