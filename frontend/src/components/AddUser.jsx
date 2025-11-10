/**
 * Add User Component
 * Hoạt động 6: Redux & Protected Routes
 */

import React, { useState } from 'react';
import './AddUser.css';

const AddUser = ({ onUserAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // API base URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://group4-backend-api.onrender.com';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess('✅ Thêm user thành công!');
        setFormData({
          name: '',
          email: '',
          password: '',
          role: 'user'
        });
        
        // Callback to refresh user list
        if (onUserAdded) {
          onUserAdded();
        }
      } else {
        setError(data.message || 'Không thể thêm user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Không thể kết nối đến server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-user">
      <div className="add-user-form">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">👤 Họ tên:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập họ tên"
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">📧 Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập email"
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">🔒 Mật khẩu:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                disabled={loading}
                required
                minLength={6}
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">🔐 Vai trò:</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={loading}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="message error-message">
              ❌ {error}
            </div>
          )}

          {success && (
            <div className="message success-message">
              {success}
            </div>
          )}

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? '⏳ Đang thêm...' : '➕ Thêm user'}
          </button>
        </form>

        <div className="form-info">
          <h3>📋 Hướng dẫn:</h3>
          <ul>
            <li>Tất cả các trường đều bắt buộc</li>
            <li>Email phải có định dạng hợp lệ</li>
            <li>Mật khẩu tối thiểu 6 ký tự</li>
            <li>Vai trò mặc định là "User"</li>
            <li>Admin có thể truy cập tất cả tính năng</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
