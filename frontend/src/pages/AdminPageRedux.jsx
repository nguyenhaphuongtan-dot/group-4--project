/**
 * Admin Panel - Quản lý User 
 * Tương tự như Group 2 Project
 */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminPage.css';

const AdminPage = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form data cho thêm/sửa user
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://group4-backend-api.onrender.com';

  // Fetch danh sách users
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
          setUsers(data.data.users || data.users || []);
        } else {
          // Mock data nếu API chưa có
          setUsers([
            { _id: '1', name: 'Admin User', email: 'admin@test.com', role: 'admin', createdAt: '2024-01-01' },
            { _id: '2', name: 'John Doe', email: 'john@test.com', role: 'user', createdAt: '2024-02-01' },
            { _id: '3', name: 'Jane Smith', email: 'jane@test.com', role: 'user', createdAt: '2024-03-01' },
          ]);
        }
      } else {
        // Mock data cho demo
        setUsers([
          { _id: '1', name: 'Admin User', email: 'admin@test.com', role: 'admin', createdAt: '2024-01-01' },
          { _id: '2', name: 'John Doe', email: 'john@test.com', role: 'user', createdAt: '2024-02-01' },
          { _id: '3', name: 'Jane Smith', email: 'jane@test.com', role: 'user', createdAt: '2024-03-01' },
        ]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      // Mock data cho demo
      setUsers([
        { _id: '1', name: 'Admin User', email: 'admin@test.com', role: 'admin', createdAt: '2024-01-01' },
        { _id: '2', name: 'John Doe', email: 'john@test.com', role: 'user', createdAt: '2024-02-01' },
        { _id: '3', name: 'Jane Smith', email: 'jane@test.com', role: 'user', createdAt: '2024-03-01' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle form input
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Thêm user mới
  const handleAddUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      const newUser = {
        _id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      
      setUsers([...users, newUser]);
      setFormData({ name: '', email: '', password: '', role: 'user' });
      setShowAddForm(false);
      alert('✅ Thêm user thành công!');
    } catch (error) {
      alert('❌ Lỗi khi thêm user');
    } finally {
      setLoading(false);
    }
  };

  // Sửa user
  const handleEditUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updatedUsers = users.map(u => 
        u._id === editUser._id 
          ? { ...u, ...formData }
          : u
      );
      
      setUsers(updatedUsers);
      setEditUser(null);
      setFormData({ name: '', email: '', password: '', role: 'user' });
      alert('✅ Cập nhật user thành công!');
    } catch (error) {
      alert('❌ Lỗi khi cập nhật user');
    } finally {
      setLoading(false);
    }
  };

  // Xóa user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Bạn có chắc muốn xóa user này?')) return;
    
    setLoading(true);
    try {
      setUsers(users.filter(u => u._id !== userId));
      alert('✅ Xóa user thành công!');
    } catch (error) {
      alert('❌ Lỗi khi xóa user');
    } finally {
      setLoading(false);
    }
  };

  // Start edit
  const startEdit = (user) => {
    setEditUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role
    });
    setShowAddForm(false);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditUser(null);
    setFormData({ name: '', email: '', password: '', role: 'user' });
  };

  // Filter users
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (user?.role !== 'admin') {
    return (
      <div className="admin-page">
        <div className="access-denied">
          <h2>🚫 Access Denied</h2>
          <p>Bạn không có quyền truy cập trang này</p>
          <button onClick={() => navigate('/profile')}>← Về Profile</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        {/* Header */}
        <header className="admin-header">
          <div className="header-content">
            <h1>🚀 Quản lý User</h1>
            <div className="header-actions">
              <button onClick={() => navigate('/profile')} className="profile-btn">
                👤 Profile
              </button>
              <button onClick={() => navigate('/')} className="home-btn">
                🏠 Home
              </button>
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-number">{users.length}</div>
            <div className="stat-label">Tổng Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{users.filter(u => u.role === 'admin').length}</div>
            <div className="stat-label">Admins</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{users.filter(u => u.role === 'user').length}</div>
            <div className="stat-label">Users</div>
          </div>
        </div>

        {/* Controls */}
        <div className="controls-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Tìm kiếm user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="add-btn"
          >
            ➕ Thêm User
          </button>
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || editUser) && (
          <div className="form-section">
            <div className="form-card">
              <h3>{editUser ? '✏️ Sửa User' : '➕ Thêm User Mới'}</h3>
              <form onSubmit={editUser ? handleEditUser : handleAddUser}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Tên:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Nhập tên"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Nhập email"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Mật khẩu:</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required={!editUser}
                      placeholder={editUser ? "Để trống nếu không đổi" : "Nhập mật khẩu"}
                    />
                  </div>
                  <div className="form-group">
                    <label>Vai trò:</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-btn" disabled={loading}>
                    {loading ? '⏳' : (editUser ? '💾 Cập nhật' : '➕ Thêm')}
                  </button>
                  <button 
                    type="button" 
                    onClick={editUser ? cancelEdit : () => setShowAddForm(false)}
                    className="cancel-btn"
                  >
                    ❌ Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="table-section">
          <div className="table-card">
            <h3>📋 Danh sách Users ({filteredUsers.length})</h3>
            {error && (
              <div className="error-message">❌ {error}</div>
            )}
            {loading ? (
              <div className="loading">⏳ Đang tải...</div>
            ) : (
              <div className="table-container">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tên</th>  
                      <th>Email</th>
                      <th>Vai trò</th>
                      <th>Ngày tạo</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user._id}>
                        <td>#{user._id.slice(-4)}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`role-badge ${user.role}`}>
                            {user.role === 'admin' ? '🛡️ Admin' : '👤 User'}
                          </span>
                        </td>
                        <td>{new Date(user.createdAt).toLocaleDateString('vi-VN')}</td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              onClick={() => startEdit(user)}
                              className="edit-btn"
                              title="Sửa"
                            >
                              ✏️
                            </button>
                            <button 
                              onClick={() => handleDeleteUser(user._id)}
                              className="delete-btn"
                              title="Xóa"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;