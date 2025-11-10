/**
 * User List Component
 * Hoạt động 6: Redux & Protected Routes
 */

import React, { useState } from 'react';
import './UserList.css';

const UserList = ({ users = [], loading, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // API base URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://group4-backend-api.onrender.com';

  // Filter and sort users
  const filteredAndSortedUsers = users
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const handleDelete = async (userId, userName) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa user "${userName}"?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        alert('✅ Xóa user thành công!');
        if (onRefresh) onRefresh();
      } else {
        const data = await response.json();
        alert(`❌ Lỗi: ${data.message || 'Không thể xóa user'}`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('❌ Không thể kết nối đến server');
    }
  };

  const handleRoleChange = async (userId, newRole, userName) => {
    if (!window.confirm(`Bạn có chắc chắn muốn thay đổi quyền của "${userName}" thành "${newRole}"?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: newRole })
      });

      if (response.ok) {
        alert('✅ Cập nhật quyền thành công!');
        if (onRefresh) onRefresh();
      } else {
        const data = await response.json();
        alert(`❌ Lỗi: ${data.message || 'Không thể cập nhật quyền'}`);
      }
    } catch (error) {
      console.error('Error updating role:', error);
      alert('❌ Không thể kết nối đến server');
    }
  };

  if (loading) {
    return (
      <div className="user-list-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Đang tải danh sách users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-list">
      <div className="user-list-controls">
        <div className="search-section">
          <div className="search-group">
            <label htmlFor="search">🔍 Tìm kiếm:</label>
            <input
              type="text"
              id="search"
              placeholder="Tìm theo tên hoặc email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="filter-role">🔐 Lọc theo vai trò:</label>
            <select
              id="filter-role"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="sort-group">
            <label htmlFor="sort-by">📊 Sắp xếp:</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Tên</option>
              <option value="email">Email</option>
              <option value="role">Vai trò</option>
            </select>
            <button
              className="sort-order-btn"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              title={`Sắp xếp ${sortOrder === 'asc' ? 'tăng dần' : 'giảm dần'}`}
            >
              {sortOrder === 'asc' ? '⬆️' : '⬇️'}
            </button>
          </div>
        </div>

        <div className="user-stats">
          <span className="stat-item">
            📊 Tổng: <strong>{users.length}</strong>
          </span>
          <span className="stat-item">
            👥 Hiển thị: <strong>{filteredAndSortedUsers.length}</strong>
          </span>
          <span className="stat-item">
            🛡️ Admin: <strong>{users.filter(u => u.role === 'admin').length}</strong>
          </span>
          <span className="stat-item">
            👤 User: <strong>{users.filter(u => u.role === 'user').length}</strong>
          </span>
        </div>
      </div>

      {filteredAndSortedUsers.length === 0 ? (
        <div className="no-users">
          <p>📭 Không tìm thấy users nào</p>
          {searchTerm && (
            <button 
              className="clear-search-btn"
              onClick={() => setSearchTerm('')}
            >
              Xóa bộ lọc
            </button>
          )}
        </div>
      ) : (
        <div className="user-table">
          <div className="table-header">
            <div className="header-cell">👤 Tên</div>
            <div className="header-cell">📧 Email</div>
            <div className="header-cell">🔐 Vai trò</div>
            <div className="header-cell">🔧 Thao tác</div>
          </div>

          <div className="table-body">
            {filteredAndSortedUsers.map((user, index) => (
              <div key={user._id || index} className="table-row">
                <div className="table-cell name-cell">
                  <div className="user-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="user-name">{user.name}</span>
                </div>

                <div className="table-cell email-cell">
                  <a href={`mailto:${user.email}`} className="email-link">
                    {user.email}
                  </a>
                </div>

                <div className="table-cell role-cell">
                  <select
                    className={`role-select ${user.role}`}
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value, user.name)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="table-cell actions-cell">
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user._id, user.name)}
                    title="Xóa user"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
