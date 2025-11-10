/**
 * Admin Page Component
 * Hoạt động 6: Redux & Protected Routes
 */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';
import AddUser from '../components/AddUser';
import UserList from '../components/UserList';
import RBACDemo from '../components/RBACDemo';
import './AdminPage.css';

const AdminPage = () => {
  const user = useSelector(selectUser);
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API base URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://group4-backend-api.onrender.com';

  // Fetch users list
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUsers(data.data.users || []);
        } else {
          setError(data.message || 'Không thể tải danh sách users');
        }
      } else {
        setError(`Lỗi ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Không thể kết nối đến server');
    } finally {
      setLoading(false);
    }
  };

  // Load users on component mount
  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab]);

  const tabs = [
    { id: 'users', label: '👥 Quản lý Users', icon: '👥' },
    { id: 'add-user', label: '➕ Thêm User', icon: '➕' },
    { id: 'rbac', label: '🔐 RBAC Demo', icon: '🔐' },
    { id: 'system', label: '⚙️ Hệ thống', icon: '⚙️' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return (
          <div className="tab-content">
            <div className="section-header">
              <h2>👥 Danh sách người dùng</h2>
              <button 
                className="refresh-btn"
                onClick={fetchUsers}
                disabled={loading}
              >
                🔄 Làm mới
              </button>
            </div>
            
            {error && (
              <div className="error-message">
                ❌ {error}
              </div>
            )}
            
            <UserList 
              users={users} 
              loading={loading}
              onRefresh={fetchUsers}
            />
          </div>
        );

      case 'add-user':
        return (
          <div className="tab-content">
            <div className="section-header">
              <h2>➕ Thêm người dùng mới</h2>
            </div>
            <AddUser onUserAdded={fetchUsers} />
          </div>
        );

      case 'rbac':
        return (
          <div className="tab-content">
            <div className="section-header">
              <h2>🔐 RBAC Demo</h2>
            </div>
            <RBACDemo />
          </div>
        );

      case 'system':
        return (
          <div className="tab-content">
            <div className="section-header">
              <h2>⚙️ Thông tin hệ thống</h2>
            </div>
            
            <div className="system-info">
              <div className="info-card">
                <h3>🔗 Kết nối API</h3>
                <div className="info-item">
                  <strong>Backend URL:</strong> 
                  <code>{API_BASE_URL}</code>
                </div>
                <div className="info-item">
                  <strong>Environment:</strong> 
                  <span className="env-badge">{process.env.NODE_ENV || 'development'}</span>
                </div>
              </div>

              <div className="info-card">
                <h3>👤 Thông tin Admin</h3>
                <div className="info-item">
                  <strong>Tên:</strong> {user?.name}
                </div>
                <div className="info-item">
                  <strong>Email:</strong> {user?.email}
                </div>
                <div className="info-item">
                  <strong>Vai trò:</strong> 
                  <span className="role-badge">{user?.role}</span>
                </div>
                <div className="info-item">
                  <strong>ID:</strong> <code>{user?._id}</code>
                </div>
              </div>

              <div className="info-card">
                <h3>📊 Thống kê</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-number">{users.length}</div>
                    <div className="stat-label">Tổng số users</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">
                      {users.filter(u => u.role === 'admin').length}
                    </div>
                    <div className="stat-label">Admins</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">
                      {users.filter(u => u.role === 'user').length}
                    </div>
                    <div className="stat-label">Users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Tab không tồn tại</div>;
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <header className="admin-header">
          <h1>🛡️ Admin Panel - Group 4</h1>
          <div className="admin-welcome">
            <span>Xin chào, <strong>{user?.name}</strong>!</span>
            <span className="role-indicator">Admin</span>
          </div>
        </header>

        <div className="admin-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label.replace(/^\S+\s/, '')}</span>
            </button>
          ))}
        </div>

        <main className="admin-main">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
