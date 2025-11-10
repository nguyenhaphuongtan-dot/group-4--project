/**
 * Login Page Component
 * Hoạt động 6: Redux & Protected Routes
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { loginUser, registerUser, clearError, selectAuth } from '../store/slices/authSlice';
import './LoginPage.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { isAuthenticated, isLoading, error } = useSelector(selectAuth);
  
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Redirect nếu đã đăng nhập
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Clear error khi component unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLoginMode) {
      // Đăng nhập
      if (!formData.email || !formData.password) {
        alert('Vui lòng nhập đầy đủ thông tin');
        return;
      }
      
      dispatch(loginUser({
        email: formData.email,
        password: formData.password
      }));
    } else {
      // Đăng ký
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        alert('Vui lòng nhập đầy đủ thông tin');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        alert('Mật khẩu xác nhận không khớp');
        return;
      }
      
      dispatch(registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      }));
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    dispatch(clearError());
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>🔐 Group 4 - User Management</h1>
          <h2>{isLoginMode ? 'Đăng nhập' : 'Đăng ký tài khoản'}</h2>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div className="form-group">
              <label htmlFor="name">Họ tên:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nhập họ tên"
                required={!isLoginMode}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Nhập email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          {!isLoginMode && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Nhập lại mật khẩu"
                required={!isLoginMode}
              />
            </div>
          )}

          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : (isLoginMode ? 'Đăng nhập' : 'Đăng ký')}
          </button>
        </form>

        <div className="toggle-mode">
          <p>
            {isLoginMode ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
            <button
              type="button"
              className="toggle-btn"
              onClick={toggleMode}
              disabled={isLoading}
            >
              {isLoginMode ? 'Đăng ký ngay' : 'Đăng nhập'}
            </button>
          </p>
        </div>

        <div className="test-info">
          <h3>🧪 Thông tin test:</h3>
          <div className="test-accounts">
            <div className="test-account">
              <strong>Admin:</strong>
              <br />Email: admin@test.com
              <br />Password: 123456
            </div>
            <div className="test-account">
              <strong>User:</strong>
              <br />Email: user@test.com
              <br />Password: 123456
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
