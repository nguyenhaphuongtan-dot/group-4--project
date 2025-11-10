/**
 * Login Page với Redux Authentication
 * Kết nối backend API
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, selectIsLoading, selectError } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [mode, setMode] = useState('login'); // 'login' or 'register'

  const handleModeSwitch = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    // Clear form khi chuyển mode
    setFormData({
      name: '',
      email: '',
      password: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation cho register
    if (mode === 'register') {
      if (formData.name.trim().length < 2) {
        alert('Tên phải có ít nhất 2 ký tự');
        return;
      }
      if (formData.password.length < 6) {
        alert('Mật khẩu phải có ít nhất 6 ký tự');
        return;
      }
    }
    
    try {
      if (mode === 'login') {
        const result = await dispatch(loginUser({
          email: formData.email,
          password: formData.password
        })).unwrap();
        
        console.log('✅ Login thành công:', result);
        navigate('/profile');
      } else {
        // Register mode
        const result = await dispatch(registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })).unwrap();
        
        console.log('✅ Đăng ký thành công:', result);
        navigate('/profile');
      }
    } catch (error) {
      console.error('❌ Thao tác thất bại:', error);
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
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập họ tên"
                className="form-input"
                required
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
              onClick={handleModeSwitch}
            >
              {mode === 'login' ? 'Đăng ký' : 'Đăng nhập'}
            </button>
          </p>
        </div>

        <div className="test-accounts">
          <h4>🧪 {mode === 'login' ? 'Tài khoản test' : 'Tài khoản mẫu'}:</h4>
          <div className="test-buttons">
            {mode === 'login' ? (
              <>
                <button 
                  type="button"
                  onClick={() => setFormData({ name: 'Admin Test', email: 'admin@test.com', password: '123456' })}
                  className="test-btn admin"
                >
                  🛡️ Admin
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData({ name: 'User Test', email: 'user@test.com', password: '123456' })}
                  className="test-btn user"
                >
                  👤 User
                </button>
              </>
            ) : (
              <>
                <button 
                  type="button"
                  onClick={() => setFormData({ name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', password: '123456' })}
                  className="test-btn user"
                >
                  👤 Mẫu 1
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData({ name: 'Trần Thị B', email: 'tranthib@example.com', password: '123456' })}
                  className="test-btn user"
                >
                  👤 Mẫu 2
                </button>
              </>
            )}
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