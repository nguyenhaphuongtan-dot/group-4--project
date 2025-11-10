/**
 * Profile Page Component
 * Hoạt động 6: Redux & Protected Routes
 */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectUser, logoutUser } from '../store/slices/authSlice';
import './ProfilePage.css';

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      dispatch(logoutUser());
      navigate('/login');
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <header className="profile-header">
          <div className="profile-avatar">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="profile-info">
            <h1>👋 Xin chào, {user?.name || 'User'}!</h1>
            <p className="profile-subtitle">Quản lý thông tin cá nhân của bạn</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Đăng xuất
          </button>
        </header>

        <div className="profile-content">
          <div className="profile-card">
            <h2>📝 Thông tin cá nhân</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">👤 Họ tên:</span>
                <span className="info-value">{user?.name || 'Chưa cập nhật'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">📧 Email:</span>
                <span className="info-value">{user?.email || 'Chưa cập nhật'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">🔐 Vai trò:</span>
                <span className={`info-value role-badge ${user?.role}`}>
                  {user?.role === 'admin' ? '🛡️ Admin' : '👤 User'}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">🆔 User ID:</span>
                <span className="info-value user-id">{user?._id || 'N/A'}</span>
              </div>
            </div>
            
            <div className="profile-actions">
              <Link to="/edit-profile" className="action-btn primary">
                ✏️ Chỉnh sửa profile
              </Link>
              <Link to="/change-password" className="action-btn secondary">
                🔒 Đổi mật khẩu
              </Link>
            </div>
          </div>

          <div className="quick-actions">
            <h2>🚀 Tính năng nhanh</h2>
            <div className="actions-grid">
              <Link to="/" className="quick-action-card">
                <div className="action-icon">🏠</div>
                <h3>Trang chủ</h3>
                <p>Quay về trang chủ</p>
              </Link>

              {user?.role === 'admin' && (
                <>
                  <Link to="/admin" className="quick-action-card admin">
                    <div className="action-icon">👥</div>
                    <h3>Admin Panel</h3>
                    <p>Quản lý người dùng</p>
                  </Link>
                  
                  <Link to="/activity-logs" className="quick-action-card admin">
                    <div className="action-icon">📊</div>
                    <h3>Activity Logs</h3>
                    <p>Xem nhật ký hệ thống</p>
                  </Link>
                  
                  <Link to="/advanced-features" className="quick-action-card admin">
                    <div className="action-icon">⚙️</div>
                    <h3>Tính năng nâng cao</h3>
                    <p>Rate limiting, RBAC</p>
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="system-status">
            <h2>🔗 Trạng thái hệ thống</h2>
            <div className="status-grid">
              <div className="status-item">
                <span className="status-indicator active"></span>
                <div className="status-info">
                  <strong>Frontend</strong>
                  <small>Vercel - Online</small>
                </div>
              </div>
              <div className="status-item">
                <span className="status-indicator active"></span>
                <div className="status-info">
                  <strong>Backend API</strong>
                  <small>Render - Connected</small>
                </div>
              </div>
              <div className="status-item">
                <span className="status-indicator active"></span>
                <div className="status-info">
                  <strong>Database</strong>
                  <small>MongoDB - Active</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
