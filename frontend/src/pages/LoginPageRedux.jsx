/**
 * Login Page với Redux Authentication
 * Kết nối backend API
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectIsLoading, selectError } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [mode, setMode] = useState('login'); // 'login' or 'register'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await dispatch(loginUser({
        email: formData.email,
        password: formData.password
      })).unwrap();
      
      console.log('✅ Login thành công:', result);
      navigate('/profile'); // Chuyển đến trang profile sau khi login thành công
    } catch (error) {
      console.error('❌ Login thất bại:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🔐 {mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}</h1>
          <p>Group 4 - Authentication System</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {mode === 'register' && (
            <div className="form-group">
              <label>👤 Họ tên</label>
              <input
                type="text"
                name="name"
                placeholder="Nhập họ tên"
                className="form-input"
              />
            </div>
          )}

          <div className="form-group">
            <label>📧 Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>🔒 Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              className="form-input"
              required
            />
          </div>

          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>⏳ Đang {mode === 'login' ? 'đăng nhập' : 'đăng ký'}...</>
            ) : (
              <>{mode === 'login' ? '🚀 Đăng nhập' : '📝 Đăng ký'}</>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {mode === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
            <button 
              type="button"
              className="mode-switch"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            >
              {mode === 'login' ? 'Đăng ký' : 'Đăng nhập'}
            </button>
          </p>
        </div>

        <div className="test-accounts">
          <h4>🧪 Tài khoản test:</h4>
          <div className="test-buttons">
            <button 
              type="button"
              onClick={() => setFormData({ email: 'admin@test.com', password: '123456' })}
              className="test-btn admin"
            >
              🛡️ Admin
            </button>
            <button 
              type="button"
              onClick={() => setFormData({ email: 'user@test.com', password: '123456' })}
              className="test-btn user"
            >
              👤 User
            </button>
          </div>
        </div>

        <div className="home-link">
          <button 
            type="button"
            onClick={() => navigate('/')}
            className="home-button"
          >
            🏠 Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;