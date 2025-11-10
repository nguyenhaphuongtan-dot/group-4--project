/**
 * Change Password Page - Đổi mật khẩu
 * Redux integration với backend API
 */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser, selectIsLoading } from '../store/slices/authSlice';
import '../styles/ChangePasswordPage.css';

const ChangePasswordPage = () => {
  // const dispatch = useDispatch(); // TODO: Will be used when implementing backend API
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Vui lòng nhập mật khẩu hiện tại';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Mật khẩu mới phải có ít nhất 6 ký tự';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu mới';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'Mật khẩu mới phải khác mật khẩu hiện tại';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // TODO: Implement changePassword thunk in authSlice
      // await dispatch(changePassword({
      //   currentPassword: formData.currentPassword,
      //   newPassword: formData.newPassword
      // })).unwrap();

      // Mock success for now
      setSuccess('✅ Đổi mật khẩu thành công! Đang chuyển hướng...');
      
      // Clear form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/profile');
      }, 2000);

    } catch (error) {
      setErrors({
        submit: error.message || 'Có lỗi xảy ra khi đổi mật khẩu'
      });
    }
  };

  if (!user) {
    return (
      <div className="change-password-container">
        <div className="error-card">
          <h2>❌ Lỗi truy cập</h2>
          <p>Vui lòng đăng nhập để đổi mật khẩu</p>
          <button onClick={() => navigate('/login')} className="login-btn">
            🔐 Đăng nhập
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="change-password-container">
      <div className="change-password-card">
        <div className="header">
          <button onClick={() => navigate('/profile')} className="back-btn">
            ← Quay lại
          </button>
          <h1>🔒 Đổi mật khẩu</h1>
          <p>Cập nhật mật khẩu cho tài khoản: <strong>{user.email}</strong></p>
        </div>

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        {errors.submit && (
          <div className="error-message">
            ❌ {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="change-password-form">
          <div className="form-group">
            <label htmlFor="currentPassword">🔐 Mật khẩu hiện tại:</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Nhập mật khẩu hiện tại"
              className={errors.currentPassword ? 'error' : ''}
            />
            {errors.currentPassword && (
              <span className="error-text">{errors.currentPassword}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">🆕 Mật khẩu mới:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
              className={errors.newPassword ? 'error' : ''}
            />
            {errors.newPassword && (
              <span className="error-text">{errors.newPassword}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">✅ Xác nhận mật khẩu mới:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu mới"
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => navigate('/profile')} 
              className="cancel-btn"
              disabled={isLoading}
            >
              ❌ Hủy
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? '⏳ Đang xử lý...' : '💾 Đổi mật khẩu'}
            </button>
          </div>
        </form>

        <div className="security-tips">
          <h3>💡 Mẹo bảo mật:</h3>
          <ul>
            <li>Sử dụng mật khẩu mạnh với ít nhất 8 ký tự</li>
            <li>Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt</li>
            <li>Không sử dụng thông tin cá nhân dễ đoán</li>
            <li>Thay đổi mật khẩu định kỳ</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;