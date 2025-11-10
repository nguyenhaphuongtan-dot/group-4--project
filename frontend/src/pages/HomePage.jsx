/**
 * Home Page Component
 * Hoạt động 6: Redux & Protected Routes
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../store/slices/authSlice';
import './HomePage.css';

const HomePage = () => {
  const user = useSelector(selectUser);

  return (
    <div className="home-page">
      <div className="home-container">
        <header className="home-header">
          <h1>🏠 Trang chủ - Group 4 User Management</h1>
          <div className="welcome-message">
            <h2>Chào mừng, {user?.name || 'User'}! 👋</h2>
            <p>Vai trò: <span className="role-badge">{user?.role || 'user'}</span></p>
          </div>
        </header>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👤</div>
            <h3>Quản lý Profile</h3>
            <p>Xem và cập nhật thông tin cá nhân</p>
            <Link to="/profile" className="feature-link">
              Đi đến Profile →
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Đổi mật khẩu</h3>
            <p>Cập nhật mật khẩu để bảo mật tài khoản</p>
            <Link to="/change-password" className="feature-link">
              Đổi mật khẩu →
            </Link>
          </div>

          {user?.role === 'admin' && (
            <>
              <div className="feature-card admin-feature">
                <div className="feature-icon">👥</div>
                <h3>Quản lý Admin</h3>
                <p>Quản lý người dùng và hệ thống</p>
                <Link to="/admin" className="feature-link">
                  Admin Panel →
                </Link>
              </div>

              <div className="feature-card admin-feature">
                <div className="feature-icon">📊</div>
                <h3>Activity Logs</h3>
                <p>Xem nhật ký hoạt động hệ thống</p>
                <Link to="/activity-logs" className="feature-link">
                  Xem Logs →
                </Link>
              </div>

              <div className="feature-card admin-feature">
                <div className="feature-icon">🚀</div>
                <h3>Tính năng nâng cao</h3>
                <p>Rate limiting, RBAC và các tính năng khác</p>
                <Link to="/advanced-features" className="feature-link">
                  Khám phá →
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="system-status">
          <h3>🔗 Trạng thái hệ thống</h3>
          <div className="status-grid">
            <div className="status-item">
              <span className="status-indicator active"></span>
              <span>Frontend: Vercel</span>
              <small>https://group-4-project-v2.vercel.app</small>
            </div>
            <div className="status-item">
              <span className="status-indicator active"></span>
              <span>Backend API: Render</span>
              <small>https://group4-backend-api.onrender.com</small>
            </div>
            <div className="status-item">
              <span className="status-indicator active"></span>
              <span>Database: MongoDB</span>
              <small>Kết nối thành công</small>
            </div>
          </div>
        </div>

        <div className="api-info">
          <h3>🔧 API Endpoints</h3>
          <div className="endpoints-list">
            <div className="endpoint-item">
              <span className="method post">POST</span>
              <code>/api/auth/login</code>
              <span>Đăng nhập</span>
            </div>
            <div className="endpoint-item">
              <span className="method post">POST</span>
              <code>/api/auth/register</code>
              <span>Đăng ký</span>
            </div>
            <div className="endpoint-item">
              <span className="method get">GET</span>
              <code>/api/auth/profile</code>
              <span>Profile người dùng</span>
            </div>
            {user?.role === 'admin' && (
              <>
                <div className="endpoint-item">
                  <span className="method get">GET</span>
                  <code>/api/admin/users</code>
                  <span>Danh sách người dùng</span>
                </div>
                <div className="endpoint-item">
                  <span className="method post">POST</span>
                  <code>/api/admin/users</code>
                  <span>Tạo người dùng mới</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;