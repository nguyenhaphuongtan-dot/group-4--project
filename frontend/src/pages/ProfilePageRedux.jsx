/**
 * Profile Page với Redux
 * Hiển thị thông tin user và logout
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, logoutUser, selectUser, selectIsLoading } from '../store/slices/authSlice';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    // Lấy thông tin profile khi component mount
    const token = localStorage.getItem('token');
    if (token && !user) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const navigateToAdmin = () => {
    navigate('/admin');
  };

  if (isLoading) {
    return (
      <div className="profile-container">
        <div className="loading">
          <h2>⏳ Đang tải thông tin...</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-container">
        <div className="error">
          <h2>❌ Không thể tải thông tin user</h2>
          <button onClick={() => navigate('/login')} className="login-redirect">
            🔐 Đăng nhập lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            {user.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <h1>👤 Profile</h1>
          <p>Thông tin tài khoản của bạn</p>
        </div>

        <div className="profile-info">
          <div className="info-item">
            <label>🏷️ Tên:</label>
            <value>{user.name || 'Chưa cập nhật'}</value>
          </div>

          <div className="info-item">
            <label>📧 Email:</label>
            <value>{user.email || 'Chưa có email'}</value>
          </div>

          <div className="info-item">
            <label>🛡️ Vai trò:</label>
            <value className={`role-badge ${user.role}`}>
              {user.role === 'admin' ? '🛡️ Administrator' : '👤 User'}
            </value>
          </div>

          <div className="info-item">
            <label>🆔 ID:</label>
            <value className="user-id">{user._id || user.id}</value>
          </div>

          <div className="info-item">
            <label>📅 Ngày tạo:</label>
            <value>
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'Chưa có thông tin'}
            </value>
          </div>
        </div>

        <div className="profile-actions">
          {user.role === 'admin' && (
            <button onClick={() => navigate('/admin')} className="admin-button">
              🛡️ Quản lý User
            </button>
          )}
          
          <button onClick={() => navigate('/')} className="home-button">
            🏠 Trang chủ
          </button>
          
          <button onClick={handleLogout} className="logout-button">
            🚪 Đăng xuất
          </button>
        </div>

        <div className="profile-stats">
          <h3>📊 Thống kê</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">✅</div>
              <div className="stat-label">Đã xác thực</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{user.role === 'admin' ? '🛡️' : '👤'}</div>
              <div className="stat-label">Loại tài khoản</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">🔐</div>
              <div className="stat-label">Bảo mật</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;